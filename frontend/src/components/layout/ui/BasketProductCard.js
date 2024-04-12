import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import Image from 'next/image';

const BasketProductCard = ({
  product,
  baskets,
  productDelete,
  handleAmountChange,
}) => {
  const [amount, setAmount] = useState(product.amount);

  const quantityReduction = () => {
    const newAmount = amount - 1;
    setAmount(newAmount);
    if (newAmount === 0) {
        productDelete(product.product.id); 
    } else {
        handleAmountChange(product.product.id, newAmount);
    }
  };

  const quantityIncrease = () => {
    const newAmount = amount + 1;
    setAmount(newAmount);
    handleAmountChange(product.product.id, newAmount);
  };

  useEffect(() => {
    const updatedBaskets = baskets.map((item) => {
      if (product.product.id === item.product.id) {
        return { ...item, amount: amount };
      }
      return item;
    });
    localStorage.setItem("baskets", JSON.stringify(updatedBaskets));
  }, [amount, baskets, product.product.id]);

  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_API_IMG_URL}/${product.productImage}`}
        alt="product-image"
        width={100}  
        height={100} 
        sizes="100vw"
        className="rounded-lg w-[10rem] h-auto"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {product.product.productName}
          </h2>
          <p className="mt-1 text-xs text-gray-700">
            #{product.product.barcode}
          </p>
        </div>

        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center justify-center border-gray-100">
            <span
              onClick={quantityReduction}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              -{" "}
            </span>
            <p className="h-8 w-8 border flex items-center justify-center bg-white text-xs outline-none">
              {amount}
            </p>
            <span
              onClick={quantityIncrease}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              +{" "}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-sm">
              {(product.product.price * amount).toFixed(2)} TL
            </p>
            <MdOutlineDelete
              onClick={() => productDelete(product.product.id)}
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketProductCard;
