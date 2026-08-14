"use client";

import { UserPlus, Users, Ticket } from "lucide-react";

import Field from "./Field";
import { Passenger } from "./types";

type Contact = {
  phone: string;
  email: string;
};

type Props = {
  passenger: Passenger;
  index: number;

  onChange: (field: keyof Passenger, value: string) => void;

  onAddPassenger: () => void;

  contact: Contact;

  setContact: React.Dispatch<React.SetStateAction<Contact>>;

  onUpdateContact: () => void;

  contactSaved: boolean;
};

export default function PassengerForm({
  passenger,
  index,
  onChange,
  onAddPassenger,
  contact,
  setContact,
  onUpdateContact,
  contactSaved,
}: Props) {
  return (
    <>
      {index > 0 && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-gray-400">مسافر {index + 1}</span>

          <div className="h-px flex-1 bg-gray-100" />
        </div>
      )}

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

        <div>
          <label className="block text-xs text-gray-500 dark:text-white mb-1.5">
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
            bg-gray-50
            dark:bg-[#353535]
            dark:text-white
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

        <div className="grid grid-cols-2 gap-2 items-end">
          <button
            type="button"
            onClick={onAddPassenger}
            className="
            h-[42px]
            w-full
            bg-primary500
            text-white
            text-xs
            rounded-full
            flex
            items-center
            justify-center
            gap-1
            "
          >
            <UserPlus size={14} />
            افزودن مسافر
          </button>

          <button
            type="button"
            className="
            h-[42px]
            w-full
            border
            border-gray-200
            dark:border-[#353535]
            rounded-full
            text-xs
            flex
            items-center
            justify-center
            gap-1
            dark:text-white
            "
          >
            <Users size={14} />
            مسافر سابق
          </button>
        </div>
      </div>

      {index === 0 && !contactSaved && (
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
            <Ticket size={16} className="text-primary500" />
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
              value={contact.phone}
              onChange={(value) =>
                setContact({
                  ...contact,
                  phone: value,
                })
              }
            />

            <Field
              label="ایمیل"
              placeholder="example@email.com"
              value={contact.email}
              onChange={(value) =>
                setContact({
                  ...contact,
                  email: value,
                })
              }
            />
          </div>

          <button
            type="button"
            onClick={onUpdateContact}
            className="
            h-[42px]
            px-6
            bg-primary500
            hover:bg-primary700
            text-white
            text-xs
            rounded-full
            "
          >
            ثبت اطلاعات
          </button>
        </div>
      )}
    </>
  );
}
