import VerticalCard from "@/components/adminLayout/adminUI/VerticalCard";
import { deleteItem, fetchProducts } from "@/pages/api/hello";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const token = Cookies.get("adminToken");

  const handleDelete = async (id) => {
    try {
      await deleteItem("products", id, token);
      toast.success("Ürününüz silindi");
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error("Ürününüz silinemedi!");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-5">
      <Link
        href="/admin/dashboard/products/add-product"
        className="col-end-7 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
      >
        Ürün Ekle
      </Link>
      <div className="col-span-6 grid justify-center md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {products.map((product) => (
          <VerticalCard key={product.id} product={product} title="Ürünü" handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Products;
