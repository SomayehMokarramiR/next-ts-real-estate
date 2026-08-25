export const runtime = "nodejs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Blog from "@/app/models/Blog";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    // -------------------------
    // Validate MongoDB ID
    // -------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه مقاله معتبر نیست.",
        },
        { status: 400 },
      );
    }

    // -------------------------
    // Get published blog + increase views
    // -------------------------

    const blog = await Blog.findOneAndUpdate(
      {
        _id: id,
        status: "published",
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      },
    ).lean();

    // -------------------------
    // Blog not found
    // -------------------------

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "مقاله موردنظر پیدا نشد.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        blog,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET BLOG BY ID ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت مقاله.",
      },
      { status: 500 },
    );
  }
}
