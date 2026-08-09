import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { reservationId, amount } = body;

    console.log("CREATE PAYMENT BODY:", body);

    if (!reservationId || !amount) {
      return NextResponse.json(
        {
          message: "اطلاعات پرداخت ناقص است",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return NextResponse.json(
        {
          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // ایجاد شماره پیگیری تستی درگاه
    const paymentAuthority = "MOCK-" + Date.now();

    reservation.paymentAuthority = paymentAuthority;

    reservation.amount = amount;

    await reservation.save();

    console.log("PAYMENT AUTHORITY SAVED:", {
      reservationId: reservation._id,
      paymentAuthority: reservation.paymentAuthority,
      amount: reservation.amount,
      status: reservation.status,
    });

    return NextResponse.json(
      {
        success: true,

        message: "درگاه پرداخت ایجاد شد",

        paymentAuthority,

        // ارسال شناسه رزرو برای برگشت
        paymentUrl: `/payment/mock?authority=${paymentAuthority}&reservationId=${reservation._id}`,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("CREATE PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        message: "خطا در ایجاد پرداخت",
      },
      {
        status: 500,
      },
    );
  }
}
