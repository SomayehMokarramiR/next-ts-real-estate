import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { toGregorian } from "jalaali-js";
import mongoose, { FilterQuery } from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Property from "@/app/models/Property";
import Reservation from "@/app/models/Reservation";

import { checkReservationConflict } from "@/app/lib/reservation/checkAvailability";

// ===============================
// ADMIN AUTH
// ===============================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = verifyToken(token);

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}

// ===============================
// NUMBER NORMALIZE
// ===============================

function normalizeNumber(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/,/g, "")
    .trim();
}

// ===============================
// DATE NORMALIZE
// ===============================

function normalizeDate(value: string) {
  const clean = normalizeNumber(value)
    .replace(/-/g, "/")
    .split("/")
    .filter(Boolean);

  if (clean.length !== 3) {
    return "";
  }

  let year = "";
  let month = "";
  let day = "";

  if (clean[0].length === 4) {
    year = clean[0];
    month = clean[1];
    day = clean[2];
  } else if (clean[2].length === 4) {
    day = clean[0];
    month = clean[1];
    year = clean[2];
  } else {
    return "";
  }

  return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
}

// ===============================
// JALALI TO DATE
// ===============================

function jalaliToDate(value: string) {
  const date = normalizeDate(value).split("/").map(Number);

  if (date.length !== 3) {
    return null;
  }

  const [year, month, day] = date;

  if (!year || !month || !day) {
    return null;
  }

  const result = toGregorian(year, month, day);

  return new Date(result.gy, result.gm - 1, result.gd);
}

// ===============================
// NIGHTS
// ===============================

function calculateNights(checkIn: string, checkOut: string) {
  const start = jalaliToDate(checkIn);
  const end = jalaliToDate(checkOut);

  if (!start || !end) {
    return 1;
  }

  const diff = end.getTime() - start.getTime();

  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}

export async function GET(request: NextRequest) {
  try {
    await checkAdmin();
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";

    const status = searchParams.get("status") || "";

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const query: FilterQuery<typeof Reservation> = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      const users = await User.find({
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },

          {
            lastName: {
              $regex: search,
              $options: "i",
            },
          },

          {
            phoneNumber: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }).select("_id");

      const userIds = users.map((u) => u._id);

      const properties = await Property.find({
        title: {
          $regex: search,
          $options: "i",
        },
      }).select("_id");

      const propertyIds = properties.map((p) => p._id);

      query.$or = [
        {
          userId: {
            $in: userIds,
          },
        },

        {
          propertyId: {
            $in: propertyIds,
          },
        },
      ];
    }

    const reservations = await Reservation.find(query)
      .populate("userId", "name lastName phoneNumber")
      .populate("propertyId", "title location")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Reservation.countDocuments(query);

    return NextResponse.json({
      success: true,

      reservations,

      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET RESERVATION ERROR", error);

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

// =====================================
// CREATE RESERVATION
// =====================================

export async function POST(request: NextRequest) {
  try {
    await checkAdmin();

    await connectDB();

    const body = await request.json();

    const { userId, propertyId, checkIn, checkOut, amount, status } = body;

    const normalizedCheckIn = normalizeDate(String(checkIn));

    const normalizedCheckOut = normalizeDate(String(checkOut));

    if (!userId || !propertyId || !normalizedCheckIn || !normalizedCheckOut) {
      return NextResponse.json(
        {
          success: false,

          message: "اطلاعات رزرو ناقص است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // CHECK CONFLICT
    // =========================

    const conflict = await checkReservationConflict({
      propertyId: String(propertyId),

      checkIn: normalizedCheckIn,

      checkOut: normalizedCheckOut,
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,

          message: "این ملک در این بازه زمانی قبلاً رزرو شده است",
        },
        {
          status: 409,
        },
      );
    }
    const reservationUser = await User.findById(userId);

    if (!reservationUser) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }
    const reservation = await Reservation.create({
      userId,
      propertyId,

      checkIn: normalizedCheckIn,
      checkOut: normalizedCheckOut,

      contact: {
        phone: reservationUser.phoneNumber,
        email: reservationUser.email,
      },

      nights: calculateNights(normalizedCheckIn, normalizedCheckOut),

      amount: Number(amount) || 0,

      status: status || "pending",
    });

    return NextResponse.json({
      success: true,

      message: "رزرو ایجاد شد",

      reservation,
    });
  } catch (error) {
    console.error("CREATE RESERVATION ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد رزرو",
      },
      {
        status: 500,
      },
    );
  }
}

// =====================================
// UPDATE RESERVATION
// =====================================

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await checkAdmin();
    await connectDB();

    const { id } = await context.params;

    const body = await request.json();

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // =========================
    // NEW VALUES
    // =========================

    const newCheckIn = body.checkIn
      ? normalizeDate(String(body.checkIn))
      : reservation.checkIn;

    const newCheckOut = body.checkOut
      ? normalizeDate(String(body.checkOut))
      : reservation.checkOut;

    const newPropertyId = body.propertyId
      ? String(body.propertyId)
      : String(reservation.propertyId);

    console.log("UPDATE CONFLICT CHECK", {
      id,
      propertyId: newPropertyId,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
    });

    // =========================
    // CHECK CONFLICT
    // =========================

    const conflict = await checkReservationConflict({
      propertyId: newPropertyId,

      checkIn: newCheckIn,

      checkOut: newCheckOut,

      excludeReservationId: id,
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          message: "این ملک در این بازه زمانی قبلاً رزرو شده است",
        },
        {
          status: 409,
        },
      );
    }

    // =========================
    // UPDATE USER
    // =========================

    if (body.userId) {
      reservation.userId = body.userId;
    }

    // =========================
    // UPDATE PROPERTY
    // =========================

    reservation.propertyId = new mongoose.Types.ObjectId(newPropertyId);

    // =========================
    // UPDATE DATE
    // =========================

    reservation.checkIn = newCheckIn;

    reservation.checkOut = newCheckOut;

    // =========================
    // NIGHTS
    // =========================

    reservation.nights = calculateNights(newCheckIn, newCheckOut);

    // =========================
    // AMOUNT
    // =========================

    if (body.amount !== undefined) {
      reservation.amount = Number(body.amount) || 0;
    }

    // =========================
    // STATUS
    // =========================

    if (body.status) {
      reservation.status = body.status;
    }

    await reservation.save();

    return NextResponse.json({
      success: true,

      message: "رزرو ویرایش شد",

      reservation,
    });
  } catch (error) {
    console.error("UPDATE RESERVATION ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
// =====================================
// DELETE RESERVATION
// =====================================

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await checkAdmin();

    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,

          message: "شناسه رزرو ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,

          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      message: "رزرو حذف شد",
    });
  } catch (error) {
    console.error("DELETE RESERVATION ERROR", error);

    return NextResponse.json(
      {
        success: false,

        message: "خطا در حذف رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
