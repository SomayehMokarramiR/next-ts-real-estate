"use client";

import { useEffect, useState } from "react";

export type ReservationSettings = {
  reservationEnabled: boolean;
  minNights: number;
  maxNights: number;
  cancellationEnabled: boolean;
  cancellationDeadlineHours: number;
};

interface Props {
  settings: ReservationSettings;
  onSave: (values: ReservationSettings) => void;
  isSaving: boolean;
}

export default function ReservationSettings({
  settings,
  onSave,
  isSaving,
}: Props) {
  const [form, setForm] = useState<ReservationSettings>({
    reservationEnabled: settings.reservationEnabled,
    minNights: settings.minNights,
    maxNights: settings.maxNights,
    cancellationEnabled: settings.cancellationEnabled,
    cancellationDeadlineHours: settings.cancellationDeadlineHours,
  });

  // Sync form with latest settings from API
  useEffect(() => {
    setForm({
      reservationEnabled: settings.reservationEnabled,
      minNights: settings.minNights,
      maxNights: settings.maxNights,
      cancellationEnabled: settings.cancellationEnabled,
      cancellationDeadlineHours: settings.cancellationDeadlineHours,
    });
  }, [settings]);

  const update = <K extends keyof ReservationSettings>(
    key: K,
    value: ReservationSettings[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // حداقل تعداد شب
  const handleMinNightsChange = (value: number) => {
    const minNights = Math.max(1, value);

    setForm((prev) => ({
      ...prev,
      minNights,
      maxNights: Math.max(prev.maxNights, minNights),
    }));
  };

  // حداکثر تعداد شب
  const handleMaxNightsChange = (value: number) => {
    const maxNights = Math.max(form.minNights, value);

    update("maxNights", maxNights);
  };

  // مهلت لغو رزرو
  const handleDeadlineChange = (value: number) => {
    update("cancellationDeadlineHours", Math.max(0, value));
  };

  // ذخیره
  const handleSave = () => {
    onSave(form);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold">تنظیمات رزرو</h2>

        <p className="mt-1 text-sm text-gray-500">
          قوانین مربوط به رزرو ملک را مدیریت کنید.
        </p>
      </div>

      {/* Reservation Enabled */}
      <Toggle
        label="فعال بودن رزرو آنلاین"
        checked={form.reservationEnabled}
        onChange={(value) => update("reservationEnabled", value)}
      />

      {/* Nights */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <NumberInput
          label="حداقل تعداد شب"
          value={form.minNights}
          min={1}
          onChange={handleMinNightsChange}
        />

        <NumberInput
          label="حداکثر تعداد شب"
          value={form.maxNights}
          min={form.minNights}
          onChange={handleMaxNightsChange}
        />
      </div>

      {/* Cancellation */}
      <Toggle
        label="امکان لغو رزرو"
        checked={form.cancellationEnabled}
        onChange={(value) => update("cancellationEnabled", value)}
      />

      {/* Cancellation Deadline */}
      <NumberInput
        label="مهلت لغو رزرو (ساعت)"
        value={form.cancellationDeadlineHours}
        min={0}
        onChange={handleDeadlineChange}
      />

      {/* Save */}
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
          disabled:opacity-50
        "
      >
        {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}

// =====================================
// NUMBER INPUT
// =====================================

function NumberInput({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (Number.isNaN(value)) {
            return;
          }

          onChange(value);
        }}
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

// =====================================
// TOGGLE
// =====================================

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
      <span className="text-sm font-medium">{label}</span>

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
