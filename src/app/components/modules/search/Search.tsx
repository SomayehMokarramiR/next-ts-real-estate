"use client";

import SelectField from "./SelectField";
import { SearchField } from "./types";

type Props = {
  fields: SearchField[];
  variant?: "default" | "mortgage" | "houseReserve";
};

export default function Search({ fields, variant = "default" }: Props) {
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
            className={`
              h-10
              w-full
              rounded-full
              text-xs
              font-medium
              flex
              items-center
              justify-center

              ${
                field.label.includes("حذف")
                  ? "bg-[#FF220C] text-white"
                  : "bg-primary500 text-white"
              }
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
              text-right
            "
          >
            {field.label}
          </label>

          <input
            type="text"
            placeholder={field.placeholder}
            className="
              h-10
              w-full
              rounded-full
              bg-[#F0F0F3]
              px-4
              text-sm
              outline-none
              text-right
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
        />
      </div>
    );
  };

  // ==========================
  // MORTGAGE بدون تغییر
  // ==========================

  if (variant === "mortgage") {
    return (
      <div className="bg-white p-4 sm:p-6">
        <div className="flex flex-wrap gap-4 items-end">
          {fields.map(renderField)}
        </div>
      </div>
    );
  }

  // ==========================
  // HOUSE RESERVE
  // ==========================

  if (variant === "houseReserve") {
    return (
      <div className="bg-white p-4 sm:p-6">
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
      </div>
    );
  }

  // ==========================
  // DEFAULT
  // ==========================

  return (
    <div className="bg-white p-4 sm:p-6">
      <div className="flex flex-wrap gap-4">{fields.map(renderField)}</div>
    </div>
  );
}
