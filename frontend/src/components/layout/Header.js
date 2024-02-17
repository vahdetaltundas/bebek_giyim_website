import Link from "next/link";
import React from "react";
import { FaUser, FaFacebook, FaInstagram } from "react-icons/fa";

const Header = () => {
  return (
    <header className="shadow-md bg-white font-sans">
      <section className="flex items-center lg:justify-center max-sm:flex-col relative py-1 px-10 border-gray-200 border-b lg:min-h-[80px] max-lg:min-h-[60px]">
        <a  className="max-md:w-full max-sm:mb-3">
          <img
            src="/images/Logo.png"
            alt="logo"
            className="md:w-[160px] w-36"
          />
        </a>
        <div className="md:absolute md:right-10 flex items-center max-md:ml-auto">
          <FaFacebook className="w-6 h-6 mr-6" />
          <FaInstagram className="w-6 h-6 mr-6" />
          <div className="inline-block border-gray-300 border-l-2 pl-6 cursor-pointer">
            <Link href="/auth/login">
              <FaUser className="w-6 h-6" />
            </Link>
          </div>
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
            <a
              href="javascript:void(0)"
              className="hover:text-[#007bff] text-[#007bff] font-bold text-[15px] block"
            >
              Anasayfa
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
            >
              Kategori 1
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
            >
              Kategori 2
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
            >
              Kategori 3
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
            >
              Kategori 4
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2">
            <a
              href="javascript:void(0)"
              className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] block"
            >
              Kategori 5
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;