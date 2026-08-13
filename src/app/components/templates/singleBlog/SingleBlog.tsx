"use client";

import { Calendar, Clock, Copy, Eye, Share2 } from "lucide-react";
import Swal from "sweetalert2";

import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";
import ListingCard from "./ListingCard";

import { useBlog } from "@/hooks/useBlog";

interface SingleBlogProps {
  id: string;
}

function ArticleHero({
  title,
  date,
  minutes,
  image,
  views,
}: {
  title: string;
  date: string;
  minutes: number;
  image: string;
  views: number;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      Swal.fire({
        icon: "success",
        title: "لینک کپی شد",
        text: "لینک مقاله با موفقیت کپی شد.",
        confirmButtonText: "باشه",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "کپی کردن لینک انجام نشد.",
        confirmButtonText: "باشه",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: title,
          url: window.location.href,
        });

        return;
      }

      await navigator.clipboard.writeText(window.location.href);

      Swal.fire({
        icon: "success",
        title: "لینک کپی شد",
        text: "امکان اشتراک‌گذاری مستقیم وجود ندارد؛ لینک مقاله کپی شد.",
        confirmButtonText: "باشه",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      // لغو Share توسط کاربر
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8" dir="rtl">
      <div
        className="
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-5
          mb-6
          pb-4
        "
      >
        {/* Article info */}
        <div className="mt-4 sm:mt-8 flex-1">
          <h1
            className="
              text-xl
              sm:text-2xl
              md:text-3xl
              font-bold
              text-gray-900
              dark:text-white
              mb-4
              leading-relaxed
            "
          >
            {title}
          </h1>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
              text-sm
              text-[#80838D]
            "
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>

            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {views.toLocaleString("fa-IR")} بازدید
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              h-7
              w-[80px]
              sm:h-8
              sm:w-[100px]
              rounded-full
              bg-primary500
              text-white
              text-[11px]
              sm:text-xs
              font-medium
              flex
              items-center
              justify-center
              gap-1
            "
          >
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {minutes} دقیقه
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              aria-label="کپی لینک مقاله"
              className="
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-full
                border
                border-primary500
                flex
                items-center
                justify-center
                text-primary500
                hover:bg-primary500/10
                transition-colors
              "
            >
              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              aria-label="اشتراک‌گذاری مقاله"
              className="
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-full
                bg-primary500
                flex
                items-center
                justify-center
                text-white
                hover:bg-primary600
                transition-colors
              "
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-52
            sm:h-72
            md:h-96
            object-cover
          "
        />
      </div>
    </div>
  );
}

function ArticleContent({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <article className="max-w-6xl mx-auto px-4 mb-12" dir="rtl">
      <div className="max-w-none">
        <h2
          className="
            text-lg
            lg:text-[24px]
            font-semibold
            text-[#80838D]
            dark:text-white
            mb-6
          "
        >
          {title}
        </h2>

        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 10)}`}
              className="
                text-[#80838D]
                dark:text-[#CDCED6]
                leading-9
                text-sm
                sm:text-base
                mb-5
              "
            >
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-[#80838D] dark:text-[#CDCED6] leading-9">
            محتوای این مقاله در دسترس نیست.
          </p>
        )}
      </div>
    </article>
  );
}

function LoadingState() {
  return (
    <main className="pb-12">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <Breadcrumb />
      </div>

      <div className="max-w-6xl mx-auto px-4 animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between gap-5 mb-6">
          <div className="flex-1 space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-[#353535] rounded-lg" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-[#353535] rounded-lg" />
          </div>

          <div className="w-[100px] h-8 bg-gray-200 dark:bg-[#353535] rounded-full" />
        </div>

        <div className="h-52 sm:h-72 md:h-96 bg-gray-200 dark:bg-[#353535] rounded-2xl" />

        <div className="mt-10 space-y-4">
          <div className="h-7 w-1/3 bg-gray-200 dark:bg-[#353535] rounded-lg" />
          <div className="h-4 w-full bg-gray-200 dark:bg-[#353535] rounded-lg" />
          <div className="h-4 w-full bg-gray-200 dark:bg-[#353535] rounded-lg" />
          <div className="h-4 w-4/5 bg-gray-200 dark:bg-[#353535] rounded-lg" />
        </div>
      </div>
    </main>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <main className="pb-12">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <Breadcrumb />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 text-center" dir="rtl">
        <p className="text-sm text-red-500 mb-5">{message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="
            px-6
            py-2.5
            rounded-full
            bg-primary500
            text-white
            text-sm
            hover:bg-primary600
            transition-colors
          "
        >
          تلاش مجدد
        </button>
      </div>
    </main>
  );
}

export default function SingleBlog({ id }: SingleBlogProps) {
  const { data: blog, isLoading, isError, error, refetch } = useBlog(id);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !blog) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "مقاله موردنظر پیدا نشد."
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <main className="pb-12">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <Breadcrumb />
      </div>

      <ArticleHero
        title={blog.title}
        date={blog.date}
        minutes={blog.minutes}
        image={blog.image}
        views={blog.views}
      />

      <ArticleContent title={blog.title} content={blog.content} />

      <section className="max-w-6xl mx-auto px-4" dir="rtl">
        <ListingCard category={blog.category} currentBlogId={blog._id} />
      </section>
    </main>
  );
}
