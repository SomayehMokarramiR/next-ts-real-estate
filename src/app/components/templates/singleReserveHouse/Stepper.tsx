import { Check } from "lucide-react";
import { STEPS } from "./constants";

type StepperProps = {
  active: number;
};

export default function Stepper({ active }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex w-full items-start">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;

          const isActive = item.id === active;
          const isDone = item.id < active;

          return (
            <div key={item.id} className="flex flex-1 min-w-0 items-start">
              <div className="flex flex-1 min-w-0 flex-col items-center">
                <div
                  className={`
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shrink-0

                    w-8 h-8
                    sm:w-9 sm:h-9
                    md:w-10 md:h-10

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

                    ${
                      isActive || isDone
                        ? "text-primary500 dark:text-white"
                        : "text-gray-400 dark:text-gray-200"
                    }
                  `}
                >
                  {item.label}
                </span>
              </div>

              {idx !== STEPS.length - 1 && (
                <div
                  className={`
                    h-[2px]
                    flex-1
                    mt-4
                    mx-1
                    sm:mx-2

                    ${item.id < active ? "bg-blue-300" : "bg-gray-300"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
