export const runtime = "nodejs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// =========================
// GET SINGLE PROPERTY
// =========================

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("GET PROPERTY ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک معتبر نیست",
        },
        { status: 400 },
      );
    }

    const property = await Property.findById(id).lean();

    console.log("FOUND PROPERTY:", property);

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک موردنظر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        property: {
          ...property,
          _id: property._id.toString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET SINGLE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "خطا در دریافت اطلاعات ملک",
      },
      { status: 500 },
    );
  }
}

// =========================
// UPDATE PROPERTY
// =========================

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک معتبر نیست",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const {
      title,
      description,
      type,
      transactionType,
      location,
      images,
      facilities,
      area,
      pricing,
      rating,
      views,
      status,
      isFeatured,
      featuredOrder,
    } = body;

    const hasUpdate =
      title !== undefined ||
      description !== undefined ||
      type !== undefined ||
      transactionType !== undefined ||
      location !== undefined ||
      images !== undefined ||
      facilities !== undefined ||
      area !== undefined ||
      pricing !== undefined ||
      rating !== undefined ||
      views !== undefined ||
      status !== undefined ||
      isFeatured !== undefined ||
      featuredOrder !== undefined;

    if (!hasUpdate) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعاتی برای ویرایش ارسال نشده است",
        },
        { status: 400 },
      );
    }

    const property = await Property.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(transactionType !== undefined && {
          transactionType,
        }),
        ...(location !== undefined && { location }),
        ...(images !== undefined && { images }),
        ...(facilities !== undefined && { facilities }),
        ...(area !== undefined && { area }),
        ...(pricing !== undefined && { pricing }),
        ...(rating !== undefined && { rating }),
        ...(views !== undefined && { views }),
        ...(status !== undefined && { status }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(featuredOrder !== undefined && {
          featuredOrder,
        }),
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک موردنظر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ملک با موفقیت ویرایش شد",
        property: {
          ...property,
          _id: property._id.toString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPDATE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "خطا در ویرایش ملک",
      },
      { status: 500 },
    );
  }
}

// =========================
// DELETE PROPERTY
// =========================

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک معتبر نیست",
        },
        { status: 400 },
      );
    }

    const property = await Property.findByIdAndDelete(id).lean();

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک موردنظر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ملک با موفقیت حذف شد",
        property: {
          ...property,
          _id: property._id.toString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "خطا در حذف ملک",
      },
      { status: 500 },
    );
  }
}
