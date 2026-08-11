"use client";

import Image from "next/image";

import ReviewCard from "./ReviewCard";
import { useReviews } from "@/hooks/useReviews";

export default function CredibilitySection() {
  const { data: reviews = [], isLoading } = useReviews();

  return (
    <section
      className="
        relative
        w-full
        bg-white
        dark:bg-[#272727]
        overflow-hidden
        min-h-[900px]
        md:min-h-[650px]
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/credibilityBg.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
        "
        style={{
          backgroundColor: "rgba(10,50,50,0.72)",
        }}
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          items-start
          gap-12
          px-6
          py-16
          md:grid-cols-2
        "
      >
        {/* Right */}
        <div className="text-right md:pt-6">
          <h2
            className="
              mb-6
              text-3xl
              font-bold
              leading-snug
              text-white
              md:text-4xl
            "
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            رضایت شما اعتبار ماست
          </h2>

          <p
            className="
              text-sm
              leading-8
              text-white/75
            "
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            پیدا کردن ویلای مناسب همیشه کار راحتی نیست، ما اینجاییم تا همه چیز
            رو برای شما ساده کنیم. فقط بهترین و معتبرترین گزینه‌ها رو گلچین
            می‌کنیم تا وقت ارزشمندتون صرف جستجوی بی‌پایان نشه.
          </p>
        </div>

        {/* Left - Reviews */}
        <div className="flex flex-col">
          {isLoading && (
            <p className="text-white text-center">در حال بارگذاری نظرات...</p>
          )}

          {!isLoading &&
            reviews
              .slice(0, 3)
              .map((review) => <ReviewCard key={review._id} review={review} />)}

          {!isLoading && reviews.length === 0 && (
            <p className="text-white/70 text-center">هنوز نظری ثبت نشده است</p>
          )}
        </div>
      </div>
    </section>
  );
}
