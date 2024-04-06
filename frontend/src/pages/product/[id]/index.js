import axios from "axios";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const Index = ({ product, loginCheck }) => {
  const [imagesUrl, setImagesUrl] = useState([]);
  const [selectFoto, setSelectFoto] = useState(0);
  const [amount, setAmount] = useState(1);
  useEffect(() => {
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

    getImages();
  }, [product.id]);

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  
  const addToBasket = (product,amount) => {
    const currentBaskets = JSON.parse(localStorage.getItem("baskets")) || [];
    // Eğer ürün varsa tekrar eklememek için yazılan bir kontrol
    if (currentBaskets.find((item) => item.product.id === product.id)) {
      toast.warn("Ürün zaten sepete eklendi.");
      return;
    } else {
      const updatedBaskets = [...currentBaskets, {product:product,amount:amount,productImage:imagesUrl[0]}];
      toast.success("Ürün başarıyla sepete eklendi!");
      localStorage.setItem("baskets", JSON.stringify(updatedBaskets));
    }
  };
  return (
    <section className="py-10 font-poppins">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex flex-wrap mb-24 -mx-4">
          <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div className="sticky top-0 overflow-hidden">
              <div className="relative mb-6 lg:mb-10 lg:h-96">
                {imagesUrl.length > 0 && (
                  <img
                    className="object-contain w-full lg:h-full"
                    src={`http://localhost:3001/uploads/${imagesUrl[selectFoto]}`}
                    alt=""
                  />
                )}
              </div>
              <div className="flex-wrap hidden -mx-2 md:flex">
                {imagesUrl.map((image, index) => (
                  <div className="w-1/2 p-2 sm:w-1/4" key={index}>
                    <div
                      className={`block border border-gray-200 hover:border-blue-400 ${
                        selectFoto === index ? "border-blue-400" : ""
                      }`}
                      onClick={() => {
                        setSelectFoto(index);
                      }}
                    >
                      <img
                        className="object-contain w-full lg:h-28"
                        src={`http://localhost:3001/uploads/${image}`}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-6 ">
                <h2 className="max-w-xl mt-6 mb-1 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl">
                  {product.productName}
                </h2>
                <p className="max-w-xl mt-1 mb-6 text-sm font-semibold leading-loose tracking-wide text-gray-500 md:text-base">
                  {`Barkod No : ${product.barcode}`}
                </p>
                <p className="max-w-2xl mt-1 mb-6 text-base font-semibold leading-loose tracking-wide text-gray-700 md:text-xl">
                  {`Yaş Aralığı : ${product.ageRange}`}
                </p>
                <p className="inline-block text-2xl font-semibold text-gray-700  ">
                  {loginCheck
                    ? product.price
                    : "Ücreti görmek için giriş yapın"}
                </p>
              </div>
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-bold text-gray-700 ">
                  Ürün Açıklaması :
                </h2>
                <div className="bg-gray-100 rounded-xl">
                  <div className="p-3 lg:p-5 ">
                    <div className="p-2 rounded-xl lg:p-6 bg-gray-50">
                      <div className="w-full mb-4 md:w-2/5">
                        <p className="mr-3 text-gray-500 ">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-12">
                <div className="flex flex-row items-center">
                  <button
                    className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className="py-4 px-6 rounded-lg">{amount}</span>
                  <button
                    className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-violet-800 text-white font-semibold py-3 px-10 rounded-xl h-full"
                  onClick={()=>addToBasket(product,amount)}
                  disabled={!loginCheck}
                >
                  {loginCheck ? "Sepete Ekle" : <Link href="/auth/login">Lütfen Giriş Yapın</Link>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps({ req, params }) {
  const cookies = parseCookies({ req });
  const token = cookies.token ?? null;

  try {
    const product = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      props: {
        product: product ? product.data.data.data : null,
        loginCheck: product.data.data.loginCheck,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Index;
