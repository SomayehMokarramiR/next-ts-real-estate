"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SelectField = ({
  label,
  placeholder = "انتخاب کنید",
}: {
  label: string;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm text-gray-700 mb-2">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          justify-between
          gap-2
          bg-[#F0F0F3]
          border
          border-gray-200
          rounded-full
          px-3
          py-2.5
          text-sm
          text-gray-400
          hover:border-blue-400
          transition-colors
          w-full
        "
      >
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />

        <span className="truncate">{placeholder}</span>
      </button>

      {open && (
        <div
          className="
            absolute
            top-full
            left-0
            right-0
            mt-2
            z-20
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-md
            p-3
            text-sm
            text-gray-500
          "
        >
          گزینه‌ها
        </div>
      )}
    </div>
  );
};

export default SelectField;
