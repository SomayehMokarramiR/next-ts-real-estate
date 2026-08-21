const API_URL = "/api/user/settings";

// =========================
// API REQUEST
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

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data?.message || "خطا در ارتباط با سرور");
  }

  return data;
}

// =========================
// USER SETTINGS TYPE
// =========================

export interface UserSettings {
  notifications: {
    // اعلان وضعیت رزرو
    reservation: boolean;

    // پیام‌های سیستم
    messages: boolean;

    // پیشنهادها و تخفیف‌ها
    offers: boolean;
  };

  darkMode: boolean;
}

// =========================
// RESPONSE TYPE
// =========================

export interface SettingsResponse {
  success: boolean;

  settings: UserSettings;

  message?: string;
}

// =========================
// GET SETTINGS
// =========================

export function getSettings() {
  return apiRequest<SettingsResponse>(API_URL, {
    method: "GET",
  });
}

// =========================
// UPDATE SETTINGS
// =========================

export function updateSettings(settings: Partial<UserSettings>) {
  return apiRequest<SettingsResponse>(API_URL, {
    method: "PUT",

    body: JSON.stringify(settings),
  });
}
