const API_URL = "/api/user/settings";

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

  if (!res.ok) {
    throw new Error(data?.message || "خطا در ارتباط با سرور");
  }

  return data;
}

export interface UserSettings {
  notifications: {
    reservation: boolean;

    messages: boolean;

    offers: boolean;
  };

  darkMode: boolean;
}

export interface SettingsResponse {
  success: boolean;

  settings: UserSettings;

  message?: string;
}

// GET

export function getSettings() {
  return apiRequest<SettingsResponse>(API_URL, {
    method: "GET",
  });
}

// PUT

export function updateSettings(settings: Partial<UserSettings>) {
  return apiRequest<SettingsResponse>(API_URL, {
    method: "PUT",

    body: JSON.stringify(settings),
  });
}
