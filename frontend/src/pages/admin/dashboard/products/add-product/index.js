import { fetchCategories } from "@/pages/api/hello";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
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
          <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ürün Adı
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product name"
                  required=""
                />
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
                />
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
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
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
                />
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
                />
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
                  defaultValue={""}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Yeni Ürünü Ekle
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
