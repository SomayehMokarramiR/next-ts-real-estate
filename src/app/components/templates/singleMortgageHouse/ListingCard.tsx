"use client";

import { ChevronLeft } from "lucide-react";
import { listingItems } from "./constants";
import S3Card from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";

export default function ListingCard() {
  return (
    <section className="mb-10" dir="rtl">
      <div className="mb-5">
        <button className="flex items-center justify-center w-10 h-8 rounded-full border border-gray-300 bg-white">
          <ChevronLeft size={16} />
        </button>
      </div>

      <Swiper
        className="overflow-hidden!"
        modules={[FreeMode]}
        freeMode={true}
        grabCursor={true}
        spaceBetween={16}
        slidesPerView={1.2}
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
            <S3Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
