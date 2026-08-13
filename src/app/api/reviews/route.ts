import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Review from "@/app/models/Review";

// =========================
// GET APPROVED REVIEWS
// =========================

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find({
      status: "approved",
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: reviews.length,
        reviews,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت نظرات",
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// CREATE REVIEW
// =========================

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const text = body?.text?.trim();
    const author = body?.author?.trim();
    const date = body?.date?.trim() || "";
    const time = body?.time?.trim() || "";

    // -------------------------
    // Validation
    // -------------------------

    if (!text || !author) {
      return NextResponse.json(
        {
          success: false,
          message: "متن نظر و نام کاربر الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (author.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "نام کاربر نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد",
        },
        {
          status: 400,
        },
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: "متن نظر نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد",
        },
        {
          status: 400,
        },
      );
    }

    const review = await Review.create({
      text,
      author,
      date,
      time,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "نظر شما با موفقیت ثبت شد و پس از بررسی نمایش داده خواهد شد.",
        review,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ثبت نظر",
      },
      {
        status: 500,
      },
    );
  }
}
