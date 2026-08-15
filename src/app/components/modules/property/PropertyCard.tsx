"use client";

import { MapPin, Bed, Bath, Users, Car, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Property } from "@/app/components/templates/properties/types/property";

import PropertyFavoriteButton from "../../templates/properties/PropertyFavoriteButton";

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  const transactionLabels: Record<
    NonNullable<Property["transactionType"]>,
    string
  > = {
    rent: "اجاره",
    mortgage: "رهن کامل",
    "rent-mortgage": "رهن و اجاره",
    sale: "فروش",
  };

  const transactionLabel = property.transactionType
    ? transactionLabels[property.transactionType]
    : "";

  const monthlyRent = property.pricing?.monthly;
  const mortgage = property.pricing?.mortgage;
  const dailyPrice = property.pricing?.daily;

  const showMonthlyRent =
    property.transactionType === "rent" ||
    property.transactionType === "rent-mortgage";

  const showMortgage =
    property.transactionType === "mortgage" ||
    property.transactionType === "rent-mortgage";

  const showDailyPrice = !monthlyRent && !mortgage && Boolean(dailyPrice);

  return (
    <div className="block group">
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
        {/* IMAGE */}

        <div className="relative h-[172px]">
          <Link href={`/properties/${property._id}`}>
            <Image
              src={property.images?.[0] || "/images/placeholder.jpg"}
              alt={property.title || "اقامتگاه"}
              fill
              sizes="(max-width:768px)100vw,400px"
              className="object-cover"
            />
          </Link>

          {/* FAVORITE */}

          <PropertyFavoriteButton propertyId={property._id} />

          {/* RATING */}

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

            <span>{property.rating ?? 0}</span>
          </div>

          {/* LOCATION */}

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
            <p className="text-white text-[11px] truncate">
              {property.location?.city || "نامشخص"}
            </p>

            <MapPin size={11} className="text-white shrink-0" />
          </div>
        </div>

        {/* BODY */}

        <Link href={`/properties/${property._id}`}>
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
              {property.title || "اقامتگاه بدون عنوان"}
            </h3>

            {transactionLabel && (
              <div className="flex justify-end">
                <span
                  className="
                    text-[10px]
                    px-2.5
                    py-1
                    rounded-full
                    bg-primary500/10
                    text-primary500
                  "
                >
                  {transactionLabel}
                </span>
              </div>
            )}

            <div
              className="
                flex
                items-center
                justify-end
                gap-2
                text-gray-500
                dark:text-white
                text-[11px]
                flex-wrap
              "
            >
              <span className="flex items-center gap-[3px]">
                <Bed size={12} />
                {property.facilities?.bedrooms ?? 0} خواب
              </span>

              <span>|</span>

              <span className="flex items-center gap-[3px]">
                <Bath size={12} />
                {property.facilities?.bathrooms ?? 0} حمام
              </span>

              <span>|</span>

              <span className="flex items-center gap-[3px]">
                <Users size={12} />
                {property.facilities?.capacity ?? 0} نفر
              </span>

              <span>|</span>

              <span className="flex items-center gap-[3px]">
                <Car size={12} />
                {property.facilities?.parking ? "دارد" : "ندارد"}
              </span>
            </div>

            <div
              className="
                border-t
                border-gray-100
                dark:border-gray-600
              "
            />

            <div
              className="
                flex
                flex-col
                gap-1.5
                bg-[#EDEDED]
                dark:bg-[#272727]
                rounded-xl
                px-3
                py-2.5
              "
            >
              {showMonthlyRent && (
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">اجاره ماهانه</span>

                  <span className="font-bold">
                    {monthlyRent
                      ? `${monthlyRent.toLocaleString("fa-IR")} تومان`
                      : "توافقی"}
                  </span>
                </div>
              )}

              {showMortgage && (
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">مبلغ رهن</span>

                  <span className="font-bold">
                    {mortgage
                      ? `${mortgage.toLocaleString("fa-IR")} تومان`
                      : "توافقی"}
                  </span>
                </div>
              )}

              {showDailyPrice && (
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">اجاره شبانه</span>

                  <span className="font-bold">
                    {dailyPrice!.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}
            </div>

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
        </Link>
      </div>
    </div>
  );
}
