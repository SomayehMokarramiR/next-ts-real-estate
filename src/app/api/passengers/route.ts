import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Passenger from "@/app/models/Passenger";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      family,
      gender,
      nationalId,
      birthDate,
      phone = "",
      email = "",
    } = body;

    if (!name || !family || !gender || !nationalId || !birthDate) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات مسافر کامل نیست",
        },
        {
          status: 400,
        },
      );
    }

    const passenger = await Passenger.create({
      name,
      family,
      gender,
      nationalId,
      birthDate,
      phone,
      email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "مسافر با موفقیت ثبت شد",
        passenger,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("PASSENGER_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطای داخلی سرور",
      },
      {
        status: 500,
      },
    );
  }
}
