import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Review from "@/app/models/Review";

// =========================
// GET REVIEWS
// =========================

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find().sort({ createdAt: -1 }).lean();

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

    const { text, author, date, time } = body;

    // Validation
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

    const review = await Review.create({
      text,
      author,
      date: date || "",
      time: time || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "نظر با موفقیت ثبت شد",
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
