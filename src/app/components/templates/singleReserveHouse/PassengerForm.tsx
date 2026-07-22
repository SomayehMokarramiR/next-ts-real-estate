"use client";

import { useState } from "react";
import { UserPlus, Users, Ticket } from "lucide-react";

import Field from "./Field";
import { Passenger } from "./types";

export default function PassengerForm({
  passenger,
  index,
  onChange,
  onAddPassenger,
}: {
  passenger: Passenger;
  index: number;
  onChange: (field: keyof Passenger, value: string) => void;
  onAddPassenger: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="mb-2 pb-6">
      {/* عنوان مسافرهای بعدی */}

      {index > 0 && (
        <div
          className="
          flex
          items-center
          gap-2
          mb-4
          mt-4
          "
          dir="rtl"
        >
          <div className="h-px flex-1 bg-gray-100" />

          <span className="text-xs text-gray-400">مسافر {index + 1}</span>

          <div className="h-px flex-1 bg-gray-100" />
        </div>
      )}

      {/* اطلاعات مسافر */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        gap-3
        "
      >
        <Field
          label="نام"
          placeholder="نام"
          value={passenger.name}
          onChange={(v) => onChange("name", v)}
        />

        <Field
          label="نام خانوادگی"
          placeholder="نام خانوادگی"
          value={passenger.family}
          onChange={(v) => onChange("family", v)}
        />

        {/* جنسیت */}

        <div>
          <label
            className="
            block
            text-xs
            text-gray-500
            dark:text-white
            mb-1.5
            font-medium
            "
          >
            جنسیت شما
          </label>

          <select
            value={passenger.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="
            w-full
            border
            border-gray-200
            dark:border-[#353535]
            rounded-full
            px-3
            py-2.5
            text-sm
            text-gray-700
            dark:text-gray-200
            bg-gray-50
            dark:bg-[#353535]
            focus:outline-none
            "
          >
            <option value="">انتخاب کنید</option>

            <option value="male">آقا</option>

            <option value="female">خانم</option>
          </select>
        </div>

        <Field
          label="کد ملی"
          placeholder="کد ملی"
          value={passenger.nationalId}
          onChange={(v) => onChange("nationalId", v)}
        />

        <Field
          label="تاریخ تولد"
          placeholder="1370/01/01"
          value={passenger.birthDate}
          onChange={(v) => onChange("birthDate", v)}
        />

        {/* دکمه های مسافر */}

        {index === 0 && (
          <div
            className="
            grid
            grid-cols-2
            gap-2
            items-end
            "
          >
            <button
              onClick={onAddPassenger}
              className="
              h-[42px]
              w-full
              bg-primary500
              hover:bg-primary700
              text-white
              text-xs
              font-medium
              rounded-full
              flex
              items-center
              justify-center
              gap-1
              whitespace-nowrap
              "
            >
              <UserPlus className="w-3.5 h-3.5" />
              افزودن مسافر
            </button>

            <button
              className="
              h-[42px]
              w-full
              border
              border-gray-200
              dark:border-[#353535]
              dark:bg-[#353535]
              text-gray-600
              dark:text-gray-100
              text-xs
              font-medium
              rounded-full
              flex
              items-center
              justify-center
              gap-1
              whitespace-nowrap
              "
            >
              <Users className="w-3.5 h-3.5" />
              مسافر سابق
            </button>
          </div>
        )}
      </div>

      {/* ارسال بلیط */}

      {index === 0 && (
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
          mt-6
          "
          dir="rtl"
        >
          <h2
            className="
            font-bold
            text-gray-900
            dark:text-white
            text-base
            mb-5
            flex
            items-center
            gap-2
            "
          >
            <Ticket
              className="
              w-4
              h-4
              text-primary500
              "
            />
            ارسال بلیط به دیگران
          </h2>

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-3
            mb-5
            "
          >
            <Field
              label="شماره تلفن"
              placeholder="09xx xxx xxxx"
              value={phone}
              onChange={setPhone}
            />

            <Field
              label="ایمیل"
              placeholder="example@email.com"
              value={email}
              onChange={setEmail}
            />
          </div>

          <button
            className="
            h-[42px]
            w-full
            sm:w-auto
            px-5
            bg-primary500
            hover:bg-primary700
            text-white
            text-xs
            font-medium
            rounded-full
            flex
            items-center
            justify-center
            gap-1
            "
          >
            ثبت اطلاعات
          </button>
        </div>
      )}
    </div>
  );
}
