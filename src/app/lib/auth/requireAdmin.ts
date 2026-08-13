import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "../mongodb";
import User from "../../models/User";
import { verifyToken } from "../auth";

export async function requireAdmin() {
  try {
    // اتصال به دیتابیس
    await connectDB();

    // دریافت JWT از Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // کاربر لاگین نیست
    if (!token) {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: "کاربر وارد نشده است.",
          },
          { status: 401 },
        ),
      };
    }

    // بررسی JWT
    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    // پیدا کردن کاربر
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: "کاربر پیدا نشد.",
          },
          { status: 404 },
        ),
      };
    }

    // بررسی نقش کاربر
    if (user.role !== "admin") {
      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message: "شما دسترسی لازم را ندارید.",
          },
          { status: 403 },
        ),
      };
    }

    // دسترسی مجاز است
    return {
      authorized: true,
      user,
    };
  } catch (error) {
    console.error("REQUIRE ADMIN ERROR:", error);

    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          message: "توکن نامعتبر است.",
        },
        { status: 401 },
      ),
    };
  }
}
