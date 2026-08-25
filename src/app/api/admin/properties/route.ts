export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Property from "@/app/models/Property";

type PropertyFilter = {
  $or?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

// ================================
// GET USER FROM TOKEN
// ================================

async function getAdminUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyToken(token) as {
      id: string;
      email?: string;
    };
  } catch {
    return null;
  }
}

// ================================
// CHECK ADMIN
// ================================

async function checkAdmin() {
  const user = await getAdminUser();

  if (!user) {
    return {
      error: NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        },
      ),
    };
  }

  const admin = await User.findById(user.id).select("role");

  if (!admin || admin.role !== "admin") {
    return {
      error: NextResponse.json(
        {
          success: false,
          message: "دسترسی فقط برای مدیران مجاز است",
        },
        {
          status: 403,
        },
      ),
    };
  }

  return {
    user,
  };
}

// ================================
// GET ALL PROPERTIES
// ================================

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = await checkAdmin();

    if (auth.error) {
      return auth.error;
    }

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, Number(searchParams.get("page")) || 1);

    const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

    const search = searchParams.get("search")?.trim() || "";

    const filter: PropertyFilter = {};

    // ================================
    // SEARCH
    // ================================

    if (search) {
      const regex = {
        $regex: search,
        $options: "i",
      };

      filter.$or = [
        // عنوان
        {
          title: regex,
        },

        // شهر
        {
          "location.city": regex,
        },

        // آدرس
        {
          "location.address": regex,
        },

        // مقدار انگلیسی نوع
        {
          type: regex,
        },

        // مقدار انگلیسی نوع معامله
        {
          transactionType: regex,
        },

        // مقدار انگلیسی وضعیت
        {
          status: regex,
        },

        // ================================
        // SEARCH PERSIAN PROPERTY TYPE
        // ================================

        ...(search === "آپارتمان" ? [{ type: "apartment" }] : []),

        ...(search === "ویلا" ? [{ type: "villa" }] : []),

        ...(search === "خانه" ? [{ type: "house" }] : []),

        ...(search === "هتل" ? [{ type: "hotel" }] : []),

        ...(search === "سوئیت" ? [{ type: "suite" }] : []),

        ...(search === "زمین" ? [{ type: "land" }] : []),

        ...(search === "اداری" ? [{ type: "office" }] : []),

        ...(search === "تجاری" ? [{ type: "commercial" }] : []),

        // ================================
        // SEARCH PERSIAN TRANSACTION TYPE
        // ================================

        ...(search === "فروش" ? [{ transactionType: "sale" }] : []),

        ...(search === "اجاره" ? [{ transactionType: "rent" }] : []),

        ...(search === "رهن" ? [{ transactionType: "mortgage" }] : []),

        ...(search === "رهن و اجاره" || search === "رهن‌واجاره"
          ? [{ transactionType: "rent-mortgage" }]
          : []),

        // ================================
        // SEARCH PERSIAN STATUS
        // ================================

        ...(search === "فعال" ? [{ status: "available" }] : []),

        ...(search === "رزرو شده" ? [{ status: "reserved" }] : []),

        ...(search === "غیرفعال" ? [{ status: "inactive" }] : []),
      ];
    }

    // ================================
    // PAGINATION
    // ================================

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
    console.error("ADMIN GET PROPERTIES ERROR:", error);

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

// ================================
// CREATE PROPERTY
// ================================

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = await checkAdmin();

    if (auth.error) {
      return auth.error;
    }

    const body = await request.json();

    console.log("CREATE PROPERTY BODY:", JSON.stringify(body, null, 2));

    // ================================
    // BODY
    // ================================

    const {
      title,
      description,
      type,
      transactionType,
      status,
      location,
      images,
      area,
      pricing,
      facilities,
    } = body;

    // ================================
    // REQUIRED FIELDS
    // ================================

    if (!title || !type || !transactionType || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "عنوان، نوع ملک، نوع معامله و وضعیت الزامی هستند",
        },
        {
          status: 400,
        },
      );
    }

    // ================================
    // CREATE PROPERTY
    // ================================

    const property = await Property.create({
      // ================================
      // BASIC INFO
      // ================================

      title: String(title).trim(),

      description: typeof description === "string" ? description.trim() : "",

      type,

      transactionType,

      status,

      // ================================
      // LOCATION
      // ================================

      location: {
        city: location?.city ? String(location.city).trim() : "",

        address: location?.address ? String(location.address).trim() : "",
      },

      // ================================
      // IMAGES
      // ================================

      images: Array.isArray(images) ? images : [],

      // ================================
      // AREA
      // ================================

      area: Number(area) || 0,

      // ================================
      // PRICING
      // ================================

      pricing: {
        daily: Number(pricing?.daily) || 0,

        monthly:
          pricing?.monthly !== undefined
            ? Number(pricing.monthly) || 0
            : undefined,

        mortgage:
          pricing?.mortgage !== undefined
            ? Number(pricing.mortgage) || 0
            : undefined,

        oldPrice:
          pricing?.oldPrice !== undefined
            ? Number(pricing.oldPrice) || 0
            : undefined,

        discount:
          pricing?.discount !== undefined
            ? Number(pricing.discount) || 0
            : undefined,
      },

      // ================================
      // FACILITIES
      // ================================

      facilities: {
        bedrooms: Number(facilities?.bedrooms) || 0,

        bathrooms: Number(facilities?.bathrooms) || 0,

        capacity: Number(facilities?.capacity) || 0,

        parking: Boolean(facilities?.parking),

        pool: Boolean(facilities?.pool),
      },
    });

    console.log("CREATED PROPERTY:", property);

    // ================================
    // RESPONSE
    // ================================

    return NextResponse.json(
      {
        success: true,

        message: "ملک با موفقیت ایجاد شد",

        property,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("ADMIN CREATE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: error instanceof Error ? error.message : "خطا در ایجاد ملک",
      },
      {
        status: 500,
      },
    );
  }
}
