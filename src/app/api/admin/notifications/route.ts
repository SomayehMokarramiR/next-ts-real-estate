export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";

import { verifyToken } from "@/app/lib/auth";

import Notification from "@/app/models/Notification";

import User from "@/app/models/User";

// ===============================
// CHECK ADMIN
// ===============================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = verifyToken(token) as {
    id: string;
    role?: string;
  };

  if (!decoded?.id) {
    throw new Error("Unauthorized");
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new Error("UserNotFound");
  }

  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}

// ===============================
// GET ALL NOTIFICATIONS (ADMIN)
// ===============================

export async function GET() {
  try {
    await connectDB();

    await checkAdmin();

    const notifications = await Notification.find({})
      .populate({
        path: "userId",
        select: "name lastName email phoneNumber",
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        notifications,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("ADMIN GET NOTIFICATIONS ERROR:", error);

    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
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

      if (error.message === "Forbidden") {
        return NextResponse.json(
          {
            success: false,
            message: "اجازه دسترسی ندارید",
          },
          {
            status: 403,
          },
        );
      }
    }

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
    await connectDB();

    await checkAdmin();

    const body = await request.json();

    const { userId, title, message, type } = body;

    if (!userId || !title?.trim() || !message?.trim()) {
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

    const userExists = await User.findById(userId);

    if (!userExists) {
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

    const allowedTypes = ["reservation", "message", "offer", "system"];

    const notificationType = allowedTypes.includes(type) ? type : "system";

    const notification = await Notification.create({
      userId,

      title: title.trim(),

      message: message.trim(),

      type: notificationType,

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
    console.error("ADMIN CREATE NOTIFICATION ERROR:", error);

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
