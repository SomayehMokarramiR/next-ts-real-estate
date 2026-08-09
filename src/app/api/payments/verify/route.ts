import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { authority } = body;

    console.log("VERIFY AUTHORITY:", authority);

    if (!authority) {
      return NextResponse.json(
        {
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

    console.log("FOUND RESERVATION:", reservation);

    if (!reservation) {
      return NextResponse.json(
        {
          message: "رزرو مربوط به پرداخت پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    reservation.status = "paid";
    reservation.paidAt = new Date();

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
    console.log("VERIFY PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        message: "خطا در تایید پرداخت",
      },
      {
        status: 500,
      },
    );
  }
}
