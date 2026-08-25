export const runtime = "nodejs";
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";

import { sendVerificationEmail } from "@/app/lib/email";

import TempUser from "@/app/models/TempUser";

import AdminSettings from "@/app/models/AdminSettings";

export async function POST(request: Request) {
  try {
    await connectDB();

    // =========================
    // Check User Registration Status
    // =========================

    const settings = await AdminSettings.findOne().select("system").lean();

    if (settings?.system?.userRegistration === false) {
      return NextResponse.json(
        {
          success: false,
          message: "ثبت‌نام کاربران در حال حاضر غیرفعال است.",
        },
        {
          status: 403,
        },
      );
    }

    const body = await request.json();

    const email = body?.email;

    /* =========================
       Validate Email
    ========================= */

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا ایمیل خود را وارد کنید",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "فرمت ایمیل صحیح نیست",
        },
        {
          status: 400,
        },
      );
    }

    /* =========================
       Delete Previous Temp User
    ========================= */

    await TempUser.deleteMany({
      email: normalizedEmail,
    });

    /* =========================
       Generate OTP
    ========================= */

    const verificationCode = Math.floor(
      10000 + Math.random() * 90000,
    ).toString();

    console.log("");

    console.log("=================================");

    console.log("🚀 REGISTER OTP");

    console.log("📧 EMAIL:", normalizedEmail);

    console.log("🔐 CODE:", verificationCode);

    console.log("=================================");

    console.log("");

    /* =========================
       OTP Expiration
       5 Minutes
    ========================= */

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    /* =========================
       Create Temp User
    ========================= */

    const tempUser = await TempUser.create({
      email: normalizedEmail,

      verificationCode,

      isVerified: false,

      expiresAt,
    });

    /* =========================
       Send OTP
    ========================= */
    // =========================
    // Send OTP Email
    // =========================

    const emailSent = await sendVerificationEmail(
      normalizedEmail,
      verificationCode,
    );

    if (!emailSent) {
      await TempUser.findByIdAndDelete(tempUser._id);

      return NextResponse.json(
        {
          success: false,
          message: "ارسال کد تایید به ایمیل انجام نشد",
        },
        {
          status: 502,
        },
      );
    }

    /* =========================
       Response
    ========================= */

    return NextResponse.json(
      {
        success: true,

        message: "کد تایید به ایمیل شما ارسال شد",

        tempUserId: tempUser._id.toString(),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error ? error.message : "خطایی در ثبت ایمیل رخ داد",
      },
      {
        status: 500,
      },
    );
  }
}
