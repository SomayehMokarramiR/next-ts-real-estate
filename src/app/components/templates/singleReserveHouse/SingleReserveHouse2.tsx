"use client";

import { useState } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

import PassengerForm from "./PassengerForm";
import { Passenger } from "./types";
import { emptyPassenger } from "./constants";

export default function SingleReserveHouse2({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const activeStep = 2;

  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger()]);

  const updatePassenger = (
    idx: number,
    field: keyof Passenger,
    value: string,
  ) => {
    setPassengers((prev) =>
      prev.map((p, i) =>
        i === idx
          ? {
              ...p,
              [field]: value,
            }
          : p,
      ),
    );
  };

  const addPassenger = () => {
    setPassengers((prev) => [...prev, emptyPassenger()]);
  };

  return (
    <div className="flex flex-col">
      <div className="py-12">
        <Breadcrumb />
      </div>

      <div
        className="
        max-w-6xl
        mx-auto
        w-full
        px-4
        py-6
        pb-28
        "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-6
          items-start
          "
        >
          {/* RIGHT */}

          <div
            className="
            w-full
            md:flex-1
            "
          >
            {/* Stepper فقط بالای باکس سمت راست */}
            <Stepper active={activeStep} />

            <div
              className="
              mt-5
              bg-white
              dark:bg-[#272727]
              rounded-2xl
              border
              border-gray-200
              dark:border-[#353535]
              shadow-sm
              p-5
              "
            >
              <h2
                className="
                font-bold
                text-gray-900
                dark:text-white
                text-base
                mb-5
                flex
                items-center
                gap-2
                "
              >
                <Users size={18} className="text-primary500" />
                مشخصات مسافران
              </h2>

              {passengers.map((p, index) => (
                <PassengerForm
                  key={index}
                  index={index}
                  passenger={p}
                  onAddPassenger={addPassenger}
                  onChange={(field, value) =>
                    updatePassenger(index, field, value)
                  }
                />
              ))}

              {/* ACTION BUTTONS */}

              <div
                className="
                mt-6
                flex
                gap-3
                "
              >
                {/* PREVIOUS */}

                <button
                  onClick={prevStep}
                  type="button"
                  className="
                  flex-1
                  min-w-0
                  h-11
                  rounded-full
                  border
                  border-gray-300
                  dark:border-[#555]
                  text-xs
                  min-[410px]:text-sm
                  whitespace-nowrap
                  flex
                  items-center
                  justify-center
                  gap-1
                  "
                >
                  <ChevronRight size={16} className="shrink-0" />

                  <span>مرحله قبل</span>
                </button>

                {/* NEXT */}

                <button
                  onClick={nextStep}
                  type="button"
                  className="
                  flex-1
                  min-w-0
                  h-11
                  rounded-full
                  bg-primary500
                  text-white
                  font-semibold
                  text-xs
                  min-[410px]:text-sm
                  whitespace-nowrap
                  flex
                  items-center
                  justify-center
                  gap-1
                  "
                >
                  <span className="hidden min-[410px]:inline">
                    تایید و ادامه فرآیند
                  </span>

                  <span className="inline min-[410px]:hidden">ادامه</span>

                  <ChevronLeft size={16} className="shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* LEFT */}

          <div
            className="
            w-full
            md:w-[35%]
            lg:w-[40%]
            shrink-0
            "
          >
            <PropertyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
