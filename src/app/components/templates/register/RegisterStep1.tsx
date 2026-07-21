"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

type Props = {
  onNext: () => void;
};

export default function RegisterStep1({ onNext }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("لطفا ایمیل خود را وارد کنید");
      return;
    }

    setError("");

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Email */}

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="ایمیل خود را وارد کنید"
          dir="rtl"
          className="
          w-full
          border
          border-gray-200
          dark:border-[#353535]
          bg-white
          dark:bg-[#353535]
          rounded-full
          py-3
          pr-11
          pl-4
          text-sm
          text-gray-700
          dark:text-white
          placeholder-gray-400
          dark:placeholder-gray-200
          outline-none
          focus:border-[#2A52BE]
          focus:ring-2
          focus:ring-[#2A52BE]/20
          transition-all
          "
        />

        <Mail
          size={17}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          dark:text-white
          pointer-events-none
          "
        />
      </div>

      {/* Error */}

      {error && (
        <p
          className="
          text-xs
          text-red-500
          text-right
          px-2
          "
        >
          {error}
        </p>
      )}

      {/* Submit */}

      <button
        type="submit"
        className="
        w-full
        bg-[#2A52BE]
        hover:bg-[#1e3fa0]
        text-white
        font-semibold
        py-3.5
        rounded-full
        transition
        "
      >
        ادامه
      </button>

      <p
        className="
        text-center
        text-xs
        text-gray-400
        mt-2
        "
      >
        با ثبت نام قوانین را می‌پذیرید
      </p>
    </form>
  );
}
