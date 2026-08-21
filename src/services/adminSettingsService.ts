const ADMIN_SETTINGS_URL = "/api/admin/settings";

// =====================================
// TYPES
// =====================================

export type GeneralSettings = {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  siteEnabled: boolean;
};

export type ReservationSettings = {
  reservationEnabled: boolean;
  minNights: number;
  maxNights: number;
  cancellationEnabled: boolean;
  cancellationDeadlineHours: number;
};

export type NotificationSettings = {
  systemMessages: boolean;
  reservation: boolean;
  offersAndDiscounts: boolean;
};

export type SystemSettings = {
  maintenanceMode: boolean;
  userRegistration: boolean;
  userLogin: boolean;
};

export type AdminSettings = {
  _id: string;

  general: GeneralSettings;

  reservation: ReservationSettings;

  notifications: NotificationSettings;

  system: SystemSettings;

  createdAt: string;

  updatedAt: string;
};

export type AdminSettingsResponse = {
  success: boolean;

  settings: AdminSettings;

  message?: string;
};

// =====================================
// UPDATE PAYLOAD
// =====================================

export type UpdateAdminSettingsPayload =
  | {
      general: GeneralSettings;
    }
  | {
      reservation: ReservationSettings;
    }
  | {
      notifications: NotificationSettings;
    }
  | {
      system: SystemSettings;
    };

// =====================================
// GET ADMIN SETTINGS
// =====================================

export async function getAdminSettings(): Promise<AdminSettingsResponse> {
  const response = await fetch(ADMIN_SETTINGS_URL, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.message || "دریافت تنظیمات با خطا مواجه شد.");
  }

  return data;
}

// =====================================
// UPDATE ADMIN SETTINGS
// =====================================

export async function updateAdminSettings(
  payload: UpdateAdminSettingsPayload,
): Promise<AdminSettingsResponse> {
  const response = await fetch(ADMIN_SETTINGS_URL, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.message || "ذخیره تنظیمات با خطا مواجه شد.");
  }

  return data;
}
