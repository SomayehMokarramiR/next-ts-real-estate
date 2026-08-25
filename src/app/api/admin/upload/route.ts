export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyToken } from "@/app/lib/auth";
import User from "@/app/models/User";
import { connectDB } from "@/app/lib/mongodb";

import cloudinary from "@/app/lib/cloudinary";

// ===============================
// CHECK ADMIN
// ===============================

async function checkAdmin() {
  await connectDB();

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded = verifyToken(token) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("role");

    if (!user || user.role !== "admin") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// ===============================
// UPLOAD IMAGE
// ===============================

export async function POST(request: NextRequest) {
  try {
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

    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "فایل ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadedImage = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "real-estate/properties",
            resource_type: "image",
          },

          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result?.secure_url) {
              reject(new Error("آدرس تصویر دریافت نشد"));

              return;
            }

            resolve(result.secure_url);
          },
        )
        .end(buffer);
    });

    return NextResponse.json(
      {
        success: true,

        url: uploadedImage,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: error instanceof Error ? error.message : "خطا در آپلود تصویر",
      },
      {
        status: 500,
      },
    );
  }
}
