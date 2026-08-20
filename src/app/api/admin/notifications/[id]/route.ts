import { NextResponse } from "next/server";
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
// UPDATE NOTIFICATION STATUS
// PATCH /api/admin/notifications/:id
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
    await checkAdmin();

    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه اعلان ارسال نشده",
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

    return NextResponse.json({
      success: true,

      notification,
    });
  } catch (error) {
    console.error("ADMIN UPDATE NOTIFICATION ERROR:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
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

    if (error instanceof Error && error.message === "Forbidden") {
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
// DELETE /api/admin/notifications/:id
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
    await checkAdmin();

    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه اعلان ارسال نشده",
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

    return NextResponse.json({
      success: true,

      message: "اعلان حذف شد",
    });
  } catch (error) {
    console.error("ADMIN DELETE NOTIFICATION ERROR:", error);

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
