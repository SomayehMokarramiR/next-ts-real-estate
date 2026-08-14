"use client";

import { useQuery } from "@tanstack/react-query";

import { getPropertyById, getProperties } from "@/services/property";

// =========================
// PROPERTY TYPE
// =========================

export interface Property {
  _id: string;

  title: string;

  description?: string;

  images: string[];

  location: {
    city: string;
    address: string;
  };

  pricing: {
    daily: number;
    monthly?: number;
    mortgage?: number;
    oldPrice?: number;
    discount?: number;
  };

  facilities: {
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    pool: boolean;
    capacity: number;
  };

  type?: string;

  transactionType?: "rent" | "mortgage" | "rent-mortgage" | "sale";

  bookingType?: "daily" | "monthly" | "none";

  status?: "available" | "reserved" | "inactive";

  rating?: number;

  views?: number;

  mapPosition?: {
    top?: string;
    left?: string;
  };
}
// =========================
// FILTER TYPE
// =========================

export type PropertyFilters = Record<string, string>;

// =========================
// LIST RESPONSE
// =========================

export interface PropertiesResponse {
  success: boolean;

  properties: Property[];

  total?: number;

  count?: number;

  totalPages?: number;

  currentPage?: number;

  limit?: number;
}

// =========================
// SINGLE PROPERTY HOOK
// =========================

export function useProperty(propertyId?: string) {
  return useQuery<Property, Error>({
    queryKey: ["property", propertyId],

    queryFn: async () => {
      if (!propertyId) {
        throw new Error("شناسه ملک موجود نیست");
      }

      const response = await getPropertyById(propertyId);

      // چون API شما:
      // { success:true, property:{} }
      // برمی‌گرداند

      return response.property ?? response;
    },

    enabled: Boolean(propertyId),

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
  });
}

// =========================
// ALL PROPERTIES HOOK
// =========================

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery<PropertiesResponse, Error>({
    queryKey: ["properties", filters],

    queryFn: async () => {
      const response = await getProperties(filters);

      return response;
    },

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
  });
}
