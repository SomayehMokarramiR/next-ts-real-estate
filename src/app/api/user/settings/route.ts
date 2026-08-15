import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { verifyToken } from "@/app/lib/auth";

// =========================
// GET SETTINGS
// =========================

export async function GET() {
  try {
    await connectDB();

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

    const user = await User.findById(decoded.id).select("settings").lean();

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

    return NextResponse.json(
      {
        success: true,
        settings: user.settings,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت تنظیمات",
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// UPDATE SETTINGS
// =========================

export async function PUT(req: Request) {
  try {
    await connectDB();

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

    const body = await req.json();

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

    user.settings = {
      notifications: {
        reservation:
          body.notifications?.reservation ??
          user.settings.notifications.reservation,

        messages:
          body.notifications?.messages ?? user.settings.notifications.messages,

        offers:
          body.notifications?.offers ?? user.settings.notifications.offers,
      },

      darkMode: body.darkMode ?? user.settings.darkMode,
    };

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "تنظیمات ذخیره شد",
        settings: user.settings,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ذخیره تنظیمات",
      },
      {
        status: 500,
      },
    );
  }
}
