import { useQuery } from "@tanstack/react-query";

// ======================================
// PROPERTY TYPE
// ======================================

export interface Property {
  _id: string;

  title: string;

  description?: string;

  type: "apartment" | "villa" | "house" | "hotel" | "suite";

  transactionType: "rent" | "mortgage" | "rent-mortgage" | "sale";

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

  area: number;

  pricing: {
    daily: number;
    monthly?: number;
    mortgage?: number;
    oldPrice?: number;
    discount?: number;
  };

  rating: number;

  views: number;

  status: "available" | "reserved" | "inactive";

  isFeatured?: boolean;

  featuredOrder?: number;
}

// ======================================
// FILTER TYPE
// ======================================

export type PropertyFilters = Record<string, string>;

// ======================================
// SINGLE PROPERTY RESPONSE
// ======================================

interface PropertyResponse {
  success: boolean;
  property: Property;
}

// ======================================
// LIST RESPONSE
// ======================================

export interface PropertiesResponse {
  success: boolean;

  count: number;

  total: number;

  page: number;

  limit: number;

  totalPages: number;

  properties: Property[];
}

// ======================================
// GET SINGLE PROPERTY
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
// SINGLE PROPERTY HOOK
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
// GET PROPERTIES
// ======================================

async function getProperties(
  filters: PropertyFilters = {},
): Promise<PropertiesResponse> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
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

  return data;
}

// ======================================
// PROPERTIES HOOK
// ======================================

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery<PropertiesResponse, Error>({
    queryKey: ["properties", filters],

    queryFn: () => getProperties(filters),

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnMount: false,
  });
}
