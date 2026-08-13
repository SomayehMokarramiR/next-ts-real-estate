import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import type { Blog } from "@/services/blogService";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article
      className="
        bg-white
        dark:bg-[#272727]
        rounded-2xl
        overflow-hidden
        border
        border-gray-100
        dark:border-[#353535]
        shadow-sm
        hover:shadow-md
        transition-shadow
        duration-300
        flex
        flex-col
      "
      dir="rtl"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full
            h-44
            sm:h-48
            object-cover
            hover:scale-105
            transition-transform
            duration-500
          "
        />

        {/* Reading time */}
        <div className="absolute top-3 right-3">
          <span
            className="
              bg-white/90
              dark:bg-[#272727]/90
              backdrop-blur-sm
              text-gray-700
              dark:text-white
              text-xs
              px-2.5
              py-1
              rounded-full
              font-medium
              flex
              items-center
              gap-1
              shadow-sm
            "
          >
            <Clock className="w-3 h-3 text-primary500" />
            {blog.minutes} دقیقه
          </span>
        </div>

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span
            className="
              bg-primary500
              text-white
              text-xs
              px-2.5
              py-1
              rounded-full
              font-medium
              shadow-sm
            "
          >
            {blog.category}
          </span>
        </div>

        {/* Free */}
        {blog.isFree && (
          <div className="absolute bottom-3 right-3">
            <span
              className="
                bg-primary600/80
                text-white
                text-xs
                px-2.5
                py-1
                rounded-full
                font-medium
              "
            >
              رایگان
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <Calendar className="w-3.5 h-3.5 text-primary700/50" />
          <span dir="ltr" className="inline-block">
            {blog.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-gray-900 dark:text-white text-sm leading-6 mb-2 line-clamp-2">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-[#CDCED6] text-xs leading-5 mb-4 line-clamp-3 flex-1">
          {blog.description}
        </p>

        {/* Details */}
        <Link
          href={`/blog/${blog._id}`}
          className="
            w-full
            bg-primary500
            hover:bg-primary600
            active:bg-primary700
            text-white
            text-sm
            font-medium
            py-2.5
            rounded-xl
            transition-colors
            duration-200
            mt-auto
            text-center
          "
        >
          مشاهده جزئیات
        </Link>
      </div>
    </article>
  );
}
