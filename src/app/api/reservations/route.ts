export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";
import Property from "@/app/models/Property";
import User from "@/app/models/User";

import { createNotification } from "@/app/lib/createNotification";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    // =========================
    // Authentication
    // =========================

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "برای ثبت رزرو ابتدا وارد حساب کاربری شوید",
        },
        {
          status: 401,
        },
      );
    }

    let decoded: {
      id: string;
      email: string;
    };

    try {
      decoded = verifyToken(token) as {
        id: string;
        email: string;
      };
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "جلسه کاربری معتبر نیست",
        },
        {
          status: 401,
        },
      );
    }

    // =========================
    // User
    // =========================

    const user = await User.findById(decoded.id).lean();

    if (!user) {
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

    // =========================
    // Body
    // =========================

    const body = await req.json();

    const { propertyId, checkIn, checkOut, nights, passengers } = body;

    // =========================
    // Validation
    // =========================

    if (!propertyId || !checkIn || !checkOut) {
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

    const normalizedNights = Number(nights);

    if (!Number.isInteger(normalizedNights) || normalizedNights <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "تعداد شب اقامت نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    if (!Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات مسافران الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // Property
    // =========================

    const property = await Property.findById(propertyId).lean();

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "اقامتگاه پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // =========================
    // Duplicate Reservation
    // =========================

    const userDuplicateReservation = await Reservation.findOne({
      userId: decoded.id,

      propertyId,

      status: {
        $in: ["pending", "paid"],
      },
    });

    if (userDuplicateReservation) {
      return NextResponse.json(
        {
          success: false,
          message: "شما قبلاً این اقامتگاه را رزرو کرده‌اید",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // Date Conflict
    // =========================

    const conflictReservation = await Reservation.findOne({
      propertyId,

      status: {
        $in: ["pending", "paid"],
      },

      $or: [
        {
          checkIn: {
            $lt: checkOut,
          },

          checkOut: {
            $gt: checkIn,
          },
        },
      ],
    });

    if (conflictReservation) {
      return NextResponse.json(
        {
          success: false,
          message: "این اقامتگاه در تاریخ انتخاب شده رزرو شده است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // Price
    // =========================

    const dailyPrice = Number(property.pricing?.daily ?? 0);

    if (!Number.isFinite(dailyPrice) || dailyPrice <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "قیمت اقامتگاه معتبر نیست",
        },
        {
          status: 400,
        },
      );
    }

    const amount = dailyPrice * normalizedNights;

    // =========================
    // Create Reservation
    // =========================

    const reservation = await Reservation.create({
      userId: decoded.id,

      propertyId,

      checkIn,

      checkOut,

      nights: normalizedNights,

      contact: {
        phone: user.phoneNumber,

        email: user.email,
      },

      passengers,

      amount,

      status: "pending",
    });

    // =========================
    // Create Notification
    // =========================

    await createNotification({
      userId: decoded.id,

      title: "رزرو جدید",

      message: "رزرو شما با موفقیت ثبت شد.",

      type: "reservation",
    });

    return NextResponse.json(
      {
        success: true,

        message: "رزرو با موفقیت ثبت شد",

        reservation,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE RESERVATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "خطای سرور در ثبت رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
