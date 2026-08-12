import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "../../lib/mongodb";
import ContactMessage from "../../models/ContactMessage";
import { contactUsFormValidator } from "../../../validators/contactUsFormValidator";
import { checkContactRateLimit } from "../../lib/contactRateLimit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = body?.name ?? "";
    const email = body?.email ?? "";
    const message = body?.message ?? "";
    const website = body?.website ?? "";

    // -------------------------
    // Honeypot
    // -------------------------

    if (typeof website === "string" && website.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "درخواست نامعتبر است.",
        },
        { status: 400 },
      );
    }

    // -------------------------
    // Get client IP
    // -------------------------

    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // -------------------------
    // Database connection
    // -------------------------

    await connectDB();

    // -------------------------
    // Rate Limit
    // 5 requests / 10 minutes
    // -------------------------

    const rateLimit = await checkContactRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً چند دقیقه بعد دوباره تلاش کنید.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        },
      );
    }

    // -------------------------
    // Validation
    // -------------------------

    const validation = contactUsFormValidator(name, email, message);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.errors.name ||
            validation.errors.email ||
            validation.errors.message ||
            "اطلاعات وارد شده صحیح نیست.",
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    // -------------------------
    // Clean data
    // -------------------------

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    // -------------------------
    // Save message
    // -------------------------

    const contactMessage = await ContactMessage.create({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    return NextResponse.json(
      {
        success: true,
        message: "پیام شما با موفقیت ثبت شد.",
        data: {
          id: contactMessage._id.toString(),
          name: contactMessage.name,
          email: contactMessage.email,
          message: contactMessage.message,
          createdAt: contactMessage.createdAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در ثبت پیام رخ داد.",
      },
      { status: 500 },
    );
  }
}
