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
// fast avaordam
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
export type Comment = {
  id: number;
  name: string;
  handle: string;
  date: string;
  text: string;
  likes: number;
  liked: boolean;
};
