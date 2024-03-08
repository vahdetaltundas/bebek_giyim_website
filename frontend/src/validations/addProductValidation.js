import * as Yup from "yup";

export const addProductFormInitialValue = {
  productName: "",
  price: 0,
  ageRange: "",
  packageQuantity:0,
  barcode:"",
  categoryId: 0,
  description: "",
};

export const addProductValidationSchema = Yup.object({
  productName: Yup.string().required("Name required"),
  barcode: Yup.string().required('Barkod Numarası gereklidir'),
  price: Yup.number().required('Fiyat gereklidir').positive('Fiyat pozitif olmalıdır'),
  description: Yup.string().min(10,"Açıklama en az 10 karakter olmalıdır.").max(3000,"Açıklama en falza 3000 karakter olabilir."),
});
