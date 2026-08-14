import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { verifyToken } from "../../../lib/auth";

type DecodedToken = {
  id: string;
  email: string;
};

async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const decoded = verifyToken(token) as DecodedToken;

  // const user = await User.findById(decoded.id);
  const user = await User.findById(decoded.id);

  console.log("TOKEN DATA:", decoded);
  console.log("FOUND USER:", user);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}

/* =========================
   GET /api/auth/me
========================= */

export async function GET() {
  try {
    await connectDB();

    const user = await getAuthenticatedUser();

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ME GET ERROR:", error);

    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "کاربر وارد نشده است",
      },
      { status: 401 },
    );
  }
}

/* =========================
   PUT /api/auth/me
========================= */

export async function PUT(request: Request) {
  try {
    await connectDB();

    const user = await getAuthenticatedUser();

    const body = await request.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";

    const lastName =
      typeof body?.lastName === "string" ? body.lastName.trim() : "";

    const phoneNumber =
      typeof body?.phoneNumber === "string" ? body.phoneNumber.trim() : "";

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "نام الزامی است",
        },
        { status: 400 },
      );
    }

    if (!lastName) {
      return NextResponse.json(
        {
          success: false,
          message: "نام خانوادگی الزامی است",
        },
        { status: 400 },
      );
    }

    if (!phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "شماره تلفن الزامی است",
        },
        { status: 400 },
      );
    }

    user.name = name;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "اطلاعات پروفایل با موفقیت به‌روزرسانی شد",
        user: {
          id: user._id.toString(),
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("ME PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در به‌روزرسانی اطلاعات پروفایل",
      },
      { status: 500 },
    );
  }
}
