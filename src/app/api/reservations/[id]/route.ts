import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";
import { verifyToken } from "@/app/lib/auth";

export async function GET(
  _req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    // =========================
    // Authentication
    // =========================

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

    let decoded: {
      id: string;
      email: string;
    };

    try {
      decoded = verifyToken(token) as {
        id: string;
        email: string;
      };
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "جلسه کاربری معتبر نیست",
        },
        {
          status: 401,
        },
      );
    }

    // =========================
    // Params
    // =========================

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

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

    // =========================
    // Find Reservation
    // =========================

    const reservation = await Reservation.findOne({
      _id: id,
      userId: decoded.id,
    })
      .populate({
        path: "propertyId",
        select: "title description images location type pricing",
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

    // =========================
    // Response
    // =========================

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
    console.error("GET RESERVATION DETAILS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت جزئیات رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
