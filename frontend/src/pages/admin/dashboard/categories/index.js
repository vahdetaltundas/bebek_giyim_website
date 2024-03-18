import { deleteItem, fetchCategories } from "@/pages/api/hello";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const categories = () => {
    const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const token = Cookies.get("adminToken");
    try {
      await deleteItem("categories", id, token);
      toast.success("Kategori silindi");
      getCategories();
    } catch (error) {
      console.log(error);
      toast.error("Kategori silinemedi!");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="mx-auto max-w-full px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Kullanıcılar Listesi</h2>
          <span className="text-xs text-gray-500">
            Kayıtlı kullanıcıların hesaplarını görüntüleyin
          </span>
          
        </div>
        <Link
            href="/admin/dashboard/categories/add-categori"
            className="px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
          >
            Kategori Ekle
          </Link>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Kategori Adı</th>
                <th className="px-5 py-3">Kategoriyi Sil</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
            {categories.map((category)=>(<tr>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap">{category.id}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <div className="flex items-center">
                    <p className="whitespace-no-wrap">{category.categoryName}</p>
                  </div>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <button
                        onClick={() =>
                          handleDelete(category.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full"
                      >
                        Kategoriyi Sil
                      </button>
                </td>
                
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default categories;
