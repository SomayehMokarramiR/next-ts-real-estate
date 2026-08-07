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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("لطفا کد تایید را وارد کنید");
      return;
    }

    if (code.length !== 5) {
      setError("کد تایید باید ۵ رقم باشد");
      return;
    }

    setError("");

    verifyMutation.mutate(
      {
        email,
        code,
      },
      {
        onSuccess: (res) => {
          console.log("VERIFY RESET RESPONSE:", res);

          if (res.success) {
            onNext();
          }
        },

        onError: (error) => {
          setError(
            error instanceof Error ? error.message : "کد تایید صحیح نیست",
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
      h-full
      px-6
      py-10
      lg:py-0
      "
    >
      <Logo />

      <div className="w-full max-w-sm mt-8">
        <h1
          className="
          text-xl
          font-bold
          text-gray-900
          dark:text-white
          text-center
          mb-8
          "
        >
          تایید کد بازیابی
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
          space-y-4
          "
          dir="rtl"
        >
          <div
            className="
            text-center
            mb-5
            "
          >
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
              <ShieldCheck
                className="
                w-8
                h-8
                text-primary500
                "
              />
            </div>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              کد تایید به ایمیل زیر ارسال شد
            </p>

            <p
              className="
              text-sm
              font-semibold
              text-primary500
              mt-1
              "
            >
              {email}
            </p>
          </div>

          <div className="relative">
            <Mail
              className="
              w-4
              h-4
              text-gray-400
              absolute
              right-4
              top-1/2
              -translate-y-1/2
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
              placeholder="کد تایید ۵ رقمی"
              inputMode="numeric"
              maxLength={5}
              disabled={verifyMutation.isPending}
              className="
              w-[321px]
              h-12
              border
              border-[#CDCED6]
              dark:border-[#353535]
              bg-white
              dark:bg-[#353535]
              rounded-full
              pr-11
              px-4
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

          {error && (
            <p
              className="
              text-xs
              text-red-500
              px-2
              "
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="
            w-[321px]
            h-12
            bg-primary500
            hover:bg-primary600
            disabled:opacity-60
            text-white
            font-medium
            text-sm
            rounded-full
            transition
            "
          >
            {verifyMutation.isPending ? "در حال بررسی..." : "تایید کد"}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={verifyMutation.isPending}
            className="
            flex
            items-center
            justify-center
            gap-1
            w-full
            text-sm
            text-gray-500
            hover:text-primary500
            transition
            "
          >
            بازگشت
            <ArrowLeft
              className="
              w-4
              h-4
              "
            />
          </button>
        </form>
      </div>
    </div>
  );
}
