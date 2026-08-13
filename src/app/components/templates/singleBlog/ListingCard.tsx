"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useBlogs } from "@/hooks/useBlogs";
import RelatedBlogCard from "./RelatedBlogCard";

interface ListingCardProps {
  category?: string;
  currentBlogId?: string;
}

export default function ListingCard({
  category,
  currentBlogId,
}: ListingCardProps) {
  const { data, isLoading } = useBlogs({
    category,
    page: 1,
    limit: 6,
    sort: "latest",
  });

  const relatedBlogs =
    data?.blogs?.filter((blog) => blog._id !== currentBlogId) ?? [];

  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          مقالات مشابه
        </h2>

        <Link
          href="/blog"
          className="
            flex
            items-center
            justify-center
            gap-2
            h-8
            rounded-full
            border
            border-primary500
            bg-white
            dark:bg-[#272727]
            px-3
          "
        >
          <span className="text-xs font-semibold text-primary500">
            مشاهده همه
          </span>

          <ChevronLeft size={16} className="text-primary500" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                h-72
                rounded-2xl
                bg-gray-200
                dark:bg-[#353535]
                animate-pulse
              "
            />
          ))}
        </div>
      ) : relatedBlogs.length > 0 ? (
        <Swiper
          className="listing-swiper !pb-10"
          modules={[FreeMode, Pagination]}
          freeMode
          grabCursor
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {relatedBlogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <RelatedBlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-10 text-sm text-gray-400">
          مقاله مشابهی یافت نشد.
        </div>
      )}
    </section>
  );
}
