"use client";

import { useState, useEffect } from "react";
import SelectField from "./SelectField";
import { SearchField } from "./types";

type Props = {
  fields: SearchField[];
  variant?: "default" | "mortgage" | "houseReserve";
  onSearch?: (data: Record<string, string>) => void;
  resetKey?: number;
};

export default function Search({
  fields,
  variant = "default",
  onSearch,
  resetKey,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});

  const renderField = (field: SearchField, index: number) => {
    const isSearch = index === 0;

    // BUTTON
    if (field.type === "button") {
      return (
        <div
          key={index}
          className={`
            flex
            items-end
            shrink-0

            ${
              variant === "houseReserve"
                ? `
                  w-full
                  min-[640px]:w-[calc(50%-8px)]
                  min-[988px]:w-[calc(50%-8px)]
                  min-[1148px]:w-[136px]
                `
                : ""
            }

            ${
              variant === "mortgage"
                ? `
                  w-full
                  min-[640px]:w-[calc(50%-8px)]
                  min-[992px]:w-[136px]
                `
                : ""
            }

            ${variant === "default" ? "w-[136px]" : ""}
          `}
        >
          <button
            type="button"
            onClick={() => {
              if (field.label.includes("حذف")) {
                setValues({});
                onSearch?.({});
                return;
              }

              onSearch?.(values);
            }}
            className={`
              h-10
              w-full
              rounded-full
              text-xs
              font-medium
              flex
              items-center
              justify-center
              text-white

              ${field.label.includes("حذف") ? "bg-[#FF220C]" : "bg-primary500"}
            `}
          >
            {field.label}
          </button>
        </div>
      );
    }

    // INPUT
    if (field.type === "input") {
      return (
        <div
          key={index}
          className={`
            flex
            flex-col
            gap-1
            shrink-0

            ${
              variant === "houseReserve"
                ? `
                  w-full
                  min-[640px]:w-[calc(50%-8px)]
                  min-[988px]:w-[calc(50%-8px)]
                  min-[1148px]:w-[195px]
                  min-[1280px]:w-[208px]
                `
                : ""
            }

            ${
              variant === "mortgage"
                ? `
                  w-full
                  min-[640px]:w-[calc(50%-8px)]
                  min-[992px]:${isSearch ? "w-[300px]" : "w-[180px]"}
                `
                : ""
            }

            ${variant === "default" ? "w-full" : ""}
          `}
        >
          <label
            className="
              text-sm
              font-medium
              text-gray-700
              dark:text-white
              text-right
            "
          >
            {field.label}
          </label>

          <input
            type="text"
            value={values[field.label] || ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                [field.label]: e.target.value,
              }))
            }
            placeholder={field.placeholder}
            className="
              h-10
              w-full
              rounded-full
              bg-[#F0F0F3]
              dark:bg-[#353535]
              px-4
              text-sm
              outline-none
              text-right
              text-gray-900
              dark:text-white
              placeholder:text-gray-400
              dark:placeholder:text-gray-300
            "
          />
        </div>
      );
    }

    // SELECT
    return (
      <div
        key={index}
        className={`
          shrink-0

          ${
            variant === "houseReserve"
              ? `
                w-full
                min-[640px]:w-[calc(50%-8px)]
                min-[988px]:w-[calc(50%-8px)]
                min-[1148px]:w-[195px]
                min-[1280px]:w-[208px]
              `
              : ""
          }

          ${
            variant === "mortgage"
              ? `
                w-full
                min-[640px]:w-[calc(50%-8px)]
                min-[992px]:w-[160px]
              `
              : ""
          }

          ${variant === "default" ? "w-full" : ""}
        `}
      >
        <SelectField
          label={field.label}
          placeholder={field.placeholder}
          options={field.options}
          value={values[field.key || field.label] || ""}
          onChange={(value) => {
            const key = field.key || field.label;

            setValues((prev) => ({
              ...prev,
              [key]: value,
            }));
          }}
        />
      </div>
    );
  };

  if (variant === "houseReserve") {
    return (
      <div
        className="
          flex
          flex-wrap
          gap-4
          items-end
          max-[987px]:grid
          max-[987px]:grid-cols-2
        "
      >
        {fields.map(renderField)}
      </div>
    );
  }

  if (variant === "mortgage") {
    return <>{fields.map(renderField)}</>;
  }

  return <>{fields.map(renderField)}</>;
}
