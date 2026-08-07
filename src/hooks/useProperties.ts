import { useQuery } from "@tanstack/react-query";

export interface Filters {
  search?: string;
  city?: string;
  facility?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  rating?: string;
  type?: string;
}
interface Property {
  _id: string;

  title: string;

  description?: string;

  type: string;

  location: {
    city: string;
    address: string;
  };

  images: string[];

  facilities: {
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    pool: boolean;
    capacity: number;
  };

  pricing: {
    daily: number;
    monthly?: number;
  };

  rating: number;

  views: number;

  status: string;
}

interface PropertiesResponse {
  success: boolean;
  count: number;
  properties: Property[];
}

async function getProperties(filters?: Filters): Promise<PropertiesResponse> {
  const params = new URLSearchParams();

  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      params.append(key, value);
    }
  });

  const query = params.toString();

  const url = query ? `/api/properties?${query}` : "/api/properties";

  console.log("API URL ===>", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("خطا در دریافت املاک");
  }

  const data = await res.json();

  return data;
}

export function useProperties(filters?: Filters) {
  return useQuery({
    queryKey: ["properties", filters],

    queryFn: () => getProperties(filters),

    staleTime: 1000 * 60 * 5,
  });
}
