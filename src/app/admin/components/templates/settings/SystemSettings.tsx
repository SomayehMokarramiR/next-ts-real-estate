"use client";

import { useState } from "react";

interface Props {
  settings: {
    maintenanceMode: boolean;
    userRegistration: boolean;
    userLogin: boolean;
  };

  onSave: (values: Props["settings"]) => void;

  isSaving: boolean;
}

export default function SystemSettings({ settings, onSave, isSaving }: Props) {
  const [form, setForm] = useState(settings);

  const update = (key: keyof typeof form, value: boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold">تنظیمات سیستم</h2>

        <p className="mt-1 text-sm text-gray-500">
          وضعیت دسترسی و عملکرد اصلی سیستم را مدیریت کنید.
        </p>
      </div>

      <Toggle
        label="حالت تعمیر سایت"
        description="با فعال کردن این گزینه سایت در حالت تعمیر قرار می‌گیرد."
        checked={form.maintenanceMode}
        onChange={(value) => update("maintenanceMode", value)}
      />

      <Toggle
        label="ثبت‌نام کاربران"
        description="کاربران جدید می‌توانند در سایت ثبت‌نام کنند."
        checked={form.userRegistration}
        onChange={(value) => update("userRegistration", value)}
      />

      <Toggle
        label="ورود کاربران"
        description="کاربران می‌توانند وارد حساب خود شوند."
        checked={form.userLogin}
        onChange={(value) => update("userLogin", value)}
      />

      <button
        type="button"
        onClick={() => onSave(form)}
        disabled={isSaving}
        className="rounded-xl bg-primary500 px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
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
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>

        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
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
