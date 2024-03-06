import Link from "next/link";
import React, { useEffect } from "react";
import { FaHome, FaBox, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const tokenCheck=async()=>{
    const token=Cookies.get('adminToken');
    const response=await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logincheck`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(!response.data.data.loginCheck){
      router.push("/admin")
    }
  }
  
  useEffect(()=>{
    tokenCheck();
  },[])
  const closeAdminAccount = async () => {
    if(confirm("Çıkış Yapmak İstediğinizden Eminmisiniz?")) {
      Cookies.remove('adminToken', { path: '/' });
      router.push("/admin");
          toast.success("Admin Panelden Çıkış Yapılcı");
    }
  };
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100">
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center ps-2.5 mb-5"
          >
            <img
              src="/images/Logo.png"
              className="h-10 me-3 sm:h-10"
              alt="Logo"
            />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FaHome className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/products"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
              >
                <FaBox className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/categories"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <BiSolidCategory className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                <span className="ms-3">Categories</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/users"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FaUser className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                <span className="ms-3">Users</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => closeAdminAccount()}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FaSignOutAlt className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75  group-hover:text-gray-900" />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
