"use client";

import { useEffect, useState } from "react";

export type ReservationSettingsValues = {
  reservationEnabled: boolean;
  minNights: number;
  maxNights: number;
  cancellationEnabled: boolean;
  cancellationDeadlineHours: number;
};

interface Props {
  settings?: ReservationSettingsValues;
  onSave: (values: ReservationSettingsValues) => void;
  isSaving: boolean;
}

const getInitialForm = (
  settings?: Partial<ReservationSettingsValues>,
): ReservationSettingsValues => ({
  reservationEnabled: settings?.reservationEnabled ?? true,
  minNights: settings?.minNights ?? 1,
  maxNights: settings?.maxNights ?? 30,
  cancellationEnabled: settings?.cancellationEnabled ?? true,
  cancellationDeadlineHours: settings?.cancellationDeadlineHours ?? 24,
});

export default function ReservationSettings({
  settings,
  onSave,
  isSaving,
}: Props) {
  const [form, setForm] = useState<ReservationSettingsValues>(() =>
    getInitialForm(settings),
  );

  const update = <K extends keyof ReservationSettingsValues>(
    key: K,
    value: ReservationSettingsValues[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleMinNightsChange = (value: number) => {
    const minNights = Math.max(1, value);

    setForm((prev) => ({
      ...prev,
      minNights,
      maxNights: Math.max(prev.maxNights, minNights),
    }));
  };

  const handleMaxNightsChange = (value: number) => {
    update("maxNights", Math.max(form.minNights, value));
  };

  const handleDeadlineChange = (value: number) => {
    update("cancellationDeadlineHours", Math.max(0, value));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2
          className="
          text-lg
          font-bold
          text-gray-900
          dark:text-white
        "
        >
          تنظیمات رزرو
        </h2>

        <p
          className="
          mt-1
          text-sm
          text-gray-500
          dark:text-gray-400
        "
        >
          قوانین مربوط به رزرو ملک را مدیریت کنید.
        </p>
      </div>

      <Toggle
        label="فعال بودن رزرو آنلاین"
        checked={form.reservationEnabled}
        onChange={(value) => update("reservationEnabled", value)}
      />

      <div
        className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
      "
      >
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

      <Toggle
        label="امکان لغو رزرو"
        checked={form.cancellationEnabled}
        onChange={(value) => update("cancellationEnabled", value)}
      />

      <NumberInput
        label="مهلت لغو رزرو (ساعت)"
        value={form.cancellationDeadlineHours}
        min={0}
        onChange={handleDeadlineChange}
      />

      <button
        type="button"
        onClick={() => onSave(form)}
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
      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-gray-800
          dark:text-gray-200
        "
      >
        {label}
      </label>

      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (!Number.isNaN(value)) {
            onChange(value);
          }
        }}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          dark:border-gray-500
          bg-white
          dark:bg-[#353535]
          px-4
          py-3
          text-sm
          text-gray-900
          dark:text-white
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
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-gray-300
        dark:border-gray-500
        bg-white
        dark:bg-[#353535]
        p-4
      "
    >
      <span
        className="
          text-sm
          font-medium
          text-gray-900
          dark:text-white
        "
      >
        {label}
      </span>

      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-6
          w-11
          rounded-full
          transition
          ${checked ? "bg-primary500" : "bg-gray-300 dark:bg-gray-600"}
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
