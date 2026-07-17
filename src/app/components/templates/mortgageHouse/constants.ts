export const IMAGES = [
  "https://images.unsplash.com/photo-1644057501622-dfa7dd26dbfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1710883734891-93709398496d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1601221998768-c0cdf463a393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1774280954999-9758f11f3d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1759472659432-3232e42d04d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1760067537116-de1f76fe8f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1760067537740-faa11f7bdf1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1777880305920-e542f575f4e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1710224002849-a76ea1068b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
];

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

export const properties: Property[] = [
  {
    id: 1,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 424,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    rating: 4.5,
    location: "تهران، الهیه",
    priceType: "monthly",
    image: IMAGES[0],
  },
  {
    id: 2,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 406,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    discountPrice: 5900000,
    rating: 4.8,
    location: "تهران، نیاوران",
    priceType: "nightly",
    image: IMAGES[1],
  },
  {
    id: 3,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 403,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    rating: 4.9,
    location: "تهران، فرمانیه",
    priceType: "monthly",
    image: IMAGES[2],
  },
  {
    id: 4,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 424,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    rating: 4.5,
    location: "تهران، زعفرانیه",
    priceType: "monthly",
    image: IMAGES[3],
  },
  {
    id: 5,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 406,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    discountPrice: 5900000,
    rating: 4.7,
    location: "تهران، قیطریه",
    priceType: "nightly",
    image: IMAGES[4],
  },
  {
    id: 6,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 403,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    rating: 4.9,
    location: "تهران، شهرک غرب",
    priceType: "monthly",
    image: IMAGES[5],
  },
  {
    id: 7,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 424,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    rating: 4.5,
    location: "تهران، دروس",
    priceType: "monthly",
    image: IMAGES[6],
  },
  {
    id: 8,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 406,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    discountPrice: 5900000,
    rating: 4.6,
    location: "تهران، جردن",
    priceType: "nightly",
    image: IMAGES[7],
  },
  {
    id: 9,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    type: "ویلا",
    area: 403,
    beds: 3,
    baths: 2,
    parking: 1,
    price: 4500000,
    rating: 4.8,
    location: "تهران، ونک",
    priceType: "monthly",
    image: IMAGES[8],
  },
];

export const TOTAL_PAGES = 10;
export const ITEMS_PER_PAGE = 9;
