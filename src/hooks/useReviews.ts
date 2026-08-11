import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getReviews,
  createReview,
  type CreateReviewPayload,
} from "../services/reviewService.ts";

// =========================
// GET REVIEWS HOOK
// =========================

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],

    queryFn: getReviews,

    // کش تا 5 دقیقه معتبر باشد
    staleTime: 1000 * 60 * 5,

    // هنگام برگشت کاربر دوباره خودکار چک کند
    refetchOnWindowFocus: false,

    // در صورت خطا 2 بار تلاش کند
    retry: 2,
  });
}

// =========================
// CREATE REVIEW HOOK
// =========================

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewPayload) => createReview(data),

    onSuccess: () => {
      // بعد از ثبت نظر، کش قبلی پاک شود
      // و لیست جدید از API گرفته شود
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
}
