"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, Lock, Phone } from "lucide-react";

import { useRegisterProgress } from "@/app/context/RegisterProgressContext";

type RegisterStep3Props = {
  onBack: () => void;
  userId: string | number;
};

export default function RegisterStep3({ onBack, userId }: RegisterStep3Props) {
  const { setProgress } = useRegisterProgress();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("لطفا نام خود را وارد کنید");
      return;
    }

    if (!lastName.trim()) {
      setError("لطفا نام خانوادگی خود را وارد کنید");
      return;
    }

    if (!password.trim()) {
      setError("لطفا رمز عبور خود را وارد کنید");
      return;
    }

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("لطفا شماره موبایل خود را وارد کنید");
      return;
    }

    if (phoneNumber.length !== 11) {
      setError("شماره موبایل باید ۱۱ رقم باشد");
      return;
    }

    if (!userId) {
      setError("اطلاعات ثبت‌نام پیدا نشد. لطفا دوباره شروع کنید");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/complete-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          name: name.trim(),
          lastName: lastName.trim(),
          password,
          phoneNumber,
        }),
      });

      const responseText = await response.text();

      console.log("COMPLETE REGISTER STATUS:", response.status);
      console.log("COMPLETE REGISTER RAW RESPONSE:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("پاسخ دریافتی از سرور معتبر نیست");
      }

      console.log("COMPLETE REGISTER RESPONSE:", data);

      if (!response.ok || !data?.success) {
        setError(data?.message || "تکمیل ثبت‌نام انجام نشد");
        return;
      }

      setProgress(100);
      setCompleted(true);

      console.log("REGISTER COMPLETED:", data);
    } catch (error) {
      console.error("COMPLETE REGISTER ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "خطایی در تکمیل ثبت‌نام رخ داد",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (loading || completed) return;

    setProgress(66.66);
    onBack();
  };

  if (completed) {
    return (
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        gap-5
        py-8
        "
      >
        <CheckCircle2 size={64} className="text-green-500" />

        <div className="space-y-2">
          <h2
            className="
            text-xl
            font-semibold
            text-[#1a1a2e]
            dark:text-white
            "
          >
            ثبت‌نام با موفقیت انجام شد
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            dark:text-gray-300
            "
          >
            حساب کاربری شما با موفقیت ایجاد شد.
          </p>

          <p
            className="
            text-xs
            text-gray-400
            dark:text-gray-400
            pt-2
            "
          >
            برای ورود، از تب «ورود» در بالای صفحه استفاده کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      flex-col
      gap-3
      "
    >
      {/* Name */}

      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        placeholder="نام خود را وارد کنید"
        dir="rtl"
        disabled={loading}
        autoComplete="given-name"
        className="
        w-full
        border
        border-gray-200
        dark:border-[#353535]
        bg-white
        dark:bg-[#353535]
        rounded-full
        py-3
        px-4
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
        disabled:opacity-60
        "
      />

      {/* Last Name */}

      <input
        type="text"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          setError("");
        }}
        placeholder="نام خانوادگی خود را وارد کنید"
        dir="rtl"
        disabled={loading}
        autoComplete="family-name"
        className="
        w-full
        border
        border-gray-200
        dark:border-[#353535]
        bg-white
        dark:bg-[#353535]
        rounded-full
        py-3
        px-4
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
        disabled:opacity-60
        "
      />

      {/* Password */}

      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          placeholder="رمز عبور خود را وارد کنید"
          dir="rtl"
          disabled={loading}
          autoComplete="new-password"
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
          disabled:opacity-60
          "
        />

        <Lock
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

      {/* Phone */}

      <div className="relative">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 11);

            setPhoneNumber(value);
            setError("");
          }}
          placeholder="شماره موبایل خود را وارد کنید"
          dir="rtl"
          inputMode="numeric"
          maxLength={11}
          disabled={loading}
          autoComplete="tel"
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
          disabled:opacity-60
          "
        />

        <Phone
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
        disabled={loading}
        className="
        w-full
        bg-[#2A52BE]
        hover:bg-[#1e3fa0]
        active:bg-[#173090]
        disabled:opacity-60
        disabled:cursor-not-allowed
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
        {loading ? "در حال تکمیل ثبت‌نام..." : "تکمیل ثبت نام"}
      </button>

      {/* Back */}

      <button
        type="button"
        onClick={handleBack}
        disabled={loading}
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
        disabled:opacity-50
        "
      >
        بازگشت
        <ChevronLeft className="w-4 h-4" />
      </button>
    </form>
  );
}
