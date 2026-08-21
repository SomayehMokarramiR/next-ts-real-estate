"use client";

import { useState } from "react";

export type NotificationSettings = {
  systemMessages: boolean;
  reservation: boolean;
  offersAndDiscounts: boolean;
};

interface Props {
  settings: NotificationSettings;
  onSave: (values: NotificationSettings) => void;
  isSaving: boolean;
}

export default function NotificationSettings({
  settings,
  onSave,
  isSaving,
}: Props) {
  const [form, setForm] = useState<NotificationSettings>({
    systemMessages: settings.systemMessages,
    reservation: settings.reservation,
    offersAndDiscounts: settings.offersAndDiscounts,
  });

  const update = (key: keyof NotificationSettings, value: boolean) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      systemMessages: form.systemMessages,
      reservation: form.reservation,
      offersAndDiscounts: form.offersAndDiscounts,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          تنظیمات اعلان‌ها
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          نحوه فعال بودن اعلان‌های سایت را مدیریت کنید.
        </p>
      </div>

      <Toggle
        label="پیام‌های سیستم"
        description="اعلان‌های مربوط به وضعیت حساب و پیام‌های سیستمی برای کاربران فعال باشد."
        checked={form.systemMessages}
        onChange={(value) => update("systemMessages", value)}
      />

      <Toggle
        label="اعلان‌های رزرو"
        description="اعلان‌های مربوط به ایجاد، تغییر وضعیت و حذف رزروها برای کاربران فعال باشد."
        checked={form.reservation}
        onChange={(value) => update("reservation", value)}
      />

      <Toggle
        label="پیشنهادها و تخفیف‌ها"
        description="اعلان‌های مربوط به پیشنهادهای ویژه و تخفیف‌ها برای کاربران فعال باشد."
        checked={form.offersAndDiscounts}
        onChange={(value) => update("offersAndDiscounts", value)}
      />

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="
        rounded-xl
        bg-primary500
        px-6
        py-3
        text-sm
        font-medium
        text-white
        transition
        hover:bg-primary600
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
      >
        {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200  dark:border-[#555555] p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>

        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>

      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-primary500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "right-1" : "right-6"
          }`}
        />
      </button>
    </div>
  );
}
