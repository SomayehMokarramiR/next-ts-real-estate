"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";

type Tab = "buy" | "rent" | "selling";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<Tab>("buy");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const tabActive = "bg-white dark:bg-[#272727] text-gray-800 dark:text-white";

  const tabInactive =
    "bg-white/30 dark:bg-white/10 text-white hover:bg-white/20 dark:hover:bg-white/10";

  return (
    <div className="min-h-auto bg-white dark:bg-[#272727]">
      <section className="relative overflow-hidden pt-16">
        <div className="relative min-h-212.5 sm:min-h-[780px] lg:min-h-[650px]">
          <Image
            src="/images/Home-Header.jpg"
            alt="خانه مدرن"
            fill
            className="object-cover object-center opacity-60"
          />

          <div className="absolute inset-0 bg-[#080808]/20" />

          <div className="relative z-10 flex justify-center w-full pt-28 md:pt-36 lg:pt-40 px-6 font-primary-font-bold">
            <div className="max-w-xl text-center">
              <h1 className="text-[#FFFFFA] text-4xl sm:text-5xl font-extrabold leading-snug mb-4">
                خانه رویایی
                <br />
                خودت رو پیدا کن
              </h1>

              <p className="text-[#FFFFFA] text-sm leading-7 max-w-sm font-primary-font-semibold">
                ما آژانس املاکی هستیم که به شما کمک می‌کنیم بهترین آپارتمان‌های
                رویایی را پیدا کنید.
              </p>
            </div>
          </div>

          {/* Search card */}

          <div className="absolute bottom-13.5 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              {/* Tabs */}

              <div
                className="
                flex
                justify-start
                gap-2
                max-[404px]:gap-1
                mb-0
                "
              >
                <button
                  onClick={() => setActiveTab("buy")}
                  className={`
                  rounded-t-xl
                  font-semibold
                  whitespace-nowrap
                  transition

                  px-3
                  max-[404px]:px-2
                  sm:px-5

                  py-2.5
                  max-[404px]:py-1.5
                  sm:py-3

                  text-xs
                  max-[404px]:text-[10px]
                  sm:text-sm

                  ${activeTab === "buy" ? tabActive : tabInactive}
                  `}
                >
                  خرید ملک
                </button>

                <button
                  onClick={() => setActiveTab("rent")}
                  className={`
                  rounded-t-xl
                  font-semibold
                  whitespace-nowrap
                  transition

                  px-3
                  max-[404px]:px-2
                  sm:px-5

                  py-2.5
                  max-[404px]:py-1.5
                  sm:py-3

                  text-xs
                  max-[404px]:text-[10px]
                  sm:text-sm

                 ${activeTab === "rent" ? tabActive : tabInactive}
                  `}
                >
                  رهن و اجاره
                </button>

                <button
                  onClick={() => setActiveTab("selling")}
                  className={`
                  rounded-t-xl
                  font-semibold
                  whitespace-nowrap
                  transition

                  px-3
                  max-[404px]:px-2
                  sm:px-5

                  py-2.5
                  max-[404px]:py-1.5
                  sm:py-3

                  text-xs
                  max-[404px]:text-[10px]
                  sm:text-sm

                  ${activeTab === "selling" ? tabActive : tabInactive}
                  `}
                >
                  خرید و فروش
                </button>
              </div>

              {/* Search Form */}

              <div
                className="
               bg-white
              dark:bg-[#272727]
                rounded-b-2xl
                rounded-tl-2xl
                shadow-2xl
                overflow-hidden
                "
              >
                <div
                  className=" grid
 grid-cols-1
 sm:grid-cols-2
 lg:grid-cols-5
 divide-y
 lg:divide-y-0
 lg:divide-x
 divide-gray-200
 dark:divide-[#3a3a3a]"
                >
                  {/* Destination */}
                  <div
                    className=" lg:col-span-1
 px-5
 py-4
 flex
 flex-col
 gap-1"
                  >
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      انتخاب مقصد
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="استان، شهر، فاصله..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="
                        w-full
                        text-sm
                       text-foreground
placeholder:text-gray-400
dark:placeholder:text-gray-500
                        bg-transparent
                        focus:outline-none
                        "
                      />

                      <ChevronDown
                        size={16}
                        className="text-gray-400 dark:text-gray-300 shrink-0"
                      />
                    </div>
                  </div>
                  <div
                    className=" lg:col-span-1
 px-5
 py-4
 flex
 flex-col
 gap-1"
                  >
                    <label className="text-xs font-semibold text-[#1E2022] dark:text-white tracking-wide">
                      تاریخ ورود
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="وارد کنید..."
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="
      w-full
      text-sm
     text-foreground
placeholder:text-gray-400
dark:placeholder:text-gray-500
      bg-transparent
      focus:outline-none
      "
                      />

                      <ChevronDown
                        size={16}
                        className="text-gray-400 dark:text-gray-300 shrink-0"
                      />
                    </div>
                  </div>
                  {/* Check-out */}
                  <div
                    className=" lg:col-span-1
 px-5
 py-4
 flex
 flex-col
 gap-1"
                  >
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      تاریخ خروج
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="وارد کنید..."
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="
      w-full
      text-sm
     text-foreground
placeholder:text-gray-400
dark:placeholder:text-gray-500
      bg-transparent
      focus:outline-none
      "
                      />

                      <ChevronDown
                        size={16}
                        className="text-gray-400 dark:text-gray-300 shrink-0"
                      />
                    </div>
                  </div>
                  {/* Guests */}
                  <div
                    className=" lg:col-span-1
 px-5
 py-4
 flex
 flex-col
 gap-1"
                  >
                    <label className="text-xs font-semibold text-foreground tracking-wide">
                      تعداد نفرات
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="وارد کنید..."
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="
      w-full
      text-sm
     text-foreground
placeholder:text-gray-400
dark:placeholder:text-gray-500
      bg-transparent
      focus:outline-none
      "
                      />

                      <ChevronDown
                        size={16}
                        className="text-gray-400 dark:text-gray-300 shrink-0"
                      />
                    </div>
                  </div>
                  {/* Search Button */}
                  <div className="lg:col-span-1 px-5 py-4 flex items-center">
                    <button
                      className="
    w-full
    flex
    items-center
    justify-center
    gap-2
    bg-primary500
    hover:bg-primary600
    text-white
    text-sm
    font-bold
    py-3
    px-6
    rounded-xl
    transition-colors
    shadow-md
    shadow-primary500/30
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
