export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";
import { verifyToken } from "@/app/lib/auth";

export async function GET() {
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
          message: "برای مشاهده رزروها ابتدا وارد حساب کاربری شوید",
        },
        {
          status: 401,
        },
      );
    }

    // =========================
    // Verify JWT
    // =========================

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
    // Get My Reservations
    // =========================

    const reservations = await Reservation.find({
      userId: decoded.id,
    })
      .populate(
        "propertyId",
        "title images location type pricing rating status",
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    // =========================
    // Response
    // =========================

    return NextResponse.json(
      {
        success: true,
        reservations,
        total: reservations.length,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET MY RESERVATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت رزروهای شما",
      },
      {
        status: 500,
      },
    );
  }
}
