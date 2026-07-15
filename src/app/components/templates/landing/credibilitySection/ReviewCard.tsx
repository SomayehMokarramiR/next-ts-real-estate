import { reviews } from "./constants";
import { Calendar } from "lucide-react";

export default function ReviewCard({
  review,
}: {
  review: (typeof reviews)[0];
}) {
  return (
    <div
      className="relative mb-4 rounded-2xl p-5"
      style={{ backgroundColor: "rgba(22, 88, 88, 0.88)" }}
    >
      {/* Quote */}
      <div
        className="
          absolute
          right-5
          top-4
          z-10
          select-none
          font-serif
          leading-none
        "
        style={{
          color: "#BBD6D6",
          fontFamily: "Georgia, serif",
          fontSize: "72px",
          width: "20.22px",
          height: "52px",
        }}
      >
        &ldquo;
      </div>

      {/* Text */}
      <p
        className="
          relative
          z-0
          mb-5
          pt-14
          text-right
          text-sm
          leading-7
          text-white
        "
        style={{
          fontFamily: "'Vazirmatn', sans-serif",
        }}
      >
        {review.text}
      </p>

      {/* Footer */}
      <div className="w-full rounded-3xl bg-[#144444] p-3">
        <div className="flex flex-col gap-[13.5px]">
          {/* Author */}
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                text-xs
                font-bold
                text-white
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
              }}
            />

            <span className="text-sm font-medium text-white">
              {review.author}
            </span>
          </div>

          {/* Date */}
          <div
            className="
              flex
              items-center
              gap-1.5
              text-xs
              text-white/60
            "
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
            }}
          >
            <Calendar size={12} />

            <span>
              {review.date} / {review.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
