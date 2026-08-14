export function persianDateToGregorian(date: string): string | null {
  const parts = date.split("/");

  if (parts.length !== 3) {
    return null;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  // تبدیل تقویم جلالی به میلادی
  const jy = year - 979;
  const jm = month - 1;
  const jd = day - 1;

  let jDayNo =
    365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);

  for (let i = 0; i < jm; i++) {
    jDayNo += i < 6 ? 31 : 30;
  }

  jDayNo += jd;

  let gDayNo = jDayNo + 79;

  let gy = 1600 + 400 * Math.floor(gDayNo / 146097);

  gDayNo %= 146097;

  let leap = true;

  if (gDayNo >= 36525) {
    gDayNo--;

    gy += 100 * Math.floor(gDayNo / 36524);

    gDayNo %= 36524;

    if (gDayNo >= 365) {
      gDayNo++;
    } else {
      leap = false;
    }
  }

  gy += 4 * Math.floor(gDayNo / 1461);

  gDayNo %= 1461;

  if (gDayNo >= 366) {
    leap = false;
    gDayNo--;

    gy += Math.floor(gDayNo / 365);

    gDayNo %= 365;
  }

  const monthDays = [
    31,
    leap ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm = 0;

  while (gm < 12 && gDayNo >= monthDays[gm]) {
    gDayNo -= monthDays[gm];
    gm++;
  }

  const gd = gDayNo + 1;

  return `${gy}-${String(gm + 1).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
}
