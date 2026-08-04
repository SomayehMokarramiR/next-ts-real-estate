import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { verifyToken } from "../../../lib/auth";

export async function GET() {
  try {
    await connectDB();

    // گرفتن Cookie
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
        },
        { status: 401 },
      );
    }

    // بررسی JWT
    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    // پیدا کردن کاربر بدون پسورد
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ME ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "توکن نامعتبر است",
      },
      { status: 401 },
    );
  }
}
