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
