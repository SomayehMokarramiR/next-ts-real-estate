export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { toGregorian } from "jalaali-js";

import { connectDB } from "../../../../lib/mongodb";
import { verifyToken } from "../../../../lib/auth";

import Reservation from "../../../../models/Reservation";

import { checkReservationConflict } from "../../../../lib/reservation/checkAvailability";
import { createNotification } from "@/app/lib/createNotification";

// =========================
// ADMIN CHECK
// =========================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = verifyToken(token) as {
    role?: string;
  };

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }
}

// =========================
// Normalize Date
// =========================

function normalizeDate(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/-/g, "/")
    .split("/")
    .map((item) => item.padStart(2, "0"))
    .join("/");
}

// =========================
// Jalali To Date
// =========================

function jalaliToDate(value: string) {
  const normalized = normalizeDate(value);

  const [jy, jm, jd] = normalized.split("/").map(Number);

  const { gy, gm, gd } = toGregorian(jy, jm, jd);

  return new Date(Date.UTC(gy, gm - 1, gd));
}

// =========================
// Calculate Nights
// =========================

function calculateNights(checkIn: string, checkOut: string) {
  const start = jalaliToDate(checkIn);
  const end = jalaliToDate(checkOut);

  const diff = end.getTime() - start.getTime();

  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}

// =========================
// GET ONE RESERVATION
// =========================

export async function GET(
  _request: Request,
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

    const reservation = await Reservation.findById(id)
      .populate("userId", "name lastName email phoneNumber")
      .populate("propertyId", "title location images pricing");

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

      reservation,
    });
  } catch (error) {
    console.error("GET RESERVATION ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت رزرو",
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// UPDATE
// =========================

export async function PUT(
  request: Request,
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

    const oldStatus = reservation.status;

    const newCheckIn = body.checkIn
      ? String(body.checkIn)
      : reservation.checkIn;

    const newCheckOut = body.checkOut
      ? String(body.checkOut)
      : reservation.checkOut;

    const newPropertyId = body.propertyId
      ? String(body.propertyId)
      : reservation.propertyId.toString();

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

    if (body.checkIn) {
      reservation.checkIn = String(body.checkIn);
    }

    if (body.checkOut) {
      reservation.checkOut = String(body.checkOut);
    }

    if (body.propertyId) {
      reservation.propertyId = new mongoose.Types.ObjectId(body.propertyId);
    }

    if (body.userId) {
      reservation.userId = new mongoose.Types.ObjectId(body.userId);
    }

    reservation.nights = calculateNights(
      reservation.checkIn,
      reservation.checkOut,
    );

    if (body.amount !== undefined) {
      reservation.amount = Number(body.amount);
    }

    if (body.status) {
      reservation.status = body.status;
    }

    await reservation.save();

    // اعلان تغییر وضعیت

    // اعلان تغییر وضعیت
    if (body.status && body.status !== oldStatus) {
      await createNotification({
        userId: String(reservation.userId),
        title: "تغییر وضعیت رزرو",
        message: `وضعیت رزرو شما به ${body.status} تغییر کرد`,
        type: "reservation",
      });
    }
    return NextResponse.json({
      success: true,

      message: "رزرو با موفقیت ویرایش شد",

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

// =========================
// DELETE
// =========================

export async function DELETE(
  _request: Request,
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

    await Reservation.findByIdAndDelete(id);

    // اعلان حذف

    // اعلان حذف
    await createNotification({
      userId: String(reservation.userId),
      title: "رزرو حذف شد",
      message: "رزرو شما توسط مدیریت حذف شد",
      type: "reservation",
    });

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
