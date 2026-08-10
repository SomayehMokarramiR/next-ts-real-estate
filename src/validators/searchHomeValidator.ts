export interface SearchHomeData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export function validateSearchHome(data: SearchHomeData) {
  // مقصد
  if (!data.destination.trim()) {
    return {
      valid: false,
      message: "لطفاً مقصد را وارد کنید",
    };
  }

  // تاریخ ورود
  if (!data.checkIn.trim()) {
    return {
      valid: false,
      message: "لطفاً تاریخ ورود را وارد کنید",
    };
  }

  // تاریخ خروج
  if (!data.checkOut.trim()) {
    return {
      valid: false,
      message: "لطفاً تاریخ خروج را وارد کنید",
    };
  }

  // بررسی فرمت تاریخ شمسی: 1405/01/15
  const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  if (!dateRegex.test(data.checkIn.trim())) {
    return {
      valid: false,
      message: "تاریخ ورود باید به صورت کامل وارد شود؛ مثال: 1405/01/15",
    };
  }

  if (!dateRegex.test(data.checkOut.trim())) {
    return {
      valid: false,
      message: "تاریخ خروج باید به صورت کامل وارد شود؛ مثال: 1405/01/16",
    };
  }

  // تبدیل تاریخ شمسی برای بررسی منطقی بودن روز و ماه
  const parseJalaliDate = (date: string) => {
    const [year, month, day] = date.split("/").map(Number);

    if (
      year < 1300 ||
      year > 1500 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return null;
    }

    // ماه‌های 1 تا 6 حداکثر 31 روز
    if (month <= 6 && day > 31) {
      return null;
    }

    // ماه‌های 7 تا 11 حداکثر 30 روز
    if (month >= 7 && month <= 11 && day > 30) {
      return null;
    }

    // فعلاً برای اسفند حداکثر 29 روز
    if (month === 12 && day > 29) {
      return null;
    }

    return { year, month, day };
  };

  const checkIn = parseJalaliDate(data.checkIn.trim());
  const checkOut = parseJalaliDate(data.checkOut.trim());

  if (!checkIn) {
    return {
      valid: false,
      message: "تاریخ ورود معتبر نیست",
    };
  }

  if (!checkOut) {
    return {
      valid: false,
      message: "تاریخ خروج معتبر نیست",
    };
  }

  // خروج نباید قبل یا مساوی ورود باشد
  const checkInValue = checkIn.year * 10000 + checkIn.month * 100 + checkIn.day;

  const checkOutValue =
    checkOut.year * 10000 + checkOut.month * 100 + checkOut.day;

  if (checkOutValue <= checkInValue) {
    return {
      valid: false,
      message: "تاریخ خروج باید بعد از تاریخ ورود باشد",
    };
  }

  // تعداد نفرات
  if (!data.guests.trim()) {
    return {
      valid: false,
      message: "لطفاً تعداد نفرات را وارد کنید",
    };
  }

  const guests = Number(data.guests);

  if (!Number.isInteger(guests) || guests < 1) {
    return {
      valid: false,
      message: "تعداد نفرات باید یک عدد صحیح و حداقل ۱ نفر باشد",
    };
  }

  return {
    valid: true,
    message: "",
  };
}
