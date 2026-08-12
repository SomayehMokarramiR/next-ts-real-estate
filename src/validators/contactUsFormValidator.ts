export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactFormValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

export function contactUsFormValidator(
  name: string,
  email: string,
  message: string,
): ContactFormValidationResult {
  const errors: ContactFormErrors = {};

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  // Name
  if (!trimmedName) {
    errors.name = "نام و نام خانوادگی را وارد کنید";
  } else if (trimmedName.length < 3) {
    errors.name = "نام و نام خانوادگی حداقل باید ۳ کاراکتر باشد";
  } else if (trimmedName.length > 100) {
    errors.name = "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد";
  } else if (!/^[\p{L}\s\u200C]+$/u.test(trimmedName)) {
    errors.name = "نام و نام خانوادگی فقط باید شامل حروف باشد";
  }

  // Email
  if (!trimmedEmail) {
    errors.email = "ایمیل را وارد کنید";
  } else if (trimmedEmail.length > 150) {
    errors.email = "ایمیل نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد";
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "فرمت ایمیل صحیح نیست";
    }
  }

  // Message
  if (!trimmedMessage) {
    errors.message = "پیام خود را وارد کنید";
  } else if (trimmedMessage.length < 10) {
    errors.message = "پیام حداقل باید ۱۰ کاراکتر باشد";
  } else if (trimmedMessage.length > 2000) {
    errors.message = "پیام نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
