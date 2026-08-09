"use client";

import { useState } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";

import PassengerForm from "./PassengerForm";
import { Passenger } from "./types";
import { emptyPassenger } from "./constants";
import { validatePassenger } from "@/validators/passengerValidator";
import { validateContact } from "@/validators/contactValidator";

import Swal from "sweetalert2";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

export default function SingleReserveHouse2({ nextStep, prevStep }: Props) {
  const {
    step,
    setProgress,
    property,

    passengers,
    setPassengers,

    phone,
    setPhone,

    email,
    setEmail,
  } = useReserveProgress();

  const [activePassenger, setActivePassenger] = useState(0);
  const [contactSaved, setContactSaved] = useState(false);

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

  // ثبت مسافر
  const addPassenger = async () => {
    const passenger = passengers[activePassenger];

    const error = validatePassenger(passenger);

    if (error) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات ناقص",
        text: error,
      });

      return;
    }

    if (!contactSaved) {
      await Swal.fire({
        icon: "warning",
        title: "ثبت اطلاعات تماس",
        text: "ابتدا تلفن و ایمیل را ثبت کنید",
      });

      return;
    }

    setPassengers((prev) => {
      const updated = [...prev, emptyPassenger()];

      setActivePassenger(updated.length - 1);

      return updated;
    });
  };

  // ثبت تلفن و ایمیل
  const updateContact = async () => {
    if (!phone || !email) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات ناقص",
        text: "تلفن و ایمیل را وارد کنید",
      });

      return;
    }

    setContactSaved(true);

    await Swal.fire({
      icon: "success",
      title: "اطلاعات تماس ذخیره شد",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleNext = async () => {
    // حذف فرم خالی آخر
    const cleanedPassengers = passengers.filter((passenger) => {
      return (
        passenger.name ||
        passenger.family ||
        passenger.gender ||
        passenger.nationalId ||
        passenger.birthDate
      );
    });

    // حداقل یک مسافر باید باشد
    if (cleanedPassengers.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات ناقص",
        text: "حداقل یک مسافر کامل ثبت کنید",
      });

      return;
    }

    // اعتبارسنجی مسافرهای وارد شده
    for (const passenger of cleanedPassengers) {
      const error = validatePassenger(passenger);

      if (error) {
        await Swal.fire({
          icon: "warning",
          title: "اطلاعات ناقص",
          text: error,
        });

        return;
      }
    }

    setPassengers(cleanedPassengers);

    setProgress(60);
    nextStep();
  };

  return (
    <div
      className="
max-w-6xl
mx-auto
w-full
px-4
py-6
pb-20
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
        <div
          className="
w-full
md:flex-1
"
        >
          <Stepper active={step} />

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

            <PassengerForm
              index={activePassenger}
              passenger={passengers[activePassenger] ?? emptyPassenger()}
              onAddPassenger={addPassenger}
              onChange={(field, value) =>
                updatePassenger(activePassenger, field, value)
              }
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              onUpdateContact={updateContact}
              contactSaved={contactSaved}
            />

            <div
              className="
mt-6
flex
gap-3
"
            >
              <button
                type="button"
                onClick={() => {
                  setProgress(20);

                  prevStep();
                }}
                className="
w-full
sm:w-1/2
h-11
rounded-full
border
border-gray-300
dark:border-[#555]
flex
items-center
justify-center
gap-2
text-sm
dark:text-white
"
              >
                <ChevronRight size={16} />
                مرحله قبل
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="
      flex-1
      h-11
      rounded-full
      bg-primary500
      text-white
      font-semibold
      text-xs
      min-[410px]:text-sm
      flex
      items-center
      justify-center
      gap-1
    "
              >
                <span className="inline min-[410px]:hidden">ادامه</span>

                <span className="hidden min-[410px]:inline">
                  تایید و ادامه فرآیند
                </span>

                <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="
w-full
md:w-[35%]
lg:w-[40%]
shrink-0
"
        >
          {property && <PropertyCard property={property} />}
        </div>
      </div>
    </div>
  );
}
