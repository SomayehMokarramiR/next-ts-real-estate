const houseImage1 =
  "https://images.unsplash.com/photo-1598714805247-5dd440d87124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80";

const houseImage2 =
  "https://images.unsplash.com/photo-1622015663319-e97e697503ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80";

const houseImage3 =
  "https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80";

const houseImage4 =
  "https://images.unsplash.com/photo-1636301587190-88cbb412fea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80";

export const mapImage =
  "https://images.unsplash.com/photo-1476385822777-70eabacbd41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";

export interface Property {
  id: number;
  title: string;
  address: string;
  stars: number;
  yard: number;
  bath: number;
  persons: number;
  parking: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  type: "monthly" | "nightly";
  image: string;
  mapPosition: {
    top: string;
    left: string;
  };
}
export const properties: Property[] = [
  {
    id: 1,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    address: "خیابان 404 بروکلین کالیفرنیا نیویورک",
    stars: 4.5,
    yard: 3,
    bath: 3,
    persons: 3,
    parking: 1,
    price: 4500000,
    type: "monthly",
    image: houseImage1,
    mapPosition: {
      top: "28%",
      left: "58%",
    },
  },

  {
    id: 2,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    address: "خیابان 404 بروکلین کالیفرنیا نیویورک",
    stars: 4.5,
    yard: 3,
    bath: 3,
    persons: 3,
    parking: 1,
    price: 4500000,
    originalPrice: 5800000,
    discount: 15,
    type: "nightly",
    image: houseImage2,
    mapPosition: {
      top: "42%",
      left: "40%",
    },
  },

  {
    id: 3,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    address: "خیابان 404 بروکلین کالیفرنیا نیویورک",
    stars: 4.5,
    yard: 3,
    bath: 3,
    persons: 3,
    parking: 1,
    price: 4500000,
    originalPrice: 5800000,
    discount: 15,
    type: "nightly",
    image: houseImage3,
    mapPosition: {
      top: "60%",
      left: "55%",
    },
  },

  {
    id: 4,
    title: "خانه ویلایی با پارکینگ اختصاصی",
    address: "خیابان 404 بروکلین کالیفرنیا نیویورک",
    stars: 4.5,
    yard: 3,
    bath: 3,
    persons: 3,
    parking: 1,
    price: 4500000,
    type: "monthly",
    image: houseImage4,
    mapPosition: {
      top: "72%",
      left: "35%",
    },
  },
];
