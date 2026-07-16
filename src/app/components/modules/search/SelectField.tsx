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
      <label className="text-sm font-medium text-gray-700 text-right">
        {label}
      </label>

      <button
        onClick={() => setOpen(!open)}
        className="
        flex
        items-center
        justify-between
        bg-[#F0F0F3]
        rounded-full
        px-4
        py-2.5
        text-sm
        text-gray-400
        w-full
        "
      >
        <ChevronDown size={16} />

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
          rounded-xl
          shadow-lg
          border
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
              rounded-lg
              text-sm
              cursor-pointer
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
