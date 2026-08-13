import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getReviews,
  createReview,
  type CreateReviewPayload,
} from "../services/reviewService";

// =========================
// REVIEW QUERY KEYS
// =========================

export const reviewKeys = {
  all: ["reviews"] as const,
  approved: ["reviews", "approved"] as const,
  admin: ["reviews", "admin"] as const,
};

// =========================
// GET REVIEWS
// =========================

export function useReviews() {
  return useQuery({
    queryKey: reviewKeys.approved,
    queryFn: getReviews,

    // کش تا 5 دقیقه معتبر باشد
    staleTime: 1000 * 60 * 5,

    // با برگشت به تب دوباره خودکار درخواست ندهد
    refetchOnWindowFocus: false,

    // در صورت خطا 2 بار تلاش کند
    retry: 2,
  });
}

// =========================
// CREATE REVIEW
// =========================

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewPayload) => createReview(data),

    onSuccess: () => {
      // cache تمام queryهای reviews را stale می‌کند
      queryClient.invalidateQueries({
        queryKey: reviewKeys.all,
      });
    },
  });
}
