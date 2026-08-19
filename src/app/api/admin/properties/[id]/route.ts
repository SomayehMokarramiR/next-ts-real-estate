import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/lib/auth/requireAdmin";
import { connectDB } from "@/app/lib/mongodb";
import Property from "@/app/models/Property";
import mongoose from "mongoose";

// ================================
// GET PROPERTY DETAIL
// ================================

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await requireAdmin();

    if (!admin.authorized) {
      return admin.response;
    }

    await connectDB();

    const { id } = await context.params;

    // ================================
    // VALIDATE ID
    // ================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    // ================================
    // FIND PROPERTY
    // ================================

    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // ================================
    // RESPONSE
    // ================================

    return NextResponse.json(
      {
        success: true,
        property,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET ADMIN PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "خطا در دریافت اطلاعات ملک",
      },
      {
        status: 500,
      },
    );
  }
}

// ================================
// UPDATE PROPERTY
// ================================

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await requireAdmin();

    if (!admin.authorized) {
      return admin.response;
    }

    await connectDB();

    const { id } = await context.params;

    // ================================
    // VALIDATE ID
    // ================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    // ================================
    // READ BODY
    // ================================

    const body = await req.json();

    console.log("UPDATE PROPERTY ID:", id);

    console.log("UPDATE PROPERTY BODY:", JSON.stringify(body, null, 2));

    // ================================
    // FIND EXISTING PROPERTY
    // ================================

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // ================================
    // VALIDATION
    // ================================

    if (!body.title?.trim()) {
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

    if (!body.type) {
      return NextResponse.json(
        {
          success: false,
          message: "نوع ملک الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.transactionType) {
      return NextResponse.json(
        {
          success: false,
          message: "نوع معامله الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.status) {
      return NextResponse.json(
        {
          success: false,
          message: "وضعیت ملک الزامی است",
        },
        {
          status: 400,
        },
      );
    }

    // ================================
    // UPDATE DATA
    // ================================

    const updateData = {
      // ================================
      // BASIC
      // ================================

      title: String(body.title).trim(),

      description:
        typeof body.description === "string" ? body.description.trim() : "",

      type: body.type,

      transactionType: body.transactionType,

      status: body.status,

      // ================================
      // LOCATION
      // ================================

      location: {
        city:
          body.location?.city !== undefined
            ? String(body.location.city).trim()
            : "",

        address:
          body.location?.address !== undefined
            ? String(body.location.address).trim()
            : "",
      },

      // ================================
      // IMAGES
      // ================================

      images: Array.isArray(body.images) ? body.images : [],

      // ================================
      // AREA
      // ================================

      area: Number(body.area) || 0,

      // ================================
      // PRICING
      // ================================

      pricing: {
        daily: Number(body.pricing?.daily) || 0,

        monthly:
          body.pricing?.monthly !== undefined
            ? Number(body.pricing.monthly) || 0
            : undefined,

        mortgage:
          body.pricing?.mortgage !== undefined
            ? Number(body.pricing.mortgage) || 0
            : undefined,

        oldPrice:
          body.pricing?.oldPrice !== undefined
            ? Number(body.pricing.oldPrice) || 0
            : undefined,

        discount:
          body.pricing?.discount !== undefined
            ? Number(body.pricing.discount) || 0
            : undefined,
      },

      // ================================
      // FACILITIES
      // ================================

      facilities: {
        bedrooms: Number(body.facilities?.bedrooms) || 0,

        bathrooms: Number(body.facilities?.bathrooms) || 0,

        capacity: Number(body.facilities?.capacity) || 0,

        parking: Boolean(body.facilities?.parking),

        pool: Boolean(body.facilities?.pool),
      },
    };

    // ================================
    // UPDATE
    // ================================

    const property = await Property.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    console.log("UPDATED PROPERTY:", property);

    // ================================
    // RESPONSE
    // ================================

    return NextResponse.json(
      {
        success: true,
        message: "ملک با موفقیت ویرایش شد",
        property,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("UPDATE ADMIN PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "خطا در ویرایش ملک",
      },
      {
        status: 500,
      },
    );
  }
}

// ================================
// DELETE PROPERTY
// ================================

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await requireAdmin();

    if (!admin.authorized) {
      return admin.response;
    }

    await connectDB();

    const { id } = await context.params;

    // ================================
    // VALIDATE ID
    // ================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه ملک نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    // ================================
    // DELETE
    // ================================

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // ================================
    // RESPONSE
    // ================================

    return NextResponse.json(
      {
        success: true,
        message: "ملک با موفقیت حذف شد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE ADMIN PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "خطا در حذف ملک",
      },
      {
        status: 500,
      },
    );
  }
}
