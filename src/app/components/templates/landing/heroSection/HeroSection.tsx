"use client";

import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import {
  setDestination,
  setCheckIn,
  setCheckOut,
  setGuests,
  setType,
} from "@/store/slices/searchPropertiesSlice";

import type { TransactionType } from "@/store/slices/searchPropertiesSlice";

import DatePicker from "react-multi-date-picker";
import type { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// =====================================================
// TYPES
// =====================================================

interface TransactionTab {
  value: TransactionType;
  label: string;
}

function toPersianNumber(value: string) {
  return value.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

function normalizeDate(value: string) {
  const clean = value.replace(/[^\d/]/g, "");

  const parts = clean.split("/");

  if (parts.length !== 3) {
    return toPersianNumber(clean);
  }

  const first = parts[0];
  const second = parts[1];
  const third = parts[2];

  let year = first;
  let month = second;
  let day = third;

  // اگر کاربر روز/ماه/سال وارد کرد
  if (first.length <= 2 && third.length === 4) {
    year = third;
    month = second;
    day = first;
  }

  return toPersianNumber(`${year}/${month}/${day}`);
}
// =====================================================
// COMPONENT
// =====================================================

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { destination, checkIn, checkOut, guests, type } = useAppSelector(
    (state) => state.searchProperties,
  );

  const [transactionTabs, setTransactionTabs] = useState<TransactionTab[]>([]);

  const [isLoadingTabs, setIsLoadingTabs] = useState(true);

  // =====================================================
  // LOAD TRANSACTION TYPES
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    async function loadTransactionTypes() {
      try {
        setIsLoadingTabs(true);

        const response = await fetch("/api/properties/types", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("خطا در دریافت انواع معاملات");
        }

        const data = await response.json();

        if (!data?.success || !Array.isArray(data.types)) {
          throw new Error("پاسخ API معتبر نیست");
        }

        if (!cancelled) {
          const tabs: TransactionTab[] = [
            ...data.types,
            {
              value: "booking",
              label: "رزرو",
            },
          ];

          setTransactionTabs(tabs);

          const exists = tabs.some(
            (item: TransactionTab) => item.value === type,
          );

          if (!exists) {
            dispatch(setType("sale"));
          }
        }
      } catch (error) {
        console.error("LOAD TABS ERROR:", error);

        if (!cancelled) {
          setTransactionTabs([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingTabs(false);
        }
      }
    }

    loadTransactionTypes();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // =====================================================
  // SEARCH
  // =====================================================

  function handleSearch() {
    const city = destination.trim();

    const start = checkIn.trim();

    const end = checkOut.trim();

    const count = guests.trim();

    if (!city) {
      Swal.fire({
        icon: "warning",

        title: "مقصد را وارد کنید",

        text: "لطفاً شهر مورد نظر را وارد کنید",

        confirmButtonText: "باشه",
      });

      return;
    }

    const params = new URLSearchParams();

    params.set("city", city);

    // ==============================
    // BOOKING SEARCH
    // ==============================

    if (type === "booking") {
      // رزرو فقط با شهر هم مجاز است
      // تاریخ و نفرات اگر وارد شدند ارسال می‌شوند

      params.set("bookingType", "daily");

      if (start) {
        params.set("checkIn", start);
      }

      if (end) {
        params.set("checkOut", end);
      }

      if (count) {
        params.set("guests", count);
      }
    } else {
      // ==============================
      // NORMAL SEARCH
      // ==============================

      params.set("transactionType", type);
    }
    const url = `/properties?${params.toString()}`;

    console.log("SEARCH URL:", url);

    router.push(url);
  }

  const tabActive = "bg-white dark:bg-[#272727] text-gray-800 dark:text-white";

  const tabInactive = "bg-white/30 text-white hover:bg-white/20";

  const formGridClass =
    type === "booking" ? "lg:grid-cols-5" : "lg:grid-cols-2";
  return (
    <div className="min-h-auto bg-white dark:bg-[#272727]">
      <section className="relative overflow-hidden pt-16">
        <div
          className="
            relative
            min-h-[850px]
            sm:min-h-[780px]
            lg:min-h-[650px]
          "
        >
          {/* HERO IMAGE */}

          <Image
            src="/images/Home-Header.jpg"
            alt="خانه مدرن"
            fill
            sizes="100vw"
            priority
            className="
              object-cover
              object-center
              opacity-60
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-[#080808]/20
            "
          />

          {/* HERO TEXT */}

          <div
            className="
              relative
              z-10
              flex
              w-full
              justify-center
              px-6
              pt-28
              md:pt-36
              lg:pt-40
            "
          >
            <div className="max-w-xl text-center">
              <h1
                className="
                  mb-4
                  text-4xl
                  font-extrabold
                  leading-snug
                  text-[#FFFFFA]
                  sm:text-5xl
                "
              >
                خانه رویایی
                <br />
                خودت رو پیدا کن
              </h1>

              <p
                className="
                  max-w-sm
                  text-sm
                  leading-7
                  text-[#FFFFFA]
                "
              >
                ما آژانس املاکی هستیم که به شما کمک می‌کنیم بهترین خانه‌ها را
                پیدا کنید.
              </p>
            </div>
          </div>

          {/* SEARCH BOX */}

          <div
            className="
              absolute
              bottom-12
              left-0
              right-0
              z-20
            "
          >
            <div
              className="
                mx-auto
                max-w-7xl
                px-4
                md:px-6
              "
            >
              {/* TABS */}

              <div
                className="
                  mb-0
                  flex
                  gap-2
                  justify-start
                "
              >
                {isLoadingTabs ? (
                  <>
                    <div
                      className="
                        h-11
                        w-28
                        animate-pulse
                        rounded-t-xl
                        bg-white/40
                      "
                    />

                    <div
                      className="
                        h-11
                        w-28
                        animate-pulse
                        rounded-t-xl
                        bg-white/40
                      "
                    />
                  </>
                ) : (
                  transactionTabs.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => dispatch(setType(tab.value))}
                      className={`
                        rounded-t-xl
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        transition

                        ${type === tab.value ? tabActive : tabInactive}

                      `}
                    >
                      {tab.label}
                    </button>
                  ))
                )}
              </div>

              {/* FORM */}

              <div
                className="
                  overflow-hidden
                  rounded-b-2xl
                  rounded-tl-2xl
                  bg-white
                  shadow-2xl
                  dark:bg-[#272727]
                "
              >
                <div
                  className={`
                    grid
                    grid-cols-1
                    divide-y
                    divide-gray-200
                    dark:divide-[#3a3a3a]

                    sm:grid-cols-2

                    ${formGridClass}

                    lg:divide-x
                    lg:divide-y-0
                  `}
                >
                  {/* DESTINATION */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-1
                      px-5
                      py-4
                    "
                  >
                    <label
                      className="
                        text-xs
                        font-semibold
                      "
                    >
                      انتخاب مقصد
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={destination}
                        placeholder="شهر یا استان"
                        onChange={(e) =>
                          dispatch(setDestination(e.target.value))
                        }
                        className="
                          w-full
                          bg-transparent
                          text-sm
                          outline-none
                        "
                      />

                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                  {/* CHECK IN */}

                  {type === "booking" && (
                    <div
                      className="
      flex
      flex-col
      gap-1
      px-5
      py-4
    "
                    >
                      <label className="text-xs font-semibold">
                        تاریخ ورود
                      </label>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={checkIn || ""}
                        onChange={(date: DateObject | null) => {
                          dispatch(
                            setCheckIn(date ? date.format("YYYY/MM/DD") : ""),
                          );
                        }}
                        calendarPosition="bottom-right"
                        inputClass="
    w-full
    bg-transparent
    text-sm
    text-gray-900
    dark:text-white
    outline-none
    text-right
  "
                        placeholder="۱۴۰۵/۰۵/۲۰"
                      />
                    </div>
                  )}

                  {/* CHECK OUT */}
                  {type === "booking" && (
                    <div
                      className="
      flex
      flex-col
      gap-1
      px-5
      py-4
    "
                    >
                      <label className="text-xs font-semibold">
                        تاریخ خروج
                      </label>

                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={checkOut || ""}
                        onChange={(date: DateObject | null) => {
                          dispatch(
                            setCheckOut(date ? date.format("YYYY/MM/DD") : ""),
                          );
                        }}
                        calendarPosition="bottom-right"
                        inputClass="
    w-full
    bg-transparent
    text-sm
    text-gray-900
    dark:text-white
    outline-none
    text-right
  "
                        placeholder="۱۴۰۵/۰۵/۲۳"
                      />
                    </div>
                  )}
                  {/* GUESTS */}

                  {type === "booking" && (
                    <div
                      className="
                        flex
                        flex-col
                        gap-1
                        px-5
                        py-4
                      "
                    >
                      <label
                        className="
                          text-xs
                          font-semibold
                        "
                      >
                        تعداد نفرات
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={guests}
                          placeholder="مثلاً 4 نفر"
                          onChange={(e) => dispatch(setGuests(e.target.value))}
                          className="
                            w-full
                            bg-transparent
                            text-sm
                            outline-none
                          "
                        />

                        <ChevronDown size={16} className="text-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* SEARCH BUTTON */}

                  <div
                    className="
                      flex
                      items-center
                      px-5
                      py-4
                    "
                  >
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-primary500
                        px-6
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-md
                        transition
                        hover:bg-primary600
                      "
                    >
                      <Search size={16} strokeWidth={2.5} />
                      جستجو کن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
