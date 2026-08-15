import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { verifyToken } from "@/app/lib/auth";

// =========================
// GET Favorites
// =========================

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "ابتدا وارد حساب کاربری شوید",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    const user = await User.findById(decoded.id)
      .populate({
        path: "favorites",
        select: "title description images location type pricing",
      })
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.error("GET FAVORITES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت علاقه‌مندی‌ها",
      },
      { status: 500 },
    );
  }
}

// =========================
// POST Add Favorite
// =========================

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "ابتدا وارد حساب کاربری شوید",
        },
        { status: 401 },
      );
    }

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
          message: "توکن معتبر نیست",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک ارسال نشده است",
        },
        { status: 400 },
      );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    // جلوگیری از تکرار با ObjectId
    const alreadyExists = user.favorites.some(
      (item) => item.toString() === propertyId,
    );

    if (alreadyExists) {
      return NextResponse.json(
        {
          success: true,
          message: "قبلاً اضافه شده است",
        },
        { status: 200 },
      );
    }

    user.favorites.push(propertyId);

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "به علاقه‌مندی‌ها اضافه شد",
        favorites: user.favorites,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ADD FAVORITE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "خطا در افزودن علاقه‌مندی",
      },
      { status: 500 },
    );
  }
}
