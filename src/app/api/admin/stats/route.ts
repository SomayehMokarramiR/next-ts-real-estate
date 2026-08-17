import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Property from "@/app/models/Property";
import Reservation from "@/app/models/Reservation";

async function getAdminUser() {
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

export async function GET() {
  try {
    await connectDB();

    // =====================
    // Authentication
    // =====================

    const user = await getAdminUser();

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

    // =====================
    // Check Admin Role
    // =====================

    const admin = await User.findById(user.id).select("role");

    if (!admin || admin.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی فقط برای مدیران مجاز است",
        },
        {
          status: 403,
        },
      );
    }

    // =====================
    // Statistics
    // =====================

    const [usersCount, propertiesCount, reservationsCount, paidReservations] =
      await Promise.all([
        User.countDocuments(),

        Property.countDocuments(),

        Reservation.countDocuments(),

        Reservation.find({
          status: "paid",
        }).select("amount"),
      ]);

    const revenue = paidReservations.reduce(
      (total, item) => total + (item.amount || 0),
      0,
    );

    return NextResponse.json(
      {
        success: true,

        stats: {
          usersCount,

          propertiesCount,

          reservationsCount,

          revenue,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("ADMIN STATS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت آمار داشبورد",
      },
      {
        status: 500,
      },
    );
  }
}
