"use client";

import { useState } from "react";
import Swal from "sweetalert2";

import {
  useAdminSettings,
  useUpdateAdminSettings,
} from "@/hooks/useAdminSettings";

import GeneralSettings from "./GeneralSettings";
import ReservationSettings from "./ReservationSettings";
import NotificationSettings from "./NotificationSettings";
import SystemSettings from "./SystemSettings";

/* =========================================================
   TYPES
========================================================= */

type Section = "general" | "reservation" | "notifications" | "system";

export type GeneralSettingsValues = {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  siteEnabled: boolean;
};

export type ReservationSettingsValues = {
  reservationEnabled: boolean;
  minNights: number;
  maxNights: number;
  cancellationEnabled: boolean;
  cancellationDeadlineHours: number;
};

export type NotificationSettingsValues = {
  systemMessages: boolean;
  reservation: boolean;
  offersAndDiscounts: boolean;
};

export type SystemSettingsValues = {
  maintenanceMode: boolean;
  userRegistration: boolean;
  userLogin: boolean;
};

/* =========================================================
   UPDATE PAYLOAD
========================================================= */

type SettingsUpdate =
  | {
      section: "general";
      values: GeneralSettingsValues;
    }
  | {
      section: "reservation";
      values: ReservationSettingsValues;
    }
  | {
      section: "notifications";
      values: NotificationSettingsValues;
    }
  | {
      section: "system";
      values: SystemSettingsValues;
    };

/* =========================================================
   COMPONENT
========================================================= */

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("general");

  const { data, isLoading, isError } = useAdminSettings();

  const updateMutation = useUpdateAdminSettings();

  const settings = data?.settings;

  /* =========================================================
     SAVE SETTINGS
  ========================================================= */

  const handleSave = async (payload: SettingsUpdate) => {
    try {
      switch (payload.section) {
        case "general":
          await updateMutation.mutateAsync({
            general: payload.values,
          });
          break;

        case "reservation":
          await updateMutation.mutateAsync({
            reservation: payload.values,
          });
          break;

        case "notifications":
          await updateMutation.mutateAsync({
            notifications: payload.values,
          });
          break;

        case "system":
          await updateMutation.mutateAsync({
            system: payload.values,
          });
          break;
      }

      await Swal.fire({
        icon: "success",
        title: "ذخیره شد",
        text: "تنظیمات با موفقیت ذخیره شد",
        confirmButtonText: "باشه",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text:
          error instanceof Error ? error.message : "ذخیره تنظیمات انجام نشد",
        confirmButtonText: "باشه",
      });
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">در حال دریافت تنظیمات...</p>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">دریافت تنظیمات با خطا مواجه شد.</p>
      </div>
    );
  }

  /* =========================================================
     SECTIONS
  ========================================================= */

  const sections: {
    id: Section;
    label: string;
  }[] = [
    {
      id: "general",
      label: "تنظیمات عمومی",
    },
    {
      id: "reservation",
      label: "تنظیمات رزرو",
    },
    {
      id: "notifications",
      label: "اعلان‌ها",
    },
    {
      id: "system",
      label: "تنظیمات سیستم",
    },
  ];

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div dir="rtl" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">تنظیمات</h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          مدیریت تنظیمات پنل و سایت
        </p>
      </div>

      {/* Tabs */}
      <div
        className="
        flex
        flex-wrap
        gap-2
        rounded-2xl
        bg-background
        dark:bg-[#353535]
        border
        border-transparent
        dark:border-[#555555]
        p-2
        shadow-sm
      "
      >
        {sections.map((section) => {
          const active = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`
              rounded-xl
              px-4
              py-2
              text-sm
              transition

              ${
                active
                  ? "bg-primary500 text-white"
                  : `
                    text-gray-500
                    dark:text-gray-300
                    hover:bg-gray-100
                    dark:hover:bg-[#454545]
                  `
              }
            `}
            >
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        className="
        rounded-2xl
        bg-background
        dark:bg-[#353535]
        border
        border-transparent
        dark:border-[#555555]
        p-5
        shadow-sm
      "
      >
        {/* GENERAL */}
        {activeSection === "general" && (
          <GeneralSettings
            settings={settings.general}
            onSave={(values) =>
              handleSave({
                section: "general",
                values,
              })
            }
            isSaving={updateMutation.isPending}
          />
        )}

        {/* RESERVATION */}
        {activeSection === "reservation" && (
          <ReservationSettings
            settings={settings.reservation}
            onSave={(values) =>
              handleSave({
                section: "reservation",
                values,
              })
            }
            isSaving={updateMutation.isPending}
          />
        )}

        {/* NOTIFICATIONS */}
        {activeSection === "notifications" && (
          <NotificationSettings
            settings={{
              systemMessages: settings.notifications?.systemMessages ?? true,

              reservation:
                (settings.notifications as NotificationSettingsValues)
                  ?.reservation ?? true,

              offersAndDiscounts:
                settings.notifications?.offersAndDiscounts ?? true,
            }}
            onSave={(values) =>
              handleSave({
                section: "notifications",
                values,
              })
            }
            isSaving={updateMutation.isPending}
          />
        )}

        {/* SYSTEM */}
        {activeSection === "system" && (
          <SystemSettings
            settings={settings.system}
            onSave={(values) =>
              handleSave({
                section: "system",
                values,
              })
            }
            isSaving={updateMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
