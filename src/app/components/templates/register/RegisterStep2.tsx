"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft } from "lucide-react";

const OTP_LENGTH = 5;
const RESEND_SECONDS = 90;

type RegisterStep2Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function RegisterStep2({ onNext, onBack }: RegisterStep2Props) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const canResend = seconds <= 0;

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = () => {
    if (!canResend) return;

    setSeconds(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");

    inputRefs.current[0]?.focus();
  };

  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");

    const seconds = (s % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
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

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const next = Array(OTP_LENGTH).fill("");

    pasted.split("").forEach((item, index) => {
      next[index] = item;
    });

    setOtp(next);

    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError("لطفا کد تایید را کامل وارد کنید");

      return;
    }

    setError("");

    // اینجا بعدا API تایید OTP قرار می‌گیرد

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            autoFocus={index === 0}
            type="text"
            inputMode="numeric"
            maxLength={1}
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

            `}
          />
        ))}
      </div>

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

      <div
        className="
        text-center
        text-sm
        text-gray-500
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
            tabular-nums
            "
            >
              {formatTime(seconds)}
            </span>{" "}
            تا ارسال مجدد
          </span>
        )}
      </div>

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
        text-sm
        shadow-md
        "
      >
        ادامه
      </button>

      <button
        type="button"
        onClick={onBack}
        className="
        flex
        items-center
        justify-end
        gap-1
        text-sm
        text-gray-500
        hover:text-[#2A52BE]
        transition
        self-end
        "
      >
        بازگشت
        <ChevronLeft className="w-4 h-4" />
      </button>
    </form>
  );
}
