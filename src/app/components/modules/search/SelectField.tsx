"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
  placeholder?: string;
  options?: string[];
};

export default function SelectField({
  label,
  placeholder = "انتخاب کنید",
  options = [],
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        flex
        flex-col
        gap-1
        w-full
        sm:flex-1
        sm:min-w-[140px]
        relative
      "
    >
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
        onClick={() => setOpen(!open)}
        className="
          flex
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
          w-full
        "
      >
        <ChevronDown size={16} className="text-gray-500 dark:text-gray-300" />

        <span>{placeholder}</span>
      </button>

      {open && (
        <div
          className="
            absolute
            top-full
            mt-2
            w-full
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
          {options.map((item) => (
            <div
              key={item}
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
