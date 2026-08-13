"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { SLIDES } from "./constants";

export default function HouseSlider() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((previous) => (previous + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((previous) => (previous - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(next, 4000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [current, next]);

  // Mouse / Touch drag
  const onDragStart = (clientX: number) => {
    setDragging(true);
    setDragStart(clientX);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const onDragEnd = (clientX: number) => {
    if (!dragging) return;

    const diff = dragStart - clientX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }

    setDragging(false);
  };

  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-hidden
        select-none
        rounded-t-2xl
        md:rounded-t-none
        md:rounded-l-2xl
        md:rounded-r-none
        group
      "
      onMouseDown={(event) => onDragStart(event.clientX)}
      onMouseUp={(event) => onDragEnd(event.clientX)}
      onMouseLeave={() => setDragging(false)}
      onTouchStart={(event) => onDragStart(event.touches[0].clientX)}
      onTouchEnd={(event) => onDragEnd(event.changedTouches[0].clientX)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute
              inset-0
              transition-opacity
              duration-700
              ease-in-out
              ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              className="
                w-full
                h-full
                object-cover
              "
            />
          </div>
        ))}
      </div>

      {/* Gradient */}
      <div
        className="
          absolute
          bottom-0
          inset-x-0
          h-24
          bg-gradient-to-t
          from-black/50
          to-transparent
          z-20
          pointer-events-none
        "
      />

      {/* Previous */}
      <button
        type="button"
        onClick={prev}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          z-30
          w-9
          h-9
          rounded-full
          bg-white/80
          hover:bg-white
          text-gray-700
          flex
          items-center
          justify-center
          shadow
          transition-all
          opacity-0
          group-hover:opacity-100
        "
        aria-label="قبلی"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={next}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          z-30
          w-9
          h-9
          rounded-full
          bg-white/80
          hover:bg-white
          text-gray-700
          flex
          items-center
          justify-center
          shadow
          transition-all
          opacity-0
          group-hover:opacity-100
        "
        aria-label="بعدی"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div
        className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          z-30
          flex
          items-center
          gap-2
        "
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                index === current
                  ? "bg-blue-600 w-6 h-2.5"
                  : "bg-white/60 hover:bg-white/90 w-2.5 h-2.5"
              }
            `}
            aria-label={`اسلاید ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div
        className="
          absolute
          top-3
          left-3
          z-30
          bg-black/40
          text-white
          text-xs
          px-2.5
          py-1
          rounded-full
          backdrop-blur-sm
        "
        dir="ltr"
      >
        {current + 1} / {SLIDES.length}
      </div>
    </div>
  );
}
