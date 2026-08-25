export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

import { FilterQuery } from "mongoose";

import { connectDB } from "@/app/lib/mongodb";

import Property from "@/app/models/Property";

import Reservation from "@/app/models/Reservation";
import { toGregorian } from "jalaali-js";

function jalaliToDate(value: string) {
  const clean = value.replace(/[۰-۹]/g, (digit) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
  );

  const [jy, jm, jd] = clean.split("/").map(Number);

  if (!jy || !jm || !jd) {
    return null;
  }

  const gregorian = toGregorian(jy, jm, jd);

  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 100;

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    console.log("COUNT:", await Property.countDocuments());

    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city")?.trim() || "";

    const type = searchParams.get("type")?.trim() || "";

    const guests = searchParams.get("guests")?.trim() || "";

    const transactionType = searchParams.get("transactionType")?.trim() || "";

    const bookingType = searchParams.get("bookingType")?.trim() || "";

    const checkIn = searchParams.get("checkIn")?.trim() || "";

    const checkOut = searchParams.get("checkOut")?.trim() || "";

    const reserve = searchParams.get("reserve") === "true";

    const discounted = searchParams.get("discounted") === "true";

    const isReservationSearch =
      reserve || Boolean(bookingType) || Boolean(checkIn && checkOut);

    const page = Math.max(Number(searchParams.get("page")) || DEFAULT_PAGE, 1);

    const limit = Math.min(
      Number(searchParams.get("limit")) || DEFAULT_LIMIT,
      MAX_LIMIT,
    );

    const filter: FilterQuery<unknown> = {};

    // ============================
    // BOOKING MODE
    // ============================

    /**
     * در حالت تخفیف، ملک های daily حذف نشوند
     */
    if (isReservationSearch) {
      filter.bookingType = {
        $in: ["daily", "monthly"],
      };

      filter.status = {
        $ne: "inactive",
      };
    } else if (!discounted) {
      filter.bookingType = {
        $nin: ["daily", "monthly"],
      };
    }

    // ============================
    // CITY
    // ============================

    if (city) {
      filter["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    // ============================
    // TYPE
    // ============================

    if (type) {
      filter.type = type;
    }

    // ============================
    // TRANSACTION TYPE
    // ============================

    if (transactionType && !isReservationSearch) {
      filter.transactionType = transactionType;
    }

    // ============================
    // GUESTS
    // ============================

    if (guests) {
      const capacity = Number(guests);

      if (!Number.isNaN(capacity)) {
        filter["facilities.capacity"] = {
          $gte: capacity,
        };
      }
    }

    // ============================
    // DISCOUNT
    // oldPrice > daily
    // ============================

    if (discounted) {
      filter.$expr = {
        $gt: ["$pricing.oldPrice", "$pricing.daily"],
      };
    }

    // ============================
    // DATE AVAILABILITY
    // ============================

    if (checkIn && checkOut) {
      const start = jalaliToDate(checkIn);
      const end = jalaliToDate(checkOut);

      if (!start || !end) {
        return NextResponse.json(
          {
            success: false,
            message: "تاریخ نامعتبر است",
          },
          {
            status: 400,
          },
        );
      }

      const reservations = await Reservation.find({
        checkIn: {
          $lt: end,
        },

        checkOut: {
          $gt: start,
        },

        status: {
          $nin: ["cancelled", "canceled", "rejected"],
        },
      })
        .select("propertyId")
        .lean();

      if (reservations.length) {
        filter._id = {
          $nin: reservations.map((item) => item.propertyId),
        };
      }
    }
    console.log("FINAL PROPERTY FILTER:", JSON.stringify(filter, null, 2));

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find(filter)

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(limit)

        .lean(),

      Property.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,

      properties,

      total,

      totalPages: Math.max(1, Math.ceil(total / limit)),

      currentPage: page,

      limit,
    });
  } catch (error) {
    console.error("PROPERTY API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت املاک",
      },

      {
        status: 500,
      },
    );
  }
}
