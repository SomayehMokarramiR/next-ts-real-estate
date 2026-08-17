import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { FilterQuery } from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Property from "@/app/models/Property";
import Reservation from "@/app/models/Reservation";

// ==========================================
// تبدیل اعداد فارسی به انگلیسی
// ==========================================

function normalizeNumber(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٬,]/g, "")
    .replace(/تومان/g, "")
    .trim();
}

// ==========================================
// Jalali Date
// ==========================================

function toJalali(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll("-", "/");
}

// ==========================================
// ADMIN AUTH
// ==========================================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    const admin = await User.findById(decoded.id).select("role").lean();

    if (!admin || admin.role !== "admin") {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

// ==========================================
// GET RESERVATIONS
// ==========================================

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 10;

    const search = searchParams.get("search")?.trim() || "";

    const status = searchParams.get("status")?.trim() || "";

    const checkIn = searchParams.get("checkIn")?.trim() || "";

    const checkOut = searchParams.get("checkOut")?.trim() || "";

    const filter: FilterQuery<Record<string, unknown>> = {};

    const conditions: FilterQuery<Record<string, unknown>>[] = [];

    if (status) {
      filter.status = status;
    }

    if (checkIn) {
      filter.checkIn = checkIn;
    }

    if (checkOut) {
      filter.checkOut = checkOut;
    }

    // ==========================================
    // SEARCH
    // ==========================================

    if (search) {
      const normalizedSearch = normalizeNumber(search);

      const regex = {
        $regex: search,
        $options: "i",
      };

      // USER SEARCH

      const users = await User.find({
        $or: [
          {
            name: regex,
          },

          {
            lastName: regex,
          },

          {
            email: regex,
          },

          {
            phoneNumber: regex,
          },

          {
            $expr: {
              $regexMatch: {
                input: {
                  $concat: ["$name", " ", "$lastName"],
                },
                regex: search,
                options: "i",
              },
            },
          },
        ],
      })
        .select("_id email phoneNumber")
        .lean();

      if (users.length) {
        conditions.push(
          {
            userId: {
              $in: users.map((item) => item._id),
            },
          },

          {
            "contact.email": {
              $in: users.map((item) => item.email).filter(Boolean),
            },
          },

          {
            "contact.phone": {
              $in: users.map((item) => item.phoneNumber).filter(Boolean),
            },
          },
        );
      }

      // PROPERTY SEARCH

      const properties = await Property.find({
        $or: [
          {
            title: regex,
          },

          {
            "location.city": regex,
          },
        ],
      })
        .select("_id")
        .lean();

      if (properties.length) {
        conditions.push({
          propertyId: {
            $in: properties.map((item) => item._id),
          },
        });
      }

      // AMOUNT SEARCH

      const amount = Number(normalizedSearch);

      if (!Number.isNaN(amount)) {
        conditions.push({
          amount,
        });
      }

      conditions.push(
        {
          "contact.phone": regex,
        },

        {
          "contact.email": regex,
        },

        {
          checkIn: regex,
        },

        {
          checkOut: regex,
        },

        {
          "passengers.name": regex,
        },

        {
          "passengers.family": regex,
        },
      );

      const dateReservations = await Reservation.find({})
        .select("_id createdAt")
        .lean();

      const dateIds = dateReservations
        .filter((item) => {
          if (!item.createdAt) {
            return false;
          }

          return toJalali(new Date(item.createdAt)).includes(search);
        })
        .map((item) => item._id);

      if (dateIds.length) {
        conditions.push({
          _id: {
            $in: dateIds,
          },
        });
      }

      if (conditions.length) {
        filter.$or = conditions;
      }
    }

    const skip = (page - 1) * limit;

    const [reservations, total] = await Promise.all([
      Reservation.find(filter)

        .populate({
          path: "userId",
          select: "name lastName email phoneNumber",
        })

        .populate({
          path: "propertyId",
          select: "title location pricing",
        })

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(limit)

        .lean(),

      Reservation.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,

      reservations,

      total,

      totalPages: Math.max(1, Math.ceil(total / limit)),

      currentPage: page,

      limit,
    });
  } catch (error) {
    console.error("ADMIN RESERVATIONS ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت رزروها",
      },

      {
        status: 500,
      },
    );
  }
}
