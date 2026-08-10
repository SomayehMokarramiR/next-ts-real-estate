import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";
import { FilterQuery } from "mongoose";
import { IProperty } from "@/app/models/Property";

// =========================
// NORMALIZE IMAGE
// =========================

function normalizeImageUrl(image: string) {
  if (!image) return image;

  // اگر اشتباهی JSON string ذخیره شده باشد
  if (image.startsWith("[")) {
    try {
      const parsed = JSON.parse(image);

      if (Array.isArray(parsed)) {
        return parsed[0];
      }
    } catch {
      return image;
    }
  }

  return image;
}

// =========================
// GET PROPERTIES
// =========================

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim();
    const city = searchParams.get("city")?.trim();
    const guests = searchParams.get("guests")?.trim();
    const type = searchParams.get("type")?.trim();

    const facility = searchParams.get("facility")?.trim();

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort");

    const filter: FilterQuery<IProperty> = {};

    // SEARCH
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "location.city": {
            $regex: search,
            $options: "i",
          },
        },
        {
          "location.address": {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // CITY
    if (city) {
      filter["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    // TYPE
    if (type) {
      filter.type = type as IProperty["type"];
    }

    // GUESTS
    if (guests) {
      const capacity = Number(guests);

      if (!Number.isNaN(capacity)) {
        filter["facilities.capacity"] = {
          $gte: capacity,
        };
      }
    }

    // PRICE
    const priceFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (minPrice) {
      priceFilter.$gte = Number(minPrice);
    }

    if (maxPrice) {
      priceFilter.$lte = Number(maxPrice);
    }

    if (Object.keys(priceFilter).length) {
      filter["pricing.daily"] = priceFilter;
    }

    // FACILITIES

    if (facility === "استخر") {
      filter["facilities.pool"] = true;
    }

    if (facility === "پارکینگ") {
      filter["facilities.parking"] = true;
    }

    // RATING

    if (rating) {
      const rate = Number(rating.replace("ستاره", "").trim());

      if (!Number.isNaN(rate)) {
        filter.rating = {
          $gte: rate,
        };
      }
    }

    // SORT

    let sortQuery: Record<string, 1 | -1> = {
      createdAt: -1,
    };

    if (sort === "محبوب‌ترین") {
      sortQuery = {
        views: -1,
      };
    }

    if (sort === "ارزان‌ترین") {
      sortQuery = {
        "pricing.daily": 1,
      };
    }

    if (sort === "بالاترین امتیاز") {
      sortQuery = {
        rating: -1,
      };
    }

    console.log("FINAL FILTER ===>", JSON.stringify(filter, null, 2));

    const properties = await Property.find(filter).sort(sortQuery).lean();

    const fixedProperties = properties.map((property) => ({
      ...property,

      images: property.images?.map((img) => normalizeImageUrl(img)),
    }));

    return NextResponse.json(
      {
        success: true,
        count: fixedProperties.length,
        properties: fixedProperties,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET PROPERTY ERROR:", error);

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

// =========================
// CREATE PROPERTY
// =========================

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const property = await Property.create(body);

    return NextResponse.json(
      {
        success: true,
        property,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد ملک",
      },
      {
        status: 500,
      },
    );
  }
}
