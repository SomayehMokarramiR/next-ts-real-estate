"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Home,
  User,
  Mail,
  ChevronLeft,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import Logo from "../../modules/logo/Logo";

const HOUSE_IMAGES = [
  "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc4NDQ0OTE5MHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc4NDQ0OTE5MHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1722421492323-eaf9c401befe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc4NDQ0OTE5MHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
];

const OTP_LENGTH = 5;
const RESEND_SECONDS = 90;

// ─── SVG logos ────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
    <path
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      fill="#FFC107"
    />
    <path
      d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      fill="#FF3D00"
    />
    <path
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      fill="#4CAF50"
    />
    <path
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      fill="#1976D2"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// ─── Shared: Password field ───────────────────────────────────────────────────
function PasswordField({
  placeholder,
  value,
  onChange,
  required,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        dir="rtl"
        className="
          w-full
          border border-gray-200
          bg-white
          rounded-full
          py-3
          pr-11
          pl-4
          text-sm
          text-gray-700
          placeholder-gray-400
          focus:outline-none
          focus:border-primary500
          focus:ring-2
          focus:ring-primary500/20
          transition-all
        "
      />

      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        tabIndex={-1}
        className="
          absolute
          right-3.5
          top-1/2
          -translate-y-1/2
          text-gray-400
          hover:text-gray-600
          transition-colors
        "
        aria-label={show ? "مخفی کردن رمز" : "نمایش رمز"}
      >
        {show ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ─── Login form ───────────────────────────────────────────────────────────────
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login
  };

  return (
    <div className="flex flex-col gap-4">
      {/* OAuth buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <GithubIcon />
          Github
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <GoogleIcon />
          Google
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 whitespace-nowrap">
          یا میتوانید
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Email / Password */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل خود را وارد کنید"
            required
            dir="rtl"
            className="w-full border border-gray-200 bg-white rounded-full py-3 pr-11 pl-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all"
          />

          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Mail className="w-4 h-4" />
          </span>
        </div>
        <PasswordField
          placeholder="رمز عبور را وارد کنید"
          value={password}
          onChange={setPassword}
          required
        />

        {/* Forgot password */}
        <div className="flex items-center justify-start gap-1">
          <Info className="w-3.5 h-3.5 text-primary500 shrink-0" />
          <a
            href="#"
            className="text-xs text-primary500 hover:text-primary700 transition-colors"
          >
            رمز عبور خود را فراموش کرده اید ؟
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-primary500 hover:bg-[#1e3fa0] active:bg-[#173090] text-white font-semibold py-3.5 rounded-full transition-colors duration-200 text-sm shadow-md hover:shadow-lg mt-1"
        >
          ورود به حساب کاربری
        </button>
      </form>
    </div>
  );
}

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
