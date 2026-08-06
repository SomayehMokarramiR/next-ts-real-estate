"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";

import { useRegisterProgress } from "@/app/context/RegisterProgressContext";
import { useVerifyEmail } from "../../../../hooks/useAuth";

const OTP_LENGTH = 5;
const RESEND_SECONDS = 90;

type RegisterStep2Props = {
  onNext: () => void;
  onBack: () => void;
  userId: string | null;
};

export default function RegisterStep2({
  onNext,
  onBack,
  userId,
}: RegisterStep2Props) {
  const { setProgress } = useRegisterProgress();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [error, setError] = useState("");

  const verifyEmailMutation = useVerifyEmail();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const canResend = seconds <= 0;

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");

    const remainingSeconds = (value % 60).toString().padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);

      const next = [...otp];

      next[index] = digit;

      setOtp(next);
      setError("");

      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp],
  );

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const next = Array(OTP_LENGTH).fill("");

    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });

    setOtp(next);
    setError("");

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);

    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (!canResend) {
      return;
    }

    /*
     * فعلاً فقط تایمر و ورودی را ریست می‌کنیم.
     * ارسال مجدد API را بعداً اضافه می‌کنیم.
     */

    setSeconds(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");

    inputRefs.current[0]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError("لطفا کد تایید را کامل وارد کنید");
      return;
    }

    if (!userId) {
      setError("اطلاعات ثبت‌نام پیدا نشد. لطفا دوباره شروع کنید");
      return;
    }

    setError("");

    try {
      console.log("VERIFY USER ID:", userId);
      console.log("VERIFY CODE:", code);

      const data = await verifyEmailMutation.mutateAsync({
        tempUserId: userId,
        verificationCode: code,
      });

      console.log("VERIFY EMAIL RESPONSE:", data);

      setProgress(66.66);

      onNext();
    } catch (error: unknown) {
      console.error("VERIFY EMAIL ERROR:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("خطایی در تایید کد رخ داد");
      }
    }
  };

  const handleBack = () => {
    setProgress(0);
    onBack();
  };

  const loading = verifyEmailMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-4
      "
    >
      {/* OTP */}

      <div
        dir="ltr"
        onPaste={handlePaste}
        className="
          flex
          justify-center
          gap-2
          sm:gap-3
        "
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            autoFocus={index === 0}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={loading}
            className={`
              w-11
              h-12
              sm:w-12
              sm:h-12
              text-center
              text-lg
              font-semibold
              rounded-full
              border
              outline-none
              transition

              ${
                digit
                  ? "border-[#2A52BE] bg-[#eef1fb] text-[#2A52BE]"
                  : "border-gray-200 bg-white"
              }

              disabled:opacity-60
            `}
          />
        ))}
      </div>

      {/* Error */}

      {error && (
        <p
          className="
            text-xs
            text-red-500
            text-center
          "
        >
          {error}
        </p>
      )}

      {/* Timer */}

      <div
        className="
          text-center
          text-sm
          text-gray-500
          dark:text-white
        "
      >
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="
              text-[#2A52BE]
              font-medium
              hover:underline
            "
          >
            ارسال مجدد کد
          </button>
        ) : (
          <span>
            <span
              className="
                font-medium
                text-gray-700
                dark:text-white
                tabular-nums
              "
            >
              {formatTime(seconds)}
            </span>{" "}
            تا ارسال مجدد
          </span>
        )}
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-[#2A52BE]
          hover:bg-[#1e3fa0]
          disabled:opacity-60
          disabled:cursor-not-allowed
          text-white
          font-semibold
          py-3.5
          rounded-full
          transition
          text-sm
          shadow-md
        "
      >
        {loading ? "در حال بررسی..." : "ادامه"}
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
          text-sm
          text-gray-500
          dark:text-white
          hover:text-[#2A52BE]
          transition
          self-end
          disabled:opacity-50
        "
      >
        بازگشت
        <ChevronLeft className="w-4 h-4" />
      </button>
    </form>
  );
}
