import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

const normalizeDigits = (value: string): string => {
  return value
    .replace(/[۰-۹]/g, (char) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(char)))
    .replace(/[٠-٩]/g, (char) => String("٠١٢٣٤٥٦٧٨٩".indexOf(char)));
};

export function reservationDateValidator({
  checkIn,
  checkOut,
}: {
  checkIn: string;
  checkOut: string;
}): string | null {
  // ورود و خروج باید وجود داشته باشند
  if (!checkIn) {
    return "تاریخ ورود را انتخاب کنید";
  }

  if (!checkOut) {
    return "تاریخ خروج را انتخاب کنید";
  }

  try {
    const normalizedCheckIn = normalizeDigits(checkIn);
    const normalizedCheckOut = normalizeDigits(checkOut);

    const checkInDate = new DateObject({
      date: normalizedCheckIn,
      calendar: persian,
    });

    const checkOutDate = new DateObject({
      date: normalizedCheckOut,
      calendar: persian,
    });

    const checkInJulian = checkInDate.toJulianDay();
    const checkOutJulian = checkOutDate.toJulianDay();

    if (checkInJulian <= 0 || checkOutJulian <= 0) {
      return "تاریخ اقامت معتبر نیست";
    }

    if (checkOutJulian <= checkInJulian) {
      return "تاریخ خروج باید بعد از تاریخ ورود باشد";
    }

    return null;
  } catch (error) {
    console.error("reservationDateValidator:", error);

    return "تاریخ اقامت معتبر نیست";
  }
}
