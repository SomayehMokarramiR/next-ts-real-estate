"use client";

import { useState } from "react";

import ListingCard from "./ListingCard";
import PropertyHeader from "./PropertyHeader";
import GallerySection from "./GallerySection";
import DescriptionSection from "./DescriptionSection";
import FeaturesSection from "./FeaturesSection";
import CommentsSection from "./CommentsSection";
import BookingSidebar from "./BookingSidebar";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1688653802629-5360086bf632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    alt: "نمای بیرونی خانه",
  },
  {
    url: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    alt: "نمای مدرن",
  },
  {
    url: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    alt: "اتاق نشیمن",
  },
  {
    url: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    alt: "داخل خانه",
  },
  {
    url: "https://images.unsplash.com/photo-1562925246-25f01be5471c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    alt: "نمای ساحلی",
  },
];

export default function SingleMortgageHouse() {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div>
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* 1 — Gallery */}
        <GallerySection />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_344px] gap-8 items-start">
          {/* سمت راست صفحه */}
          <div className="space-y-8">
            <DescriptionSection />

            <FeaturesSection />

            <CommentsSection />
          </div>

          {/* سمت چپ صفحه */}
          <aside className="space-y-6">
            <BookingSidebar
              showPhone={showPhone}
              onTogglePhone={() => setShowPhone((p) => !p)}
            />
          </aside>
        </div>

        <ListingCard />
      </main>
    </div>
  );
}
