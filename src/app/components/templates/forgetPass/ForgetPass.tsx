"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Home,
  ChevronDown,
  Moon,
  User,
  Mail,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Logo from "../../modules/logo/Logo";

// ─── House images for slider ──────────────────────────────────────────────────

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=640&fit=crop",
    alt: "ویلای مدرن با حیاط سبز",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=640&fit=crop",
    alt: "خانه ییلاقی با استخر",
  },
  {
    src: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&h=640&fit=crop",
    alt: "آپارتمان لوکس شهری",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=640&fit=crop",
    alt: "ویلا با نمای کوهستان",
  },
];

// ─── Swiper Slider ────────────────────────────────────────────────────────────

function HouseSlider() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(next, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  // Touch / drag
  const onDragStart = (clientX: number) => {
    setDragging(true);
    setDragStart(clientX);
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const onDragEnd = (clientX: number) => {
    if (!dragging) return;
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setDragging(false);
  };

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden select-none group"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseUp={(e) => onDragEnd(e.clientX)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-20 rounded-b-2xl" />

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
        aria-label="قبلی"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
        aria-label="بعدی"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-blue-600 w-6 h-2.5"
                : "bg-white/60 hover:bg-white/90 w-2.5 h-2.5"
            }`}
            aria-label={`اسلاید ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-3 left-3 z-30 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
        {current + 1} / {SLIDES.length}
      </div>
    </div>
  );
}

// ─── Forgot Password Form ─────────────────────────────────────────────────────

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10 lg:py-0">
      {/* Logo */}
      <Logo />

      <div className="w-full max-w-sm">
        <h1
          className="text-xl font-bold text-gray-900 text-center mb-8"
          dir="rtl"
        >
          فراموشی رمز عبور
        </h1>

        {sent ? (
          <div className="text-center space-y-4" dir="rtl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-700 font-medium">کد تایید ارسال شد</p>
            <p className="text-sm text-gray-500">
              لینک بازیابی رمز عبور به ایمیل{" "}
              <span className="font-medium text-blue-600">{email}</span> ارسال
              شد.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              بازگشت
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} dir="rtl" className="space-y-4">
            {/* Email input */}
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-[321px] h-12 border border-[#CDCED6] bg-white rounded-full pr-11 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary500 focus:border-primary500 transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-[321px] h-12 bg-primary500 hover:bg-primary600 text-white font-medium text-sm rounded-full transition-colors"
            >
              ارسال کد تایید
            </button>

            {/* Back to login */}
            <p className="text-center text-sm text-gray-500 pt-1">
              <a
                href="#"
                className="text-primary500 hover:text-primary600 font-medium hover:underline"
              >
                بازگشت به ورود
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ForgetPass() {
  return (
    <div className=" flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col sm:flex-row min-h-130">
          {/* Right — Form */}
          <div className="w-full lg:w-[45%] flex items-center justify-center border-t lg:border-t-0 lg:border-r border-gray-100">
            <ForgotPasswordForm />
          </div>

          {/* Left — Slider */}
          <div className="hidden sm:block  w-full lg:w-[60%] h-64 sm:h-80 lg:h-auto p-4">
            <HouseSlider />
          </div>
        </div>
      </main>
    </div>
  );
}
