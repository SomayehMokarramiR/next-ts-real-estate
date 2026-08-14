import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Reservation from "@/app/models/Reservation";
import Property from "@/app/models/Property";
import { verifyToken } from "@/app/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function getUserId() {
  const cookieStore = await cookies();

  console.log("COOKIES:", cookieStore.getAll());

  const token = cookieStore.get("token")?.value;

  console.log("TOKEN:", token);

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const decoded = verifyToken(token) as {
    id: string;
    email: string;
  };

  console.log("USER:", decoded);

  return decoded.id;
}
/*
 GET /api/reservations/:id
*/
export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const userId = await getUserId();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.findOne({
      _id: id,
      userId,
    }).populate("propertyId");

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      reservation,
    });
  } catch (error) {
    console.error("GET RESERVATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت رزرو",
      },
      {
        status: 500,
      },
    );
  }
}

/*
 DELETE /api/reservations/:id
*/
export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const userId = await getUserId();

    const { id } = await params;

    console.log("DELETE RESERVATION ID:", id);
    console.log("DELETE USER ID:", userId);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه رزرو معتبر نیست",
        },
        {
          status: 400,
        },
      );
    }

    const reservation = await Reservation.findOne({
      _id: id,
      userId,
    });

    console.log("FOUND RESERVATION:", reservation);

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو پیدا نشد یا متعلق به این کاربر نیست",
        },
        {
          status: 404,
        },
      );
    }

    await Reservation.deleteOne({
      _id: id,
      userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "رزرو با موفقیت حذف شد",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE RESERVATION ERROR:", error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
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

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف رزرو",
      },
      {
        status: 500,
      },
    );
  }
}
/*
 PUT /api/reservations/:id
 تغییر ملک
*/
export async function PUT(req: Request, { params }: Params) {
  try {
    await connectDB();

    const userId = await getUserId();

    const { id } = await params;

    const body = await req.json();

    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "ملک جدید ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    const property = await Property.findById(propertyId);

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

    const reservation = await Reservation.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        propertyId,
      },
      {
        new: true,
      },
    ).populate("propertyId");

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          message: "رزرو پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "ملک رزرو تغییر کرد",
      reservation,
    });
  } catch (error) {
    console.error("PUT RESERVATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در تغییر ملک",
      },
      {
        status: 500,
      },
    );
  }
}
