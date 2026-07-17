/* ─── Types ───────────────────────────────────────────── */
export interface Property {
  id: number;
  title: string;
  type: string;
  area: number;
  beds: number;
  baths: number;
  parking: number;
  price: number;
  discountPrice?: number;
  rating: number;
  location: string;
  priceType: "monthly" | "nightly";
  image: string;
}

/* ─── Comments Section ────────────────────────────────── */
// export interface Comment {
//   id: number;
//   author: string;
//   date: string;
//   text: string;
//   likes: number;
//   liked: boolean;
//   replies?: {
//     id: number;
//     author: string;
//     date: string;
//     text: string;
//     likes: number;
//     liked: boolean;
//   }[];
// }

export interface Reply {
  id: number;
  author: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
}

export interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
  replies?: Reply[];
}

export type Comment2 = {
  id: number;
  name: string;
  handle: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
};

/* ─── S3 Listing Card ─────────────────────────────────── */
export interface ListingItem {
  id: number;
  address: string;
  beds: number;
  guests: number;
  baths: number;
  area: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
}
