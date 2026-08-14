import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const reservations = await Reservation.find({
      propertyId: id,

      status: {
        $in: ["pending", "confirmed"],
      },
    })
      .select("checkIn checkOut")
      .sort({
        checkIn: 1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,

        reservedRanges: reservations.map((item) => ({
          checkIn: item.checkIn,
          checkOut: item.checkOut,
        })),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET RESERVED DATES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت تاریخ‌های رزرو شده",
      },
      {
        status: 500,
      },
    );
  }
}
