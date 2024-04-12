import ProductCard from "@/components/layout/ui/ProductCard";
import { fetchProductWithCategoryID } from "@/pages/api/hello";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const Index = ({ category }) => {
  const [productWithCategory, setProductWithCategory] = useState([]);
  
  
  const getProducts = useCallback(async () => {
    try {
      const response = await fetchProductWithCategoryID(category.id);
      setProductWithCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [category.id]);
  
  useEffect(() => {
    getProducts();
  }, [getProducts]); 

  return (
    <>
      <div className="container mx-auto">
        <h1 className="p-2 lg:p-5 text-2xl lg:text-4xl text-slate-700 mb-5 lg:mb-10">
          Kategori: {category.categoryName}
        </h1>
        <div className="mt-10 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mx-5">
          {productWithCategory.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ req, params }) {
  try {
    const categoryResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.id}`
    );

    const category = categoryResponse.data.data[0];
    return {
      props: {
        category: category || null,
      },
    };
  } catch (err) {
    console.error("Category Fetch Error:", err);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
export default Index;
