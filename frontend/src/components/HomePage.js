import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/pages/api/hello";

const HomePage = () => {
    const [products,setProducts]=useState([]);
    const getProducts=async()=>{
        try {
            const response=await fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProducts();
    },[])
  const array = Array.from({ length: 20 }, (_, index) => index);
  return (
    <div className="container mx-auto">
      <div className="mt-20 grid gird-cols-2 md:grid-cols-4 gap-5 mx-5">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
