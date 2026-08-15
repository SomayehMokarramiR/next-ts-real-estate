export type Property = {
  _id: string;

  title?: string;

  images?: string[];

  location?: {
    city?: string;
    address?: string;
  };

  pricing?: {
    daily?: number;
    monthly?: number;
    mortgage?: number;
  };

  transactionType?: "rent" | "mortgage" | "rent-mortgage" | "sale";

  rating?: number;

  facilities?: {
    bedrooms?: number;
    bathrooms?: number;
    capacity?: number;
    parking?: boolean;
  };
};
