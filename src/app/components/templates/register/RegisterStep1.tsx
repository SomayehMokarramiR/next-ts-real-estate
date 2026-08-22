"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import { useRegisterProgress } from "@/app/context/RegisterProgressContext";
import { useRegister } from "../../../../hooks/useAuth";

type Props = {
  onNext: () => void;
  onUserCreated: (id: string) => void;
};

export default function RegisterStep1({ onNext, onUserCreated }: Props) {
  const { setProgress } = useRegisterProgress();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const registerMutation = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("لطفا ایمیل خود را وارد کنید");
      return;
    }

    setError("");
    setAlertMessage("");

    try {
      const data = await registerMutation.mutateAsync({
        email: normalizedEmail,
      });

      console.log("REGISTER RESPONSE:", data);

      const tempUserId = data?.tempUserId;

      if (!tempUserId) {
        setError("شناسه ثبت‌نام از سرور دریافت نشد");

        return;
      }

      // حفظ روند قبلی
      onUserCreated(String(tempUserId));

      setProgress(33.33);

      onNext();
    } catch (error: unknown) {
      console.error("REGISTER STEP 1 ERROR:", error);

      if (error instanceof Error) {
        // خطاهای سیستمی
        if (
          error.message.includes("غیرفعال") ||
          error.message.includes("غیر فعال") ||
          error.message.includes("disabled")
        ) {
          setAlertMessage(error.message);

          return;
        }

        // خطاهای مربوط به فرم
        setError(error.message);
      } else {
        setAlertMessage("خطایی در ثبت ایمیل رخ داد");
      }
    }
  };

  const loading = registerMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      flex-col
      gap-4
      "
    >
      {alertMessage && (
        <div
          className="
          rounded-lg
          bg-red-50
          text-red-600
          text-sm
          text-center
          py-3
          px-4
          "
        >
          {alertMessage}
        </div>
      )}

      {/* Email */}

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            setError("");

            setAlertMessage("");
          }}
          placeholder="ایمیل خود را وارد کنید"
          dir="rtl"
          disabled={loading}
          autoComplete="email"
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
          disabled:opacity-60
          disabled:cursor-not-allowed
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

      {/* Email Error */}

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
        disabled={loading}
        className="
        w-full
        bg-[#2A52BE]
        hover:bg-[#1e3fa0]
        text-white
        font-semibold
        py-3.5
        rounded-full
        transition
        disabled:opacity-60
        disabled:cursor-not-allowed
        "
      >
        {loading ? "در حال ارسال..." : "ادامه"}
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
