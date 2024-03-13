import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const fetchProductWithCategoryID = async (id) => {
  const response = await axiosInstance.get(
    `/products/productWithCategoryId/${id}`
  );
  return response.data;
};

export const deleteItem = async (url, id, token) => {
  const response = await axiosInstance.delete(`/${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUsers = async (token) => {
  const response = await axiosInstance.get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const userActivatedStatus = async (url, id, token) => {
  const response = await axiosInstance.put(
    `/users/${url}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
