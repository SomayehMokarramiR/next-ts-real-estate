export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Reservation from "@/app/models/Reservation";

// ==========================================
// CHECK ADMIN
// ==========================================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token) as {
      id: string;
      email?: string;
    };

    const admin = await User.findById(decoded.id).select("role").lean();

    if (!admin || admin.role !== "admin") {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

// ==========================================
// GET USER DETAIL
// ==========================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        },
      );
    }

    const { id: userId } = await params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه کاربر نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    const user = await User.findById(userId)
      .select("_id name lastName email phoneNumber role createdAt updatedAt")
      .lean();

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

    const reservations = await Reservation.find({
      userId: user._id,
    })
      .populate({
        path: "propertyId",
        select: "title location images pricing",
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,

      user,

      reservationsCount: reservations.length,

      reservations,
    });
  } catch (error) {
    console.error("ADMIN USER DETAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات کاربر",
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// UPDATE USER
// ==========================================

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        },
      );
    }

    const { id: userId } = await params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه نامعتبر",
        },
        {
          status: 400,
        },
      );
    }

    const body = await request.json();

    const { name, lastName, phoneNumber, role } = body;

    const updateData: {
      name?: string;
      lastName?: string;
      phoneNumber?: string;
      role?: "user" | "admin";
    } = {};

    if (name !== undefined) updateData.name = name;

    if (lastName !== undefined) updateData.lastName = lastName;

    if (phoneNumber !== undefined) {
      const phoneRegex = /^09\d{9}$/;

      if (phoneNumber && !phoneRegex.test(phoneNumber)) {
        return NextResponse.json(
          {
            success: false,
            message: "شماره تماس باید با 09 شروع شود و 11 رقم باشد",
          },
          {
            status: 400,
          },
        );
      }

      updateData.phoneNumber = phoneNumber;
    }

    if (role !== undefined) {
      if (role !== "user" && role !== "admin") {
        return NextResponse.json(
          {
            success: false,
            message: "نقش نامعتبر است",
          },
          {
            status: 400,
          },
        );
      }

      updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    })
      .select("_id name lastName email phoneNumber role createdAt updatedAt")
      .lean();

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

    return NextResponse.json({
      success: true,

      message: "اطلاعات کاربر ویرایش شد",

      user,
    });
  } catch (error) {
    console.error("ADMIN USER UPDATE ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش کاربر",
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// DELETE USER
// ==========================================

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    await connectDB();

    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز",
        },
        {
          status: 401,
        },
      );
    }

    const { id: userId } = await params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه کاربر نامعتبر است",
        },
        {
          status: 400,
        },
      );
    }

    // جلوگیری از حذف خود مدیر

    if (admin.id === userId) {
      return NextResponse.json(
        {
          success: false,
          message: "امکان حذف حساب خودتان وجود ندارد",
        },
        {
          status: 400,
        },
      );
    }

    // جلوگیری از حذف مدیر دیگر

    const targetUser = await User.findById(userId).select("role").lean();

    if (!targetUser) {
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

    if (targetUser.role === "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "حذف کاربران مدیر امکان پذیر نیست",
        },
        {
          status: 403,
        },
      );
    }

    // بررسی رزروها

    const reservationsCount = await Reservation.countDocuments({
      userId,
    });

    if (reservationsCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "این کاربر دارای رزرو ثبت شده است و حذف امکان پذیر نیست",
        },
        {
          status: 400,
        },
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("ADMIN USER DELETE ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف کاربر",
      },
      {
        status: 500,
      },
    );
  }
}
