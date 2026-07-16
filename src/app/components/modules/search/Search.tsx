"use client";

import { ChevronLeft, SlidersHorizontal, Trash2 } from "lucide-react";

import SelectField from "./SelectField";
import { SearchField } from "./types";

type Props = {
  fields: SearchField[];

  resultCount?: number;

  minLabel?: string;

  maxLabel?: string;
};

export default function Search({
  fields,

  resultCount = 0,

  minLabel = "حداقل قیمت",

  maxLabel = "حداکثر قیمت",
}: Props) {
  return (
    <div className="mx-auto">
      {/* Filter Card */}

      <div
        className="
          bg-white
          p-4
          sm:p-6
          flex
          flex-col
          gap-5
        "
      >
        {/* ROW 1 */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            flex-wrap
            gap-4
          "
        >
          {fields.map((field, index) => {
            if (field.type === "input") {
              return (
                <div
                  key={index}
                  className="
                      flex
                      flex-col
                      gap-1
                      w-full
                      sm:flex-1
                      sm:min-w-[160px]
                    "
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
                        bg-[#F0F0F3]
                        border
                        border-gray-200
                        rounded-full
                        px-4
                        py-2.5
                        text-sm
                        text-gray-500
                        outline-none
                        text-right
                        w-full
                        hover:border-blue-400
                      "
                  />
                </div>
              );
            }

            return (
              <SelectField
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                options={field.options}
              />
            );
          })}
        </div>

        {/* Divider */}

        <div className="border-t border-gray-100" />

        {/* ROW 2 */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            flex-wrap
            items-stretch
            sm:items-end
            gap-4
          "
        >
          {/* Min */}

          <SelectField
            label={minLabel}
            placeholder="قیمت مورد نظر"
            options={["100 هزار", "500 هزار", "1 میلیون"]}
          />

          {/* Max */}

          <SelectField
            label={maxLabel}
            placeholder="قیمت مورد نظر"
            options={["5 میلیون", "10 میلیون", "20 میلیون"]}
          />

          {/* Spacer */}

          <div className="hidden sm:flex flex-1" />

          {/* Buttons */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              sm:justify-start
              gap-3
              w-full
              sm:w-auto
            "
          >
            <button
              className="
                flex
                items-center
                gap-1.5
                bg-primary500
                text-white
                text-xs
                px-3
                py-2
                rounded-full
                whitespace-nowrap
              "
            >
              <ChevronLeft size={14} />
              {resultCount} آگهی پیدا شد
            </button>

            <button
              className="
                flex
                items-center
                gap-1.5
                bg-primary500
                text-white
                text-xs
                px-3
                py-2
                rounded-full
                whitespace-nowrap
              "
            >
              <SlidersHorizontal size={14} />
              اعمال فیلتر
            </button>

            <button
              className="
                flex
                items-center
                gap-1.5
                bg-red-500
                text-white
                text-xs
                px-3
                py-2
                rounded-full
                whitespace-nowrap
              "
            >
              <Trash2 size={14} />
              حذف فیلتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
