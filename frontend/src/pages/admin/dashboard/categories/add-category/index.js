import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { addCategoryFormInitialValue, addCategoryValidationSchema } from "@/validations/addCategoryValidation";
import  axios  from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const AddCategory = () => {
    const router = useRouter();
  const formik = useFormik({
    initialValues: addCategoryFormInitialValue,
    validationSchema: addCategoryValidationSchema,
    onSubmit: async (values) => {
      const token = Cookies.get("adminToken");
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        router.push("/admin/dashboard/categories");
        toast.success("Kategori başarıyla eklendi!");
      } catch (error) {
        console.error("Kategori eklenirken bir hata oluştu", error);
        toast.error("Kategori eklenirken hata oluştu");
      }
    },
  });
  return (
    <>
      <div className="relative p-4 w-full h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Kategori Ekle
            </h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-1">
              <div>
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kategori Adı
                </label>
                <input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Kategori adını ekle"
                  required=""
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                />
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <ErrorMessage errorMessage={formik.errors.categoryName} />
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Yeni Kategori Ekle
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
