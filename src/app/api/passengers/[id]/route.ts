export const runtime = "nodejs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Passenger from "@/app/models/Passenger";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const body = await req.json();

    console.log("PATCH ID:", id);
    console.log("PATCH BODY:", body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          message: "شناسه مسافر نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const passenger = await Passenger.findByIdAndUpdate(
      id,
      {
        $set: {
          phone: body.phone,
          email: body.email,
        },
      },
      {
        new: true,
      },
    );

    if (!passenger) {
      return NextResponse.json(
        {
          message: "مسافر پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "اطلاعات تماس بروزرسانی شد",
        passenger,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("PATCH ERROR:", error);

    return NextResponse.json(
      {
        message: "خطای سرور",
        error: String(error),
      },
      {
        status: 500,
      },
    );
  }
}
