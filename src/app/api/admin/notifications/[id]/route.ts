export const runtime = "nodejs";
import { NextResponse } from "next/server";

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
// PATCH UPDATE NOTIFICATION
// ===============================

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    await checkAdmin();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه اعلان نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request.json();

    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        ...(typeof body.isRead === "boolean" && {
          isRead: body.isRead,
        }),
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
        notification,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("ADMIN UPDATE NOTIFICATION ERROR:", error);

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
            message: "دسترسی ادمین لازم است",
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
        message: "خطا در بروزرسانی اعلان",
      },
      {
        status: 500,
      },
    );
  }
}

// ===============================
// DELETE NOTIFICATION
// ===============================

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    await checkAdmin();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه اعلان نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const notification = await Notification.findByIdAndDelete(id);

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
        message: "اعلان حذف شد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("ADMIN DELETE NOTIFICATION ERROR:", error);

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
            message: "دسترسی ادمین لازم است",
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
        message: "خطا در حذف اعلان",
      },
      {
        status: 500,
      },
    );
  }
}
