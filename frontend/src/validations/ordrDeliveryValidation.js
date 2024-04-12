import * as Yup from "yup";
export const OrderDeliveryInitialValue = {
  name: "",
  phoneNumber: "",
  address: "",
};
export const OrderDeliveryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Ad Soyad zorunludur"),
  phoneNumber: Yup.string()
    .matches(
      /^[0-9]{10}$/, 
      "Geçerli bir telefon numarası giriniz"
    )
    .required("Telefon Numarası zorunludur"),
  address: Yup.string().required("Adres zorunludur"),
});
