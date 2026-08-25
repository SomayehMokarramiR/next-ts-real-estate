export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";
import Reservation from "@/app/models/Reservation";
import { createNotification } from "@/app/lib/createNotification";

async function getUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return verifyToken(token) as {
      id: string;
      email?: string;
    };
  } catch {
    return null;
  }
}

// ======================
// GET DETAIL
// ======================

export async function GET(
  _req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
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

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.findOne({
      _id: id,
      userId: user.id,
    })
      .populate({
        path: "propertyId",
        select: "title description images location pricing type",
      })
      .lean();

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        reservation,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET RESERVATION DETAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت رزرو",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================
// DELETE
// ======================

export async function DELETE(
  _req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
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

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    // پیدا کردن رزرو

    const reservation = await Reservation.findOne({
      _id: id,
      userId: user.id,
    });

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // حذف رزرو

    await Reservation.findByIdAndDelete(id);

    // ======================
    // CHECK USER SETTINGS
    // ======================

    // حذف رزرو
    await Reservation.findByIdAndDelete(id);

    // ======================
    // CREATE NOTIFICATION
    // ======================

    await createNotification({
      userId: user.id,
      title: "رزرو حذف شد",
      message: "رزرو شما با موفقیت حذف شد.",
      type: "reservation",
    });
    return NextResponse.json(
      {
        success: true,
        message: "رزرو حذف شد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE RESERVATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
