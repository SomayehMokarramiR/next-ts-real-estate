"use client";

import { useState } from "react";

export interface GeneralSettingsValues {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  siteEnabled: boolean;
}

interface GeneralSettingsProps {
  settings: GeneralSettingsValues;
  onSave: (values: GeneralSettingsValues) => void;
  isSaving: boolean;
}

export default function GeneralSettings({
  settings,
  onSave,
  isSaving,
}: GeneralSettingsProps) {
  const [form, setForm] = useState<GeneralSettingsValues>(settings);

  const update = <K extends keyof GeneralSettingsValues>(
    key: K,
    value: GeneralSettingsValues[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold">تنظیمات عمومی</h2>

        <p className="mt-1 text-sm text-gray-500">
          اطلاعات اصلی سایت را مدیریت کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          label="نام سایت"
          value={form.siteName}
          onChange={(value) => update("siteName", value)}
        />

        <Input
          label="شماره تماس"
          value={form.phone}
          onChange={(value) => update("phone", value)}
        />

        <Input
          label="ایمیل"
          value={form.email}
          onChange={(value) => update("email", value)}
        />

        <Input
          label="آدرس"
          value={form.address}
          onChange={(value) => update("address", value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">توضیحات سایت</label>

        <textarea
          value={form.siteDescription}
          onChange={(e) => update("siteDescription", e.target.value)}
          rows={4}
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-transparent
            px-4
            py-3
            text-sm
            outline-none
            focus:border-primary500
          "
        />
      </div>

      <Toggle
        label="فعال بودن سایت"
        description="در صورت غیرفعال بودن، سایت برای کاربران فعال نخواهد بود."
        checked={form.siteEnabled}
        onChange={(value) => update("siteEnabled", value)}
      />

      <SaveButton isSaving={isSaving} onClick={() => onSave(form)} />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-transparent
          px-4
          py-3
          text-sm
          outline-none
          focus:border-primary500
        "
      />
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
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>

        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-6
          w-11
          rounded-full
          transition
          ${checked ? "bg-primary500" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            transition
            ${checked ? "right-1" : "right-6"}
          `}
        />
      </button>
    </div>
  );
}

function SaveButton({
  onClick,
  isSaving,
}: {
  onClick: () => void;
  isSaving: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSaving}
      className="
        rounded-xl
        bg-primary500
        px-6
        py-3
        text-sm
        font-medium
        text-white
        disabled:opacity-50
      "
    >
      {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
    </button>
  );
}
