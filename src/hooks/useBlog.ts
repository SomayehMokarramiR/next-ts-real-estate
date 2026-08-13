"use client";

import { useQuery } from "@tanstack/react-query";

import { getBlogById } from "@/services/blogService";
import { blogKeys } from "./useBlogs";

export function useBlog(id: string) {
  return useQuery({
    queryKey: blogKeys.detail(id),

    queryFn: () => getBlogById(id),

    enabled: Boolean(id),

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,

    retry: 2,
  });
}
