"use client";

import { useState } from "react";
import { ChevronLeft, User, Mail } from "lucide-react";

type RegisterStep3Props = {
  onBack: () => void;
};

export default function RegisterStep3({ onBack }: RegisterStep3Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError("لطفا نام و نام خانوادگی را وارد کنید");
      return;
    }

    setError("");

    console.log({
      firstName,
      lastName,
      email,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* First Name */}
      <div className="relative">
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError("");
          }}
          placeholder="نام خود را وارد کنید"
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
          ext-gray-700
          dark:text-gray-300
          placeholder-gray-400
          dark:placeholder-gray-200
          outline-none
          focus:border-[#2A52BE]
          focus:ring-2
          focus:ring-[#2A52BE]/20
          transition-all
          "
        />

        <User
          size={17}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          dark:text-gray-200
          pointer-events-none
          "
        />
      </div>

      {/* Last Name */}
      <div className="relative">
        <input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setError("");
          }}
          placeholder="نام خانوادگی خود را وارد کنید"
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
          ext-gray-700
          dark:text-gray-300
          placeholder-gray-400
          dark:placeholder-gray-200
          outline-none
          focus:border-[#2A52BE]
          focus:ring-2
          focus:ring-[#2A52BE]/20
          transition-all
          "
        />

        <User
          size={17}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
          "
        />
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="ایمیل خود را وارد کنید (اختیاری)"
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
          dark:text-gray-300
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
          dark:text-gray-200
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
          px-1
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
        active:bg-[#173090]
        text-white
        font-semibold
        py-3.5
        rounded-full
        transition
        text-sm
        shadow-md
        mt-2
        "
      >
        تکمیل ثبت نام
      </button>

      {/* Back */}

      <button
        type="button"
        onClick={onBack}
        className="
        flex
        items-center
        justify-end
        gap-1
        w-full
        text-sm
        text-gray-500
        dark:text-white
        hover:text-[#2A52BE]
        transition
        "
      >
        بازگشت
        <ChevronLeft className="w-4 h-4" />
      </button>
    </form>
  );
}
