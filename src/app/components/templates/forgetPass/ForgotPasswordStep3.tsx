"use client";

import { useState } from "react";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Logo from "../../modules/logo/Logo";
import { useResetPassword } from "@/hooks/useAuth";

type ForgotPasswordStep3Props = {
  email: string;
  code: string;
  onBack: () => void;
};

export default function ForgotPasswordStep3({
  email,
  code,
  onBack,
}: ForgotPasswordStep3Props) {
  const router = useRouter();

  const resetMutation = useResetPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("لطفا رمز جدید را وارد کنید");
      return;
    }

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (password !== confirmPassword) {
      setError("تکرار رمز عبور صحیح نیست");
      return;
    }

    setError("");

    resetMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (res) => {
          console.log("RESET PASSWORD RESPONSE:", res);

          if (res.success) {
            setCompleted(true);

            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        },

        onError: (error) => {
          setError(
            error instanceof Error ? error.message : "تغییر رمز انجام نشد",
          );
        },
      },
    );
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
            رمز عبور تغییر کرد
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            dark:text-gray-300
            "
          >
            در حال انتقال به صفحه ورود...
          </p>
        </div>
      </div>
    );
  }

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
          تعیین رمز عبور جدید
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          {/* Password */}

          <div className="relative">
            <Lock
              size={17}
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="رمز عبور جدید"
              disabled={resetMutation.isPending}
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
              outline-none
              focus:border-2
              focus:border-primary500
              focus:ring-0
              "
            />
          </div>

          {/* Confirm Password */}

          <div className="relative">
            <Lock
              size={17}
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder="تکرار رمز عبور"
              disabled={resetMutation.isPending}
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
              outline-none
              focus:border-2
              focus:border-primary500
              focus:ring-0
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
            disabled={resetMutation.isPending}
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
            {resetMutation.isPending ? "در حال تغییر رمز..." : "تغییر رمز عبور"}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={resetMutation.isPending}
            className="
            flex
            items-center
            justify-center
            gap-1
            w-full
            text-sm
            text-gray-500
            hover:text-primary500
            "
          >
            بازگشت
            <ArrowLeft size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
