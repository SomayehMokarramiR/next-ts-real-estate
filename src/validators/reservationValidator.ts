import { Passenger } from "../app/components/templates/singleReserveHouse/types";

type ReservationData = {
  passengers: Passenger[];
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  propertyId?: string;
};

export function validateReservation(data: ReservationData): string | null {
  const { passengers, phone, email, checkIn, checkOut, propertyId } = data;

  // اقامتگاه
  if (!propertyId) {
    return "اقامتگاه انتخاب نشده است";
  }

  // مسافرها
  if (!passengers || passengers.length === 0) {
    return "حداقل یک مسافر باید ثبت شود";
  }

  const invalidPassenger = passengers.some(
    (passenger) =>
      !passenger.name.trim() ||
      !passenger.family.trim() ||
      !passenger.gender ||
      !passenger.nationalId.trim() ||
      !passenger.birthDate.trim(),
  );

  if (invalidPassenger) {
    return "اطلاعات همه مسافران باید کامل باشد";
  }

  // کد ملی
  const invalidNationalId = passengers.some(
    (passenger) => !/^\d{10}$/.test(passenger.nationalId),
  );

  if (invalidNationalId) {
    return "کد ملی یکی از مسافران صحیح نیست";
  }

  // تماس
  if (!phone.trim()) {
    return "شماره تماس وارد نشده است";
  }

  if (!/^09\d{9}$/.test(phone)) {
    return "شماره تماس معتبر نیست";
  }

  if (!email.trim()) {
    return "ایمیل وارد نشده است";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "ایمیل معتبر نیست";
  }

  // تاریخ
  if (!checkIn || !checkOut) {
    return "تاریخ ورود و خروج مشخص نیست";
  }

  return null;
}
