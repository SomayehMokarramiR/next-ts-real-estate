export const runtime = "nodejs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import AdminSettings from "@/app/models/AdminSettings";
import { createToken } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    console.log("🔥 LOGIN API START");

    await connectDB();
    console.log("DB NAME:", mongoose.connection.name);
    console.log("USERS COUNT:", await User.countDocuments());

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

    console.log("LOGIN EMAIL:", email);

    const user = await User.findOne({ email });

    console.log("USER FOUND:", !!user);

    if (user) {
      console.log("USER ID:", user._id);
    }

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

    const role = user.role?.trim() || "user";

    console.log("🔥 USER:", {
      email: user.email,
      role,
    });

    // ==========================
    // SYSTEM LOGIN SETTING
    // ==========================

    const settings = await AdminSettings.findOne().select("system").lean();

    const loginEnabled = settings?.system?.userLogin ?? true;

    console.log("🔥 LOGIN ENABLED:", loginEnabled);

    if (role !== "admin" && loginEnabled === false) {
      return NextResponse.json(
        {
          success: false,
          message: "ورود کاربران در حال حاضر غیرفعال است.",
        },
        {
          status: 403,
        },
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور کاربر وجود ندارد",
        },
        {
          status: 500,
        },
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
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
      role,
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
          role,
        },
      },
      {
        status: 200,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    console.log("✅ LOGIN SUCCESS");

    return response;
  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "خطای سرور",
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
