import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { fetchCategories } from "@/pages/api/hello";
import { addProductValidationSchema } from "@/validations/addProductValidation";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProduct = ({ product }) => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      productName: product.productName,
      price: product.price,
      ageRange: product.ageRange,
      packageQuantity: product.packageQuantity,
      barcode: product.barcode,
      categoryId: product.categoryId,
      description: product.description,
    },
    validationSchema: addProductValidationSchema,
    onSubmit: async (values) => {
      const token=Cookies.get('adminToken');
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${product.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        router.push("/admin/dashboard/products");
        toast.success("Ürün başarıyla Güncellendi!");
      } catch (error) {
        console.error("Product eklenirken bir hata oluştu", error);
        toast.error("Ürün güncellenirken hata oluştu");
      }
    },
  });
  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="relative p-4 w-full h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürün Adı
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product name"
                  required=""
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
                {formik.touched.productName && formik.errors.productName ? (
                  <ErrorMessage errorMessage={formik.errors.productName} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="barcode"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürün Barkod Numarası
                </label>
                <input
                  type="text"
                  name="barcode"
                  id="barcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="#121212112"
                  required=""
                  value={formik.values.barcode}
                  onChange={formik.handleChange}
                />
                {formik.touched.barcode && formik.errors.barcode ? (
                  <ErrorMessage errorMessage={formik.errors.barcode} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürünün Fiyatı
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                  required=""
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.touched.price && formik.errors.price ? (
                  <ErrorMessage errorMessage={formik.errors.price} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kategori
                </label>
                <select
                  id="categoryId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="ageRange"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürün Yaş Aralığı
                </label>
                <input
                  type="text"
                  name="ageRange"
                  id="ageRange"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="0 ile 1 yaş arası"
                  required=""
                  value={formik.values.ageRange}
                  onChange={formik.handleChange}
                />
                {formik.touched.ageRange && formik.errors.ageRange ? (
                  <ErrorMessage errorMessage={formik.errors.ageRange} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="packageQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürün Paket Adedi
                </label>
                <input
                  type="number"
                  name="packageQuantity"
                  id="packageQuantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={formik.values.packageQuantity}
                  onChange={formik.handleChange}
                />
                {formik.touched.packageQuantity &&
                formik.errors.packageQuantity ? (
                  <ErrorMessage errorMessage={formik.errors.packageQuantity} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürün Açıklaması
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ürün Açıklaması"
                  defaultValue={formik.values.description}
                  onChange={(e) =>
                    formik.setFieldValue("description", e.target.value)
                  }
                />
                {formik.touched.description && formik.errors.description ? (
                  <ErrorMessage errorMessage={formik.errors.description} />
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Ürünü Güncelle
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps({ req, params }) {
  try {
    const product = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
    );

    return {
      props: {
        product: product ? product.data.data.data : null,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
export default UpdateProduct;
