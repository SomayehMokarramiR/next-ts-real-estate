import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";
import User from "@/app/models/User";

import cloudinary from "@/app/lib/cloudinary";

// ================================
// CHECK ADMIN
// ================================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }

  try {
    const user = verifyToken(token) as {
      id: string;
    };

    await connectDB();

    const admin = await User.findById(user.id).select("role");

    if (!admin || admin.role !== "admin") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// ================================
// UPLOAD IMAGE
// ================================

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
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

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "فایلی ارسال نشده است",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "real-estate/properties",
            resource_type: "image",
          },

          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    });

    const result = uploadResult as {
      secure_url: string;
      public_id: string;
    };

    return NextResponse.json(
      {
        success: true,

        url: result.secure_url,

        public_id: result.public_id,
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
