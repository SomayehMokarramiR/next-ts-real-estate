"use client";

import { ChevronLeft } from "lucide-react";

import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

type Props = {
  onNext: () => void;
};

export default function SingleReserveHouse({ onNext }: Props) {
  return (
    <div className="flex flex-col">
      <div className="py-12">
        <Breadcrumb />
      </div>

      <div
        className="
        max-w-6xl
        mx-auto
        w-full
        px-4
        "
      >
        {/* Main layout */}
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-6
          items-start
          "
        >
          {/* RIGHT CONTENT */}
          <div
            className="
            w-full
            md:flex-1
            "
          >
            {/* Stepper داخل ستون اصلی */}
            <div className="mb-6">
              <Stepper active={1} />
            </div>

            <div
              className="
              bg-white
              dark:bg-[#272727]
              rounded-2xl
              border
              border-gray-200
              dark:border-[#353535]
              shadow-sm
              p-5
              "
            >
              <h2
                className="
                font-bold
                text-gray-900
                dark:text-white
                text-base
                mb-5
                "
              >
                انتخاب اقامتگاه
              </h2>

              <div
                className="
                border
                border-gray-200
                dark:border-[#353535]
                rounded-2xl
                p-4
                "
              >
                <h3
                  className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                  mb-3
                  "
                >
                  اطلاعات اقامتگاه
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">نام اقامتگاه</span>

                    <span className="font-medium dark:text-white">
                      خانه نمونه
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">تاریخ ورود</span>

                    <span className="font-medium dark:text-white">
                      1405/05/20
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">تعداد شب</span>

                    <span className="font-medium dark:text-white">3 شب</span>
                  </div>

                  <div
                    className="
                    border-t
                    border-gray-100
                    dark:border-[#353535]
                    pt-3
                    flex
                    justify-between
                    "
                  >
                    <span className="text-gray-400">مبلغ رزرو</span>

                    <span className="font-bold text-primary500">
                      11,500,000 تومان
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onNext}
                type="button"
                className="
                mt-6
                w-full
                h-11
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-primary500
                text-white
                text-sm
                font-semibold
                hover:bg-primary600
                transition
                "
              >
                ادامه رزرو
                <ChevronLeft size={17} />
              </button>
            </div>
          </div>

          {/* LEFT PROPERTY */}
          <div
            className="
            w-full
            md:w-[35%]
            lg:w-[40%]
            shrink-0
            "
          >
            <PropertyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
