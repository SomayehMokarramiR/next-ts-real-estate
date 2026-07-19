"use client";

import { useState } from "react";
import {
  Home,
  ChevronLeft,
  MapPin,
  Star,
  CalendarDays,
  UserPlus,
  Users,
  CheckCircle2,
  CreditCard,
  Ticket,
  Hotel,
  ChevronRight,
  Pencil,
} from "lucide-react";
import Breadcrumb from "../../../components/modules/breadcrumb/Breadcrumb";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Passenger {
  name: string;
  family: string;
  gender: string;
  nationalId: string;
  birthDate: string;
}

// ─── Step config ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "انتخاب هتل", icon: Hotel },
  { id: 2, label: "مشخصات مسافران", icon: Users },
  { id: 3, label: "تایید اطلاعات", icon: CheckCircle2 },
  { id: 4, label: "پرداخت آنلاین", icon: CreditCard },
  { id: 5, label: "صدور بلیط", icon: Ticket },
];

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

// function Breadcrumb() {
//   const crumbs = [
//     "خانه",
//     "رهن و اجاره",
//     "رزرو هتل رشت",
//     "رزرو هتل رشت ستاره‌ای رایگان",
//   ];
//   return (
//     <div className="border-b border-gray-200 bg-white" dir="rtl">
//       <div className="max-w-6xl mx-auto px-4 py-2.5">
//         <ol className="flex items-center flex-wrap gap-1 text-xs text-gray-500">
//           {crumbs.map((c, i) => (
//             <li key={c} className="flex items-center gap-1">
//               {i === 0 && <Home className="w-3 h-3" />}
//               <span
//                 className={
//                   i === crumbs.length - 1
//                     ? "text-primary500 font-medium"
//                     : "hover:text-primary500 cursor-pointer"
//                 }
//               >
//                 {c}
//               </span>
//               {i < crumbs.length - 1 && (
//                 <ChevronLeft className="w-3 h-3 text-gray-300" />
//               )}
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }

// ─── Stepper ─────────────────────────────────────────────────────────────────

// function Stepper({ active }: { active: number }) {
//   return (
//     <div
//       className="bg-white border-b border-gray-200 overflow-x-auto"
//       dir="rtl"
//     >
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex items-stretch min-w-max sm:min-w-0 bg-[#EDEDED] border-[#EDEDED] rounded-full mb-5">
//           {STEPS.map((step, idx) => {
//             const Icon = step.icon;
//             const isDone = step.id < active;
//             const isCurrent = step.id === active;
//             return (
//               <div key={step.id} className="flex items-center">
//                 <div
//                   className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
//                     isCurrent
//                       ? "border-primary500 text-primary500 "
//                       : isDone
//                         ? "border-primary500 text-primary500"
//                         : "border-transparent text-gray-400"
//                   }`}
//                 >
//                   <Icon className="w-4 h-4 shrink-0" />
//                   {step.label}
//                   {isCurrent && (
//                     <span className="w-2 h-2 rounded-full bg-primary500 animate-pulse ml-1" />
//                   )}
//                 </div>
//                 {idx < STEPS.length - 1 && (
//                   <ChevronLeft className="w-4 h-4 text-gray-300 shrink-0" />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

function Stepper({ active }: { active: number }) {
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
// ─── Property Card (left panel) ──────────────────────────────────────────────

function PropertyCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=340&fit=crop"
          alt="خانه ویلایی با پارکینگ اختصاصی"
          className="w-full h-44 object-cover"
        />
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          %۱۵
        </div>
        {/* Rating */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary500 text-xs font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          ۴.۵
        </div>
        {/* Location overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <p className="text-white text-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" />
            خیابان ۴۰۴ بروکلین کالیفرنیا نیویورک
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="font-bold text-gray-900 text-base mb-3 leading-6">
          خانه ویلایی با پارکینگ اختصاصی
        </h2>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400 text-xs">تاریخ ورود به هتل</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-primary500" />
              ۱۴۰۴/۰۶/۱۶
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400 text-xs">تاریخ خروج از هتل</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-primary500" />
              ۱۴۰۵/۰۴/۳
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-[#EDEDED] border border-amber-100 rounded-full px-3 py-2.5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              %۱۵
            </span>
            <span className="text-xs text-gray-400 line-through">
              ۵,۵۰۰,۰۰۰
            </span>
          </div>
          <span className="font-bold text-primary600 text-base">
            ۴,۵۰۰,۰۰۰ <span className="text-xs font-normal">تومان</span>
          </span>
        </div>

        <button className="w-full border-2 border-primary500 bg-primary500 text-white hover:bg-primary600 font-medium text-sm py-2.5 rounded-full transition-colors flex items-center justify-center gap-2">
          <Pencil className="w-3.5 h-3.5" />
          تغییر هتل
        </button>
      </div>
    </div>
  );
}

// ─── Passenger Form
function PassengerForm({
  passenger,
  index,
  onChange,
  onAddPassenger,
}: {
  passenger: Passenger;
  index: number;
  onChange: (field: keyof Passenger, value: string) => void;
  onAddPassenger: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="mb-2 pb-6">
      {/* عنوان مسافرهای بعدی */}
      {index > 0 && (
        <div className="flex items-center gap-2 mb-4 mt-4" dir="rtl">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400">مسافر {index + 1}</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>
      )}

      {/* اطلاعات مسافر */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="نام"
          placeholder="نام"
          value={passenger.name}
          onChange={(v) => onChange("name", v)}
        />

        <Field
          label="نام خانوادگی"
          placeholder="نام خانوادگی"
          value={passenger.family}
          onChange={(v) => onChange("family", v)}
        />

        {/* جنسیت */}
        <div>
          <label className="block text-xs text-gray-500 mb-1.5 font-medium">
            جنسیت شما
          </label>

          <select
            value={passenger.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="
              w-full
              border
              border-gray-200
             rounded-full
              px-3
              py-2.5
              text-sm
              text-gray-700
              bg-gray-50
              focus:outline-none
            "
          >
            <option value="">انتخاب کنید</option>

            <option value="male">آقا</option>

            <option value="female">خانم</option>
          </select>
        </div>

        <Field
          label="کد ملی"
          placeholder="کد ملی"
          value={passenger.nationalId}
          onChange={(v) => onChange("nationalId", v)}
        />

        {/* تاریخ تولد */}
        <Field
          label="تاریخ تولد"
          placeholder="1370/01/01"
          value={passenger.birthDate}
          onChange={(v) => onChange("birthDate", v)}
        />

        {/* دکمه های مسافر */}
        {index === 0 && (
          <div
            className="
              grid
              grid-cols-2
              gap-2
              items-end
            "
          >
            <button
              onClick={onAddPassenger}
              className="
                h-[42px]
                w-full
                bg-primary500
                hover:bg-primary700
                text-white
                text-xs
                font-medium
               rounded-full
                flex
                items-center
                justify-center
                gap-1
                whitespace-nowrap
              "
            >
              <UserPlus className="w-3.5 h-3.5" />
              افزودن مسافر
            </button>

            <button
              className="
                h-[42px]
                w-full
                border
                border-gray-200
                hover:bg-gray-50
                text-gray-600
                text-xs
                font-medium
               rounded-full
                flex
                items-center
                justify-center
                gap-1
                whitespace-nowrap
              "
            >
              <Users className="w-3.5 h-3.5" />
              مسافر سابق
            </button>
          </div>
        )}
      </div>

      {/* ارسال بلیط */}
      {index === 0 && (
        <>
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              shadow-sm
              p-5
              mt-6
            "
            dir="rtl"
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
              <Ticket className="w-4 h-4 text-primary500" />
              ارسال بلیط به دیگران
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <Field
                label="شماره تلفن"
                placeholder="09xx xxx xxxx"
                value={phone}
                onChange={setPhone}
              />

              <Field
                label="ایمیل"
                placeholder="example@email.com"
                value={email}
                onChange={setEmail}
              />
            </div>

            <button
              className="
                   h-[42px]
    w-full
    sm:w-auto
    px-5
    bg-primary500
    hover:bg-primary700
    text-white
    text-xs
    font-medium
   rounded-full
    flex
    items-center
    justify-center
    gap-1
    transition-colors
              "
            >
              ثبت اطلاعات
            </button>
          </div>

          {/* تایید و ادامه فرآیند */}
          <div
            className="
              mt-6
              pt-6
              border-t
              border-gray-200
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
              dir="rtl"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">قیمت کل</span>

                <span className="font-bold text-gray-900 text-lg">
                  ۱۱,۵۰۰,۰۰۰
                </span>

                <span className="text-xs text-gray-500">تومان</span>
              </div>

              <button
                className="
                  bg-primary500
                  hover:bg-primary600
                  text-white
                  text-sm
                  font-medium
                  px-6
                  py-3
                 rounded-full
                  flex
                  items-center
                  gap-2
                "
              >
                تایید و ادامه فرایند
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1.5 font-medium">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-full px-3 py-2.5 text-sm text-gray-700 bg-gray-50 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
      />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const emptyPassenger = (): Passenger => ({
  name: "",
  family: "",
  gender: "",
  nationalId: "",
  birthDate: "",
});

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
                rounded-2xl
                border
                border-gray-200
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
