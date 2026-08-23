"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Property } from "@/hooks/useProperties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div
      className="
        relative
        shrink-0
        w-[180px]
        sm:w-[200px]
        md:w-[220px]
        rounded-2xl
        overflow-hidden
        group
        cursor-pointer
        shadow-md
        hover:shadow-xl
        transition-shadow
        duration-300
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-56
          sm:h-64
          md:h-72
          lg:h-80
          w-full
          bg-gray-200
        "
      >
        <Image
          src={property.images?.[0] || "/images/placeholder.jpg"}
          alt={property.title || "ملک"}
          fill
          sizes="(max-width:640px) 100vw, 220px"
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* WHITE BOX */}
        <div
          className="
            absolute
            bottom-3
            left-3
            right-3
            rounded-xl
            bg-white/95
            dark:bg-[#353535]/95
            px-3
            py-2
            shadow-lg
            backdrop-blur-sm
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-2
            "
          >
            {/* TEXT */}
            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-xs
                  sm:text-sm
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {property.title}
              </h3>

              <p
                className="
                  mt-1
                  line-clamp-1
                  text-[11px]
                  text-gray-600
                  dark:text-gray-300
                "
              >
                {property.description || "ملک زیبا و مجهز"}
              </p>
            </div>

            {/* ARROW */}
            <Link
              href={`/properties/${property._id}`}
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#FFFFFA]
                border
                border-primary500
                text-primary500
                transition
                hover:bg-primary500
                hover:text-white
              "
              aria-label="مشاهده جزئیات"
            >
              <ArrowLeft size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
