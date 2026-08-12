"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function SelectField({
  label,
  placeholder = "انتخاب کنید",
  options = [],
  value = "",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex w-full min-w-0 flex-col gap-1">
      <label
        className="
          text-sm
          font-medium
          text-gray-700
          dark:text-white
          text-right
        "
      >
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          w-full
          min-w-0
          items-center
          justify-between
          bg-[#F0F0F3]
          dark:bg-[#353535]
          rounded-full
          px-4
          py-2.5
          text-sm
          text-gray-400
          dark:text-gray-300
        "
      >
        <ChevronDown
          size={16}
          className="shrink-0 text-gray-500 dark:text-gray-300"
        />

        <span className="min-w-0 truncate">{value || placeholder}</span>
      </button>

      {open && (
        <div
          className="
            absolute
            top-full
            right-0
            mt-2
            w-full
            min-w-0
            bg-white
            dark:bg-[#353535]
            rounded-xl
            shadow-lg
            border
            border-gray-100
            dark:border-[#444]
            z-20
            p-2
          "
        >
          {/* پاک کردن انتخاب */}
          <div
            onClick={() => {
              onChange?.("");
              setOpen(false);
            }}
            className="
              px-3
              py-2
              hover:bg-gray-100
              dark:hover:bg-[#454545]
              rounded-lg
              text-sm
              cursor-pointer
              text-gray-400
            "
          >
            انتخاب کنید
          </div>

          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange?.(item);
                setOpen(false);
              }}
              className="
                px-3
                py-2
                hover:bg-gray-100
                dark:hover:bg-[#454545]
                rounded-lg
                text-sm
                cursor-pointer
                text-gray-700
                dark:text-white
              "
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
