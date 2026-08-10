import { useQuery } from "@tanstack/react-query";

export interface Property {
  _id: string;
  title: string;
  description?: string;

  type: "apartment" | "villa" | "house" | "hotel" | "suite";

  images: string[];

  location: {
    city: string;
    address: string;
  };

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
    oldPrice?: number;
    discount?: number;
  };

  rating: number;
  views: number;

  status: "available" | "reserved" | "inactive";

  mapPosition?: {
    top?: string;
    left?: string;
  };
}

interface PropertiesResponse {
  success: boolean;
  properties: Property[];
}

async function getProperties(
  filters: Record<string, string> = {},
): Promise<Property[]> {
  const params = new URLSearchParams(filters);

  const res = await fetch(`/api/properties?${params.toString()}`);

  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات املاک");
  }

  const data: PropertiesResponse = await res.json();

  if (!data.success || !data.properties) {
    throw new Error("اطلاعات املاک پیدا نشد");
  }

  return data.properties;
}

export function useProperties(filters: Record<string, string> = {}) {
  return useQuery<Property[], Error>({
    queryKey: ["properties", filters],

    queryFn: () => getProperties(filters),

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnMount: false,
  });
}
