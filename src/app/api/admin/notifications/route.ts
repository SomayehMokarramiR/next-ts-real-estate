import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";

import { verifyToken } from "@/app/lib/auth";

import Notification from "@/app/models/Notification";

// ===============================
// CHECK ADMIN
// ===============================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = verifyToken(token);

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}

// ===============================
// GET ALL NOTIFICATIONS (ADMIN)
// ===============================

export async function GET() {
  try {
    await checkAdmin();

    await connectDB();

    const notifications = await Notification.find({})
      .populate({
        path: "userId",
        select: "name lastName email phoneNumber",
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    const formattedNotifications = notifications.map((item) => ({
      ...item,

      type:
        item.type === "reservation"
          ? "reservation"
          : item.type === "message"
            ? "message"
            : item.type === "offer"
              ? "offer"
              : "system",
    }));

    return NextResponse.json({
      success: true,
      notifications: formattedNotifications,
    });
  } catch (error) {
    console.error("ADMIN GET NOTIFICATIONS ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اعلان‌ها",
      },
      {
        status: 500,
      },
    );
  }
}

// ===============================
// CREATE NOTIFICATION (ADMIN)
// ===============================

export async function POST(request: NextRequest) {
  try {
    await checkAdmin();

    await connectDB();

    const body = await request.json();

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

    const allowedTypes = ["reservation", "message", "offer", "system"];

    const notificationType = allowedTypes.includes(type) ? type : "system";

    const notification = await Notification.create({
      userId,

      title,

      message,

      type: notificationType,

      isRead: false,
    });

    return NextResponse.json({
      success: true,

      message: "اعلان ایجاد شد",

      notification,
    });
  } catch (error) {
    console.error("ADMIN CREATE NOTIFICATION ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد اعلان",
      },
      {
        status: 500,
      },
    );
  }
}
