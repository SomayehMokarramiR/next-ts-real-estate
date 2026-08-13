"use client";

import { useState } from "react";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

import Logo from "../../modules/logo/Logo";
import { useVerifyResetCode } from "@/hooks/useAuth";

type ForgotPasswordStep2Props = {
  email: string;
  code: string;
  setCode: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function ForgotPasswordStep2({
  email,
  code,
  setCode,
  onNext,
  onBack,
}: ForgotPasswordStep2Props) {
  const verifyMutation = useVerifyResetCode();

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = email.trim();
    const normalizedCode = code.trim();

    if (!normalizedEmail) {
      setError("ایمیل وارد نشده است.");
      return;
    }

    if (!normalizedCode) {
      setError("لطفاً کد تأیید را وارد کنید.");
      return;
    }

    if (normalizedCode.length !== 5) {
      setError("کد تأیید باید ۵ رقم باشد.");
      return;
    }

    setError("");

    verifyMutation.mutate(
      {
        email: normalizedEmail,
        code: normalizedCode,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            onNext();
            return;
          }

          setError(res.message || "کد تأیید صحیح نیست.");
        },

        onError: (error) => {
          setError(
            error instanceof Error ? error.message : "کد تأیید صحیح نیست.",
          );
        },
      },
    );
  };

  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        px-6
        py-6
        lg:py-0
      "
    >
      <Logo />

      <div className="w-full max-w-sm mt-6">
        <h1
          className="
            text-xl
            font-bold
            text-gray-900
            dark:text-white
            text-center
            mb-6
          "
        >
          تأیید کد بازیابی
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
            w-full
            flex
            flex-col
            items-center
          "
          dir="rtl"
        >
          {/* Info */}
          <div className="text-center mb-5">
            <div
              className="
                w-16
                h-16
                bg-blue-100
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-3
              "
            >
              <ShieldCheck className="w-8 h-8 text-primary500" />
            </div>

            <p className="text-sm text-gray-500">
              کد تأیید به ایمیل زیر ارسال شد
            </p>

            <p
              className="
                text-sm
                font-semibold
                text-primary500
                mt-1
                break-all
              "
            >
              {email}
            </p>
          </div>

          {/* Code */}
          <div className="relative w-full max-w-[321px]">
            <Mail
              className="
                w-4
                h-4
                text-gray-400
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                pointer-events-none
                z-10
              "
            />

            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 5);

                setCode(value);
                setError("");
              }}
              placeholder="کد تأیید ۵ رقمی"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={5}
              disabled={verifyMutation.isPending}
              className="
                w-full
                h-12
                border
                border-[#CDCED6]
                dark:border-[#353535]
                bg-white
                dark:bg-[#353535]
                rounded-full
                pr-11
                pl-4
                text-sm
                text-gray-800
                dark:text-white
                placeholder:text-gray-400
                outline-none
                focus:border-2
                focus:border-primary500
                focus:ring-0
                transition-all
              "
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="
                w-full
                max-w-[321px]
                text-xs
                text-red-500
                text-right
                mt-2
              "
            >
              {error}
            </p>
          )}

          {/* Verify */}
          <button
            type="submit"
            disabled={verifyMutation.isPending || code.length !== 5}
            className="
              w-full
              max-w-[321px]
              h-12
              mt-4
              bg-primary500
              hover:bg-primary600
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              font-medium
              text-sm
              rounded-full
              transition
            "
          >
            {verifyMutation.isPending ? "در حال بررسی..." : "تأیید کد"}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            disabled={verifyMutation.isPending}
            className="
              flex
              items-center
              justify-center
              gap-1
              mt-6
              text-sm
              text-gray-500
              hover:text-primary500
              disabled:opacity-50
              transition-colors
            "
          >
            بازگشت
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
