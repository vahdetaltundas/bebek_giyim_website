import * as Yup from "yup";

export const addCategoryFormInitialValue = {
    categoryName:""
};

export const addCategoryValidationSchema = Yup.object({
  categoryName: Yup.string().required("Kategori adı zorunludur")
});
