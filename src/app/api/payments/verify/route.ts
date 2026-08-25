export const runtime = "nodejs";
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { authority } = body;

    if (!authority) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه پرداخت ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.findOne({
      paymentAuthority: authority,
    });

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو مربوط به پرداخت پیدا نشد",
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
          message: "این پرداخت قبلاً تایید شده است",
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
    // Verify Payment (Mock)
    // =========================

    reservation.status = "paid";

    await reservation.save();

    return NextResponse.json(
      {
        success: true,

        message: "پرداخت با موفقیت تایید شد",

        reservationId: reservation._id,

        propertyId: reservation.propertyId,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در تایید پرداخت",
      },
      {
        status: 500,
      },
    );
  }
}
