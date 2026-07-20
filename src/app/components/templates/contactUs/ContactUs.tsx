"use client";

import {
  Home,
  MapPin,
  Phone,
  Mail,
  Send,
  User,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb() {
  return (
    <nav
      className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mb-8"
      aria-label="مسیر صفحه"
    >
      <a
        href="#"
        className="flex items-center gap-1 hover:text-primary500 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        خانه
      </a>
      <ChevronLeft className="w-3.5 h-3.5 text-gray-300" />
      <span className="text-primary500 font-medium">ارتباط با ما</span>
    </nav>
  );
}

// ─── Contact info card ────────────────────────────────────────────────────────
function InfoCard({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3.5 bg-white hover:border-primary500/30 hover:shadow-sm transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)]">
      <div className="w-9 h-9 rounded-lg bg-[#eef1fb] flex items-center justify-center flex-shrink-0">
        <span className="text-primary500">{icon}</span>
      </div>
      <div className="flex-1 min-w-0 text-sm text-gray-700 leading-relaxed break-all">
        {children}
      </div>
    </div>
  );
}

// ─── Section divider title ────────────────────────────────────────────────────
function SectionHeading({ sub, main }: { sub: string; main: string }) {
  return (
    <div className="text-center mb-10">
      <p className="text-sm text-primary500 font-medium mb-1">{sub}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{main}</h2>
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        با ما در ارتباط باشید
      </h3>

      {/* Name */}
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام و نام خانوادگی"
          required
          dir="rtl"
          className="w-full border border-gray-200 bg-[#F0F0F3] rounded-xl py-3 pr-12 pl-4 text-sm text-gray-700 placeholder-[#8B8D98] focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)]"
        />

        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <User className="w-4 h-4" />
        </span>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
          required
          dir="rtl"
          className="w-full border border-gray-200 bg-[#F0F0F3] rounded-xl py-3 pr-12 pl-4 text-sm text-gray-700 placeholder-[#8B8D98] focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)]"
        />

        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Mail className="w-4 h-4" />
        </span>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="پیام شما"
          required
          rows={5}
          dir="rtl"
          className="w-full border border-gray-200 bg-[#F0F0F3] rounded-xl py-3 pr-12 pl-4 text-sm text-gray-700 placeholder-[#8B8D98] focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all resize-none shadow-[0_2px_8px_rgba(72,72,72,0.16)]"
        />

        <span className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">
          <MessageSquare className="w-4 h-4" />
        </span>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-primary500 hover:bg-[#1e3fa0] active:bg-[#173090] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-md hover:shadow-lg"
      >
        {sent ? (
          "پیام شما ارسال شد ✓"
        ) : (
          <>
            <Send className="w-4 h-4" />
            ارسال درخواست شما
          </>
        )}
      </button>
    </form>
  );
}

// ─── Map embed ────────────────────────────────────────────────────────────────
function MapEmbed() {
  return (
    <div className="w-full h-full min-h-[340px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <iframe
        title="موقعیت مکانی"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107152.16285683427!2d49.4983568!3d37.2808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f89d9e1cb5eb993%3A0x6cd19b2f6e9b95e8!2sRasht%2C%20Gilan%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "340px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactUs() {
  return (
    <div>
      {/* ── Top hero section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <Breadcrumb />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Right – text content */}
          <div className="flex-1 order-1 lg:order-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug mb-5">
              بیش از یک مشاور املاک؛
              <br />
              <span className="text-primary500">شریک آرامش و سرمایه شما</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-8">
              با تخصص، شفافیت و تعهد، رویای ملک ایده‌آل را به واقعیت تبدیل
              می‌کنیم. از مشاوره تا کلید، همراه شما هستیم.
            </p>
          </div>

          {/* Left – contact info cards */}
          <div className="w-full lg:w-[42%] order-2 lg:order-2 flex flex-col gap-3">
            <InfoCard icon={<MapPin className="w-4 h-4" />}>
              گیلان، رشت، میدان آزادی، جنب چهار راه عظیمی‌زاده
            </InfoCard>
            <InfoCard icon={<Phone className="w-4 h-4" />}>
              <span dir="ltr" className="inline-block">
                ۰۱۳۳۳۱۶۱۲۹۰ — ۰۹۱۴۹۶۷۱۹۳۴
              </span>
            </InfoCard>
            <InfoCard icon={<Mail className="w-4 h-4" />}>
              <span dir="ltr" className="inline-block">
                Delta@gmail.com
              </span>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-gray-200" />

      {/* ── Bottom section ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          sub="برای بهترین تجربه"
          main="نظرات خود را به ما بگید"
        />

        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-stretch">
          {/* Right – map */}
          <div className="w-full lg:w-[55%] order-2 lg:order-2">
            <MapEmbed />
          </div>

          {/* Left – contact form */}
          <div className="w-full lg:w-[45%] order-1 lg:order-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
