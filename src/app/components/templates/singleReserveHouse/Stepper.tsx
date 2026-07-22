import { Check } from "lucide-react";
import { STEPS } from "./constants";

export default function Stepper({ active }: { active: number }) {
  return (
    <div className="w-full" dir="rtl">
      <div
        className="
        bg-[#EDEDED]
        dark:bg-[#353535]
        rounded-2xl
        p-3
        overflow-hidden
        "
      >
        <div className="flex items-center w-full">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            const isActive = step.id === active;
            const isDone = step.id < active;

            return (
              <div
                key={step.id}
                className="
                flex
                items-center
                flex-1
                min-w-0
                "
              >
                {/* Step */}
                <div
                  className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  flex-1
                  min-w-0
                  "
                >
                  <div
                    className={`
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shrink-0

                    w-8
                    h-8

                    sm:w-9
                    sm:h-9

                    md:w-10
                    md:h-10


                    ${
                      isActive
                        ? "bg-primary500 text-white"
                        : isDone
                          ? "bg-blue-200 text-primary500"
                          : "bg-gray-100 text-gray-400"
                    }
                    `}
                  >
                    {isDone ? <Check size={16} /> : <Icon size={16} />}
                  </div>

                  <span
                    className={`
                    mt-2
                    text-center
                    whitespace-nowrap

                    text-[10px]

                    sm:text-xs

                    md:text-sm

                    lg:text-[14px]


                    ${
                      isActive || isDone
                        ? "text-primary500 dark:text-white"
                        : "text-gray-400 dark:text-gray-200"
                    }
                    `}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Line */}
                {idx !== STEPS.length - 1 && (
                  <div
                    className={`
                      h-[2px]
                      flex-1
                      mx-1
                      sm:mx-2

                      ${step.id < active ? "bg-blue-300" : "bg-gray-300"}
                      `}
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
