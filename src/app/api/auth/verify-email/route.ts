import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import TempUser from "@/app/models/TempUser";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const tempUserId = body?.tempUserId;
    const verificationCode = body?.verificationCode;

    console.log("VERIFY EMAIL REQUEST:");
    console.log("TEMP USER ID:", tempUserId);
    console.log("VERIFICATION CODE:", verificationCode);

    /* =========================
       Validation
    ========================= */

    if (!tempUserId) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ثبت‌نام ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    if (!verificationCode) {
      return NextResponse.json(
        {
          success: false,
          message: "کد تایید را وارد کنید",
        },
        {
          status: 400,
        },
      );
    }

    if (typeof verificationCode !== "string" || verificationCode.length !== 5) {
      return NextResponse.json(
        {
          success: false,
          message: "کد تایید باید ۵ رقم باشد",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       Find Temp User
    ========================= */

    const tempUser = await TempUser.findById(tempUserId);

    if (!tempUser) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات ثبت‌نام پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    console.log("TEMP USER FOUND:", tempUser._id.toString());
    console.log("SAVED CODE:", tempUser.verificationCode);
    console.log("EXPIRES AT:", tempUser.expiresAt);

    /* =========================
       Already Verified
    ========================= */

    if (tempUser.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "این ایمیل قبلاً تایید شده است",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       Check Expiration
    ========================= */

    if (new Date() > new Date(tempUser.expiresAt)) {
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

    /* =========================
       Check Verification Code
    ========================= */

    if (tempUser.verificationCode !== verificationCode) {
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

    /* =========================
       Verify User
    ========================= */

    tempUser.isVerified = true;

    await tempUser.save();

    console.log("EMAIL VERIFIED:", tempUser.email);

    /* =========================
       Success
    ========================= */

    return NextResponse.json(
      {
        success: true,
        message: "ایمیل با موفقیت تایید شد",
        tempUserId: tempUser._id.toString(),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("VERIFY EMAIL API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطایی در تایید ایمیل رخ داد",
      },
      {
        status: 500,
      },
    );
  }
}
