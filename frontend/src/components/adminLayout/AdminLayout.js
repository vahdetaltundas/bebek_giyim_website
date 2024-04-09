import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Ana Sayfa", src: "Chart_fill", href: "" },
    { title: "Ürünler", src: "Chat", href: "products" },
    { title: "Kategoriler ", src: "Calendar", href: "categories" },
    { title: "Kullanıcılar", src: "User", gap: true, href: "users" },
  ];
  const router = useRouter();
  const tokenCheck = async () => {
    const token = Cookies.get("adminToken");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logincheck`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.data.data.loginCheck) {
      router.push("/admin");
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]); 

  const closeAdminAccount = async () => {
    if (confirm("Çıkış Yapmak İstediğinizden Eminmisiniz?")) {
      Cookies.remove("adminToken", { path: "/" });
      router.push("/admin");
      toast.success("Admin Panelden Çıkış Yapılcı");
    }
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <Image
          src="/assets/control.png"
          alt="Control Icon" 
          width={25}
          height={25}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Image
            src="/assets/logo.png"
            alt="Logo" 
            width={25}
            height={25}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Admin Panel
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link href={`/admin/dashboard/${Menu.href}`} key={index}>
              <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <Image src={`/assets/${Menu.src}.png`} alt="icone" width={25} height={25} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
          <li className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ">
            <button
              onClick={() => closeAdminAccount()}
              className="flex items-center pl-1 "
            >
              <FaSignOutAlt className=" w-6 h-auto text-blue-300" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 ml-4 text-white`}
              >
                Çıkış Yap
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">{children}</div>
    </div>
  );
};
export default AdminLayout;
