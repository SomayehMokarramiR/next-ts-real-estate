import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";
import Property from "@/app/models/Property";
import User from "@/app/models/User";
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
        { status: 401 },
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
        { status: 401 },
      );
    }

    // =========================
    // Get Current User
    // =========================

    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    // =========================
    // Request Body
    // =========================

    const body = await req.json();

    const { propertyId, checkIn, checkOut, nights, passengers } = body;

    // =========================
    // Validation
    // =========================

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه اقامتگاه الزامی است",
        },
        { status: 400 },
      );
    }

    if (!checkIn || !checkOut) {
      return NextResponse.json(
        {
          success: false,
          message: "تاریخ ورود و خروج الزامی است",
        },
        { status: 400 },
      );
    }

    const normalizedNights = Number(nights);

    if (
      !Number.isFinite(normalizedNights) ||
      normalizedNights <= 0 ||
      !Number.isInteger(normalizedNights)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "تعداد شب اقامت نامعتبر است",
        },
        { status: 400 },
      );
    }

    if (!Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات مسافران الزامی است",
        },
        { status: 400 },
      );
    }

    // =========================
    // Get Property
    // =========================

    const property = await Property.findById(propertyId).lean();

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "اقامتگاه پیدا نشد",
        },
        { status: 404 },
      );
    }

    // =========================
    // Check Status
    // =========================

    if (property.status !== "available") {
      return NextResponse.json(
        {
          success: false,
          message:
            property.status === "reserved"
              ? "این اقامتگاه قبلاً رزرو شده است"
              : "این اقامتگاه فعلاً قابل رزرو نیست",
        },
        { status: 400 },
      );
    }

    // =========================
    // Calculate Amount
    // =========================

    const dailyPrice = Number(property.pricing?.daily ?? 0);

    if (!Number.isFinite(dailyPrice) || dailyPrice <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "قیمت روزانه اقامتگاه معتبر نیست",
        },
        { status: 400 },
      );
    }

    const calculatedAmount = dailyPrice * normalizedNights;

    // =========================
    // Create Reservation
    // =========================

    const reservation = await Reservation.create({
      userId: decoded.id,

      propertyId,

      checkIn,

      checkOut,

      nights: normalizedNights,

      // اطلاعات تماس از حساب کاربر
      contact: {
        phone: user.phoneNumber,
        email: user.email,
      },

      passengers,

      amount: calculatedAmount,

      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "رزرو با موفقیت ثبت شد",
        reservation,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE RESERVATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطای سرور در ثبت رزرو",
      },
      { status: 500 },
    );
  }
}
