import HorizontalCard from "@/components/adminLayout/adminUI/HorizontalCard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const index = () => {
  const router = useRouter();
  const closeAdminAccount = async () => {
    if (confirm("Çıkış Yapmak İstediğinizden Eminmisiniz?")) {
      Cookies.remove("adminToken", { path: "/" });
      router.push("/admin");
      toast.success("Admin Panelden Çıkış Yapılcı");
    }
  };
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <HorizontalCard
          cardUrl="/admin/dashboard/products"
          title="Ürünler"
          desc="Bütün ürünleri listele"
          imgUrl="https://i.imgur.com/td4w2e7.jpeg"
        />
        <HorizontalCard
          cardUrl="/admin/dashboard/categories"
          title="Kategoriler"
          desc="Bütün kategorileri listele"
          imgUrl="https://i.imgur.com/tgGv8FM.png"
        />
        <HorizontalCard
          cardUrl="/admin/dashboard/users"
          title="Kullanıcılar"
          desc="Bütün kullanıcıları listele"
          imgUrl="https://i.imgur.com/3oXhw1X.jpeg"
        />
        <button onClick={() => closeAdminAccount()}>
          <HorizontalCard
            cardUrl=""
            title="SignOut"
            desc="Admin panelden çıkış yap."
            imgUrl="https://i.imgur.com/DYqXITr.png"
          />
        </button>
      </div>
    </>
  );
};

export default index;
