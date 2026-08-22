import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 100;

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city")?.trim() || "";
    const guests = searchParams.get("guests")?.trim() || "";
    const type = searchParams.get("type")?.trim() || "";
    const transactionType = searchParams.get("transactionType")?.trim() || "";

    // فقط املاک دارای تخفیف
    const discounted = searchParams.get("discounted") === "true";

    // فقط املاک قابل رزرو
    const reserve = searchParams.get("reserve") === "true";

    const pageParam = Number(searchParams.get("page"));
    const limitParam = Number(searchParams.get("limit"));

    const page =
      Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_PAGE;

    const limit =
      Number.isInteger(limitParam) && limitParam > 0 && limitParam <= MAX_LIMIT
        ? limitParam
        : DEFAULT_LIMIT;

    const filter: Record<string, unknown> = {};

    // =========================
    // فقط املاک رزروی
    // =========================
    if (reserve) {
      filter.bookingType = {
        $in: ["daily", "monthly"],
      };

      filter.status = {
        $ne: "inactive",
      };
    }

    // =========================
    // شهر
    // =========================
    if (city) {
      filter["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    // =========================
    // نوع ملک
    // =========================
    if (type) {
      filter.type = type;
    }

    // =========================
    // نوع معامله
    // =========================
    if (transactionType) {
      filter.transactionType = transactionType;
    }

    // =========================
    // ظرفیت
    // =========================
    if (guests) {
      const capacity = Number(guests);

      if (!Number.isNaN(capacity)) {
        filter["facilities.capacity"] = {
          $gte: capacity,
        };
      }
    }

    // =========================
    // تخفیف
    // =========================
    if (discounted) {
      filter["pricing.discount"] = {
        $gt: 0,
      };
    }

    // =========================
    // Pagination
    // =========================
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

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json(
      {
        success: true,
        properties,
        total,
        totalPages,
        currentPage: page,
        limit,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET PROPERTIES ERROR:", error);

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
