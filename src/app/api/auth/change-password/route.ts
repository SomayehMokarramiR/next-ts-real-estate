export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { verifyToken } from "@/app/lib/auth";

export async function PUT(req: Request) {
  try {
    await connectDB();

    // =========================
    // Check Token
    // =========================

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "ابتدا وارد حساب کاربری شوید",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    // =========================
    // Body
    // =========================

    const body = await req.json();

    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "تمام فیلدها الزامی است",
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
          message: "رمز عبور حداقل باید ۶ کاراکتر باشد",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // User
    // =========================

    const user = await User.findById(decoded.id);

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

    // =========================
    // Compare Password
    // =========================

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور فعلی اشتباه است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // Hash New Password
    // =========================

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

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
    console.error("CHANGE PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در تغییر رمز عبور",
      },
      {
        status: 500,
      },
    );
  }
}
