import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import Notification from "@/app/models/Notification";
import User from "@/app/models/User";

// =========================
// GET USER NOTIFICATIONS
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
    };

    if (!decoded?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "توکن نامعتبر است",
        },
        {
          status: 401,
        },
      );
    }

    const notifications = await Notification.find({
      userId: decoded.id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(20)
      .lean();

    const unreadCount = await Notification.countDocuments({
      userId: decoded.id,
      isRead: false,
    });

    return NextResponse.json(
      {
        success: true,
        notifications,
        unreadCount,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "خطا در دریافت اعلان‌ها",
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// CREATE NOTIFICATION
// =========================

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = verifyToken(token) as {
      id: string;
    };

    const adminUser = await User.findById(decoded.id);

    if (!adminUser) {
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

    if (adminUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "اجازه ایجاد اعلان ندارید",
        },
        {
          status: 403,
        },
      );
    }

    const body = await req.json();

    const { userId, title, message, type } = body;

    if (!userId || !title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات اعلان کامل نیست",
        },
        {
          status: 400,
        },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه کاربر نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر دریافت کننده پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    const notification = await Notification.create({
      userId: targetUser._id,

      title,

      message,

      type: type || "system",

      isRead: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "اعلان ایجاد شد",
        notification,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: error instanceof Error ? error.message : "خطا در ایجاد اعلان",
      },
      {
        status: 500,
      },
    );
  }
}
