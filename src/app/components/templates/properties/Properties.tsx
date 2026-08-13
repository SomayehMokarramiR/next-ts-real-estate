"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";

interface PropertyLocation {
  city?: string;
  address?: string;
  province?: string;
}

interface PropertyFacilities {
  capacity?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  parking?: boolean;
  pool?: boolean;
}

interface Property {
  _id: string;
  title: string;
  description?: string;
  type?: string;
  image?: string;
  images?: string[];
  location?: PropertyLocation;
  facilities?: PropertyFacilities;
  status?: "available" | "reserved" | "inactive";
  createdAt?: string;
}

interface PropertiesProps {
  filters?: {
    city?: string;
    guests?: string;
    type?: string;
  };
}

interface PropertiesResponse {
  success: boolean;
  properties: Property[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  message?: string;
}

const ITEMS_PER_PAGE = 6;

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "آپارتمان",
  villa: "ویلا",
  house: "خانه",
  hotel: "هتل",
  suite: "سوئیت",
};

function getPropertyImage(property: Property) {
  if (property.image) {
    return property.image;
  }

  if (property.images?.length) {
    return property.images[0];
  }

  return "/images/galary1.png";
}

function getPropertyType(type?: string) {
  if (!type) {
    return "ملک";
  }

  return PROPERTY_TYPE_LABELS[type] ?? type;
}

export default function Properties({ filters }: PropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("page", String(currentPage));
        params.set("limit", String(ITEMS_PER_PAGE));

        if (filters?.city?.trim()) {
          params.set("city", filters.city.trim());
        }

        if (filters?.guests?.trim()) {
          params.set("guests", filters.guests.trim());
        }

        if (filters?.type?.trim()) {
          params.set("type", filters.type.trim());
        }

        const response = await fetch(`/api/properties?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });

        const data: PropertiesResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "خطا در دریافت املاک");
        }

        if (cancelled) {
          return;
        }

        setProperties(data.properties ?? []);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);

        if (data.currentPage) {
          setCurrentPage(data.currentPage);
        }
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(err instanceof Error ? err.message : "خطا در دریافت املاک");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, [currentPage, filters?.city, filters?.guests, filters?.type]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4" dir="rtl">
        <div className="mb-6">
          <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-[#353535] animate-pulse" />
          <div className="mt-2 h-4 w-28 rounded bg-gray-200 dark:bg-[#353535] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({
            length: ITEMS_PER_PAGE,
          }).map((_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                dark:border-[#353535]
                bg-white
                dark:bg-[#272727]
                animate-pulse
              "
            >
              <div className="h-52 bg-gray-200 dark:bg-[#353535]" />

              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-[#353535]" />
                <div className="h-3 w-full rounded bg-gray-200 dark:bg-[#353535]" />
                <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-[#353535]" />
                <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-[#353535]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20" dir="rtl">
        <div className="text-center">
          <p className="mb-5 text-sm text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="
              rounded-full
              bg-primary500
              px-6
              py-2.5
              text-sm
              text-white
              hover:bg-primary600
            "
          >
            تلاش مجدد
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4" dir="rtl">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            همه املاک
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {total.toLocaleString("fa-IR")} ملک یافت شد
          </p>
        </div>

        {totalPages > 1 && (
          <span className="text-xs text-gray-400">
            صفحه {currentPage.toLocaleString("fa-IR")} از{" "}
            {totalPages.toLocaleString("fa-IR")}
          </span>
        )}
      </div>

      {/* Empty */}
      {properties.length === 0 ? (
        <div className="py-24 text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-300" />

          <h2 className="text-lg font-bold text-gray-700 dark:text-white">
            ملکی پیدا نشد
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            فیلترها را تغییر دهید و دوباره امتحان کنید.
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => {
              const isAvailable = property.status === "available";

              const isReserved = property.status === "reserved";

              const isInactive = property.status === "inactive";

              return (
                <article
                  key={property._id}
                  className="
                    flex
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    dark:border-[#353535]
                    bg-white
                    dark:bg-[#272727]
                    shadow-sm
                    transition-shadow
                    hover:shadow-md
                  "
                >
                  {/* Image */}
                  <Link href={`/properties/${property._id}`}>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={getPropertyImage(property)}
                        alt={property.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          hover:scale-105
                        "
                      />

                      {/* Property type */}
                      <span
                        className="
                          absolute
                          right-3
                          top-3
                          rounded-full
                          bg-white/90
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-primary500
                          backdrop-blur-sm
                        "
                      >
                        {getPropertyType(property.type)}
                      </span>

                      {/* Status */}
                      {isReserved && (
                        <span
                          className="
                            absolute
                            bottom-3
                            right-3
                            rounded-full
                            bg-amber-500/90
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-white
                            backdrop-blur-sm
                          "
                        >
                          رزرو شده
                        </span>
                      )}

                      {isInactive && (
                        <span
                          className="
                            absolute
                            bottom-3
                            right-3
                            rounded-full
                            bg-red-500/90
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-white
                            backdrop-blur-sm
                          "
                        >
                          غیرفعال
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <Link href={`/properties/${property._id}`}>
                      <h2
                        className="
                          line-clamp-2
                          text-base
                          font-bold
                          leading-7
                          text-gray-900
                          dark:text-white
                          transition-colors
                          hover:text-primary500
                        "
                      >
                        {property.title}
                      </h2>
                    </Link>

                    {/* Location */}
                    {(property.location?.city ||
                      property.location?.address) && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin className="h-3.5 w-3.5 text-primary500" />

                        <span className="line-clamp-1">
                          {property.location?.city ||
                            property.location?.address}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {property.description && (
                      <p
                        className="
                          mt-3
                          mb-4
                          line-clamp-3
                          flex-1
                          text-xs
                          leading-6
                          text-gray-500
                          dark:text-[#CDCED6]
                        "
                      >
                        {property.description}
                      </p>
                    )}

                    {/* Facilities */}
                    <div className="mb-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-300">
                      {property.facilities?.capacity !== undefined && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {property.facilities.capacity} نفر
                        </span>
                      )}

                      {property.facilities?.bedrooms !== undefined && (
                        <span>{property.facilities.bedrooms} خواب</span>
                      )}

                      {property.facilities?.bathrooms !== undefined && (
                        <span>{property.facilities.bathrooms} حمام</span>
                      )}
                    </div>

                    {/* Details */}
                    <Link
                      href={`/properties/${property._id}`}
                      className="
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary500
                        text-sm
                        font-medium
                        text-white
                        transition-colors
                        hover:bg-primary600
                      "
                    >
                      مشاهده جزئیات
                      <ArrowLeft className="h-4 w-4" />
                    </Link>

                    {/* Status text */}
                    {isAvailable && (
                      <p className="mt-2 text-center text-[11px] text-primary500">
                        قابل رزرو
                      </p>
                    )}

                    {isReserved && (
                      <p className="mt-2 text-center text-[11px] text-amber-600 dark:text-amber-400">
                        این اقامتگاه در حال حاضر رزرو شده است
                      </p>
                    )}

                    {isInactive && (
                      <p className="mt-2 text-center text-[11px] text-red-500 dark:text-red-400">
                        این اقامتگاه فعلاً غیرفعال است
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="
                mt-10
                mb-5
                flex
                items-center
                justify-center
                gap-2
              "
              dir="rtl"
            >
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  text-gray-600
                  dark:text-white
                  hover:bg-primary500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                قبلی
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      text-sm
                      font-medium
                      transition
                      ${
                        page === currentPage
                          ? "bg-primary500 text-white shadow-sm"
                          : "border border-gray-200 text-gray-600 hover:bg-primary500/10 dark:border-[#444] dark:text-white"
                      }
                    `}
                  >
                    {page.toLocaleString("fa-IR")}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  text-gray-600
                  dark:text-white
                  hover:bg-primary500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <ChevronLeft className="h-4 w-4" />
                بعدی
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
