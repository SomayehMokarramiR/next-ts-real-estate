"use client";

import { useState } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Stepper from "./Stepper";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";

import PassengerForm from "./PassengerForm";
import { Passenger } from "./types";
import { emptyPassenger } from "./constants";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import Swal from "sweetalert2";

import { validatePassenger } from "@/validators/passengerValidator";
import { reservationDateValidator } from "@/validators/reservationDateValidator";
import { calculateNights } from "@/validators/calculateNights";
import { contactValidator } from "@/validators/contactValidator";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

type DatePickerValue = DateObject | DateObject[] | null;

export default function SingleReserveHouse2({ nextStep, prevStep }: Props) {
  const {
    step,
    setProgress,
    property,

    passengers,
    setPassengers,

    contact,
    setContact,

    checkIn,
    setCheckIn,

    checkOut,
    setCheckOut,

    setNights,
  } = useReserveProgress();

  const [activePassenger, setActivePassenger] = useState(0);
  const [contactSaved, setContactSaved] = useState(false);

  // =====================================================
  // تبدیل تاریخ انتخاب‌شده به YYYY-MM-DD
  // =====================================================

  const saveDate = (
    date: {
      year: number;
      month: {
        number: number;
      };
      day: number;
    },
    type: "checkIn" | "checkOut",
  ) => {
    const year = String(date.year);
    const month = String(date.month.number).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");

    const value = `${year}/${month}/${day}`;

    if (type === "checkIn") {
      setCheckIn(value);
      return;
    }

    if (checkIn && value <= checkIn) {
      Swal.fire({
        icon: "warning",
        title: "تاریخ نامعتبر",
        text: "تاریخ خروج باید بعد از تاریخ ورود باشد",
      });

      return;
    }

    setCheckOut(value);
  };

  const getPickerValue = (date: string) => {
    if (!date) return "";

    const [year, month, day] = date.split("-").map(Number);

    if (!year || !month || !day) return "";

    return new DateObject({
      date: new Date(year, month - 1, day),
      calendar: persian,
      locale: persian_fa,
    });
  };

  // =====================================================
  // مسافر
  // =====================================================

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

  // =====================================================
  // اضافه کردن مسافر
  // =====================================================

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

  // =====================================================
  // ثبت اطلاعات تماس
  // =====================================================

  const updateContact = async () => {
    const error = contactValidator(contact);

    if (error) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات ناقص",
        text: error,
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

  // =====================================================
  // رفتن به مرحله 3
  // =====================================================

  const handleNext = async () => {
    // -----------------------------------------
    // 1. اعتبارسنجی تاریخ
    // -----------------------------------------

    const dateError = reservationDateValidator({
      checkIn,
      checkOut,
    });

    if (dateError) {
      await Swal.fire({
        icon: "warning",
        title: "تاریخ اقامت",
        text: dateError,
      });

      return;
    }

    // -----------------------------------------
    // 2. محاسبه تعداد شب
    // -----------------------------------------

    const calculatedNights = calculateNights(checkIn, checkOut);

    if (calculatedNights <= 0) {
      await Swal.fire({
        icon: "warning",
        title: "تاریخ اقامت",
        text: "تعداد شب‌های اقامت معتبر نیست",
      });

      return;
    }

    setNights(calculatedNights);

    // -----------------------------------------
    // 3. اعتبارسنجی تماس
    // -----------------------------------------

    const contactError = contactValidator(contact);

    if (contactError) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات تماس نامعتبر",
        text: contactError,
      });

      return;
    }

    // -----------------------------------------
    // 4. حذف مسافر خالی
    // -----------------------------------------

    const cleanedPassengers = passengers.filter(
      (passenger) =>
        passenger.name ||
        passenger.family ||
        passenger.gender ||
        passenger.nationalId ||
        passenger.birthDate,
    );

    // -----------------------------------------
    // 5. حداقل یک مسافر
    // -----------------------------------------

    if (cleanedPassengers.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "اطلاعات ناقص",
        text: "حداقل یک مسافر کامل ثبت کنید",
      });

      return;
    }

    // -----------------------------------------
    // 6. اعتبارسنجی مسافران
    // -----------------------------------------

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

    // -----------------------------------------
    // 7. ذخیره نهایی اطلاعات
    // -----------------------------------------

    setPassengers(cleanedPassengers);
    setContactSaved(true);

    // -----------------------------------------
    // 8. مرحله بعد
    // -----------------------------------------

    setProgress(60);

    nextStep();
  };

  // =====================================================
  // تعداد شب‌ها برای نمایش
  // =====================================================

  console.log("CHECK IN:", checkIn);
  console.log("CHECK OUT:", checkOut);
  console.log(
    "NIGHTS:",
    checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0,
  );

  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;

  // =====================================================
  // UI
  // =====================================================

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
        {/* =========================
            فرم اصلی
        ========================= */}

        <div className="w-full md:flex-1">
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

            {/* =========================
                تاریخ اقامت
            ========================= */}

            <div
              className="
                mb-6
                rounded-2xl
                bg-[#F0F0F3]
                p-4
                dark:bg-[#353535]
              "
            >
              <h3
                className="
                  mb-4
                  text-sm
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                تاریخ اقامت
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                {/* =========================
                    ورود
                ========================= */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-xs
                      text-gray-500
                      dark:text-gray-300
                    "
                  >
                    تاریخ ورود
                  </label>

                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-start"
                    format="YYYY/MM/DD"
                    value={checkIn}
                    onChange={(date) => {
                      if (!date) {
                        setCheckIn("");
                        return;
                      }

                      const selectedDate = date.toString();

                      setCheckIn(selectedDate);
                    }}
                    inputClass="
    h-11
    w-full
    rounded-xl
    border
    border-gray-200
    bg-white
    px-3
    text-sm
    text-gray-800
    outline-none
    focus:border-primary500
    focus:ring-2
    focus:ring-primary500/20
    dark:border-gray-600
    dark:bg-[#272727]
    dark:text-white
  "
                    placeholder="انتخاب تاریخ ورود"
                  />
                </div>

                {/* =========================
                    خروج
                ========================= */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-xs
                      text-gray-500
                      dark:text-gray-300
                    "
                  >
                    تاریخ خروج
                  </label>

                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-start"
                    format="YYYY/MM/DD"
                    value={checkOut || ""}
                    onChange={(value) => {
                      if (!value || Array.isArray(value)) {
                        setCheckOut("");
                        return;
                      }

                      // اگر هنوز تاریخ ورود انتخاب نشده
                      if (!checkIn) {
                        setCheckOut("");
                        return;
                      }

                      const selectedDate = value.toJulianDay();

                      const checkInDate = new DateObject({
                        date: checkIn,
                        calendar: persian,
                      }).toJulianDay();

                      // خروج باید بعد از ورود باشد
                      if (selectedDate <= checkInDate) {
                        Swal.fire({
                          icon: "warning",
                          title: "تاریخ نامعتبر",
                          text: "تاریخ خروج باید بعد از تاریخ ورود باشد",
                        });

                        return;
                      }

                      setCheckOut(value.format("YYYY/MM/DD"));
                    }}
                    inputClass="
    h-11
    w-full
    rounded-xl
    border
    border-gray-200
    bg-white
    px-3
    text-sm
    text-gray-800
    outline-none
    focus:border-primary500
    focus:ring-2
    focus:ring-primary500/20
    dark:border-gray-600
    dark:bg-[#272727]
    dark:text-white
  "
                    placeholder="انتخاب تاریخ خروج"
                  />
                </div>
              </div>

              {/* =========================
                  تعداد شب
              ========================= */}

              {checkIn && checkOut && (
                <div
                  className="
                    mt-4
                    text-xs
                    text-primary500
                  "
                >
                  مدت اقامت:{" "}
                  {nights > 0 ? `${nights} شب` : "تاریخ‌ها صحیح نیستند"}
                </div>
              )}
            </div>

            {/* =========================
                فرم مسافر
            ========================= */}

            <PassengerForm
              index={activePassenger}
              passenger={passengers[activePassenger] ?? emptyPassenger()}
              onAddPassenger={addPassenger}
              onChange={(field, value) =>
                updatePassenger(activePassenger, field, value)
              }
              contact={contact}
              setContact={setContact}
              onUpdateContact={updateContact}
              contactSaved={contactSaved}
            />

            {/* =========================
                دکمه‌ها
            ========================= */}

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

        {/* =========================
            کارت اقامتگاه
        ========================= */}

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
