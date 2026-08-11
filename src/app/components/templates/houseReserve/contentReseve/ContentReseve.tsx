"use client";

import {
  MapPin,
  Star,
  Home,
  Bath,
  Users,
  Car,
  ChevronLeft,
  X,
} from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import MapPinCmp from "./MapPinCmp";
import { useProperties } from "@/hooks/useProperties";

interface Property {
  _id: string;

  title: string;

  images?: string[];

  rating?: number;

  views?: number;

  location?: {
    address?: string;
    city?: string;
  };

  facilities?: {
    bedrooms?: number;
    bathrooms?: number;
    parking?: boolean;
    pool?: boolean;
    capacity?: number;
  };

  pricing?: {
    daily?: number;
  };

  mapPosition?: {
    top?: string;
    left?: string;
  };
}

type Props = {
  filters?: Record<string, string>;
};

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default function ContentReseve({ filters = {} }: Props) {
  const [activePin, setActivePin] = useState<string | null>(null);

  const { data, isLoading, error } = useProperties(filters);

  const apiProperties: Property[] = data ?? [];

  const activeProp = apiProperties.find((item) => item._id === activePin);

  console.log("FILTERS ===>", filters);
  console.log("PROPERTIES ===>", apiProperties);

  if (isLoading) {
    return <div>در حال دریافت اطلاعات...</div>;
  }

  if (error) {
    return <div>خطا در دریافت اطلاعات املاک</div>;
  }

  return (
    <div className="flex flex-col min-[1200px]:flex-row gap-4">
      {/* LIST */}

      <div
        className="
         flex-1
  px-3
  lg:px-4
  grid
  grid-cols-1
  min-[700px]:grid-cols-2
  min-[1200px]:grid-cols-1
  gap-3
  content-start
        "
      >
        {apiProperties.map((p) => (
          <div
            key={p._id}
            onMouseEnter={() => setActivePin(p._id)}
            className={`
            bg-white
            dark:bg-[#272727]
            rounded-2xl
            border
            overflow-hidden
            flex
            flex-row
            cursor-pointer
            min-h-[200px]



            ${
              activePin === p._id
                ? "border-primary500 shadow-md"
                : "border-gray-100 shadow-sm"
            }
            `}
          >
            {/* IMAGE */}

            <div
              className="
              relative
              w-[150px]
              lg:w-[180px]
              min-h-[200px]
              shrink-0
              "
            >
              <Image
                src={p.images?.[0] || "/images/placeholder.jpg"}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}

            <div
              className="
              flex-1
              p-3
              lg:p-4
              flex
              flex-col
              gap-2.5
              "
            >
              {/* RATING */}

              <div
                className="
                flex
                items-center
                gap-1
                bg-primary500
                text-white
                text-xs
                px-2
                py-1
                rounded-full
                w-fit
                "
              >
                <Star size={15} className="fill-white" />
                {p.rating ?? 0} ستاره
              </div>

              <h3
                className="
                font-bold
                text-base
                truncate
                "
              >
                {p.title}
              </h3>

              <div
                className="
                flex
                items-center
                gap-1
                text-gray-400
                "
              >
                <MapPin size={13} />

                <span className="text-xs truncate">
                  {p.location?.address || p.location?.city || "بدون آدرس"}
                </span>
              </div>

              {/* FEATURES */}

              <div
                className="
                flex
                flex-wrap
                gap-2
                text-xs
                text-gray-500
                "
              >
                <span className="flex gap-1">
                  <Home size={13} />
                  {p.facilities?.bedrooms ?? 0}
                  اتاق
                </span>

                <span>|</span>

                <span className="flex gap-1">
                  <Bath size={13} />
                  {p.facilities?.bathrooms ?? 0}
                  حمام
                </span>

                <span>|</span>

                <span className="flex gap-1">
                  <Users size={13} />
                  {p.facilities?.capacity ?? 0}
                  نفر
                </span>

                <span>|</span>

                <span className="flex gap-1">
                  <Car size={13} />

                  {p.facilities?.parking ? "پارکینگ" : "بدون پارکینگ"}
                </span>
              </div>

              <div
                className="
                border-t
                border-dashed
                border-gray-200
                "
              />

              {/* PRICE */}

              <div
                className="
                flex
                items-center
                justify-between
                "
              >
                <div
                  className="
                  bg-[#EDEDED]
                  dark:bg-[#353535]
                  rounded-full
                  px-3
                  h-[38px]
                  flex
                  items-center
                  gap-2
                  "
                >
                  <span
                    className="
                    font-bold
                    text-sm
                    "
                  >
                    {formatPrice(p.pricing?.daily ?? 0)}
                  </span>

                  <span
                    className="
                    text-gray-400
                    text-xs
                    "
                  >
                    تومان / شب
                  </span>
                </div>

                <Link
                  href={`/properties/${p._id}`}
                  className="
                  text-primary500
                  text-xs
                  flex
                  items-center
                  gap-1
                  "
                >
                  جزئیات
                  <ChevronLeft size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MAP */}

      <div
        className="
        relative
        w-full
        h-[350px]
        rounded-2xl
        overflow-hidden
        min-[1200px]:w-[42%]
        min-[1200px]:h-[700px]
        "
      >
        <Image
          src="/images/mapImg.png"
          alt="map"
          fill
          className="object-cover"
        />

        {apiProperties.map((p) => (
          <div
            key={p._id}
            className="absolute z-10"
            style={{
              top: p.mapPosition?.top || "50%",
              left: p.mapPosition?.left || "50%",
            }}
          >
            <MapPinCmp
              active={activePin === p._id}
              onClick={() => setActivePin(p._id)}
            />
          </div>
        ))}

        {activeProp && (
          <div
            className="
            absolute
            z-20
            w-56
            -translate-x-1/2
            -translate-y-full
            "
            style={{
              top: activeProp.mapPosition?.top || "50%",
              left: activeProp.mapPosition?.left || "50%",
            }}
          >
            <div
              className="
              bg-white
              rounded-xl
              shadow-xl
              overflow-hidden
              "
            >
              <Image
                src={activeProp.images?.[0] || "/images/placeholder.jpg"}
                alt={activeProp.title}
                width={400}
                height={300}
                className="
                w-full
                h-28
                object-cover
                "
              />

              <button
                onClick={() => setActivePin(null)}
                className="
                absolute
                top-2
                left-2
                bg-white
                rounded-full
                p-1
                "
              >
                <X size={12} />
              </button>

              <div className="p-3">
                <p
                  className="
                  text-xs
                  font-bold
                  "
                >
                  {activeProp.title}
                </p>

                <Link
                  href={`/properties/${activeProp._id}`}
                  className="
                  text-primary500
                  text-xs
                  mt-2
                  flex
                  gap-1
                  "
                >
                  جزئیات بیشتر
                  <ChevronLeft size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
