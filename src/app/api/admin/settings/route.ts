import { NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";

import AdminSettings from "@/app/models/AdminSettings";

import { requireAdmin } from "@/app/lib/auth/requireAdmin";

const DEFAULT_SETTINGS = {
  general: {
    siteName: "املاک",
    siteDescription: "",
    phone: "",
    email: "",
    address: "",
    siteEnabled: true,
  },

  reservation: {
    reservationEnabled: true,
    minNights: 1,
    maxNights: 30,
    cancellationEnabled: true,
    cancellationDeadlineHours: 24,
  },

  notifications: {
    reservation: true,
    systemMessages: true,
    offersAndDiscounts: true,
  },

  system: {
    maintenanceMode: false,
    userRegistration: true,
    userLogin: true,
  },
};

// =====================================
// GET ADMIN SETTINGS
// =====================================

export async function GET() {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    let settings = await AdminSettings.findOne();

    // اگر تنظیمات وجود نداشت ایجاد شود
    if (!settings) {
      settings = await AdminSettings.create(DEFAULT_SETTINGS);
    }

    // هماهنگ کردن تنظیمات قدیمی با ساختار جدید
    settings.notifications = {
      reservation: settings.notifications?.reservation ?? true,

      systemMessages: settings.notifications?.systemMessages ?? true,

      offersAndDiscounts: settings.notifications?.offersAndDiscounts ?? true,
    };

    await settings.save();

    return NextResponse.json(
      {
        success: true,
        settings,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET ADMIN SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "دریافت تنظیمات با خطا مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}

// =====================================
// PUT ADMIN SETTINGS
// =====================================

export async function PUT(request: Request) {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();

    const allowedSections = [
      "general",
      "reservation",
      "notifications",
      "system",
    ] as const;

    const section = allowedSections.find((item) => body[item] !== undefined);

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message: "بخش تنظیمات مشخص نشده است.",
        },
        {
          status: 400,
        },
      );
    }

    const values = body[section];

    if (!values || typeof values !== "object" || Array.isArray(values)) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات تنظیمات نامعتبر است.",
        },
        {
          status: 400,
        },
      );
    }

    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = await AdminSettings.create(DEFAULT_SETTINGS);
    }

    // فقط همان بخش آپدیت شود
    settings.set(section, {
      ...settings.get(section),
      ...values,
    });

    // اطمینان از کامل بودن notification ها
    if (section === "notifications") {
      settings.notifications = {
        reservation:
          values.reservation ?? settings.notifications.reservation ?? true,

        systemMessages:
          values.systemMessages ??
          settings.notifications.systemMessages ??
          true,

        offersAndDiscounts:
          values.offersAndDiscounts ??
          settings.notifications.offersAndDiscounts ??
          true,
      };
    }

    await settings.save();

    return NextResponse.json(
      {
        success: true,
        message: "تنظیمات با موفقیت ذخیره شد.",
        settings,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("PUT ADMIN SETTINGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "ذخیره تنظیمات با خطا مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}
