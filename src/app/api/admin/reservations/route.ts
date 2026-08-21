import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose, { FilterQuery } from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/auth";

import User from "@/app/models/User";
import Property from "@/app/models/Property";
import Reservation from "@/app/models/Reservation";
import Notification from "@/app/models/Notification";

import { checkReservationConflict } from "@/app/lib/reservation/checkAvailability";
import { toGregorian } from "jalaali-js";

// ===============================
// ADMIN AUTH
// ===============================

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = verifyToken(token) as {
    id: string;
    role: string;
  };

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}

// ===============================
// NUMBER NORMALIZE
// ===============================

function normalizeNumber(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/,/g, "")
    .trim();
}

// ===============================
// DATE NORMALIZE
// ===============================

function normalizeDate(value: string) {
  const clean = normalizeNumber(value)
    .replace(/-/g, "/")
    .split("/")
    .filter(Boolean);

  if (clean.length !== 3) {
    return "";
  }

  let year = "";
  let month = "";
  let day = "";

  if (clean[0].length === 4) {
    year = clean[0];
    month = clean[1];
    day = clean[2];
  } else if (clean[2].length === 4) {
    day = clean[0];
    month = clean[1];
    year = clean[2];
  } else {
    return "";
  }

  return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
}

// ===============================
// JALALI TO DATE
// ===============================

function jalaliToDate(value: string) {
  const parts = normalizeDate(value).split("/").map(Number);

  if (parts.length !== 3) {
    return null;
  }

  const [year, month, day] = parts;

  if (!year || !month || !day) {
    return null;
  }

  const result = toGregorian(year, month, day);

  return new Date(result.gy, result.gm - 1, result.gd);
}

// ===============================
// NIGHTS
// ===============================

function calculateNights(checkIn: string, checkOut: string) {
  const start = jalaliToDate(checkIn);
  const end = jalaliToDate(checkOut);

  if (!start || !end) {
    return 1;
  }

  const diff = end.getTime() - start.getTime();

  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}
// ===============================
// GET RESERVATIONS
// ===============================

export async function GET(request: NextRequest) {
  try {
    await checkAdmin();
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const query: FilterQuery<typeof Reservation> = {};

    // ===============================
    // STATUS
    // ===============================

    if (status) {
      query.status = status;
    }

    // ===============================
    // CHECK IN FILTER
    // ===============================

    if (checkIn.trim()) {
      const normalizedCheckIn = normalizeDate(checkIn);

      if (normalizedCheckIn) {
        query.checkIn = normalizedCheckIn;
      }
    }

    // ===============================
    // CHECK OUT FILTER
    // ===============================

    if (checkOut.trim()) {
      const normalizedCheckOut = normalizeDate(checkOut);

      if (normalizedCheckOut) {
        query.checkOut = normalizedCheckOut;
      }
    }

    // ===============================
    // SEARCH
    // ===============================

    if (search.trim()) {
      const cleanSearch = search.trim();

      // تبدیل اعداد فارسی به انگلیسی
      const normalizedSearch = normalizeNumber(cleanSearch);

      // ===============================
      // USER SEARCH
      // ===============================

      const searchParts = cleanSearch.split(/\s+/);

      const userConditions: FilterQuery<typeof User>[] = [
        {
          name: {
            $regex: cleanSearch,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: cleanSearch,
            $options: "i",
          },
        },
        {
          phoneNumber: {
            $regex: cleanSearch,
            $options: "i",
          },
        },
        {
          email: {
            $regex: cleanSearch,
            $options: "i",
          },
        },
      ];

      // نام + نام خانوادگی
      if (searchParts.length >= 2) {
        userConditions.push(
          {
            $and: [
              {
                name: {
                  $regex: searchParts[0],
                  $options: "i",
                },
              },
              {
                lastName: {
                  $regex: searchParts[1],
                  $options: "i",
                },
              },
            ],
          },
          {
            $and: [
              {
                name: {
                  $regex: searchParts[1],
                  $options: "i",
                },
              },
              {
                lastName: {
                  $regex: searchParts[0],
                  $options: "i",
                },
              },
            ],
          },
        );
      }

      const users = await User.find({
        $or: userConditions,
      }).select("_id");

      const userIds = users.map((user) => user._id);

      // ===============================
      // PROPERTY SEARCH
      // ===============================

      const properties = await Property.find({
        title: {
          $regex: cleanSearch,
          $options: "i",
        },
      }).select("_id");

      const propertyIds = properties.map((property) => property._id);

      // ===============================
      // SEARCH CONDITIONS
      // ===============================

      const searchConditions: FilterQuery<typeof Reservation>[] = [];

      // USER
      if (userIds.length > 0) {
        searchConditions.push({
          userId: {
            $in: userIds,
          },
        });
      }

      // PROPERTY
      if (propertyIds.length > 0) {
        searchConditions.push({
          propertyId: {
            $in: propertyIds,
          },
        });
      }

      // ===============================
      // AMOUNT SEARCH
      // ===============================

      const amountString = normalizedSearch.replace(/[^\d]/g, "");

      if (amountString) {
        const amount = Number(amountString);

        if (Number.isFinite(amount)) {
          console.log("SEARCH AMOUNT:", {
            original: cleanSearch,
            normalized: normalizedSearch,
            amount,
          });

          searchConditions.push({
            amount: amount,
          });
        }
      }

      // ===============================
      // DATE SEARCH
      // ===============================

      const normalizedSearchDate = normalizeDate(cleanSearch);

      if (normalizedSearchDate) {
        searchConditions.push(
          {
            checkIn: normalizedSearchDate,
          },
          {
            checkOut: normalizedSearchDate,
          },
        );
      }

      // ===============================
      // APPLY SEARCH
      // ===============================

      if (searchConditions.length > 0) {
        query.$or = searchConditions;
      } else {
        // هیچ نتیجه‌ای برای عبارت جستجو وجود ندارد
        query._id = new mongoose.Types.ObjectId();
      }
    }

    // ===============================
    // DEBUG
    // ===============================

    console.log("========== RESERVATION SEARCH ==========");
    console.log({
      search,
      normalizedSearch: normalizeNumber(search),
      checkIn,
      checkOut,
      status,
      query,
    });

    // ===============================
    // GET DATA
    // ===============================

    const reservations = await Reservation.find(query)
      .populate("userId", "name lastName phoneNumber email")
      .populate("propertyId", "title location")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    // ===============================
    // TOTAL
    // ===============================

    const total = await Reservation.countDocuments(query);

    // ===============================
    // RESPONSE
    // ===============================

    return NextResponse.json({
      success: true,
      reservations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET RESERVATIONS ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت رزروها",
      },
      {
        status: 500,
      },
    );
  }
}

// ===============================
// CREATE RESERVATION
// ===============================

export async function POST(request: NextRequest) {
  try {
    await checkAdmin();
    await connectDB();

    const body = await request.json();

    const { userId, propertyId, checkIn, checkOut, amount, status } = body;

    // ===============================
    // DATE
    // ===============================

    const normalizedCheckIn = normalizeDate(String(checkIn ?? ""));
    const normalizedCheckOut = normalizeDate(String(checkOut ?? ""));

    console.log("========== CREATE DATE ==========");
    console.log({
      receivedCheckIn: checkIn,
      receivedCheckOut: checkOut,
      normalizedCheckIn,
      normalizedCheckOut,
    });

    // ===============================
    // VALIDATION
    // ===============================

    if (!userId || !propertyId || !normalizedCheckIn || !normalizedCheckOut) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات رزرو ناقص است",
        },
        { status: 400 },
      );
    }

    // ===============================
    // JALALI DATE FORMAT
    // ===============================

    const jalaliDateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (
      !jalaliDateRegex.test(normalizedCheckIn) ||
      !jalaliDateRegex.test(normalizedCheckOut)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "فرمت تاریخ باید به صورت جلالی YYYY/MM/DD باشد",
        },
        { status: 400 },
      );
    }

    // ===============================
    // CONFLICT
    // ===============================

    const conflict = await checkReservationConflict({
      propertyId: String(propertyId),
      checkIn: normalizedCheckIn,
      checkOut: normalizedCheckOut,
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          message: "این ملک در این بازه زمانی قبلاً رزرو شده است",
        },
        { status: 409 },
      );
    }

    // ===============================
    // USER
    // ===============================

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    // ===============================
    // NIGHTS
    // ===============================

    const nights = calculateNights(normalizedCheckIn, normalizedCheckOut);

    // ===============================
    // CREATE
    // ===============================

    const reservation = await Reservation.create({
      userId,
      propertyId,

      // مهم:
      // در دیتابیس تاریخ جلالی String ذخیره می‌شود
      checkIn: normalizedCheckIn,
      checkOut: normalizedCheckOut,

      contact: {
        phone: user.phoneNumber,
        email: user.email,
      },

      nights,
      amount: Number(amount) || 0,
      status: status || "pending",
    });

    console.log("========== CREATED RESERVATION ==========");
    console.log({
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
    });

    // ===============================
    // NOTIFICATION
    // ===============================

    await Notification.create({
      userId,
      title: "رزرو جدید ثبت شد",
      message: "رزرو شما با موفقیت ثبت شد",
      type: "reservation",
      isRead: false,
    });

    // ===============================
    // RESPONSE
    // ===============================

    return NextResponse.json(
      {
        success: true,
        message: "رزرو ایجاد شد",
        reservation,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE RESERVATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد رزرو",
      },
      { status: 500 },
    );
  }
}

// ===============================
// UPDATE RESERVATION
// ===============================

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await checkAdmin();

    await connectDB();

    const { id } = await context.params;

    const body = await request.json();

    const reservation = await Reservation.findById(id);

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

    const newCheckIn = body.checkIn
      ? normalizeDate(String(body.checkIn))
      : reservation.checkIn;

    const newCheckOut = body.checkOut
      ? normalizeDate(String(body.checkOut))
      : reservation.checkOut;

    const newPropertyId = body.propertyId
      ? String(body.propertyId)
      : String(reservation.propertyId);

    const conflict = await checkReservationConflict({
      propertyId: newPropertyId,

      checkIn: newCheckIn,

      checkOut: newCheckOut,

      excludeReservationId: id,
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          message: "این ملک در این بازه زمانی قبلاً رزرو شده است",
        },
        {
          status: 409,
        },
      );
    }

    if (body.userId) {
      reservation.userId = body.userId;
    }

    reservation.propertyId = new mongoose.Types.ObjectId(newPropertyId);

    reservation.checkIn = newCheckIn;

    reservation.checkOut = newCheckOut;

    reservation.nights = calculateNights(newCheckIn, newCheckOut);

    if (body.amount !== undefined) {
      reservation.amount = Number(body.amount) || 0;
    }

    let statusChanged = false;

    if (body.status) {
      statusChanged = reservation.status !== body.status;

      reservation.status = body.status;
    }

    await reservation.save();

    // ===============================
    // NOTIFICATION UPDATE
    // ===============================

    if (statusChanged) {
      await Notification.create({
        userId: reservation.userId,

        title: "وضعیت رزرو تغییر کرد",

        message: `وضعیت رزرو شما به ${body.status} تغییر کرد`,

        type: "reservation",

        isRead: false,
      });
    }

    return NextResponse.json({
      success: true,

      message: "رزرو ویرایش شد",

      reservation,
    });
  } catch (error) {
    console.error("UPDATE RESERVATION ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش رزرو",
      },
      {
        status: 500,
      },
    );
  }
}

// ===============================
// DELETE RESERVATION
// ===============================

export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    await checkAdmin();

    await connectDB();

    const { id } = await context.params;

    const reservation = await Reservation.findById(id);

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

    await Reservation.findByIdAndDelete(id);

    // ===============================
    // NOTIFICATION DELETE
    // ===============================

    await Notification.create({
      userId: reservation.userId,

      title: "رزرو حذف شد",

      message: "رزرو شما توسط مدیریت حذف شد",

      type: "reservation",

      isRead: false,
    });

    return NextResponse.json({
      success: true,

      message: "رزرو حذف شد",
    });
  } catch (error) {
    console.error("DELETE RESERVATION ERROR", error);

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
