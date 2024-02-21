import * as Yup from "yup";

export const forgetPasswordInitialValues = {
  email: "",
};

export const forgetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .required("Bu alan doldurulmak zorunludur.")
    .email("Geçerli bir eposta adresi girin")
    .min(3, "Email Alanı Ez Az 3 Karakter Olmalıdır")
    .max(100, "Email Alanı En Fazla 100 Karakterden Oluşabilir"),
});
