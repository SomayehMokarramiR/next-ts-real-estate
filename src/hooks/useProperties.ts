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
}

interface PropertyResponse {
  success: boolean;
  property: Property;
}

interface PropertiesResponse {
  success: boolean;
  properties: Property[];
}

// ======================================
// دریافت یک ملک
// ======================================

async function getProperty(propertyId: string): Promise<Property> {
  const res = await fetch(`/api/properties/${propertyId}`);

  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات ملک");
  }

  const data: PropertyResponse = await res.json();

  if (!data.success || !data.property) {
    throw new Error("اطلاعات ملک پیدا نشد");
  }

  return data.property;
}

// ======================================
// Hook دریافت یک ملک
// ======================================

export function useProperty(propertyId?: string) {
  return useQuery<Property, Error>({
    queryKey: ["property", propertyId],

    queryFn: () => getProperty(propertyId!),

    enabled: !!propertyId,

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnMount: false,
  });
}

// ======================================
// دریافت لیست املاک
// ======================================

async function getProperties(
  filters: Record<string, string> = {},
): Promise<Property[]> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();

  const url = query ? `/api/properties?${query}` : "/api/properties";

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات املاک");
  }

  const data: PropertiesResponse = await res.json();

  if (!data.success) {
    throw new Error("اطلاعات املاک دریافت نشد");
  }

  return data.properties ?? [];
}

// ======================================
// Hook دریافت لیست املاک
// ======================================

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
