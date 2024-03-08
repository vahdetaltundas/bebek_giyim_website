import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerticalCard = ({ product, title,handleDelete }) => {
  const router = useRouter();
  const [imagesUrl, setImagesUrl] = useState([]);
  
  const getImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/image/${product.id}`
      );
      const imagesArray = response.data.data[0].imageUrl.split(",");
      const clearImages = imagesArray.map((image) => {
        return image.replace(/[\[\]"]/g, "");
      });
      setImagesUrl(clearImages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getImages();
  }, [product.id]);
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        {imagesUrl.length > 0 ? (
          <img
            className="rounded-t-lg"
            src={`http://localhost:3001/uploads/${imagesUrl[0]}`}
            alt=""
          />
        ):<img
        className="rounded-t-lg"
        src="/images/resim-yok.jpg"
        alt=""
      />}
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {product.productName}
          </h5>
        </a>
        <div className="grid justify-center gap-2">
          <button
            onClick={() =>
              router.push(
                `/admin/profile/${patchURl}/update-${title}/${product.id}`
              )
            }
            className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300"
          >
            {title} Güncelle
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300"
          >
            Ürüne Resim ekle
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            {title} Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
