import { apiRequest } from "@/app/lib/apiRequest";

// =========================
// PROPERTY TYPES
// =========================

export type AdminPropertyType =
  | "apartment"
  | "villa"
  | "house"
  | "hotel"
  | "suite"
  | "land"
  | "office"
  | "commercial";

export type AdminTransactionType =
  | "rent"
  | "mortgage"
  | "rent-mortgage"
  | "sale";

export type AdminPropertyStatus = "available" | "reserved" | "inactive";

export type AdminBookingType = "daily" | "none";

// =========================
// PRICING
// =========================

export interface AdminPropertyPricing {
  sale?: number;

  daily?: number;

  monthly?: number;

  mortgage?: number;

  oldPrice?: number;

  discount?: number;
}

// =========================
// FACILITIES
// =========================

export interface AdminPropertyFacilities {
  bedrooms?: number;

  bathrooms?: number;

  parking?: boolean;

  pool?: boolean;

  capacity?: number;
}

// =========================
// LOCATION
// =========================

export interface AdminPropertyLocation {
  city?: string;

  address?: string;
}

// =========================
// PROPERTY DETAIL
// =========================

export interface AdminPropertyDetail {
  _id: string;

  title: string;

  description?: string;

  type: AdminPropertyType;

  transactionType: AdminTransactionType;

  status: AdminPropertyStatus;

  bookingType?: AdminBookingType;

  location?: AdminPropertyLocation;

  images?: string[];

  area?: number;

  facilities?: AdminPropertyFacilities;

  pricing?: AdminPropertyPricing;

  createdAt?: string;

  updatedAt?: string;
}

// =========================
// CREATE PAYLOAD
// =========================

export interface CreateAdminPropertyPayload {
  title: string;

  description?: string;

  type: AdminPropertyType;

  transactionType: AdminTransactionType;

  status: AdminPropertyStatus;

  bookingType?: AdminBookingType;

  location: {
    city?: string;

    address?: string;
  };

  images?: string[];

  area?: number;

  facilities?: {
    bedrooms?: number;

    bathrooms?: number;

    parking?: boolean;

    pool?: boolean;

    capacity?: number;
  };

  pricing?: {
    sale?: number;

    daily?: number;

    monthly?: number;

    mortgage?: number;

    oldPrice?: number;

    discount?: number;
  };
}

// =========================
// UPDATE PAYLOAD
// =========================

export interface UpdateAdminPropertyPayload {
  title: string;

  description?: string;

  type: AdminPropertyType;

  transactionType: AdminTransactionType;

  status: AdminPropertyStatus;

  bookingType?: AdminBookingType;

  location: {
    city?: string;

    address?: string;
  };

  images?: string[];

  area?: number;

  facilities?: {
    bedrooms?: number;

    bathrooms?: number;

    parking?: boolean;

    pool?: boolean;

    capacity?: number;
  };

  pricing?: {
    sale?: number;

    daily?: number;

    monthly?: number;

    mortgage?: number;

    oldPrice?: number;

    discount?: number;
  };
}

// =========================
// RESPONSES
// =========================

interface AdminPropertyResponse {
  success: boolean;

  property: AdminPropertyDetail;
}

interface AdminPropertyMutationResponse {
  success: boolean;

  message?: string;

  property: AdminPropertyDetail;
}

interface DeleteAdminPropertyResponse {
  success: boolean;

  message?: string;
}

// =========================
// GET PROPERTY DETAIL
// =========================

export async function getAdminProperty(
  id: string,
): Promise<AdminPropertyDetail> {
  const response = await apiRequest<AdminPropertyResponse>(
    `/api/admin/properties/${id}`,
  );

  if (!response.success || !response.property) {
    throw new Error("خطا در دریافت اطلاعات ملک");
  }

  return response.property;
}

// =========================
// CREATE PROPERTY
// =========================

export async function createAdminProperty(
  payload: CreateAdminPropertyPayload,
): Promise<AdminPropertyDetail> {
  const response = await apiRequest<AdminPropertyMutationResponse>(
    "/api/admin/properties",

    {
      method: "POST",

      body: JSON.stringify(payload),
    },
  );

  if (!response.success || !response.property) {
    throw new Error(response.message || "خطا در ایجاد ملک");
  }

  return response.property;
}

// =========================
// UPDATE PROPERTY
// =========================

export async function updateAdminProperty(
  id: string,

  payload: UpdateAdminPropertyPayload,
): Promise<AdminPropertyDetail> {
  const response = await apiRequest<AdminPropertyMutationResponse>(
    `/api/admin/properties/${id}`,

    {
      method: "PUT",

      body: JSON.stringify(payload),
    },
  );

  if (!response.success || !response.property) {
    throw new Error(response.message || "خطا در ویرایش ملک");
  }

  return response.property;
}

// =========================
// DELETE PROPERTY
// =========================

export async function deleteAdminProperty(
  id: string,
): Promise<DeleteAdminPropertyResponse> {
  const response = await apiRequest<DeleteAdminPropertyResponse>(
    `/api/admin/properties/${id}`,

    {
      method: "DELETE",
    },
  );

  if (!response.success) {
    throw new Error(response.message || "خطا در حذف ملک");
  }

  return response;
}
