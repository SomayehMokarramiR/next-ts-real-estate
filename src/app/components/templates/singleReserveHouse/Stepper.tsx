import { ChevronLeft } from "lucide-react";
import { STEPS } from "./constants";
export default function Stepper({ active }: { active: number }) {
  return (
    <div className="bg-white border-b border-gray-200" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="
            flex
            items-center
            gap-2
            bg-[#EDEDED]
            rounded-full
            p-1
            mb-5
            overflow-x-auto
            scrollbar-hide
          "
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            const isFirst = step.id === 1;
            const isSecond = step.id === 2;

            return (
              <div
                key={step.id}
                className="
                  flex
                  items-center
                  shrink-0
                "
              >
                <div
                  className={`
                    flex
                    items-center
                    justify-center
                    rounded-full
                    font-medium
                    transition-all
                    whitespace-nowrap
                    shrink-0


                    ${
                      isFirst
                        ? "bg-primary500 text-white"
                        : isSecond
                          ? "bg-white border border-primary500 text-primary500"
                          : "text-gray-400"
                    }


                    /* mobile */
                    w-9
                    h-9
                    text-xs


                    /* tablet و دسکتاپ */
                    md:w-auto
                    md:h-11
                    md:px-5
                    md:text-sm
                    md:gap-2
                  `}
                >
                  <Icon
                    className="
                      w-4
                      h-4
                      shrink-0
                    "
                  />

                  {/* فقط دسکتاپ */}
                  <span
                    className="
                      hidden
                      md:inline
                    "
                  >
                    {step.label}
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <ChevronLeft
                    className="
                      w-4
                      h-4
                      text-gray-300
                      shrink-0
                      mx-1
                    "
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
