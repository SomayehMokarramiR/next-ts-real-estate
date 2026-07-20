"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useState, useRef, useEffect, useCallback } from "react";
import { User, Mail, ChevronLeft, Phone } from "lucide-react";
import Logo from "../../modules/logo/Logo";
import LoginForm from "./LoginForm";
import { HOUSE_IMAGES, OTP_LENGTH, RESEND_SECONDS } from "./constants";
import PasswordField from "./PasswordField";

// ─── Register Step 1 ──────────────────────────────────────────────────────────
function Step1({ onNext }: { onNext: () => void }) {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) onNext();
      }}
      className="flex flex-col gap-4"
    >
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل خود را وارد کنید"
          required
          dir="rtl"
          className="w-full border border-gray-200 bg-white rounded-full py-3 pr-4 pl-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all"
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Mail className="w-4 h-4" />
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-primary500 hover:bg-[#1e3fa0] active:bg-[#173090] text-white font-semibold py-3.5 rounded-full transition-colors text-sm shadow-md hover:shadow-lg"
      >
        ارسال کد تایید
      </button>
      <p className="text-center text-xs text-gray-400 leading-relaxed">
        با ثبت‌نام، شما{" "}
        <a href="#" className="text-primary500 hover:underline">
          قوانین و مقررات
        </a>{" "}
        را می‌پذیرید
      </p>
    </form>
  );
}

// ─── Register Step 2 — OTP ────────────────────────────────────────────────────
function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  // const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const canResend = seconds <= 0;

  // useEffect(() => {
  //   if (seconds <= 0) {
  //     setCanResend(true);
  //     return;
  //   }
  //   const id = setInterval(() => setSeconds((s) => s - 1), 1000);
  //   return () => clearInterval(id);
  // }, [seconds]);

  useEffect(() => {
    if (seconds <= 0) return;

    const id = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [seconds]);

  // const handleResend = () => {
  //   if (!canResend) return;
  //   setSeconds(RESEND_SECONDS);
  //   setCanResend(false);
  //   setOtp(Array(OTP_LENGTH).fill(""));
  //   inputRefs.current[0]?.focus();
  // };

  const handleResend = () => {
    if (!canResend) return;

    setSeconds(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      const next = [...otp];
      next[index] = digit;
      setOtp(next);
      if (digit && index < OTP_LENGTH - 1)
        inputRefs.current[index + 1]?.focus();
    },
    [otp],
  );

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-4"
    >
      <div
        className="flex gap-2 sm:gap-3 justify-center"
        dir="ltr"
        onPaste={handlePaste}
      >
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            autoFocus={i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-11 h-12 sm:w-12 text-center text-lg font-semibold rounded-full border transition-all outline-none
              ${
                digit
                  ? "border-primary500 bg-[#eef1fb] text-primary500 ring-2 ring-primary500/20"
                  : "border-gray-200 bg-white text-gray-700 focus:border-primary500 focus:ring-2 focus:ring-primary500/20"
              }`}
          />
        ))}
      </div>
      <div className="text-center text-sm text-gray-500">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-primary500 font-medium hover:underline"
          >
            ارسال مجدد کد
          </button>
        ) : (
          <span>
            <span className="font-medium text-gray-700 tabular-nums">
              {fmt(seconds)}
            </span>{" "}
            تا ارسال مجدد
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-primary500 hover:bg-[#1e3fa0] text-white font-semibold py-3.5 rounded-full transition-colors text-sm shadow-md hover:shadow-lg"
      >
        ارسال کد تایید
      </button>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-end gap-1 text-sm text-gray-500 hover:text-primary500 transition-colors self-end"
      >
        بازگشت <ChevronLeft className="w-4 h-4" />
      </button>
    </form>
  );
}

// ─── Register Step 3 — Profile ────────────────────────────────────────────────
function Step3({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره تماس خود را وارد کنید"
          required
          dir="rtl"
          className="w-full border border-gray-200 bg-white rounded-full py-3 pr-4 pl-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all"
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Phone className="w-4 h-4" />
        </span>
      </div>
      <PasswordField
        placeholder="رمز عبور خود را وارد کنید"
        value={password}
        onChange={(v) => {
          setPassword(v);
          setError("");
        }}
        required
      />
      <PasswordField
        placeholder="تکرار رمز عبور"
        value={confirm}
        onChange={(v) => {
          setConfirm(v);
          setError("");
        }}
        required
      />
      {error && <p className="text-xs text-red-500 text-right px-1">{error}</p>}
      <button
        type="submit"
        className="w-full bg-primary500 hover:bg-[#1e3fa0] text-white font-semibold py-3.5 rounded-full transition-colors text-sm shadow-md hover:shadow-lg mt-1"
      >
        ارسال کد تایید
      </button>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-end gap-1 text-sm text-gray-500 hover:text-primary500 transition-colors self-end"
      >
        بازگشت <ChevronLeft className="w-4 h-4" />
      </button>
    </form>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
export default function Login() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    setRegStep(1);
  };

  const pageTitle =
    activeTab === "login" ? "ورود به حساب کاربری" : "ایجاد حساب کاربری";

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className="
          w-full 
          max-w-5xl 
          bg-white 
          rounded-2xl 
          shadow-2xl 
          overflow-hidden 
          flex 
          flex-col 
          md:flex-row
        "
      >
        {/* Right - Form */}
        <div
          className="
            w-full 
            md:w-[45%] 
            flex 
            flex-col 
            justify-center 
            px-5 
            py-10 
            sm:px-8 
            sm:py-12 
            lg:px-10
          "
        >
          <Logo />

          <h1 className="text-xl font-semibold text-center text-[#1a1a2e] mb-5 mt-8">
            {pageTitle}
          </h1>

          {/* Tabs */}
          <div className="flex bg-[#f0f2f5] rounded-full p-1 mb-6 gap-1">
            <button
              onClick={() => handleTabChange("register")}
              className={`
                flex-1
                h-11
                flex
                items-center
                justify-center
                gap-1.5
               rounded-full
                whitespace-nowrap
                text-xs
                sm:text-sm
                font-medium
                transition-all
                duration-200
                ${
                  activeTab === "register"
                    ? "bg-primary500 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>ساخت حساب کاربری</span>
            </button>

            <button
              onClick={() => handleTabChange("login")}
              className={`
                flex-1
                h-11
                flex
                items-center
                justify-center
                gap-1.5
               rounded-full
                whitespace-nowrap
                text-xs
                sm:text-sm
                font-medium
                transition-all
                duration-200
                ${
                  activeTab === "login"
                    ? "bg-primary500 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>ورود به حساب کاربری</span>
            </button>
          </div>

          {/* Content */}
          {activeTab === "login" && <LoginForm />}

          {activeTab === "register" && regStep === 1 && (
            <Step1 onNext={() => setRegStep(2)} />
          )}

          {activeTab === "register" && regStep === 2 && (
            <Step2 onNext={() => setRegStep(3)} onBack={() => setRegStep(1)} />
          )}

          {activeTab === "register" && regStep === 3 && (
            <Step3 onBack={() => setRegStep(2)} />
          )}
        </div>

        {/* Left - Hero Swiper */}
        <div
          className="
            relative
            w-full
            md:w-[55%]
            h-56
            sm:h-72
            md:h-auto
            min-h-80
            shrink-0
          "
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="w-full h-full login-swiper"
          >
            {HOUSE_IMAGES.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt="تصویر خانه"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="
              absolute 
              inset-x-0 
              bottom-0 
              h-20 
              bg-gradient-to-t 
              from-black/40 
              to-transparent 
              pointer-events-none
            "
          />
        </div>
      </div>
    </div>
  );
}
