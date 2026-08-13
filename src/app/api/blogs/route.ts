import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/app/lib/mongodb";
import Blog from "@/app/models/Blog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 50;

// =========================
// GET BLOGS
// =========================

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const sort = searchParams.get("sort")?.trim() || "latest";

    const pageParam = Number(searchParams.get("page"));
    const limitParam = Number(searchParams.get("limit"));

    const page =
      Number.isInteger(pageParam) && pageParam > 0 ? pageParam : DEFAULT_PAGE;

    const limit =
      Number.isInteger(limitParam) && limitParam > 0 && limitParam <= MAX_LIMIT
        ? limitParam
        : DEFAULT_LIMIT;

    const filter: Record<string, unknown> = {
      status: "published",
    };

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      filter.category = category;
    }

    let sortOption: Record<string, 1 | -1>;

    switch (sort) {
      case "newest":
        sortOption = {
          createdAt: -1,
        };
        break;

      case "mostViewed":
        sortOption = {
          views: -1,
          createdAt: -1,
        };
        break;

      case "latest":
      default:
        sortOption = {
          updatedAt: -1,
        };
        break;
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),

      Blog.countDocuments(filter),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json(
      {
        success: true,
        count: blogs.length,
        total,
        totalPages,
        currentPage: page,
        blogs,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت مقالات",
      },
      {
        status: 500,
      },
    );
  }
}

// =========================
// POST BLOG
// =========================

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const title = body?.title?.trim();
    const description = body?.description?.trim();
    const content = body?.content?.trim();
    const image = body?.image?.trim();
    const category = body?.category?.trim();

    const minutes = Number(body?.minutes);
    const isFree = body?.isFree ?? true;
    const date = body?.date?.trim();
    const views = Number(body?.views ?? 0);
    const status = body?.status ?? "draft";

    // -------------------------
    // Required fields
    // -------------------------

    if (!title || !description || !content || !image || !category || !date) {
      return NextResponse.json(
        {
          success: false,
          message:
            "عنوان، توضیحات، محتوا، تصویر، دسته‌بندی و تاریخ الزامی هستند.",
        },
        {
          status: 400,
        },
      );
    }

    // -------------------------
    // Validate minutes
    // -------------------------

    if (!Number.isInteger(minutes) || minutes < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "زمان مطالعه باید حداقل ۱ دقیقه باشد.",
        },
        {
          status: 400,
        },
      );
    }

    // -------------------------
    // Validate views
    // -------------------------

    if (!Number.isInteger(views) || views < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "تعداد بازدید معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    // -------------------------
    // Validate status
    // -------------------------

    if (status !== "draft" && status !== "published") {
      return NextResponse.json(
        {
          success: false,
          message: "وضعیت مقاله معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    // -------------------------
    // Create blog
    // -------------------------

    const blog = await Blog.create({
      title,
      description,
      content,
      image,
      category,
      minutes,
      isFree: Boolean(isFree),
      date,
      views,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        message: "مقاله با موفقیت ایجاد شد.",
        blog,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد مقاله.",
      },
      {
        status: 500,
      },
    );
  }
}
