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

    const facility = searchParams.get("facility")?.trim();

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort");

    const filter: FilterQuery<IProperty> = {};

    // =========================
    // SEARCH
    // =========================

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

    // =========================
    // CITY
    // =========================

    if (city) {
      filter["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    // =========================
    // PRICE
    // =========================

    const priceFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (minPrice) {
      const min = Number(minPrice);

      if (!Number.isNaN(min)) {
        priceFilter.$gte = min;
      }
    }

    if (maxPrice) {
      const max = Number(maxPrice);

      if (!Number.isNaN(max)) {
        priceFilter.$lte = max;
      }
    }

    if (Object.keys(priceFilter).length) {
      filter["pricing.daily"] = priceFilter;
    }

    // =========================
    // FACILITY
    // =========================

    if (facility === "استخر") {
      filter["facilities.pool"] = true;
    }

    if (facility === "پارکینگ") {
      filter["facilities.parking"] = true;
    }

    // =========================
    // RATING
    // =========================

    if (rating) {
      const rate = Number(rating.replace("ستاره", "").trim());

      if (!Number.isNaN(rate)) {
        filter.rating = {
          $gte: rate,
        };
      }
    }

    // =========================
    // SORT
    // =========================

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

    console.log("SORT ===>", sortQuery);

    const properties = await Property.find(filter)
      .populate("owner", "name email")
      .sort(sortQuery);

    console.log("RESULT COUNT ===>", properties.length);

    const fixedProperties = properties.map((property) => {
      const data = property.toObject();

      if (Array.isArray(data.images)) {
        data.images = data.images.map((img: string) => normalizeImageUrl(img));
      }

      return data;
    });

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
