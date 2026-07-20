"use client";

import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import { Lock, Eye } from "lucide-react";

export default function PasswordField({
  placeholder,
  value,
  onChange,
  required,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        dir="rtl"
        className="
          w-full
          border border-gray-200
          bg-white
          rounded-full
          py-3
          pr-11
          pl-4
          text-sm
          text-gray-700
          placeholder-gray-400
          focus:outline-none
          focus:border-primary500
          focus:ring-2
          focus:ring-primary500/20
          transition-all
        "
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        tabIndex={-1}
        className="
          absolute
          right-3.5
          top-1/2
          -translate-y-1/2
          text-gray-400
          hover:text-gray-600
          transition-colors
        "
        aria-label={show ? "مخفی کردن رمز" : "نمایش رمز"}
      >
        {show ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      </button>
    </div>
  );
}
