import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import Notification from "@/app/models/Notification";

// =========================
// MARK NOTIFICATION AS READ
// =========================

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
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

    const notification = await Notification.findOneAndUpdate(
      {
        _id: params.id,

        userId: decoded.id,
      },

      {
        isRead: true,
      },

      {
        new: true,
      },
    );

    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          message: "اعلان پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,

        message: "اعلان خوانده شد",

        notification,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("MARK NOTIFICATION READ ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "خطا در تغییر وضعیت اعلان",
      },
      {
        status: 500,
      },
    );
  }
}
