import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";
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
          message: "ابتدا وارد حساب شوید",
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
          message: "توکن نامعتبر است",
        },
        {
          status: 401,
        },
      );
    }

    // =========================
    // Body
    // =========================

    const body = await req.json();

    const { reservationId } = body;

    if (!reservationId) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // Find Reservation
    // =========================

    const reservation = await Reservation.findOne({
      _id: reservationId,
      userId: decoded.id,
    });

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
    // Status Check
    // =========================

    if (reservation.status === "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "این رزرو قبلاً پرداخت شده است",
        },
        {
          status: 400,
        },
      );
    }

    if (reservation.status === "cancelled") {
      return NextResponse.json(
        {
          success: false,
          message: "این رزرو لغو شده است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // Existing Authority
    // =========================

    let paymentAuthority = reservation.paymentAuthority;

    if (!paymentAuthority) {
      paymentAuthority = "MOCK-" + Date.now();

      reservation.paymentAuthority = paymentAuthority;

      await reservation.save();
    }

    // =========================
    // Response
    // =========================

    return NextResponse.json(
      {
        success: true,

        message: "درگاه پرداخت ایجاد شد",

        paymentAuthority,

        paymentUrl: `/payment/mock?authority=${encodeURIComponent(
          paymentAuthority,
        )}&reservationId=${reservation._id}`,

        amount: reservation.amount,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد پرداخت",
      },
      {
        status: 500,
      },
    );
  }
}
