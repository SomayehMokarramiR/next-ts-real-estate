import { Passenger } from "@/app/components/templates/singleReserveHouse/types";

export function validatePassenger(passenger: Passenger): string | null {
  if (!passenger.name.trim()) {
    return "نام مسافر را وارد کنید";
  }

  if (passenger.name.trim().length < 2) {
    return "نام مسافر صحیح نیست";
  }

  if (!passenger.family.trim()) {
    return "نام خانوادگی مسافر را وارد کنید";
  }

  if (passenger.family.trim().length < 2) {
    return "نام خانوادگی صحیح نیست";
  }

  if (!passenger.gender) {
    return "جنسیت را انتخاب کنید";
  }

  if (!passenger.nationalId.trim()) {
    return "کد ملی را وارد کنید";
  }

  if (!/^\d{10}$/.test(passenger.nationalId)) {
    return "کد ملی باید ۱۰ رقم باشد";
  }

  if (!passenger.birthDate.trim()) {
    return "تاریخ تولد را وارد کنید";
  }

  // فرمت تاریخ شمسی 1400/01/01 یا 1400-01-01
  const birthDateRegex = /^\d{4}[\/\-]\d{2}[\/\-]\d{2}$/;

  if (!birthDateRegex.test(passenger.birthDate)) {
    return "تاریخ تولد باید به صورت 1400/01/01 وارد شود";
  }

  return null;
}
