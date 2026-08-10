"use client";

import { Bath, Bed, Car, MapPin, Star, Users } from "lucide-react";
import Link from "next/link";

type Offer = {
  _id: string;
  title: string;

  location:
    | {
        city?: string;
        address?: string;
      }
    | string;

  images?: string[];
  img?: string;

  rating: number;

  pricing?: {
    daily: number;
    oldPrice?: number;
    discount?: number;
  };

  price?: number;

  facilities?: {
    bedrooms?: number;
    bathrooms?: number;
    parking?: boolean;
    capacity?: number;
    pool?: boolean;
  };
};

export default function OfferCard({ offer }: { offer: Offer }) {
  const fmt = (n: number = 0) => n.toLocaleString("fa-IR");

  return (
    <Link
      href={`/properties/${offer._id}`}
      className="
      group
      bg-white
      dark:bg-[#1f1f1f]
      rounded-2xl
      overflow-hidden
      shadow-sm
      hover:shadow-xl
      transition
      flex
      flex-col
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={offer.images?.[0] || offer.img || "/images/placeholder.jpg"}
          alt={offer.title}
          className="
          w-full
          h-full
          object-cover
          group-hover:scale-105
          transition
          duration-300
          "
        />

        {/* Discount */}
        <div
          className="
          absolute
          top-3
          right-3
          bg-red-500
          text-white
          text-xs
          font-bold
          px-2.5
          py-1
          rounded-full
        "
        >
          %{offer.pricing?.discount ?? 0}
        </div>

        {/* Rating */}
        <div
          className="
          absolute
          top-3
          right-14
          bg-primary600
          text-white
          text-xs
          font-bold
          px-2.5
          py-1
          rounded-full
          flex
          items-center
          gap-1
        "
        >
          <Star size={11} fill="white" strokeWidth={0} />
          {offer.rating}
        </div>

        {/* Location */}
        <div
          className="
          absolute
          bottom-0
          left-0
          right-0
          bg-gradient-to-t
          from-black/70
          to-transparent
          px-3
          py-3
        "
        >
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-white text-xs line-clamp-1">
              {typeof offer.location === "string"
                ? offer.location
                : `${offer.location.city ?? ""} ${offer.location.address ?? ""}`}
            </span>

            <MapPin size={13} className="text-white" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <h3
          className="
        text-gray-900
        dark:text-white
        text-base
        font-bold
        text-right
        "
        >
          {offer.title}
        </h3>

        {/* Facilities */}

        <div
          className="
        flex
        justify-end
        gap-4
        text-gray-500
        text-xs
        border-t
        pt-3
        "
        >
          <span className="flex gap-1">
            {offer.facilities?.parking ? "دارد" : "ندارد"} پارکینگ
            <Car size={14} />
          </span>

          <span className="flex gap-1">
            {offer.facilities?.capacity ?? 0} نفر
            <Users size={14} />
          </span>

          <span className="flex gap-1">
            {offer.facilities?.bathrooms ?? 0} حمام
            <Bath size={14} />
          </span>

          <span className="flex gap-1">
            {offer.facilities?.bedrooms ?? 0} خواب
            <Bed size={14} />
          </span>
        </div>

        {/* Price */}

        <div
          className="
        flex
        items-center
        justify-between
        bg-[#EDEDED]
        dark:bg-[#353535]
        rounded-full
        px-3
        py-2
        text-sm
        "
        >
          <span className="line-through text-gray-400">
            {offer.pricing?.oldPrice
              ? `${fmt(offer.pricing.oldPrice)} تومان`
              : ""}
          </span>

          <span className="font-bold text-gray-900 dark:text-white">
            {fmt(offer.pricing?.daily ?? offer.price ?? 0)}
            {" تومان / هر شب"}
          </span>
        </div>
      </div>
    </Link>
  );
}
