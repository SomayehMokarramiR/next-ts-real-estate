import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      propertyId,
      checkIn,
      checkOut,
      nights,
      contact,
      passengers,
      amount,
    } = body;

    if (
      !propertyId ||
      !checkIn ||
      !checkOut ||
      !nights ||
      !contact?.phone ||
      !contact?.email ||
      !passengers ||
      passengers.length === 0
    ) {
      return NextResponse.json(
        {
          message: "اطلاعات رزرو ناقص است",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.create({
      propertyId,

      checkIn,

      checkOut,

      nights,

      contact: {
        phone: contact.phone,
        email: contact.email,
      },

      passengers,

      amount: amount ?? 0,

      status: "pending",
    });

    return NextResponse.json(
      {
        message: "رزرو با موفقیت ثبت شد",

        reservation,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "خطای سرور",
      },
      {
        status: 500,
      },
    );
  }
}
