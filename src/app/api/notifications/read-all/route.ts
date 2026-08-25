export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import Notification from "@/app/models/Notification";

export async function PATCH() {
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

    await Notification.updateMany(
      {
        userId: decoded.id,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "همه اعلان‌ها خوانده شدند",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("READ ALL NOTIFICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در خواندن اعلان‌ها",
      },
      {
        status: 500,
      },
    );
  }
}
