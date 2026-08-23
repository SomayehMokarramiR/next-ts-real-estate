"use client";

import { useEffect, useRef, useState } from "react";

import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

import { useSearchParams } from "next/navigation";

import PropertyCard from "./PropertyCard";

// =====================================================
// PROPERTY LOCATION
// =====================================================

interface PropertyLocation {
  city?: string;
  address?: string;
  province?: string;
}

// =====================================================
// PROPERTY FACILITIES
// =====================================================

interface PropertyFacilities {
  capacity?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  parking?: boolean;
  pool?: boolean;
}

// =====================================================
// PROPERTY PRICING
// =====================================================

interface PropertyPricing {
  daily?: number;
  monthly?: number;
  mortgage?: number;
  sale?: number;
  oldPrice?: number;
  discount?: number;
}

// =====================================================
// PROPERTY
// =====================================================

interface Property {
  _id: string;

  title: string;

  description?: string;

  type?: string;

  image?: string;

  images?: string[];

  location?: PropertyLocation;

  facilities?: PropertyFacilities;

  pricing?: PropertyPricing;

  transactionType?: "rent" | "mortgage" | "rent-mortgage" | "sale";

  bookingType?: "daily" | "monthly" | "none";

  status?: "available" | "reserved" | "inactive";

  createdAt?: string;
}

// =====================================================
// FILTERS
// =====================================================

interface PropertiesFilters {
  city?: string;

  guests?: string;

  type?: string;

  transactionType?: string;

  bookingType?: "daily" | "monthly" | "none";

  checkIn?: string;

  checkOut?: string;
}

// =====================================================
// PROPS
// =====================================================

interface PropertiesProps {
  filters?: PropertiesFilters;
}

// =====================================================
// RESPONSE
// =====================================================

interface PropertiesResponse {
  success: boolean;

  properties: Property[];

  total: number;

  totalPages: number;

  currentPage: number;

  limit: number;

  message?: string;
}

// =====================================================
// CONSTANT
// =====================================================

const ITEMS_PER_PAGE = 6;

// =====================================================
// COMPONENT
// =====================================================

export default function Properties({ filters = {} }: PropertiesProps) {
  const searchParams = useSearchParams();

  // =====================================================
  // STATE
  // =====================================================

  const [properties, setProperties] = useState<Property[]>([]);

  const [total, setTotal] = useState(0);

  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const previousFilterKeyRef = useRef<string | null>(null);

  // =====================================================
  // URL FILTERS
  // =====================================================

  const cityFromUrl = searchParams.get("city")?.trim() ?? "";

  const guestsFromUrl = searchParams.get("guests")?.trim() ?? "";

  const typeFromUrl = searchParams.get("type")?.trim() ?? "";

  const transactionTypeFromUrl =
    searchParams.get("transactionType")?.trim() ?? "";

  const bookingTypeFromUrl = searchParams.get("bookingType")?.trim() ?? "";

  const checkInFromUrl = searchParams.get("checkIn")?.trim() ?? "";

  const checkOutFromUrl = searchParams.get("checkOut")?.trim() ?? "";

  // =====================================================
  // FINAL VALUES
  // =====================================================

  const city = cityFromUrl || filters.city || "";

  const guests = guestsFromUrl || filters.guests || "";

  const propertyType = typeFromUrl || filters.type || "";

  const transactionType =
    transactionTypeFromUrl || filters.transactionType || "";

  const bookingType = bookingTypeFromUrl || filters.bookingType || "";

  const checkIn = checkInFromUrl || filters.checkIn || "";

  const checkOut = checkOutFromUrl || filters.checkOut || "";

  // =====================================================
  // FILTER KEY
  // =====================================================

  const filterKey = JSON.stringify({
    city,

    guests,

    propertyType,

    transactionType,

    bookingType,

    checkIn,

    checkOut,
  });
  // =====================================================
  // FETCH PROPERTIES
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    async function fetchProperties() {
      try {
        // ===============================
        // RESET PAGE ON FILTER CHANGE
        // ===============================

        if (
          previousFilterKeyRef.current !== null &&
          previousFilterKeyRef.current !== filterKey
        ) {
          previousFilterKeyRef.current = filterKey;

          if (currentPage !== 1) {
            setCurrentPage(1);

            return;
          }
        }

        previousFilterKeyRef.current = filterKey;

        setLoading(true);

        setError("");

        // ===============================
        // BUILD PARAMS
        // ===============================

        const params = new URLSearchParams();

        params.set("page", String(currentPage));

        params.set("limit", String(ITEMS_PER_PAGE));

        // ===============================
        // CITY
        // ===============================

        if (city) {
          params.set("city", city);
        }

        // ===============================
        // GUESTS
        // ===============================

        if (guests) {
          params.set("guests", guests);
        }

        // ===============================
        // PROPERTY TYPE
        // ===============================

        if (propertyType) {
          params.set("type", propertyType);
        }

        // ===============================
        // TRANSACTION TYPE
        // ===============================

        if (transactionType) {
          params.set("transactionType", transactionType);
        }

        // ===============================
        // BOOKING
        // ===============================

        if (bookingType) {
          params.set("bookingType", bookingType);
        }

        // ===============================
        // DATES
        // ===============================

        if (checkIn) {
          params.set("checkIn", checkIn);
        }

        if (checkOut) {
          params.set("checkOut", checkOut);
        }

        const url = `/api/properties?${params.toString()}`;

        console.log("PROPERTIES API URL:", url);

        console.log("PROPERTIES FILTERS:", {
          city,

          guests,

          propertyType,

          transactionType,

          bookingType,

          checkIn,

          checkOut,

          currentPage,
        });

        // ===============================
        // REQUEST
        // ===============================

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store",
        });

        const data = (await response.json()) as PropertiesResponse;

        if (!response.ok || !data.success) {
          throw new Error(data.message || "خطا در دریافت املاک");
        }

        if (cancelled) {
          return;
        }

        // ===============================
        // SET DATA
        // ===============================

        setProperties(Array.isArray(data.properties) ? data.properties : []);

        setTotal(Number(data.total) || 0);

        setTotalPages(Math.max(1, Number(data.totalPages) || 1));
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error("PROPERTIES FETCH ERROR:", err);

        setProperties([]);

        setTotal(0);

        setTotalPages(1);

        setError(err instanceof Error ? err.message : "خطا در دریافت املاک");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, [
    filterKey,
    currentPage,
    city,
    guests,
    propertyType,
    transactionType,
    bookingType,
    checkIn,
    checkOut,
  ]);

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  }
  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4" dir="rtl">
        <div className="mb-6">
          <div
            className="
            h-8
            w-40
            animate-pulse
            rounded-lg
            bg-gray-200
          "
          />
        </div>

        <div
          className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        "
        >
          {Array.from({
            length: ITEMS_PER_PAGE,
          }).map((_, index) => (
            <div
              key={index}
              className="
              animate-pulse
              overflow-hidden
              rounded-2xl
              border
              bg-white
            "
            >
              <div
                className="
                h-52
                bg-gray-200
              "
              />

              <div className="space-y-3 p-4">
                <div
                  className="
                  h-4
                  w-3/4
                  rounded
                  bg-gray-200
                "
                />

                <div
                  className="
                  h-3
                  w-full
                  rounded
                  bg-gray-200
                "
                />

                <div
                  className="
                  h-10
                  w-full
                  rounded-xl
                  bg-gray-200
                "
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section
        className="
 mx-auto
 max-w-7xl
 px-4
 py-20
 "
        dir="rtl"
      >
        <div className="text-center">
          <p
            className="
 text-red-500
 mb-5
 "
          >
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="
 rounded-full
 bg-primary500
 px-6
 py-2
 text-white
 "
          >
            تلاش مجدد
          </button>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN RENDER
  // =====================================================

  return (
    <section
      className="
 mx-auto
 max-w-7xl
 px-4
 "
      dir="rtl"
    >
      {/* HEADER */}

      <div
        className="
 mb-6
 flex
 items-end
 justify-between
 "
      >
        <div>
          <h1
            className="
 text-2xl
 font-bold
 "
          >
            همه املاک
          </h1>

          <p
            className="
 mt-2
 text-sm
 text-gray-500
 "
          >
            {total.toLocaleString("fa-IR")}
            ملک یافت شد
          </p>
        </div>

        {totalPages > 1 && (
          <span
            className="
text-xs
text-gray-400
"
          >
            صفحه {currentPage}
            از {totalPages}
          </span>
        )}
      </div>

      {/* FILTER TAGS */}

      {(city || guests || propertyType || transactionType || bookingType) && (
        <div
          className="
mb-6
flex
flex-wrap
gap-2
"
        >
          {city && (
            <span
              className="
rounded-full
bg-gray-100
px-3
py-1
text-xs
"
            >
              شهر:
              {city}
            </span>
          )}

          {propertyType && (
            <span
              className="
rounded-full
bg-gray-100
px-3
py-1
text-xs
"
            >
              نوع:
              {propertyType}
            </span>
          )}

          {transactionType && (
            <span
              className="
rounded-full
bg-gray-100
px-3
py-1
text-xs
"
            >
              معامله:
              {transactionType}
            </span>
          )}

          {bookingType && (
            <span
              className="
rounded-full
bg-gray-100
px-3
py-1
text-xs
"
            >
              رزرو:
              {bookingType}
            </span>
          )}
        </div>
      )}

      {/* EMPTY */}

      {properties.length === 0 ? (
        <div
          className="
py-24
text-center
"
        >
          <Building2
            className="
mx-auto
mb-4
h-12
w-12
text-gray-300
"
          />

          <h2
            className="
text-lg
font-bold
"
          >
            ملکی پیدا نشد
          </h2>

          <p
            className="
mt-2
text-sm
text-gray-400
"
          >
            فیلترها را تغییر دهید و دوباره امتحان کنید.
          </p>
        </div>
      ) : (
        <>
          {/* GRID */}

          <div
            className="
grid
grid-cols-1
gap-5
sm:grid-cols-2
lg:grid-cols-3
"
          >
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              className="
mt-10
mb-5
flex
justify-center
items-center
gap-2
"
            >
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="
rounded-xl
px-3
py-2
border
disabled:opacity-40
"
              >
                <ChevronRight size={18} />
              </button>

              {Array.from({
                length: totalPages,
              }).map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={
                      page === currentPage
                        ? "bg-primary500 text-white rounded-xl w-9 h-9"
                        : "border rounded-xl w-9 h-9"
                    }
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="
rounded-xl
px-3
py-2
border
disabled:opacity-40
"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
