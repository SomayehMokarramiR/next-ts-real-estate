import type { Property } from "../app/components/templates/properties/types/property";

const API_URL = "/api/favorites";

// =========================
// API Request
// =========================

async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const text = await res.text();

  console.log("FAVORITE API STATUS:", res.status);
  console.log("FAVORITE API RESPONSE:", text);

  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    let message = `خطای سرور (${res.status})`;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      message = data.message;
    }

    throw new Error(message);
  }

  return data as T;
}

// =========================
// Get Favorites
// =========================

export interface FavoritesResponse {
  success: boolean;

  favorites: Property[];
}

export function getFavorites() {
  return apiRequest<FavoritesResponse>(API_URL, {
    method: "GET",
  });
}

// =========================
// Add Favorite
// =========================

export interface FavoriteResponse {
  success: boolean;

  message: string;
}

export function addFavorite(propertyId: string) {
  return apiRequest<FavoriteResponse>(API_URL, {
    method: "POST",

    body: JSON.stringify({
      propertyId,
    }),
  });
}

// =========================
// Remove Favorite
// =========================

export function removeFavorite(propertyId: string) {
  return apiRequest<FavoriteResponse>(`${API_URL}/${propertyId}`, {
    method: "DELETE",
  });
}

// =========================
// Check Favorite
// =========================

export function checkFavorite(propertyId: string) {
  return apiRequest<{
    success: boolean;
    isFavorite: boolean;
  }>(`${API_URL}/${propertyId}`, {
    method: "GET",
  });
}
