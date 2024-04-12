import React, { useEffect, useState } from "react";
import ProductCard from "./layout/ui/ProductCard";
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
  return (
    <div className="container mx-auto">
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 mx-5">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
