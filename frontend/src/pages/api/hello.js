import axios from "axios";
const baseURL="http://localhost:3001/api";

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