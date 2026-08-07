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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("ایمیل را وارد کنید");
      return;
    }

    setError("");

    forgotMutation.mutate(
      {
        email,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            onNext();
          }
        },

        onError: (error) => {
          setError(error instanceof Error ? error.message : "خطایی رخ داد");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      flex
      flex-col
      gap-4
      "
    >
      <div className="relative">
        <User
          size={16}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
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
          dir="rtl"
          disabled={forgotMutation.isPending}
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
          text-right
          px-2
          "
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={forgotMutation.isPending}
        className="
        w-[321px]
        h-12
        rounded-full
        bg-primary500
        hover:bg-primary600
        text-white
        font-medium
        text-sm
        transition
        disabled:opacity-60
        "
      >
        {forgotMutation.isPending ? "در حال ارسال..." : "ارسال کد تایید"}
      </button>
    </form>
  );
}
