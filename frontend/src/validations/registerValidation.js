import * as Yup from "yup";

export const registerInitialValues = {
  email: "",
  password: "",
  fullName: "",
  companyName: "",
  phoneNumber: "",
  address: "",
};

export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .required("Bu Alanı Doldurmak Zorunludur.")
    .email("Geçerli bir eposta adresi girin")
    .min(3, "Email Alanı Ez Az 3 Karakter Olmalıdır")
    .max(100, "Email Alanı En Fazla 100 Karakterden Oluşabilir"),
  password: Yup.string()
    .required("Bu Alanı Doldurmak Zorunludur.")
    .min(6, "Şifre en az 6 karakter olmak zorundadır")
    .max(30, "Şifre en fazla 30 karakter olmak zorundadır")
    .matches(/^[a-zA-Z0-9]+$/, "Şifre alfanümerik olmalıdır"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Geçerli bir telefon numarası giriniz (10 haneli)")
    .required("Telefon numarası zorunludur"),
  address: Yup.string()
    .required("Bu Alanı Doldurmak Zorunludur.")
    .min(3, "Adres Alanı Ez Az 3 Karakter Olmalıdır")
    .max(750, "Adres Alanı En Fazla 750 Karakterden Oluşabilir"),
  fullName: Yup.string()
    .required("Bu Alanı Doldurmak Zorunludur.")
    .min(3, "İsim Alanı Ez Az 3 Karakter Olmalıdır")
    .max(100, "İsim Alanı En Fazla 100 Karakterden Oluşabilir"),
  companyName: Yup.string()
    .required("Bu Alanı Doldurmak Zorunludur.")
    .min(3, "Şirket İsmi Alanı Ez Az 3 Karakter Olmalıdır")
    .max(150, "Şirket İsmi Alanı Ez Fazla 150 Karakter Olmalıdır"),
});
