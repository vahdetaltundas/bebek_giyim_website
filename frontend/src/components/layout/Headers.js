import { fetchCategories } from "@/pages/api/hello";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser, FaFacebook, FaInstagram } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { IoMdExit } from "react-icons/io";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Image from "next/image";
const Header = ({ loginCheck }) => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const closeUserAccount = async () => {
    if (confirm("Çıkış Yapmak İstediğinizden Eminmisiniz?")) {
      Cookies.remove("token", { path: "/" });
      router.push("/auth/login");
      toast.success("Başarılı bir şekilde çıkış yaptınız.");
    }
  };
  return (
    <header className="shadow-md bg-white font-sans">
      <section className="flex items-center lg:justify-center max-sm:flex-col relative py-1 px-10 border-gray-200 border-b lg:min-h-[80px] max-lg:min-h-[60px]">
        <Link href="/" className="max-md:w-full max-sm:mb-3">
          <Image
            src="/images/Logo.png"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            className="m-2 w-[10rem] h-auto"
          />
        </Link>
        <div className="md:absolute md:right-10 flex items-center max-md:ml-auto">
          <FaFacebook className="w-6 h-6 mr-6" />
          <FaInstagram className="w-6 h-6 mr-6" />
          <div className="inline-block border-gray-300 border-l-2 pl-6 cursor-pointer">
            {loginCheck ? (
              <IoMdExit
                onClick={() => closeUserAccount()}
                className="  w-6 h-6"
              />
            ) : (
              <Link href="/auth/login">
                <FaUser className="  w-6 h-6" />
              </Link>
            )}
          </div>
          <Link href="/sepet">
            <SlBasket className="ml-5 w-6 h-6" />
          </Link>
        </div>
      </section>
      <div className="flex flex-wrap py-3.5 px-10 overflow-x-auto">
        <div className="flex ml-auto lg:order-1 lg:hidden">
          <button id="toggle" className="ml-7">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul
          id="collapseMenu"
          className="lg:!flex justify-center lg:space-x-10 max-lg:space-y-3 max-lg:hidden w-full max-lg:mt-2"
        >
          <li className="max-lg:border-b max-lg:py-2">
            <Link
              href="/"
              className="hover:text-[#007bff] text-[#007bff] font-bold text-[15px] block"
            >
              Anasayfa
            </Link>
          </li>
          {categories
            ? categories.map((categori) => (
                <li key={categori.id} className="max-lg:border-b max-lg:py-2">
                  <Link
                    href={`/kategori/${categori.id}`}
                    className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
                  >
                    {categori.categoryName}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </header>
  );
};

export default Header;
