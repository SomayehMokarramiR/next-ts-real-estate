import * as jalaali from "jalaali-js";

export function normalizeDate(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/-/g, "/")
    .split("/")
    .map((item) => item.padStart(2, "0"))
    .join("/");
}

export function jalaliToDate(value: string) {
  const normalized = normalizeDate(value);

  const [jy, jm, jd] = normalized.split("/").map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  return new Date(Date.UTC(gy, gm - 1, gd));
}

export function calculateNights(checkIn: string, checkOut: string) {
  const start = jalaliToDate(checkIn);
  const end = jalaliToDate(checkOut);

  console.log("START DATE =>", start);
  console.log("END DATE =>", end);

  const diff = end.getTime() - start.getTime();

  const nights = Math.round(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}
