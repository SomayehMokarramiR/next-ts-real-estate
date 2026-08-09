"use client";

import { useState } from "react";
import { Passenger } from "./types";

import {
  Phone,
  Mail,
  Edit2,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import EditPassengers from "./EditPassengers";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import Swal from "sweetalert2";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

export default function SingleReserveHouse3({ prevStep, nextStep }: Props) {
  const [discountCode, setDiscountCode] = useState("");

  const {
    setReservationId,
    step,
    setProgress,

    property,
    propertyId,

    passengers,
    setPassengers,

    checkIn,
    checkOut,

    nights,

    phone,
    email,
  } = useReserveProgress();

  const [editPassengers, setEditPassengers] = useState(false);
  const createReservationMutation = useCreateReservation();

  const handlePayment = () => {
    console.log("HANDLE PAYMENT START");

    const reservationPassengers = passengers
      .filter(
        (p) => p.name && p.family && p.gender && p.nationalId && p.birthDate,
      )
      .map((p) => ({
        name: p.name,
        family: p.family,
        gender: p.gender as "male" | "female",
        nationalId: p.nationalId,
        birthDate: p.birthDate,
      }));

    console.log("PAYLOAD", {
      propertyId: property?._id,
      checkIn,
      checkOut,
      nights,
      phone,
      email,
      passengers: reservationPassengers,
      amount: (property?.pricing?.daily ?? 0) * nights,
    });

    createReservationMutation.mutate(
      {
        propertyId: property?._id as string,
        checkIn,
        checkOut,
        nights,

        contact: {
          phone,
          email,
        },

        passengers: reservationPassengers,

        amount: (property?.pricing?.daily ?? 0) * nights,
      },
      {
        onSuccess: (data) => {
          console.log("SUCCESS", data);

          setReservationId(data.reservation._id);

          setProgress(80);

          nextStep();
        },

        onError: (error) => {
          console.log("ERROR", error);

          Swal.fire({
            icon: "error",
            title: "خطا",
            text: error.message,
          });
        },
      },
    );
  };

  const updatePassenger = (
    index: number,
    field: keyof Passenger,
    value: string,
  ) => {
    setPassengers((prev) =>
      prev.map((passenger, i) =>
        i === index
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger,
      ),
    );
  };

  const validPassengers = passengers.filter(
    (p) => p.name && p.family && p.gender && p.nationalId && p.birthDate,
  );

  if (!property) {
    return <div className="p-5">در حال دریافت اطلاعات اقامتگاه...</div>;
  }

  return (
    <div className="flex flex-col pb-14">
      <div className="py-12">
        <Breadcrumb />
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 py-6">
        <div
          className="
          flex
          flex-col
          lg:flex-row
          gap-6
          items-start
          "
        >
          {/* RIGHT */}

          <div className="w-full lg:flex-1">
            <Stepper active={step} />

            <div
              className="
              mt-5
              border
              border-[#CDCED6]
              dark:border-[#353535]
              rounded-2xl
              p-5
              "
            >
              <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
                "
              >
                {/* RESERVE INFO */}

                <div
                  className="
                  bg-[#F0F0F3]
                  dark:bg-[#353535]
                  rounded-2xl
                  p-5
                  "
                >
                  <h3
                    className="
                    text-base
                    font-bold
                    text-center
                    dark:text-white
                    border-b
                    pb-3
                    "
                  >
                    تایید اطلاعات رزرو
                  </h3>

                  {[
                    ["نام مسافر", `${validPassengers.length} نفر`],
                    ["اقامتگاه", property.title],
                    ["تاریخ ورود", checkIn],
                    ["تاریخ خروج", checkOut],
                    ["تعداد شب", `${nights} شب`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="
                      flex
                      justify-between
                      mt-4
                      text-sm
                      "
                    >
                      <span className="text-gray-400">{label}</span>

                      <span className="dark:text-white">{value}</span>
                    </div>
                  ))}

                  <div
                    className="
                    border-t
                    mt-4
                    pt-3
                    flex
                    justify-between
                    "
                  >
                    <span className="text-gray-400">مبلغ نهایی</span>

                    <span className="font-bold text-primary500">
                      11,500,000 تومان
                    </span>
                  </div>
                </div>

                {/* PAYMENT */}

                <div
                  className="
                  bg-white
                  dark:bg-[#272727]
                  rounded-2xl
                  p-5
                  "
                >
                  <h3
                    className="
                    text-base
                    font-bold
                    text-center
                    dark:text-white
                    border-b
                    pb-3
                    "
                  >
                    خلاصه پرداخت
                  </h3>

                  <p
                    className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-500
                    dark:text-gray-300
                    "
                  >
                    اطلاعات رزرو بررسی شده است. پس از تایید وارد مرحله پرداخت
                    خواهید شد.
                  </p>
                </div>
              </div>

              {/* PASSENGER */}

              {editPassengers ? (
                <EditPassengers
                  passengers={passengers}
                  setPassengers={setPassengers}
                  onChange={updatePassenger}
                  onSave={() => {
                    setEditPassengers(false);
                  }}
                />
              ) : (
                <div
                  className="
    mt-5
    bg-[#F0F0F3]
    dark:bg-[#353535]
    rounded-2xl
    p-5
    "
                >
                  <h3
                    className="
      text-center
      font-bold
      dark:text-white
      border-b
      pb-3
      "
                  >
                    مشخصات مسافران
                  </h3>

                  {passengers.map((passenger, index) => (
                    <div key={index} className="mt-4">
                      <h3 className="font-bold text-sm mb-3 dark:text-white">
                        مسافر {index + 1}
                      </h3>

                      {(
                        [
                          [
                            "نام و نام خانوادگی",
                            `${passenger.name} ${passenger.family}`,
                          ],

                          [
                            "جنسیت",
                            passenger.gender === "male" ? "آقا" : "خانم",
                          ],

                          ["کد ملی", passenger.nationalId],

                          ["تاریخ تولد", passenger.birthDate],
                        ] as [string, string][]
                      ).map(([label, value]) => (
                        <div
                          key={label}
                          className="
            flex
            justify-between
            text-sm
            py-2
            "
                        >
                          <span className="text-gray-500 dark:text-gray-300">
                            {label}
                          </span>

                          <span className="font-medium dark:text-white">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setEditPassengers(true);
                    }}
                    className="
      mt-5
      w-full
      py-2.5
      rounded-full
      bg-primary500
      text-white
      flex
      justify-center
      items-center
      gap-2
      "
                  >
                    <Edit2 size={14} />
                    ویرایش مسافران
                  </button>
                </div>
              )}

              {/* CONTACT */}

              <div className="mt-5">
                <div
                  className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                  text-sm
                  dark:text-white
                  "
                >
                  <span className="flex items-center gap-2">
                    <Phone size={15} />
                    {phone}
                  </span>

                  <span className="flex items-center gap-2">
                    <Mail size={15} />
                    {email}
                  </span>
                </div>
              </div>

              {/* BUTTONS */}

              {!editPassengers && (
                <div
                  className="
    mt-6
    flex
    flex-col
    sm:flex-row
    gap-3
    "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setProgress(40);
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
                    مرحله قبل
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handlePayment();
                    }}
                    className="
    w-full
    sm:w-1/2
    h-11
    rounded-full
    bg-primary500
    text-white
  "
                  >
                    تایید و پرداخت
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* LEFT */}

          <div
            className="
            w-full
            lg:w-[35%]
            shrink-0
            "
          >
            {property && <PropertyCard property={property} />}

            <div
              className="
              mt-4
              bg-white
              dark:bg-[#272727]
              rounded-2xl
              p-4
              "
            >
              <h3
                className="
                font-bold
                dark:text-white
                flex
                gap-2
                "
              >
                <Tag size={16} />
                کد تخفیف
              </h3>

              <input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="کد تخفیف"
                className="
                mt-3
                w-full
                border
                rounded-full
                px-4
                py-2
                dark:bg-[#353535]
                dark:text-white
                "
              />

              <button
                className="
                mt-3
                w-full
                py-2
                rounded-full
                bg-primary500
                text-white
                "
              >
                اعمال کد تخفیف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
