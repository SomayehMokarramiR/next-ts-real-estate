import { NextRequest, NextResponse } from "next/server";
import { FilterQuery } from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Property, { IProperty } from "@/app/models/Property";

// =========================
// NORMALIZE IMAGE
// =========================

function normalizeImageUrl(image: string) {
  if (!image) return image;

  if (image.startsWith("[")) {
    try {
      const parsed = JSON.parse(image);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0];
      }
    } catch {
      return image;
    }
  }

  return image;
}

// =========================
// NUMBER HELPER
// =========================

function getNumber(value: string | null) {
  if (!value) return undefined;

  const number = Number(value);

  return Number.isNaN(number) ? undefined : number;
}

// =========================
// GET PROPERTIES
// =========================

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // =========================
    // PAGINATION
    // =========================

    const pageParam = getNumber(searchParams.get("page"));
    const limitParam = getNumber(searchParams.get("limit"));

    const page = Math.max(pageParam ?? 1, 1);

    // فعلاً برای تست Pagination سه ملک در هر صفحه
    const limit = Math.max(limitParam ?? 6, 1);

    const skip = (page - 1) * limit;

    // =========================
    // GENERAL FILTERS
    // =========================

    const search = searchParams.get("search")?.trim();
    const city = searchParams.get("city")?.trim();
    const guests = searchParams.get("guests")?.trim();
    const type = searchParams.get("type")?.trim();

    const featured = searchParams.get("featured");

    const facility = searchParams.get("facility")?.trim();

    const minPrice = getNumber(searchParams.get("minPrice"));
    const maxPrice = getNumber(searchParams.get("maxPrice"));

    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort")?.trim();

    // =========================
    // RENT / MORTGAGE FILTERS
    // =========================

    const transactionType = searchParams.get("transactionType")?.trim();

    const minRent = getNumber(searchParams.get("minRent"));
    const maxRent = getNumber(searchParams.get("maxRent"));

    const minMortgage = getNumber(searchParams.get("minMortgage"));

    const maxMortgage = getNumber(searchParams.get("maxMortgage"));

    const minArea = getNumber(searchParams.get("minArea"));
    const maxArea = getNumber(searchParams.get("maxArea"));

    // =========================
    // FILTER OBJECT
    // =========================

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
    // PROPERTY TYPE
    // =========================

    const validTypes: IProperty["type"][] = [
      "apartment",
      "villa",
      "house",
      "hotel",
      "suite",
    ];

    if (type && validTypes.includes(type as IProperty["type"])) {
      filter.type = type as IProperty["type"];
    }

    // =========================
    // TRANSACTION TYPE
    // =========================

    const validTransactionTypes: IProperty["transactionType"][] = [
      "rent",
      "mortgage",
      "rent-mortgage",
      "sale",
    ];

    if (
      transactionType &&
      validTransactionTypes.includes(
        transactionType as IProperty["transactionType"],
      )
    ) {
      filter.transactionType = transactionType as IProperty["transactionType"];
    }

    // =========================
    // FEATURED
    // =========================

    if (featured === "true") {
      filter.isFeatured = true;
    }

    // =========================
    // STATUS
    // =========================

    filter.status = "available";

    // =========================
    // GUESTS
    // =========================

    const guestsNumber = guests ? Number(guests) : undefined;

    if (guestsNumber !== undefined && !Number.isNaN(guestsNumber)) {
      filter["facilities.capacity"] = {
        $gte: guestsNumber,
      };
    }

    // =========================
    // DAILY PRICE
    // =========================

    const priceFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (minPrice !== undefined) {
      priceFilter.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      priceFilter.$lte = maxPrice;
    }

    if (Object.keys(priceFilter).length > 0) {
      filter["pricing.daily"] = priceFilter;
    }

    // =========================
    // MONTHLY RENT
    // =========================

    const monthlyFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (minRent !== undefined) {
      monthlyFilter.$gte = minRent;
    }

    if (maxRent !== undefined) {
      monthlyFilter.$lte = maxRent;
    }

    if (Object.keys(monthlyFilter).length > 0) {
      filter["pricing.monthly"] = monthlyFilter;
    }

    // =========================
    // MORTGAGE
    // =========================

    const mortgageFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (minMortgage !== undefined) {
      mortgageFilter.$gte = minMortgage;
    }

    if (maxMortgage !== undefined) {
      mortgageFilter.$lte = maxMortgage;
    }

    if (Object.keys(mortgageFilter).length > 0) {
      filter["pricing.mortgage"] = mortgageFilter;
    }

    // =========================
    // AREA
    // =========================

    const areaFilter: {
      $gte?: number;
      $lte?: number;
    } = {};

    if (minArea !== undefined) {
      areaFilter.$gte = minArea;
    }

    if (maxArea !== undefined) {
      areaFilter.$lte = maxArea;
    }

    if (Object.keys(areaFilter).length > 0) {
      filter.area = areaFilter;
    }

    // =========================
    // FACILITIES
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

    if (featured === "true") {
      sortQuery = {
        rating: -1,
        views: -1,
      };
    } else if (sort === "محبوب‌ترین") {
      sortQuery = {
        views: -1,
      };
    } else if (sort === "ارزان‌ترین") {
      sortQuery = {
        "pricing.daily": 1,
      };
    } else if (sort === "بالاترین امتیاز") {
      sortQuery = {
        rating: -1,
      };
    } else if (sort === "کمترین اجاره") {
      sortQuery = {
        "pricing.monthly": 1,
      };
    } else if (sort === "بیشترین اجاره") {
      sortQuery = {
        "pricing.monthly": -1,
      };
    } else if (sort === "کمترین رهن") {
      sortQuery = {
        "pricing.mortgage": 1,
      };
    } else if (sort === "بیشترین رهن") {
      sortQuery = {
        "pricing.mortgage": -1,
      };
    } else if (sort === "کمترین متراژ") {
      sortQuery = {
        area: 1,
      };
    } else if (sort === "بیشترین متراژ") {
      sortQuery = {
        area: -1,
      };
    }

    // =========================
    // DEBUG
    // =========================

    console.log("FINAL PROPERTY FILTER ===>", JSON.stringify(filter, null, 2));

    console.log("PAGINATION ===>", {
      page,
      limit,
      skip,
    });

    // =========================
    // TOTAL
    // =========================

    const total = await Property.countDocuments(filter);

    // =========================
    // QUERY
    // =========================

    let query = Property.find(filter).sort(sortQuery).skip(skip).limit(limit);

    // =========================
    // FEATURED LIMIT
    // =========================

    if (featured === "true") {
      query = Property.find(filter).sort(sortQuery).limit(6);
    }

    // =========================
    // EXECUTE
    // =========================

    const properties = await query.lean();

    // =========================
    // NORMALIZE IMAGES
    // =========================

    const fixedProperties = properties.map((property) => ({
      ...property,

      images: property.images?.map((image) => normalizeImageUrl(image)) || [],
    }));

    // =========================
    // TOTAL PAGES
    // =========================

    const totalPages = Math.ceil(total / limit);

    // =========================
    // RESPONSE
    // =========================

    return NextResponse.json(
      {
        success: true,

        // تعداد نتایج همین صفحه
        count: fixedProperties.length,

        // تعداد کل نتایج
        total,

        // صفحه فعلی
        page,

        // تعداد در هر صفحه
        limit,

        // تعداد کل صفحات
        totalPages,

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
