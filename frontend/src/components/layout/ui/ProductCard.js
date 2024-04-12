import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [imagesUrl, setImagesUrl] = useState(null);

  const getImages = useCallback(async () => {
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
  }, [product.id]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <a href={`/product/${product.id}`}>
          <Image
            priority={true}
            src={
              imagesUrl && imagesUrl.length > 0
                ? `${process.env.NEXT_PUBLIC_API_IMG_URL}/${imagesUrl[0]}`
                : "/images/resim-yok.jpg"
            }
            alt="product image"
            width={300}
            height={300}
          />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-base md:text-xl font-medium leading-tight text-neutral-800">
            {product.productName}
          </h5>
          <p className="mb-4 text-sm md:text-base line-clamp-3 text-neutral-600">
            {product.description}
          </p>
          <div className="text-center">
            <button
              onClick={() => router.push(`/product/${product.id}`)}
              type="button"
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
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
