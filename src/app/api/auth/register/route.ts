import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    // بررسی ورودی‌ها
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "نام، ایمیل و رمز عبور الزامی هستند",
        },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedName = name.trim();

    // بررسی وجود کاربر
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "این ایمیل قبلاً ثبت شده است",
        },
        { status: 409 },
      );
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 10);

    // تعیین نقش کاربر
    // اولین کاربر مدیر می‌شود
    const usersCount = await User.countDocuments();

    const role = usersCount === 0 ? "admin" : "user";

    // ایجاد کاربر
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          role === "admin"
            ? "ثبت‌نام مدیر اصلی با موفقیت انجام شد"
            : "ثبت‌نام با موفقیت انجام شد. لطفاً وارد حساب کاربری شوید",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در ثبت‌نام رخ داد",
      },
      {
        status: 500,
      },
    );
  }
}
