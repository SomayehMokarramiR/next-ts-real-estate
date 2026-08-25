export const runtime = "nodejs";
import { toGregorian } from "jalaali-js";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Reservation from "@/app/models/Reservation";

// ==========================================
// Types
// ==========================================

type UserFilter = {
  name?: {
    $regex: string;
    $options: string;
  };

  lastName?: {
    $regex: string;
    $options: string;
  };

  email?: {
    $regex: string;
    $options: string;
  };

  phoneNumber?: {
    $regex: string;
    $options: string;
  };

  role?: {
    $regex: string;
    $options: string;
  };

  createdAt?: {
    $gte: Date;
    $lte: Date;
  };

  $or?: UserFilter[];
};

// ==========================================
// Check Admin
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
// GET USERS
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

    const filter: UserFilter = {};

    // ==========================================
    // SEARCH
    // ==========================================

    if (search) {
      let value = search;

      if (search === "مدیر") {
        value = "admin";
      }

      if (search === "کاربر") {
        value = "user";
      }

      const or: UserFilter[] = [];

      // -------------------------------
      // چند کلمه‌ای کردن سرچ نام
      // -------------------------------

      const words = value.split(" ").filter(Boolean);

      words.forEach((word) => {
        or.push({
          name: {
            $regex: word,
            $options: "i",
          },
        });

        or.push({
          lastName: {
            $regex: word,
            $options: "i",
          },
        });
      });

      // سرچ مستقیم

      or.push(
        {
          email: {
            $regex: value,
            $options: "i",
          },
        },

        {
          phoneNumber: {
            $regex: value,
            $options: "i",
          },
        },

        {
          role: {
            $regex: value,
            $options: "i",
          },
        },
      );

      // ==========================================
      // DATE SEARCH
      // ==========================================

      const normalized = search
        .replaceAll("۰", "0")
        .replaceAll("۱", "1")
        .replaceAll("۲", "2")
        .replaceAll("۳", "3")
        .replaceAll("۴", "4")
        .replaceAll("۵", "5")
        .replaceAll("۶", "6")
        .replaceAll("۷", "7")
        .replaceAll("۸", "8")
        .replaceAll("۹", "9");

      const dateMatch = normalized.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

      if (dateMatch) {
        const jy = Number(dateMatch[1]);

        const jm = Number(dateMatch[2]);

        const jd = Number(dateMatch[3]);

        const { gy, gm, gd } = toGregorian(jy, jm, jd);

        or.push({
          createdAt: {
            $gte: new Date(Date.UTC(gy, gm - 1, gd, 0, 0, 0)),

            $lte: new Date(Date.UTC(gy, gm - 1, gd, 23, 59, 59, 999)),
          },
        });
      }

      filter.$or = or;
    }

    // ==========================================
    // Pagination
    // ==========================================

    const skip = (page - 1) * limit;

    const users = await User.find(filter)

      .select("_id name lastName email phoneNumber role createdAt updatedAt")

      .sort({
        createdAt: -1,
      })

      .skip(skip)

      .limit(limit)

      .lean();

    // ==========================================
    // Reservation Count
    // ==========================================

    const usersWithReservations = await Promise.all(
      users.map(async (user) => {
        const count = await Reservation.countDocuments({
          userId: user._id,
        });

        return {
          ...user,

          reservationsCount: count,
        };
      }),
    );

    const total = await User.countDocuments(filter);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      success: true,

      users: usersWithReservations,

      total,

      totalPages,

      currentPage: page,

      limit,
    });
  } catch (error) {
    console.error("ADMIN USERS GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت کاربران",
      },
      {
        status: 500,
      },
    );
  }
}
