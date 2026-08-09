import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await params;

    const reservation = await Reservation.findById(id).populate("propertyId");

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

    return NextResponse.json(
      {
        reservation,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "خطا در دریافت رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
