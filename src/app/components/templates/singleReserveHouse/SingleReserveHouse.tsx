"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import Breadcrumb from "../../../components/modules/breadcrumb/Breadcrumb";
import { Passenger } from "./types";
import { emptyPassenger } from "./constants";
import Stepper from "./Stepper";
import PassengerForm from "./PassengerForm";
import PropertyCard from "./PropertyCard";

export default function SingleReserveHouse() {
  const [activeStep] = useState(1);
  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger()]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const updatePassenger = (
    idx: number,
    field: keyof Passenger,
    value: string,
  ) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    );
  };

  const addPassenger = () => {
    setPassengers((p) => [...p, emptyPassenger()]);
  };

  return (
    <div className=" flex flex-col">
      <div className="py-12">
        <Breadcrumb />
      </div>

      <Stepper active={activeStep} />

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 pb-28">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Right */}
          <div className="w-full md:flex-1 space-y-4">
            {/* Passenger details card */}
            <div
              className="
                bg-white
                dark:bg-[#272727]
                rounded-2xl
                border
                border-gray-200
                dark:border-[#272727]
                shadow-sm
                p-5
              "
            >
              <h2
                className="
                  font-bold
                  text-gray-900
                  text-base
                  mb-5
                  flex
                  items-center
                  gap-2
                "
              >
                <Users className="w-4 h-4 text-primary500" />
                مشخصات مسافران
              </h2>

              {passengers.map((p, i) => (
                <div key={i}>
                  <PassengerForm
                    index={i}
                    passenger={p}
                    onAddPassenger={addPassenger}
                    onChange={(field, value) =>
                      updatePassenger(i, field, value)
                    }
                  />

                  {/* فقط بعد از اولین مسافر */}
                  {i === 0 && (
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        items-center
                        gap-3
                        mt-5
                        pt-4                     
                        border-gray-100
                      "
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Left */}
          <div className="w-full md:w-[35%] lg:w-[40%] shrink-0">
            <PropertyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
