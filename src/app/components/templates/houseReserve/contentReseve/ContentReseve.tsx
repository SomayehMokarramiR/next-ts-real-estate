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

import {
  useProperties,
  type Property,
  type PropertiesResponse,
} from "@/hooks/useProperties";

type Props = {
  filters?: Record<string, string>;
};

// ===============================
// FORMAT PRICE
// ===============================

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

// ===============================
// COMPONENT
// ===============================

export default function ContentReseve({ filters = {} }: Props) {
  const [activePin, setActivePin] = useState<string | null>(null);
  // ===============================
  // GET PROPERTIES
  // ===============================

  const { data, isLoading, error } = useProperties({
    limit: "100",
    reserve: "true",
    bookingType: "daily",
  });
  const properties: Property[] =
    (data as PropertiesResponse | undefined)?.properties ?? [];

  const apiProperties = properties.filter((property) => {
    const dailyPrice = Number(property.pricing?.daily ?? 0);

    return dailyPrice > 0 && property.status !== "inactive";
  });

  const displayedProperties = apiProperties
    .filter((property) => {
      const search = filters.search?.trim().toLowerCase() || "";

      const selectedCity = filters.city?.trim().toLowerCase() || "";

      const title = property.title?.trim().toLowerCase() || "";

      const city = property.location?.city?.trim().toLowerCase() || "";

      const address = property.location?.address?.trim().toLowerCase() || "";

      // سرچ نام، شهر، آدرس
      const searchMatch =
        !search ||
        title.includes(search) ||
        city.includes(search) ||
        address.includes(search);

      // فیلتر شهر انتخابی
      const cityMatch = !selectedCity || city === selectedCity;

      // قیمت
      const price = Number(property.pricing?.daily ?? 0);

      const min = Number(filters.minPrice || 0);

      const max = Number(filters.maxPrice || Infinity);

      const priceMatch = price >= min && price <= max;

      // امکانات
      const facility = filters.facilities?.trim();

      const facilityMatch =
        !facility ||
        (facility === "استخر" && property.facilities?.pool === true) ||
        (facility === "پارکینگ" && property.facilities?.parking === true);

      // امتیاز
      const ratingValue = filters.rating
        ? Number(filters.rating.split(" ")[0])
        : 0;

      const ratingMatch =
        !filters.rating || Number(property.rating ?? 0) >= ratingValue;

      console.log("RATING TEST", {
        title: property.title,
        propertyRating: property.rating,
        filterRating: filters.rating,
      });

      return (
        searchMatch && cityMatch && priceMatch && facilityMatch && ratingMatch
      );
    })
    .sort((a, b) => {
      if (filters.sort === "محبوب‌ترین") {
        return Number(b.views ?? 0) - Number(a.views ?? 0);
      }

      if (filters.sort === "ارزان‌ترین") {
        return Number(a.pricing?.daily ?? 0) - Number(b.pricing?.daily ?? 0);
      }

      return 0;
    });

  const activeProp = apiProperties.find((item) => item._id === activePin);

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
          text-sm
          text-gray-500
        "
      >
        در حال دریافت اقامتگاه‌های قابل رزرو...
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
          text-sm
          text-red-500
        "
      >
        خطا در دریافت اقامتگاه‌های قابل رزرو
      </div>
    );
  }
  return (
    <div
      className="
      flex
      flex-col
      min-[1200px]:flex-row
      gap-4
    "
      dir="rtl"
    >
      {/* LIST */}

      <div
        className="
        flex-1
        px-3
        py-12
        lg:px-4
        grid
        grid-cols-1
        min-[700px]:grid-cols-2
        min-[1200px]:grid-cols-1
        gap-3
        content-start
      "
      >
        {displayedProperties.length === 0 ? (
          <div
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
              text-center
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-gray-700
                  dark:text-white
                "
              >
                اقامتگاه قابل رزروی پیدا نشد
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-gray-400
                "
              >
                هیچ ویلای قابل رزرو در حال حاضر موجود نیست.
              </p>
            </div>
          </div>
        ) : (
          displayedProperties.map((property) => (
            <div
              key={property._id}
              onMouseEnter={() => setActivePin(property._id)}
              onClick={() => setActivePin(property._id)}
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
                  activePin === property._id
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
                  src={property.images?.[0] || "/images/placeholder.jpg"}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}

              <div
                className="
                  flex-1
                  min-w-0
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
                  {property.rating ?? 0}
                  ستاره
                </div>

                {/* TITLE */}

                <h3
                  className="
                    font-bold
                    text-base
                    truncate
                    text-gray-900
                    dark:text-white
                  "
                >
                  {property.title}
                </h3>

                {/* LOCATION */}

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    text-gray-400
                  "
                >
                  <MapPin size={13} />

                  <span
                    className="
                      text-xs
                      truncate
                    "
                  >
                    {property.location?.address ||
                      property.location?.city ||
                      "بدون آدرس"}
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
                    dark:text-gray-300
                  "
                >
                  <span
                    className="
                      flex
                      gap-1
                      items-center
                    "
                  >
                    <Home size={13} />
                    {property.facilities?.bedrooms ?? 0}
                    اتاق
                  </span>

                  <span>|</span>

                  <span
                    className="
                      flex
                      gap-1
                      items-center
                    "
                  >
                    <Bath size={13} />
                    {property.facilities?.bathrooms ?? 0}
                    حمام
                  </span>

                  <span>|</span>

                  <span
                    className="
                      flex
                      gap-1
                      items-center
                    "
                  >
                    <Users size={13} />
                    {property.facilities?.capacity ?? 0}
                    نفر
                  </span>

                  <span>|</span>

                  <span
                    className="
                      flex
                      gap-1
                      items-center
                    "
                  >
                    <Car size={13} />

                    {property.facilities?.parking ? "پارکینگ" : "بدون پارکینگ"}
                  </span>
                </div>
                {/* SEPARATOR */}

                <div
                  className="
                    border-t
                    border-dashed
                    border-gray-200
                    dark:border-gray-600
                  "
                />

                {/* PRICE */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-2
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
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {formatPrice(Number(property.pricing?.daily ?? 0))}
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

                  {/* RESERVE BUTTON */}

                  <Link
                    href={`/single-reserve-house/${property._id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className="
                      text-primary500
                      text-xs
                      flex
                      items-center
                      gap-1
                      whitespace-nowrap
                    "
                  >
                    رزرو
                    <ChevronLeft size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* MAP */}

      <div
        className="
          relative
          mt-12
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
          sizes="100vw"
          className="object-cover"
        />

        {/* MAP PINS */}

        {apiProperties.map((property) => (
          <div
            key={property._id}
            className="
                absolute
                z-10
              "
            style={{
              top: property.mapPosition?.top || "50%",

              left: property.mapPosition?.left || "50%",
            }}
          >
            <MapPinCmp
              active={activePin === property._id}
              onClick={() => setActivePin(property._id)}
            />
          </div>
        ))}

        {/* POPUP */}

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
                  relative
                  bg-white
                  rounded-xl
                  shadow-xl
                  overflow-hidden
                "
            >
              {/* IMAGE */}

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

              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setActivePin(null)}
                className="
                    absolute
                    top-2
                    left-2
                    bg-white
                    rounded-full
                    p-1
                    shadow
                    z-10
                  "
                aria-label="بستن"
              >
                <X size={12} />
              </button>

              {/* CONTENT */}

              <div className="p-3" dir="rtl">
                <p
                  className="
                      text-xs
                      font-bold
                    "
                >
                  {activeProp.title}
                </p>

                <p
                  className="
                      mt-1
                      text-[11px]
                      text-primary500
                    "
                >
                  قابل رزرو
                </p>

                <Link
                  href={`/single-reserve-house/${activeProp._id}`}
                  className="
                      text-primary500
                      text-xs
                      mt-2
                      flex
                      gap-1
                      items-center
                    "
                >
                  رزرو اقامتگاه
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
