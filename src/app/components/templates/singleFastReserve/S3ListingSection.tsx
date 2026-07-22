"use client";

import { ChevronLeft } from "lucide-react";
import { listingItems } from "./constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Card from "./S3Card";

export default function S3ListingSection() {
  return (
    <section className="mb-10" dir="rtl">
      <div className="mb-5">
        <button className="flex items-center justify-center w-10 h-8 rounded-full border border-gray-300 dark:border-[#353535] bg-white dark:bg-[#272727]">
          <ChevronLeft size={16} />
        </button>
      </div>

      <Swiper
        className="listing-swiper !pb-10"
        modules={[FreeMode, Pagination]}
        freeMode={true}
        grabCursor={true}
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
        {listingItems.map((item) => (
          <SwiperSlide key={item.id}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
