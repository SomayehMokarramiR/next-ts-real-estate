export type BlogStatus = "draft" | "published";

export interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  minutes: number;
  isFree: boolean;
  date: string;
  views: number;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListParams {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface BlogListResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  blogs: Blog[];
}

export interface BlogResponse {
  success: boolean;
  blog: Blog;
}

function buildQueryString(params?: BlogListParams) {
  const searchParams = new URLSearchParams();

  if (params?.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params?.category?.trim()) {
    searchParams.set("category", params.category.trim());
  }

  if (params?.sort?.trim()) {
    searchParams.set("sort", params.sort.trim());
  }

  if (params?.page) {
    searchParams.set("page", String(params.page));
  }

  if (params?.limit) {
    searchParams.set("limit", String(params.limit));
  }

  const query = searchParams.toString();

  return query ? `?${query}` : "";
}

// =========================
// GET BLOGS
// =========================

export async function getBlogs(
  params?: BlogListParams,
): Promise<BlogListResponse> {
  const response = await fetch(`/api/blogs${buildQueryString(params)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data: BlogListResponse;

  try {
    data = await response.json();
  } catch {
    throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
  }

  if (!response.ok || !data.success) {
    throw new Error(
      (data as BlogListResponse & { message?: string }).message ||
        "خطا در دریافت مقالات",
    );
  }

  return data;
}

// =========================
// GET BLOG BY ID
// =========================

export async function getBlogById(id: string): Promise<Blog> {
  if (!id) {
    throw new Error("شناسه مقاله الزامی است.");
  }

  const response = await fetch(`/api/blogs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data: BlogResponse;

  try {
    data = await response.json();
  } catch {
    throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
  }

  if (!response.ok || !data.success) {
    throw new Error(
      (data as BlogResponse & { message?: string }).message ||
        "خطا در دریافت مقاله",
    );
  }

  return data.blog;
}
