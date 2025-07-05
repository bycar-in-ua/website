import * as v from "valibot";

const defaultMandatoryStringMessage = "Це обов'язкове поле";

export const emailShema = v.pipe(
  v.string(defaultMandatoryStringMessage),
  v.minLength(1, defaultMandatoryStringMessage),
  v.email("Недійсний email"),
);

export const phoneRegex =
  /^(\+38|38|8)?[\s-]?(\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\(?\d{3}\)?[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{3})$/;

export const phoneSchema = v.pipe(
  v.string(defaultMandatoryStringMessage),
  v.minLength(1, defaultMandatoryStringMessage),
  v.regex(phoneRegex, "Недійсний номер телефону"),
);

export const emailOrPhoneSchema = v.union(
  [emailShema, phoneSchema],
  "Введіть дійсний email або номер телефону",
);

export const passwordSchema = v.pipe(
  v.string(defaultMandatoryStringMessage),
  v.minLength(1, "Пароль не може бути пустим"),
);
