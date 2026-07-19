"use client";

import { ChevronLeft } from "lucide-react";
import { listingItems } from "./constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Card from "./Card";

export default function ListingCard() {
  return (
    <section className="mb-10">
      <div className="mb-5 flex justify-end">
        <button className="flex items-center justify-end gap-2 w-auto h-8 rounded-full border border-primary500 bg-white px-3">
          <span className="primary-font-semibold text-xs text-primary500">
            مشاهده همه
          </span>
          <ChevronLeft size={16} className="text-primary500" />
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
