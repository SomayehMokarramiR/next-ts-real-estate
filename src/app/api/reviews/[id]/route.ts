import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Review, { type ReviewStatus } from "@/app/models/Review";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    // -------------------------
    // Validate MongoDB ObjectId
    // -------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه نظر معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request.json();
    const status = body?.status as ReviewStatus;

    // -------------------------
    // Validate status
    // -------------------------

    const allowedStatuses: ReviewStatus[] = ["pending", "approved", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "وضعیت نظر معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    // -------------------------
    // Update review
    // -------------------------

    const review = await Review.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!review) {
      return NextResponse.json(
        {
          success: false,
          message: "نظر موردنظر پیدا نشد.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "وضعیت نظر با موفقیت تغییر کرد.",
        review,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("UPDATE REVIEW STATUS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در تغییر وضعیت نظر.",
      },
      {
        status: 500,
      },
    );
  }
}
