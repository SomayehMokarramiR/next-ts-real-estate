"use client";

import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";

import PassengerForm from "./PassengerForm";
import { Passenger } from "./types";
import { emptyPassenger } from "./constants";

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
    const passenger = passengers[passengers.length - 1];

    if (
      !passenger.name ||
      !passenger.family ||
      !passenger.gender ||
      !passenger.nationalId ||
      !passenger.birthDate
    ) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات ناقص",
        text: "لطفاً اطلاعات مسافر را کامل کنید",
      });

      return;
    }

    setPassengers((prev) => {
      const updated = [...prev, emptyPassenger()];

      console.log("PASSENGERS:", updated);

      return updated;
    });

    await Swal.fire({
      icon: "success",
      title: "مسافر اضافه شد",
      timer: 1000,
      showConfirmButton: false,
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

    await Swal.fire({
      icon: "success",
      title: "اطلاعات تماس ذخیره شد",
      timer: 1200,
      showConfirmButton: false,
    });

    // فقط فیلدهای تماس پاک شوند
    setPhone("");
    setEmail("");
  };

  const handleNext = () => {
    const firstPassenger = passengers[0];

    if (
      !firstPassenger.name ||
      !firstPassenger.family ||
      !firstPassenger.nationalId ||
      !firstPassenger.gender
    ) {
      alert("لطفا اطلاعات مسافر اول را کامل کنید");

      return;
    }

    setProgress(66.66);

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
              index={0}
              passenger={passengers[0]}
              onAddPassenger={addPassenger}
              onChange={(field, value) => updatePassenger(0, field, value)}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              onUpdateContact={updateContact}
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
                  setProgress(33.33);

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
                <span className="hidden min-[410px]:inline">
                  تایید و ادامه فرآیند
                </span>

                <span className="inline min-[410px]:hidden">ادامه</span>

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
