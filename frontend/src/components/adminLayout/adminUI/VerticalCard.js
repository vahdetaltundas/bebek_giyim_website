import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const VerticalCard = ({ product, title, handleDelete }) => {
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
    <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        {imagesUrl.length > 0 ? (
          <Image
            className="rounded-t-lg"
            alt="product-image"
            src={`${process.env.NEXT_PUBLIC_API_IMG_URL}/${imagesUrl[0]}`}
            width={250}
            height={250}
          />
        ) : (
          <Image
            className="rounded-t-lg"
            src="/images/resim-yok.jpg"
            width={250}
            height={250}
          />
        )}
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
                `/admin/dashboard/products/update-product/${product.id}`
              )
            }
            className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300"
          >
            {title} Güncelle
          </button>
          <button
            onClick={() =>
              router.push(
                `/admin/dashboard/products/product-upload-images/${product.id}`
              )
            }
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
