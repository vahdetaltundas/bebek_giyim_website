import axios from "axios";
const baseURL=process.env.NEXT_PUBLIC_API_URL;

const axiosInstance=axios.create({
    baseURL,
});

export const fetchProducts=async()=>{
  const response=await axiosInstance.get("/products");
  return response.data;
}

export const fetchCategories=async()=>{
  const response=await axiosInstance.get("/categories");
  return response.data;
}