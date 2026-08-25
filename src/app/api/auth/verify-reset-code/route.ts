export const runtime = "nodejs";
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import PasswordReset from "@/app/models/PasswordReset";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const email = body?.email;
    const code = body?.code;

    if (!email || !code) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل و کد تایید الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const resetRequest = await PasswordReset.findOne({
      email: normalizedEmail,
      code,
    });

    if (!resetRequest) {
      return NextResponse.json(
        {
          success: false,
          message: "کد تایید اشتباه است",
        },
        {
          status: 400,
        },
      );
    }

    if (resetRequest.expiresAt < new Date()) {
      await PasswordReset.findByIdAndDelete(resetRequest._id);

      return NextResponse.json(
        {
          success: false,
          message: "کد تایید منقضی شده است",
        },
        {
          status: 400,
        },
      );
    }

    resetRequest.isVerified = true;

    await resetRequest.save();

    return NextResponse.json(
      {
        success: true,
        message: "کد تایید با موفقیت تایید شد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("VERIFY RESET CODE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در تایید کد رخ داد",
      },
      {
        status: 500,
      },
    );
  }
}
