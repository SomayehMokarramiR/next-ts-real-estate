import Image from "next/image";
import ReviewCard from "./ReviewCard";
import { reviews } from "./constants";

export default function CredibilitySection() {
  return (
    <section
      className="
        relative
        w-full
        min-h-[900px]
        overflow-hidden
        md:min-h-[650px]
      "
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/credibilityBg.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          -z-10
        "
        style={{
          backgroundColor: "rgba(10,50,50,0.72)",
        }}
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          items-start
          gap-12
          px-6
          py-16
          md:grid-cols-2
        "
      >
        {/* Right */}
        <div className="text-right md:pt-6">
          <h2
            className="
              mb-6
              text-3xl
              font-bold
              leading-snug
              text-white
              md:text-4xl
            "
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            رضایت شما اعتبار ماست
          </h2>

          <p
            className="
              text-sm
              leading-8
              text-white/75
            "
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            پیدا کردن ویلای مناسب همیشه کار راحتی نیست، ما اینجاییم تا همه چیز
            رو برای شما ساده کنیم. فقط بهترین و معتبرترین گزینه‌ها رو گلچین
            می‌کنیم تا وقت ارزشمندتون صرف جستجوی بی‌پایان نشه.
          </p>
        </div>

        {/* Left */}
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
