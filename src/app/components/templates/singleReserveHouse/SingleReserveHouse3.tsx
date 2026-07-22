"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Edit2,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

const passenger = {
  ageGroup: "میانسال",
  name: "امیر محمد خیابادی",
  gender: "مرد",
  nationalCode: "208148****151",
};

export default function SingleReserveHouse3({
  prevStep,
}: {
  prevStep: () => void;
}) {
  const [discountCode, setDiscountCode] = useState("");

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
        py-6
        "
      >
        <div
          className="
          flex
          flex-col
          lg:flex-row
          gap-6
          items-start
          "
        >
          {/* RIGHT */}

          <div
            className="
            w-full
            lg:flex-1
            "
          >
            {/* Stepper فقط اینجا */}
            <Stepper active={3} />

            <div
              className="
              mt-5
              border
              border-[#CDCED6]
              dark:border-[#353535]
              rounded-2xl
              p-5
              "
            >
              <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
                "
              >
                {/* تایید اطلاعات */}

                <div
                  className="
                  bg-[#F0F0F3]
                  dark:bg-[#353535]
                  rounded-2xl
                  p-5
                  "
                >
                  <h3
                    className="
                    text-base
                    font-bold
                    text-center
                    dark:text-white
                    border-b
                    pb-3
                    "
                  >
                    تایید اطلاعات رزرو
                  </h3>

                  {[
                    ["نام مسافر", passenger.name],
                    ["هتل", "خانه نمونه"],
                    ["تاریخ ورود", "1405/05/20"],
                    ["تعداد شب", "3 شب"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="
                      flex
                      justify-between
                      mt-4
                      text-sm
                      "
                    >
                      <span className="text-gray-400">{label}</span>

                      <span className="dark:text-white">{value}</span>
                    </div>
                  ))}

                  <div
                    className="
                    border-t
                    mt-4
                    pt-3
                    flex
                    justify-between
                    "
                  >
                    <span className="text-gray-400">مبلغ نهایی</span>

                    <span className="text-primary500 font-bold">
                      11,500,000 تومان
                    </span>
                  </div>
                </div>

                {/* خلاصه پرداخت */}

                <div
                  className="
                  bg-white
                  dark:bg-[#272727]
                  rounded-2xl
                  p-5
                  "
                >
                  <h3
                    className="
                    text-base
                    font-bold
                    text-center
                    dark:text-white
                    border-b
                    pb-3
                    "
                  >
                    خلاصه پرداخت
                  </h3>

                  <p
                    className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-500
                    dark:text-gray-300
                    "
                  >
                    اطلاعات رزرو بررسی شده است. پس از تایید وارد مرحله پرداخت
                    خواهید شد.
                  </p>
                </div>
              </div>

              {/* مشخصات مسافر */}

              <div
                className="
                mt-5
                bg-[#F0F0F3]
                dark:bg-[#353535]
                rounded-2xl
                p-5
                "
              >
                <h3
                  className="
                  text-center
                  font-bold
                  dark:text-white
                  border-b
                  pb-3
                  "
                >
                  مشخصات مسافران
                </h3>

                {[
                  ["بازه سنی", passenger.ageGroup],
                  ["نام و نام خانوادگی", passenger.name],
                  ["جنسیت", passenger.gender],
                  ["کد ملی", passenger.nationalCode],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="
                    flex
                    justify-between
                    mt-4
                    text-sm
                    "
                  >
                    <span className="text-gray-400">{label}</span>

                    <span className="dark:text-white">{value}</span>
                  </div>
                ))}

                <button
                  className="
                  mt-5
                  w-full
                  py-2.5
                  rounded-full
                  bg-primary500
                  text-white
                  flex
                  justify-center
                  items-center
                  gap-2
                  "
                >
                  <Edit2 size={14} />
                  ویرایش مسافران
                </button>
              </div>

              {/* تماس */}

              <div
                className="
                mt-5
                flex
                flex-col
                gap-4
                "
              >
                <div
                  className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                  text-sm
                  dark:text-white
                  "
                >
                  <span className="flex gap-2 items-center">
                    <Phone size={15} />
                    09229167194
                  </span>

                  <span className="flex gap-2 items-center">
                    <Mail size={15} />
                    example@gmail.com
                  </span>
                </div>
              </div>

              {/* BUTTONS */}

              <div
                className="
                mt-6
                flex
                flex-col
                sm:flex-row
                gap-3
                "
              >
                <button
                  onClick={prevStep}
                  className="
                  w-full
                  sm:w-1/2
                  h-11
                  rounded-full
                  border
                  border-gray-300
                  dark:border-[#555]
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  "
                >
                  <ChevronRight size={16} />
                  مرحله قبل
                </button>

                <button
                  className="
                  w-full
                  sm:w-1/2
                  h-11
                  rounded-full
                  bg-primary500
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  "
                >
                  تایید و پرداخت
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* LEFT */}

          <div
            className="
            w-full
            lg:w-[35%]
            shrink-0
            "
          >
            <PropertyCard />

            <div
              className="
              mt-4
              bg-white
              dark:bg-[#272727]
              rounded-2xl
              p-4
              "
            >
              <h3
                className="
                font-bold
                dark:text-white
                flex
                gap-2
                "
              >
                <Tag size={16} />
                کد تخفیف
              </h3>

              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف"
                className="
                mt-3
                w-full
                border
                rounded-full
                px-4
                py-2
                dark:bg-[#353535]
                "
              />

              <button
                className="
                mt-3
                w-full
                py-2
                rounded-full
                bg-primary500
                text-white
                "
              >
                اعمال کد تخفیف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
