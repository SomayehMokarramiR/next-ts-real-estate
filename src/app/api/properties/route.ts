import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";

// =========================
// GET ALL PROPERTIES
// =========================

export async function GET() {
  try {
    await connectDB();

    const properties = await Property.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: properties.length,
        properties,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET ALL PROPERTIES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت لیست املاک",
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// CREATE PROPERTY
// =========================

export async function POST(request: Request) {
  try {
    await connectDB();

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
    } = body;

    // =========================
    // REQUIRED FIELDS
    // =========================

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "عنوان ملک الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (!location?.city) {
      return NextResponse.json(
        {
          success: false,
          message: "شهر ملک الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (!location?.address) {
      return NextResponse.json(
        {
          success: false,
          message: "آدرس ملک الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (pricing?.daily === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "قیمت روزانه الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // CREATE PROPERTY
    // =========================

    const property = await Property.create({
      title,
      description,
      type,
      location,
      images,
      facilities,
      pricing,
      status,
      owner,
    });

    // =========================
    // POPULATE OWNER
    // =========================

    await property.populate("owner", "name email");

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
    console.error("CREATE PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد ملک",
      },
      {
        status: 500,
      },
    );
  }
}
