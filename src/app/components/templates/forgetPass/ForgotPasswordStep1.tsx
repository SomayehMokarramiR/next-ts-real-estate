"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { User } from "lucide-react";

import { useForgotPassword } from "@/hooks/useAuth";

type ForgotPasswordStep1Props = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  onNext: () => void;
};

export default function ForgotPasswordStep1({
  email,
  setEmail,
  onNext,
}: ForgotPasswordStep1Props) {
  const forgotMutation = useForgotPassword();

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("ایمیل را وارد کنید");
      return;
    }

    setError("");

    forgotMutation.mutate(
      {
        email: normalizedEmail,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            onNext();
          } else {
            setError(res.message || "ارسال کد تایید انجام نشد");
          }
        },

        onError: (error) => {
          setError(
            error instanceof Error
              ? error.message
              : "خطایی در ارسال کد تایید رخ داد",
          );
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        flex
        flex-col
        items-center
        gap-4
      "
      dir="rtl"
    >
      {/* Email */}
      <div className="relative w-full max-w-[321px]">
        <User
          size={16}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
            z-10
          "
        />

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="ایمیل خود را وارد کنید"
          autoComplete="email"
          disabled={forgotMutation.isPending}
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
            text-gray-700
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
          "
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={forgotMutation.isPending}
        className="
          w-full
          max-w-[321px]
          h-12
          rounded-full
          bg-primary500
          hover:bg-primary600
          text-white
          font-medium
          text-sm
          transition
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {forgotMutation.isPending ? "در حال ارسال..." : "ارسال کد تایید"}
      </button>
    </form>
  );
}
