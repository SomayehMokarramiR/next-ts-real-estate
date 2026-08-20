import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { createToken } from "../../../lib/auth";

export async function POST(request: Request) {
  try {
    // اتصال دیتابیس
    await connectDB();

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات ارسال شده نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const email =
      typeof body?.email === "string" ? body.email.toLowerCase().trim() : "";

    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل و رمز عبور الزامی هستند",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل یا رمز عبور اشتباه است",
        },
        {
          status: 401,
        },
      );
    }

    if (!user.password) {
      console.error("USER PASSWORD NOT FOUND:", user.email);

      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات کاربر ناقص است",
        },
        {
          status: 500,
        },
      );
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل یا رمز عبور اشتباه است",
        },
        {
          status: 401,
        },
      );
    }

    const token = createToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        success: true,

        message: "ورود با موفقیت انجام شد",

        user: {
          id: user._id.toString(),
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 200,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      maxAge: 60 * 60 * 24 * 7,

      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR FULL:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "LOGIN ROUTE OK",
  });
}
