export const runtime = "nodejs";
import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import PasswordReset from "@/app/models/PasswordReset";
import { sendVerificationEmail } from "@/app/lib/email";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل الزامی است",
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

    console.log("FORGOT PASSWORD EMAIL:", normalizedEmail);

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربری با این ایمیل پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // حذف کدهای قبلی
    await PasswordReset.deleteMany({
      email: normalizedEmail,
    });

    // تولید کد ۵ رقمی
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const resetRequest = await PasswordReset.create({
      email: normalizedEmail,
      code,
      expiresAt,
    });

    console.log("PASSWORD RESET CREATED:", resetRequest);

    console.log("RESET CODE:", code);

    const sent = await sendVerificationEmail(normalizedEmail, code);

    if (!sent) {
      await PasswordReset.findByIdAndDelete(resetRequest._id);

      return NextResponse.json(
        {
          success: false,
          message: "ارسال ایمیل انجام نشد",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "کد بازیابی رمز عبور ارسال شد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطای سرور",
      },
      {
        status: 500,
      },
    );
  }
}
