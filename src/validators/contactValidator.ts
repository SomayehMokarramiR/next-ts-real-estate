export type Contact = {
  phone: string;
  email: string;
};

export function contactValidator(contact: Contact): string | null {
  if (!contact.phone.trim()) {
    return "شماره تلفن را وارد کنید";
  }

  if (!contact.email.trim()) {
    return "ایمیل را وارد کنید";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(contact.email.trim())) {
    return "ایمیل معتبر نیست";
  }

  return null;
}
