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
          message: "ابتدا وارد حساب شوید",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    const user = await User.findById(decoded.id)
      .select("notifications settings")
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,

      settings: {
        notifications: {
          reservation: user.notifications?.reservation ?? true,

          systemMessages: user.notifications?.systemMessages ?? true,

          offersAndDiscounts: user.notifications?.offersAndDiscounts ?? false,
        },

        darkMode: user.settings?.darkMode ?? false,
      },
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت تنظیمات",
      },
      { status: 500 },
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
          message: "ابتدا وارد حساب شوید",
        },
        { status: 401 },
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
        { status: 404 },
      );
    }

    // =========================
    // UPDATE NOTIFICATIONS
    // =========================

    if (body.notifications) {
      user.notifications = {
        systemMessages:
          body.notifications.systemMessages ??
          user.notifications.systemMessages,

        reservation:
          body.notifications.reservation ?? user.notifications.reservation,

        offersAndDiscounts:
          body.notifications.offersAndDiscounts ??
          user.notifications.offersAndDiscounts,
      };
    }

    // =========================
    // UPDATE DARK MODE
    // =========================

    if (typeof body.darkMode === "boolean") {
      user.settings.darkMode = body.darkMode;
    }

    await user.save();

    return NextResponse.json({
      success: true,

      message: "تنظیمات ذخیره شد",

      settings: {
        notifications: user.notifications,

        darkMode: user.settings.darkMode,
      },
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ذخیره تنظیمات",
      },
      { status: 500 },
    );
  }
}
