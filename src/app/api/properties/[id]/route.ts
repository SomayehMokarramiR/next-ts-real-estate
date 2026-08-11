import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";
import mongoose from "mongoose";

// =========================
// GET SINGLE PROPERTY
// =========================

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک معتبر نیست",
        },
        { status: 400 },
      );
    }

    const property = await Property.findById(id).populate(
      "owner",
      "name email",
    );

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک مورد نظر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        property,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET SINGLE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات ملک",
      },
      { status: 500 },
    );
  }
}

// =========================
// UPDATE PROPERTY
// =========================

export async function PUT(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
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
      location,
      images,
      facilities,
      pricing,
      status,
      owner,
      isFeatured,
    } = body;

    if (
      title === undefined &&
      description === undefined &&
      type === undefined &&
      location === undefined &&
      images === undefined &&
      facilities === undefined &&
      pricing === undefined &&
      status === undefined &&
      owner === undefined &&
      isFeatured === undefined
    ) {
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

        ...(location !== undefined && { location }),

        ...(images !== undefined && { images }),

        ...(facilities !== undefined && { facilities }),

        ...(pricing !== undefined && { pricing }),

        ...(status !== undefined && { status }),

        ...(owner !== undefined && { owner }),

        ...(isFeatured !== undefined && { isFeatured }),
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("owner", "name email");

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک مورد نظر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ملک با موفقیت ویرایش شد",
        property,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPDATE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش ملک",
      },
      { status: 500 },
    );
  }
}

// =========================
// DELETE PROPERTY
// =========================

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک معتبر نیست",
        },
        { status: 400 },
      );
    }

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک مورد نظر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "ملک با موفقیت حذف شد",
        property,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف ملک",
      },
      { status: 500 },
    );
  }
}
