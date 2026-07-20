"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Clock,
  Eye,
  Tag,
  Calendar,
  Copy,
  Share2,
} from "lucide-react";
import Navbar from "../../modules/navbar/Navbar";
import ListingCard from "./ListingCard";
import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";

const RELATED_POSTS = [
  {
    id: 1,
    title: "بهترین کاناپه‌های اداری در سال 140...",
    excerpt:
      "در این مقاله به بررسی بهترین کاناپه‌های اداری می‌پردازیم که می‌توانید در سال جاری خریداری کنید.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=250&fit=crop",
    date: "۱۴۰۳ / ۰۹ / ۱۵",
    readTime: "۵ دقیقه",
    tag: "کاناپه",
  },
  {
    id: 2,
    title: "بهترین کاناپه‌های گرد‌شکلی در سال 140...",
    excerpt:
      "کاناپه‌های گرد به محبوب‌ترین انتخاب طراحی داخلی تبدیل شده‌اند. در این مقاله بهترین مدل‌ها را معرفی می‌کنیم.",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=250&fit=crop",
    date: "۱۴۰۳ / ۰۸ / ۲۲",
    readTime: "۴ دقیقه",
    tag: "دکوراسیون",
  },
  {
    id: 3,
    title: "بهترین کاناپه کرم‌شکلی در سال 140...",
    excerpt:
      "رنگ کرم برای کاناپه‌ها یکی از محبوب‌ترین انتخاب‌ها است. بهترین مدل‌های کرم را با هم بررسی می‌کنیم.",
    image:
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=400&h=250&fit=crop",
    date: "۱۴۰۳ / ۰۷ / ۱۰",
    readTime: "۶ دقیقه",
    tag: "چیدمان",
  },
  {
    id: 4,
    title: "راهنمای خرید کاناپه برای آپارتمان‌های کوچک",
    excerpt:
      "انتخاب کاناپه مناسب برای آپارتمان‌های کوچک نیاز به دقت دارد. در این راهنما نکات مهم را بررسی می‌کنیم.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=250&fit=crop",
    date: "۱۴۰۳ / ۰۶ / ۰۵",
    readTime: "۷ دقیقه",
    tag: "راهنما",
  },
  {
    id: 5,
    title: "ترکیب رنگ‌های مناسب برای مبلمان منزل",
    excerpt:
      "ترکیب رنگ مناسب در مبلمان می‌تواند فضای خانه را متحول کند. با ما همراه باشید.",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=250&fit=crop",
    date: "۱۴۰۳ / ۰۵ / ۱۸",
    readTime: "۵ دقیقه",
    tag: "دکوراسیون",
  },
  {
    id: 6,
    title: "نگهداری و تمیز کردن کاناپه‌های پارچه‌ای",
    excerpt:
      "نگهداری صحیح از کاناپه‌های پارچه‌ای عمر آن‌ها را چندین برابر می‌کند. روش‌های اصولی را بدانید.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=250&fit=crop",
    date: "۱۴۰۳ / ۰۴ / ۲۸",
    readTime: "۸ دقیقه",
    tag: "نگهداری",
  },
];

const POSTS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(RELATED_POSTS.length / POSTS_PER_PAGE);

const TAG_COLORS: Record<string, string> = {
  کاناپه: "bg-primary500/50 text-primary700",
  دکوراسیون: "bg-emerald-100 text-emerald-700",
  چیدمان: "bg-sky-100 text-sky-700",
  راهنما: "bg-violet-100 text-violet-700",
  نگهداری: "bg-rose-100 text-rose-700",
};

function ArticleHero() {
  return (
    <div className="max-w-6xl mx-auto px-4 mb-8" dir="rtl">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-relaxed">
        بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟
      </h1>
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        {/* Right - Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#80838D]">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            ۱۲ مرداد - ۱۴۰۱ / ۱۲:۳۳
          </span>
        </div>

        {/* Left - Actions */}
        <div className="flex flex-col items-center gap-3">
          {/* Reading time */}
          <button
            className="
    h-7
    w-[80px]
    sm:h-8
    sm:w-[100px]
    rounded-full
    bg-primary500
    text-white
    text-[11px]
    sm:text-xs
    font-medium
    flex
    items-center
    justify-center
    gap-1
  "
          >
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            ۳۰ دقیقه
          </button>

          {/* Copy & Share */}
          <div className="flex items-center gap-2">
            {/* Copy */}
            <button
              className="
    w-8
    h-8
    sm:w-10
    sm:h-10
    rounded-full
    border
    border-primary500
    flex
    items-center
    justify-center
    text-primary500
  "
            >
              <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Share */}
            <button
              className="
    w-8
    h-8
    sm:w-10
    sm:h-10
    rounded-full
    bg-primary500
    flex
    items-center
    justify-center
    text-white
  "
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/images/ImgSingleBlog.png"
          alt="کاناپه مدرن در دکوراسیون داخلی"
          className="w-full h-52 sm:h-72 md:h-96 object-cover"
        />
      </div>
    </div>
  );
}

function ArticleContent() {
  return (
    <article className="max-w-6xl mx-auto px-4 mb-12" dir="rtl">
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-lg lg:text-[24px] font-semibold text-[#80838D] mb-4 pb-2 inline-block">
            بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟
          </h2>
          <p className="text-[#80838D] leading-9 text-sm sm:text-base mb-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم
            ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
            طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
            سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن
            ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
            که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
            چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
            مجله در ستون و سطرآنچنان که لازم است .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg lg:text-[24px] font-semibold text-[#80838D] mb-4 pb-2 inline-block">
            بهترین قیمت های کادیلاک 2024 در سال میلادی جدید ؟
          </h2>
          <p className="text-[#80838D] leading-9 text-sm sm:text-base mb-4">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و
            متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم
            ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
            طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
            سطرآنچنان که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است .لورم ایپسوم متن
            ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
            گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
            که لازم است .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
            چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
            مجله در ستون و سطرآنچنان که لازم است .
          </p>
        </section>
      </div>
    </article>
  );
}

// function RelatedCard({ post }: { post: (typeof RELATED_POSTS)[0] }) {
//   const tagColor = TAG_COLORS[post.tag] ?? "bg-gray-100 text-gray-600";
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
//       <div className="relative overflow-hidden">
//         <img
//           src={post.image}
//           alt={post.title}
//           className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
//         />
//         <div className="absolute top-3 right-3 flex gap-2">
//           <span
//             className={`text-xs font-medium px-2.5 py-1 rounded-full ${tagColor}`}
//           >
//             {post.tag}
//           </span>
//         </div>
//       </div>
//       <div className="p-4 flex flex-col flex-1" dir="rtl">
//         <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
//           <span className="flex items-center gap-1">
//             <Clock className="w-3 h-3" />
//             {post.date}
//           </span>
//           <span className="flex items-center gap-1">
//             <Eye className="w-3 h-3" />
//             {post.readTime} مطالعه
//           </span>
//         </div>
//         <h3 className="font-bold text-gray-900 text-sm leading-6 mb-2 line-clamp-2">
//           {post.title}
//         </h3>
//         <p className="text-gray-500 text-xs leading-5 mb-4 line-clamp-2 flex-1">
//           {post.excerpt}
//         </p>
//         <button className="w-full mt-auto bg-primary500 hover:bg-primary600 text-white text-sm font-medium py-2 rounded-xl transition-colors duration-200">
//           مشاهده جزییات
//         </button>
//       </div>
//     </div>
//   );
// }

export default function SingleBlog() {
  const [page, setPage] = useState(1);

  const visiblePosts = RELATED_POSTS.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  return (
    <div>
      <Navbar />
      <main className="pb-12">
        <div className="py-5">
          <Breadcrumb />
        </div>
        <ArticleHero />
        <ArticleContent />

        {/* Related Articles */}
        <section className="max-w-6xl mx-auto px-4" dir="rtl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary500 rounded-full" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              مقالات مشابه
            </h2>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visiblePosts.map((post) => (
              <RelatedCard key={post.id} post={post} />
            ))}
          
          </div> */}
          <ListingCard />
        </section>
      </main>
    </div>
  );
}
