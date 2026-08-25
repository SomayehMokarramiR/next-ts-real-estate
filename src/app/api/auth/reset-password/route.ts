export const runtime = "nodejs";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import PasswordReset from "@/app/models/PasswordReset";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const email = body?.email;
    const newPassword = body?.password;

    if (!email || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل و رمز عبور جدید الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const resetRequest = await PasswordReset.findOne({
      email: normalizedEmail,
      isVerified: true,
    });

    if (!resetRequest) {
      return NextResponse.json(
        {
          success: false,
          message: "ابتدا کد تایید را وارد کنید",
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
          message: "زمان بازیابی رمز عبور به پایان رسیده است",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    // حذف درخواست بازیابی بعد از موفقیت

    await PasswordReset.deleteMany({
      email: normalizedEmail,
    });

    return NextResponse.json(
      {
        success: true,
        message: "رمز عبور با موفقیت تغییر کرد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در تغییر رمز عبور رخ داد",
      },
      {
        status: 500,
      },
    );
  }
}
