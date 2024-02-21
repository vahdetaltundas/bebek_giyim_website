import * as Yup from "yup";

export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Bu alan doldurulmak zorunludur.")
    .email("Geçerli bir eposta adresi girin")
    .min(3, "Email Alanı Ez Az 3 Karakter Olmalıdır")
    .max(100, "Email Alanı En Fazla 100 Karakterden Oluşabilir"),
  password: Yup.string()
    .required("Bu alan doldurulmak zorunludur.")
    .min(6, "Şifre en az 6 karakter olmak zorundadır")
    .max(30, "Şifre en fazla 30 karakter olmak zorundadır")
    .matches(/^[a-zA-Z0-9]+$/, "Şifre alfanümerik olmalıdır"),
  
});
