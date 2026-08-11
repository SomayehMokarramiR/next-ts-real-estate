export interface Review {
  _id: string;
  text: string;
  author: string;
  date: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  count: number;
  reviews: Review[];
}

export interface CreateReviewPayload {
  text: string;
  author: string;
  date?: string;
  time?: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  review: Review;
}

// =========================
// GET REVIEWS
// =========================

export async function getReviews(): Promise<Review[]> {
  const response = await fetch("/api/reviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت نظرات");
  }

  const data: ReviewsResponse = await response.json();

  if (!data.success) {
    throw new Error("خطا در دریافت نظرات");
  }

  return data.reviews;
}

// =========================
// CREATE REVIEW
// =========================

export async function createReview(
  payload: CreateReviewPayload,
): Promise<Review> {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("خطا در ثبت نظر");
  }

  const data: CreateReviewResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || "خطا در ثبت نظر");
  }

  return data.review;
}
