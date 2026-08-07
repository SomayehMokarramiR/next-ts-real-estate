import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/app/lib/mongodb";
import TempUser from "@/app/models/TempUser";
import User from "@/app/models/User";
import { createToken } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const userId = body?.userId;
    const name = body?.name;
    const lastName = body?.lastName;
    const password = body?.password;
    const phoneNumber = body?.phoneNumber;

    console.log("========== COMPLETE REGISTRATION ==========");
    console.log("TEMP USER ID:", userId);
    console.log("NAME:", name);
    console.log("LAST NAME:", lastName);
    console.log("PHONE:", phoneNumber);

    /* =========================
       Validate User ID
    ========================= */

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات ثبت‌نام پیدا نشد",
        },
        { status: 400 },
      );
    }

    /* =========================
       Validate Name
    ========================= */

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا نام خود را وارد کنید",
        },
        { status: 400 },
      );
    }

    /* =========================
       Validate Last Name
    ========================= */

    if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا نام خانوادگی خود را وارد کنید",
        },
        { status: 400 },
      );
    }

    /* =========================
       Validate Password
    ========================= */

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا رمز عبور خود را وارد کنید",
        },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
        },
        { status: 400 },
      );
    }

    /* =========================
       Validate Phone
    ========================= */

    if (!phoneNumber || typeof phoneNumber !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا شماره موبایل خود را وارد کنید",
        },
        { status: 400 },
      );
    }

    const normalizedPhone = phoneNumber.replace(/\D/g, "").trim();

    if (normalizedPhone.length !== 11) {
      return NextResponse.json(
        {
          success: false,
          message: "شماره موبایل باید ۱۱ رقم باشد",
        },
        { status: 400 },
      );
    }

    /* =========================
       Find Temp User
    ========================= */

    const tempUser = await TempUser.findById(userId);

    if (!tempUser) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات ثبت‌نام پیدا نشد یا منقضی شده است",
        },
        { status: 404 },
      );
    }

    console.log("TEMP USER FOUND:", tempUser._id.toString());

    /* =========================
       Check Email Verification
    ========================= */

    if (!tempUser.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "ایمیل شما هنوز تایید نشده است",
        },
        { status: 400 },
      );
    }

    /* =========================
       Check Expiration
    ========================= */

    if (
      tempUser.expiresAt &&
      new Date(tempUser.expiresAt).getTime() < Date.now()
    ) {
      await TempUser.findByIdAndDelete(tempUser._id);

      return NextResponse.json(
        {
          success: false,
          message: "زمان ثبت‌نام به پایان رسیده است. لطفا دوباره شروع کنید",
        },
        { status: 410 },
      );
    }

    /* =========================
       Existing Email
    ========================= */

    const existingUser = await User.findOne({
      email: tempUser.email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "این ایمیل قبلاً ثبت شده است",
        },
        { status: 409 },
      );
    }

    /* =========================
       Existing Phone
    ========================= */

    const existingPhone = await User.findOne({
      phoneNumber: normalizedPhone,
    });

    if (existingPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "این شماره موبایل قبلاً ثبت شده است",
        },
        { status: 409 },
      );
    }

    /* =========================
       Role
    ========================= */

    const usersCount = await User.countDocuments();

    const role = usersCount === 0 ? "admin" : "user";

    /* =========================
       Hash Password
    ========================= */

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("PASSWORD HASHED SUCCESSFULLY");

    /* =========================
       Create User
    ========================= */

    const user = await User.create({
      name: name.trim(),
      lastName: lastName.trim(),
      email: tempUser.email,
      password: hashedPassword,
      phoneNumber: normalizedPhone,
      role,
    });

    console.log("USER CREATED:", user._id.toString());

    /* =========================
       Create JWT Token
    ========================= */

    const token = createToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    /* =========================
       Delete Temp User
    ========================= */

    await TempUser.findByIdAndDelete(tempUser._id);

    /* =========================
       Response
    ========================= */

    const response = NextResponse.json(
      {
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد",
        user: {
          id: user._id.toString(),
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
      {
        status: 201,
      },
    );

    /* =========================
       Save JWT Cookie
    ========================= */

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("COMPLETE REGISTRATION API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "خطایی در تکمیل ثبت‌نام رخ داد",
      },
      {
        status: 500,
      },
    );
  }
}
