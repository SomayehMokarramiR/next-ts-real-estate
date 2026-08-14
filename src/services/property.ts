import { IProperty } from "@/app/models/Property";

const API_URL = "/api/properties";

// =========================
// GET ALL PROPERTIES
// =========================

// =========================
// GET ALL PROPERTIES
// =========================

export async function getProperties(filters: Record<string, string> = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const query = params.toString();

  const url = query ? `/api/properties?${query}` : "/api/properties";

  const response = await fetch(url, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در دریافت املاک");
  }

  return data;
}
// =========================
// GET SINGLE PROPERTY
// =========================

export async function getPropertyById(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در دریافت ملک");
  }

  return data.property;
}

// =========================
// CREATE PROPERTY
// =========================

export async function createProperty(propertyData: Partial<IProperty>) {
  const response = await fetch(API_URL, {
    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(propertyData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در ایجاد ملک");
  }

  return data;
}

// =========================
// UPDATE PROPERTY
// =========================

export async function updateProperty(
  id: string,
  propertyData: Partial<IProperty>,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(propertyData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در ویرایش ملک");
  }

  return data;
}

// =========================
// DELETE PROPERTY
// =========================

export async function deleteProperty(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در حذف ملک");
  }

  return data;
}
