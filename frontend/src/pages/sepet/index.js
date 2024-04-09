import BasketProductCard from "@/components/layout/ui/BasketProductCard";
import OrderDelivery from "@/components/layout/ui/OrderDelivery";
import axios from "axios";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

const IndexPage = ({ loginCheck }) => {
  const [baskets, setBaskets] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [isProductModal, setIsProductModal] = useState(false);
  useEffect(() => {
    const savedBaskets = JSON.parse(localStorage.getItem('baskets')) || [];
    setBaskets(savedBaskets);
    updateTotalPrice(savedBaskets);
  }, []);

  const productDelete = (id) => {
    const updatedBasket = baskets.filter((item) => item.product.id !== id);
    setBaskets(updatedBasket);
    localStorage.setItem('baskets', JSON.stringify(updatedBasket));
    updateTotalPrice(updatedBasket);
  };
  
  const handleAmountChange = (productId, newAmount) => {
    const updatedBasket = baskets.map(item => {
      if (item.product.id === productId) {
        return { ...item, amount: newAmount };
      }
      return item;
    });
    setBaskets(updatedBasket);
    localStorage.setItem('baskets', JSON.stringify(updatedBasket));
    updateTotalPrice(updatedBasket);
  };

  const updateTotalPrice = (basketItems) => {
    if (basketItems.length === 0) {
      setTotalPrice('0.00');
    } else {
      const totalPrice = basketItems.reduce((total, item) => {
        const miktar = item.amount;
        const fiyat = parseFloat(item.product.price);
        return total + (miktar * fiyat);
      }, 0).toFixed(2);
      setTotalPrice(totalPrice);
    }
  };

  return (
    <>
      {loginCheck ? (
        <>
        <div className="h-max bg-gray-100 pt-16">
          <h1 className="mb-10 text-center text-2xl font-bold">Sepet</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {baskets.map((product) => (
                <div
                  key={product.product.id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <BasketProductCard
                    product={product}
                    baskets={baskets}
                    productDelete={productDelete}
                    handleAmountChange={handleAmountChange}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total Ücret</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{totalPrice}</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => setIsProductModal(true)}>
                Sipariş Ver
              </button>
            </div>
          </div>
        </div>
        {isProductModal && <OrderDelivery baskets={baskets} totalPrice={totalPrice} setIsProductModal={setIsProductModal} />}
        </>
      ) : (
        <div className="max-h-screen min-h-80 bg-gray-100 pt-16 flex flex-col items-center justify-center">
          <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            Sepete gidebilmek için lütfen giriş yapın
          </h1>
          <Link
            href="/auth/login"
            className="w-1/3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Giriş Yapma sayfası
          </Link>
        </div>
      )}
    </>
  );
};




export async function getServerSideProps({ req }) {
  const cookies = parseCookies({ req });
  const token = cookies.token || null;

  try {
    const loginCheck = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logincheck`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      props: {
        loginCheck: loginCheck.data.data.loginCheck,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default IndexPage;
