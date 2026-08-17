import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Property from "@/app/models/Property";

// ==========================================
// TYPES
// ==========================================

type PropertyFilter = {
  $or?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

// ==========================================
// GET ADMIN USER
// ==========================================

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

// ==========================================
// CHECK ADMIN
// ==========================================

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

// ==========================================
// GET ADMIN PROPERTIES
// ==========================================

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const auth = await checkAdmin();

    if (auth.error) {
      return auth.error;
    }

    const { searchParams } = new URL(request.url);

    const pageParam = Number(searchParams.get("page"));

    const limitParam = Number(searchParams.get("limit"));

    const search = searchParams.get("search")?.trim() || "";

    const type = searchParams.get("type")?.trim() || "";

    const status = searchParams.get("status")?.trim() || "";

    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

    const limit =
      Number.isInteger(limitParam) && limitParam > 0 && limitParam <= 50
        ? limitParam
        : 10;

    const filter: PropertyFilter = {};

    // =====================================
    // SEARCH
    // title
    // city
    // type
    // status
    // createdAt
    // =====================================

    if (search) {
      const searchRegex = {
        $regex: search,
        $options: "i",
      };

      filter.$or = [
        {
          title: searchRegex,
        },

        {
          "location.city": searchRegex,
        },

        {
          type: searchRegex,
        },

        {
          status: searchRegex,
        },
      ];

      // ============================
      // SEARCH CREATED DATE
      // ============================

      const allProperties = await Property.find({})
        .select("_id createdAt")
        .lean<
          {
            _id: string;
            createdAt: Date;
          }[]
        >();

      const dateIds = allProperties
        .filter((item) => {
          const date = new Date(item.createdAt).toLocaleDateString("fa-IR");

          return date.includes(search);
        })
        .map((item) => item._id);

      if (dateIds.length > 0) {
        filter.$or.push({
          _id: {
            $in: dateIds,
          },
        });
      }
    }

    // =====================================
    // FILTER TYPE
    // =====================================

    if (type) {
      filter.type = type;
    }

    // =====================================
    // FILTER STATUS
    // =====================================

    if (status) {
      filter.status = status;
    }

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
    console.error("ADMIN PROPERTIES GET ERROR:", error);

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
