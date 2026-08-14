"use client";

import { ChevronLeft } from "lucide-react";

import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import { useProperty } from "../../../../hooks/useProperties";
import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";

type Props = {
  onNext: () => void;
};

export default function SingleReserveHouse({ onNext }: Props) {
  const { step, setProgress, propertyId, setProperty } = useReserveProgress();

  const { data: property, isLoading, error } = useProperty(propertyId);
  console.log("RESERVE PROPERTY DATA:", property);
  console.log("RESERVE PRICE:", property?.pricing);

  if (isLoading) {
    return <div className="p-5">در حال دریافت اطلاعات اقامتگاه...</div>;
  }

  if (error || !property) {
    return <div className="p-5">اطلاعات اقامتگاه پیدا نشد.</div>;
  }

  /*
   * قیمت هر شب
   */
  const dailyPrice = Number(property.pricing?.daily ?? 0);

  /*
   * تعداد شب
   *
   * فعلاً طبق ساختار فعلی Step 1
   * سه شب داریم.
   *
   * بعداً این مقدار را از Context
   * تاریخ ورود و خروج می‌گیریم.
   */
  const nights = 3;

  /*
   * مبلغ کل رزرو
   */
  const totalPrice = dailyPrice * nights;

  const formattedDailyPrice = dailyPrice.toLocaleString("fa-IR");

  const formattedTotalPrice = totalPrice.toLocaleString("fa-IR");

  return (
    <div className="flex flex-col pb-20">
      {/* Breadcrumb */}
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
            {/* Stepper */}
            <div className="mb-6">
              <Stepper active={step} />
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
                    mb-4
                  "
                >
                  اطلاعات اقامتگاه
                </h3>

                <div className="space-y-4 text-sm">
                  {/* Property */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">نام اقامتگاه</span>

                    <span className="font-medium text-gray-900 dark:text-white text-left">
                      {property.title}
                    </span>
                  </div>

                  {/* Check In */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">تاریخ ورود</span>

                    <span className="font-medium text-gray-900 dark:text-white">
                      1405/05/20
                    </span>
                  </div>

                  {/* Nights */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">تعداد شب</span>

                    <span className="font-medium text-gray-900 dark:text-white">
                      {nights} شب
                    </span>
                  </div>

                  {/* Daily Price */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">قیمت هر شب</span>

                    <span className="font-medium text-gray-900 dark:text-white">
                      {formattedDailyPrice} تومان
                    </span>
                  </div>

                  {/* Total */}
                  <div
                    className="
                      border-t
                      border-gray-100
                      dark:border-[#353535]
                      pt-4
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span className="font-medium text-gray-500 dark:text-gray-300">
                      مبلغ کل رزرو
                    </span>

                    <span className="font-bold text-lg text-primary500">
                      {formattedTotalPrice} تومان
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProperty(property);

                  setProgress(20);

                  onNext();
                }}
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
            <PropertyCard property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
