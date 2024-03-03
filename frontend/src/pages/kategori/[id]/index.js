import ProductCard from "@/components/layout/ui/ProductCard";
import { fetchProductWithCategoryID } from "@/pages/api/hello";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = ({ category }) => {
    const [productWithCategory,setProductWithCategory]=useState([]);
    const getProducts=async()=>{
        try {
            const response=await fetchProductWithCategoryID(category.id);
            setProductWithCategory(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProducts();
        console.log(productWithCategory);
    },[category])
  return (
    <>
      <div className="container mx-auto">
        <h1 className="p-5 text-4xl text-slate-700 mb-10">
          Kategori: {category.categoryName}
        </h1>
        <div className="mt-20 grid gird-cols-2 md:grid-cols-4 gap-5 mx-5">
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

export default index;
