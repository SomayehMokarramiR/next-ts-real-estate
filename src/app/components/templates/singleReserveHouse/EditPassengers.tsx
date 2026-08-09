"use client";

import { UserPlus, Save, Trash2 } from "lucide-react";

import Field from "./Field";
import { Passenger } from "./types";
import { emptyPassenger } from "./constants";
import { validatePassenger } from "@/validators/passengerValidator";
import Swal from "sweetalert2";

type Props = {
  passengers: Passenger[];

  onChange: (index: number, field: keyof Passenger, value: string) => void;

  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;

  onSave: () => void;
};

export default function EditPassengers({
  passengers,
  onChange,
  setPassengers,
  onSave,
}: Props) {
  const addNewPassenger = () => {
    setPassengers((prev) => [...prev, emptyPassenger()]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length <= 1) return;

    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    for (const passenger of passengers) {
      const error = validatePassenger(passenger);

      if (error) {
        await Swal.fire({
          icon: "warning",
          title: "اطلاعات ناقص",
          text: error,
        });

        return;
      }
    }

    onSave();
  };

  return (
    <div dir="rtl">
      <h3
        className="
        font-bold
        text-base
        dark:text-white
        "
      >
        ویرایش مسافران
      </h3>

      {passengers.map((passenger, index) => (
        <div
          key={index}
          className="
          mt-5
          bg-white
          dark:bg-[#272727]
          rounded-2xl
          p-5
          border
          border-gray-200
          dark:border-[#353535]
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            mb-4
            "
          >
            <h4
              className="
              font-bold
              text-sm
              dark:text-white
              "
            >
              مسافر {index + 1}
            </h4>

            {passengers.length > 1 && (
              <button
                type="button"
                onClick={() => removePassenger(index)}
                className="
                w-8
                h-8
                rounded-full
                bg-red-500
                text-white
                flex
                items-center
                justify-center
                "
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>

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
              onChange={(v) => onChange(index, "name", v)}
            />

            <Field
              label="نام خانوادگی"
              placeholder="نام خانوادگی"
              value={passenger.family}
              onChange={(v) => onChange(index, "family", v)}
            />

            <div>
              <label
                className="
                block
                text-xs
                mb-1.5
                text-gray-500
                dark:text-white
                "
              >
                جنسیت
              </label>

              <select
                value={passenger.gender}
                onChange={(e) => onChange(index, "gender", e.target.value)}
                className="
                w-full
                rounded-full
                border
                border-gray-200
                dark:border-[#353535]
                px-3
                py-2.5
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
              onChange={(v) => onChange(index, "nationalId", v)}
            />

            <Field
              label="تاریخ تولد"
              placeholder="1370/01/01"
              value={passenger.birthDate}
              onChange={(v) => onChange(index, "birthDate", v)}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addNewPassenger}
        className="
        mt-5
        w-full
        h-11
        rounded-full
        border
        border-primary500
        text-primary500
        flex
        items-center
        justify-center
        gap-2
        text-sm
        "
      >
        <UserPlus size={16} />
        افزودن مسافر جدید
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="
        mt-3
        w-full
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
        <Save size={16} />
        ذخیره تغییرات
      </button>
    </div>
  );
}
