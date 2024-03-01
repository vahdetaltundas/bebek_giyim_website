import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [imagesUrl, setImagesUrl] = useState(null);
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
      setImagesUrl([]);
    }
  };

  useEffect(() => {
    getImages();
  }, []);
  return (
    <>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <a href="#!">
          <img
            onClick={() => router.push(`/product/${product.id}`)}
            className="rounded-t-lg"
            src={
              imagesUrl && imagesUrl.length > 0
                ? `http://localhost:3001/uploads/${imagesUrl[0]}`
                : "https://cdn05.e-bebek.com/mnresize/1600/1600/media/p/lover-elbise-kiz-bebek_8682766576719_01.jpg"
            }
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            {product.productName}
          </h5>
          <p className="mb-4 text-base line-clamp-3 text-neutral-600">
            {product.description}
          </p>
          {/* Butonu buraya ekliyoruz */}
          <div className="text-center">
            <button
              onClick={() => router.push(`/product/${product.id}`)}
              type="button"
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              Ürün Detay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
