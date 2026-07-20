// ─── Data ───────────────────────────────────────────────────────────────────

export const PROPERTY_TYPES = ["ویلایی", "آپارتمانی", "تجاری", "اداری"];

export const PROPERTIES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `بهترین کناطق گردشگری در سال 140...`,
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  date: `12 مرداد / 1401 / 12:33`,
  minutes: 30,
  type: PROPERTY_TYPES[i % PROPERTY_TYPES.length],
  image: [
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=380&fit=crop",
  ][i % 6],
  isFree: i % 4 === 0,
}));

export const SORT_OPTIONS = ["اخرین بروز رسانی", "جدیدترین", "پر بازدیدترین"];
export const POSTS_PER_PAGE = 9;
