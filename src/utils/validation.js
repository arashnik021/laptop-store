export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email).trim()
  );

export const isValidIranPhone = (phone) =>
  /^09\d{9}$/.test(String(phone).replace(/\s|-/g, ""));

export function validateLogin(values) {
  const errors = {};

  if (!isValidEmail(values.email)) {
    errors.email ="لطفاً یک ایمیل معتبر وارد کنید.";

  }

  if (!values.password || values.password.length < 6) {
    errors.password ="رمز عبور باید حداقل ۶ کاراکتر باشد.";
  }

  return errors;
}

export function validateRegister(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 3) {
    errors.fullName ="نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.";
  }

  if (!isValidEmail(values.email)) {
    errors.email ="لطفاً یک ایمیل معتبر وارد کنید.";
  }

  if (!values.password || values.password.length < 6) {
    errors.password =
      "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword ="تکرار رمز عبور با رمز اصلی یکسان نیست.";
  }

  if (values.phone && !isValidIranPhone(values.phone)) {
    errors.phone ="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم داشته باشد.";
  }

  return errors;
}

export function validateContact(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 3) {
    errors.fullName ="نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.";
  }

  if (!isValidEmail(values.email)) {
    errors.email ="لطفاً یک ایمیل معتبر وارد کنید.";
  }

  if (!values.subject || values.subject.trim().length < 3) {
    errors.subject ="موضوع باید حداقل ۳ کاراکتر باشد.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message ="پیام باید حداقل ۱۰ کاراکتر باشد.";
  }

  return errors;
}
