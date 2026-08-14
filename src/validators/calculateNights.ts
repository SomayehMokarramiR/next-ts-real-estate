import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

const persianToEnglish = (value: string): string => {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";

  return value
    .replace(/[۰-۹]/g, (char) => {
      return String(persianNumbers.indexOf(char));
    })
    .replace(/[٠-٩]/g, (char) => {
      return String(arabicNumbers.indexOf(char));
    });
};

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) {
    return 0;
  }

  try {
    // تبدیل اعداد فارسی به انگلیسی
    const normalizedCheckIn = persianToEnglish(checkIn);
    const normalizedCheckOut = persianToEnglish(checkOut);

    // ساخت تاریخ شمسی
    const start = new DateObject({
      date: normalizedCheckIn,
      calendar: persian,
    });

    const end = new DateObject({
      date: normalizedCheckOut,
      calendar: persian,
    });

    // اختلاف بر اساس Julian Day
    const difference = end.toJulianDay() - start.toJulianDay();

    return difference > 0 ? Math.round(difference) : 0;
  } catch (error) {
    console.error("calculateNights error:", error);

    return 0;
  }
}
