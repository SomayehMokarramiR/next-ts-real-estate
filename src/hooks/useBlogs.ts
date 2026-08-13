"use client";

import { useQuery } from "@tanstack/react-query";

import { getBlogs, type BlogListParams } from "@/services/blogService";

// =========================
// BLOG QUERY KEYS
// =========================

export const blogKeys = {
  all: ["blogs"] as const,

  lists: () => [...blogKeys.all, "list"] as const,

  list: (params?: BlogListParams) =>
    [...blogKeys.lists(), params ?? {}] as const,

  details: () => [...blogKeys.all, "detail"] as const,

  detail: (id: string) => [...blogKeys.details(), id] as const,
};

// =========================
// GET BLOGS
// =========================

export function useBlogs(params?: BlogListParams) {
  return useQuery({
    queryKey: blogKeys.list(params),

    queryFn: () => getBlogs(params),

    // تا ۵ دقیقه داده fresh محسوب شود
    staleTime: 1000 * 60 * 5,

    // هنگام برگشت به پنجره دوباره خودکار fetch نکند
    refetchOnWindowFocus: false,

    // در صورت خطا ۲ بار تلاش کند
    retry: 2,

    // هنگام تغییر page/filter داده قبلی را نگه دارد
    placeholderData: (previousData) => previousData,
  });
}
