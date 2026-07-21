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

import { properties } from "./constants";
import MapPinCmp from "./MapPinCmp";

function formatPrice(number: number) {
  return number.toLocaleString("fa-IR");
}

export default function ContentReseve() {
  const [activePin, setActivePin] = useState<number>(1);

  const activeProp = properties.find((item) => item.id === activePin);

  return (
    <div
      className="
        flex
    flex-col
    min-[1200px]:flex-row
    overflow-hidden
    py-6
    lg:py-12
    gap-4
      "
    >
      {/* LIST */}

      <div
        className="
    flex-1
    px-3
    lg:px-4
    py-4
    order-2
    min-[1200px]:order-1
    grid
    grid-cols-1
    min-[700px]:grid-cols-2
    min-[1200px]:grid-cols-1
    gap-3
        "
      >
        {properties.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setActivePin(p.id)}
            className={`
            bg-white dark:bg-[#272727]
              rounded-2xl
              border
              overflow-hidden
              flex
              flex-row
              cursor-pointer
             transition-all
              h-auto
              min-h-[200px]
              min-[1200px]:h-[200px]
              min-w-0

  ${
    activePin === p.id
      ? "border-primary500 dark:border-primary600 shadow-md"
      : "border-gray-100 shadow-sm hover:shadow-md dark:border-[#353535]"
  }
`}
          >
            {/* IMAGE */}

            <div
              className="
               w-[150px]
    lg:w-[180px]
    h-full
    shrink-0
              "
            >
              <img
                src={p.image}
                alt={p.title}
                className="
                  w-full
                  h-full
                  object-cover
                  rounded-2xl
                "
              />
            </div>

            {/* CONTENT */}

            <div
              className="
                overflow-hidden
                flex-1
                min-w-0
                p-3
                lg:p-4
                flex
                flex-col
                gap-2.5
              "
            >
              {/* STAR */}

              <div
                className="
                  flex
                  items-center
                  gap-1
                  text-white
                  text-xs
                  font-semibold
                  px-2
                  py-1
                  rounded-full
                  bg-primary500
                  w-fit
                "
              >
                <Star size={16} className="fill-primary500 text-white" />

                <span>{p.stars} ستاره</span>
              </div>

              {/* TITLE */}

              <h3
                className="
                  text-base
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {p.title}
              </h3>

              {/* ADDRESS */}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  text-gray-400
                  dark:text-white
                "
              >
                <MapPin size={13} />

                <span className="text-xs">{p.address}</span>
              </div>

              {/* FEATURES */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-xs
                  text-gray-500
                  dark:text-white
                "
              >
                <span className="flex items-center gap-1">
                  <Home size={13} />
                  {p.yard} حیاط
                </span>

                <span>|</span>

                <span className="flex items-center gap-1">
                  <Bath size={13} />
                  {p.bath} حمام
                </span>

                <span>|</span>

                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {p.persons} نفر
                </span>

                <span>|</span>

                <span className="flex items-center gap-1">
                  <Car size={13} />
                  {p.parking} پارکینگ
                </span>
              </div>

              <div className="border-t border-dashed border-gray-100" />

              {/* PRICE */}
              {/* PRICE */}

              <div
                className="
    flex
    items-center
    justify-between
    gap-2
    min-w-0
    max-[1100px]:min-[701px]:flex-col
    max-[1100px]:min-[701px]:items-stretch
  "
              >
                {/* PRICE BOX */}

                <div
                  className="
      flex
      items-center
      justify-center
      gap-1.5
      bg-[#EDEDED]
      dark:bg-[#353535]
      rounded-full
      px-2
      h-[38px]
      min-w-0
      w-full
      overflow-hidden
      min-[1101px]:flex-1
    "
                >
                  {p.discount && (
                    <span
                      className="
          bg-red-500
          text-white
          text-[10px]
          w-[28px]
          h-[18px]
          flex
          items-center
          justify-center
          rounded
          shrink-0
        "
                    >
                      ٪{p.discount}
                    </span>
                  )}

                  {p.originalPrice && (
                    <span
                      className="
          text-gray-400
          dark:text-white
          text-[11px]
          line-through
          shrink-0
        "
                    >
                      {formatPrice(p.originalPrice)}
                    </span>
                  )}

                  <span
                    className="
        font-bold
        text-sm
        text-gray-900
        dark:text-white
        whitespace-nowrap
        shrink-0
        max-[800px]:text-xs
      "
                  >
                    {formatPrice(p.price)}
                  </span>

                  <span
                    className="
        text-gray-400
        text-[11px]
        whitespace-nowrap
        shrink-0
        max-[800px]:text-[10px]
      "
                  >
                    تومان / {p.type === "monthly" ? "ماه" : "شب"}
                  </span>
                </div>

                {/* LINK */}

                <Link
                  href={`/properties/${p.id}`}
                  className="
      flex
      items-center
      justify-end
      gap-1
      text-xs
      text-primary500
      whitespace-nowrap
      shrink-0
      max-[1100px]:min-[701px]:w-full
    "
                >
                  {p.type === "monthly" ? "اجاره ماهیانه" : "مشاهده جزئیات"}

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
    order-1
    min-[1200px]:order-2
    min-[1200px]:w-[42%]
    min-[1200px]:h-[700px]
    shrink-0
  "
      >
        <img
          src="/images/mapImg.png"
          alt="map"
          className="
      w-full
      h-full
      object-cover
    "
        />

        {/* PINS */}
        {properties.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              top: p.mapPosition.top,
              left: p.mapPosition.left,
            }}
          >
            <MapPinCmp
              active={activePin === p.id}
              onClick={() => setActivePin(p.id)}
            />
          </div>
        ))}

        {/* POPUP */}
        {activeProp && (
          <div
            className="
        hidden
        md:block
        absolute
        z-30
        w-56
        -translate-x-1/2
        -translate-y-full
        -mt-4
      "
            style={{
              top: activeProp.mapPosition.top,
              left: activeProp.mapPosition.left,
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
              {/* IMAGE */}
              <div className="relative h-28">
                <img
                  src={activeProp.image}
                  alt={activeProp.title}
                  className="
              w-full
              h-full
              object-cover
            "
                />

                <button
                  onClick={() => setActivePin(0)}
                  className="
              absolute
              top-2
              left-2
              bg-white
              rounded-full
              p-1
              shadow
            "
                >
                  <X size={12} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-3">
                <p
                  className="
              text-xs
              font-bold
              text-gray-900
            "
                >
                  {activeProp.title}
                </p>

                <div
                  className="
              flex
              items-center
              gap-1
              text-gray-400
              mt-2
            "
                >
                  <MapPin size={10} />

                  <span className="text-[10px]">{activeProp.address}</span>
                </div>

                <Link
                  href={`/properties/${activeProp.id}`}
                  className="
              mt-2
              text-primary500
              text-xs
              flex
              items-center
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
