import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function PersianDateInput({
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
      <label className="mb-2 block text-sm dark:text-white">{label}</label>

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={(date) => {
          if (!date) return;

          onChange(date.format("YYYY/MM/DD"));
        }}
        format="YYYY/MM/DD"
        containerClassName="w-full"
        inputClass="
          w-full
          rounded-xl
          border
          border-gray-300
          p-3
          outline-none
          dark:border-gray-600
          dark:bg-[#444]
          dark:text-white
        "
      />
    </div>
  );
}
