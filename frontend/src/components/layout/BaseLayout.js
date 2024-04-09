
import Cookies from "js-cookie";
import Footer from "./Footer";
import Header from "./Headers"
import axios  from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BaseLayout = ({ children }) => {
  const [loginCheck,setLoginCheck]=useState(false);
  const router=useRouter();
  const tokenCheck = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logincheck`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoginCheck(response.data.data.loginCheck);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    tokenCheck();
  }, [router.asPath]);
  return (
    <>
    <Header loginCheck={loginCheck} />
    {children}
    <Footer/>
    </>
  );
};

export default BaseLayout;