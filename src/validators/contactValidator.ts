export function validateContact(phone: string, email: string): string | null {
  if (!phone.trim()) {
    return "شماره تلفن را وارد کنید";
  }

  if (!/^09\d{9}$/.test(phone)) {
    return "شماره تلفن باید ۱۱ رقم و با 09 شروع شود";
  }

  if (!email.trim()) {
    return "ایمیل را وارد کنید";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "فرمت ایمیل صحیح نیست";
  }

  return null;
}
