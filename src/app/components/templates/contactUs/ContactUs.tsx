import { MapPin, Phone, Mail } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import InfoCard from "./InfoCard";
import SectionHeading from "./SectionHeading";
import MapEmbed from "./MapEmbed";
import ContactForm from "./ContactForm";

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
