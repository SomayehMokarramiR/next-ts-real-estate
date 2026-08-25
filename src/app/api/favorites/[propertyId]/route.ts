export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { verifyToken } from "@/app/lib/auth";

type Params = {
  params: Promise<{
    propertyId: string;
  }>;
};

// =========================
// GET Check Favorite
// =========================

export async function GET(req: Request, context: Params) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          isFavorite: false,
        },
        {
          status: 401,
        },
      );
    }

    const decoded = verifyToken(token) as {
      id: string;
      email: string;
    };

    const { propertyId } = await context.params;

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          isFavorite: false,
        },
        {
          status: 404,
        },
      );
    }

    const isFavorite = (user.favorites || []).some(
      (item) => item.toString() === propertyId,
    );

    return NextResponse.json({
      success: true,
      isFavorite,
    });
  } catch (error) {
    console.error("CHECK FAVORITE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        isFavorite: false,
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// DELETE Favorite
// =========================

export async function DELETE(req: Request, context: Params) {
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
        {
          status: 401,
        },
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
        {
          status: 401,
        },
      );
    }

    const { propertyId } = await context.params;

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    const favorites = user.favorites || [];

    user.favorites = favorites.filter((item) => item.toString() !== propertyId);

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "از علاقه‌مندی‌ها حذف شد",
        favorites: user.favorites,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("REMOVE FAVORITE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "خطا در حذف علاقه‌مندی",
      },
      {
        status: 500,
      },
    );
  }
}
