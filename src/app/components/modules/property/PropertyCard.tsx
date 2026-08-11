import { MapPin, Bed, Bath, Users, Car, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/hooks/useProperties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property._id}`}
      className="
        block
        cursor-pointer
        group
      "
    >
      <div
        className="
          bg-white
          dark:bg-[#353535]
          rounded-2xl
          overflow-hidden
          flex
          flex-col
          transition
          duration-300
          group-hover:-translate-y-1
          group-hover:shadow-xl
        "
        style={{
          boxShadow: "0 2px 20px rgba(0,0,0,0.09)",
        }}
      >
        {/* Image */}
        <div className="relative h-[172px]">
          <Image
            src={property.images?.[0] || "/images/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover"
          />

          {/* Rating */}
          <div
            className="
              absolute
              top-2.5
              right-2.5
              flex
              items-center
              gap-1
              px-2.5
              py-[5px]
              rounded-full
              text-white
              text-xs
              font-bold
              bg-primary500
            "
          >
            <Star size={11} fill="white" strokeWidth={0} />
            <span>{property.rating}</span>
          </div>

          {/* Location */}
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              px-3
              py-2
              flex
              items-center
              justify-end
              gap-1
            "
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.52), transparent)",
            }}
          >
            <p
              className="
                text-white
                text-[11px]
                truncate
              "
            >
              {property.location?.city}
            </p>

            <MapPin size={11} className="text-white shrink-0" />
          </div>
        </div>

        {/* Body */}
        <div
          className="
            px-4
            pt-3
            pb-4
            flex
            flex-col
            gap-3
          "
        >
          {/* Title */}
          <h3
            className="
              text-gray-900
              dark:text-white
              font-bold
              text-[15px]
              text-right
              line-clamp-2
            "
          >
            {property.title}
          </h3>

          {/* Facilities */}
          <div
            className="
              flex
              items-center
              justify-end
              gap-2
              text-gray-500
              dark:text-white
              text-[11px]
            "
          >
            <span className="flex items-center gap-[3px]">
              <Bed size={12} />
              {property.facilities?.bedrooms} خواب
            </span>

            <span>|</span>

            <span className="flex items-center gap-[3px]">
              <Bath size={12} />
              {property.facilities?.bathrooms} حمام
            </span>

            <span>|</span>

            <span className="flex items-center gap-[3px]">
              <Users size={12} />
              {property.facilities?.capacity} نفر
            </span>

            <span>|</span>

            <span className="flex items-center gap-[3px]">
              <Car size={12} />
              {property.facilities?.parking ? "دارد" : "ندارد"}
            </span>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-600" />

          {/* Price */}
          <div
            className="
              flex
              items-center
              justify-between
              bg-[#EDEDED]
              dark:bg-[#272727]
              rounded-xl
              px-3
            "
          >
            <span
              className="
                text-[11px]
                py-3
                text-gray-500
                dark:text-white
              "
            >
              اجاره شبانه
            </span>

            <span
              className="
                text-sm
                font-bold
                text-gray-800
                dark:text-white
              "
            >
              {property.pricing?.daily?.toLocaleString()} تومان
            </span>
          </div>

          {/* Details */}
          <span
            className="
              text-center
              text-xs
              text-primary500
              mt-1
              group-hover:underline
            "
          >
            مشاهده جزئیات
          </span>
        </div>
      </div>
    </Link>
  );
}
