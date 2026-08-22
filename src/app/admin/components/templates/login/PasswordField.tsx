"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function PasswordField({
  value,
  onChange,
  placeholder = "رمز عبور را وارد کنید",
  required = false,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete="current-password"
        className="
          w-full
          h-11
          rounded-full
          border
          border-gray-200
          dark:border-[#555]
          bg-white
          dark:bg-[#353535]
          px-4
          pr-4
          pl-11
          text-sm
          text-gray-700
          dark:text-white
          placeholder-gray-400
          focus:outline-none
          focus:border-primary500
          focus:ring-2
          focus:ring-primary500/20
          transition
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          hover:text-primary500
          transition
        "
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
