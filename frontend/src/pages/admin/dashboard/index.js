import HorizontalCard from "@/components/adminLayout/adminUI/HorizontalCard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const router = useRouter();

  const closeAdminAccount = async () => {
    if (confirm("Çıkış Yapmak İstediğinizden Emin misiniz?")) {
      Cookies.remove("adminToken", { path: "/" });
      router.push("/admin");
      toast.success("Admin Panelden Çıkış Yapıldı");
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <HorizontalCard
          cardUrl="/admin/dashboard/products"
          title="Ürünler"
          desc="Bütün ürünleri listele"
          imgUrl="/images/product.jpg"
        />
        <HorizontalCard
          cardUrl="/admin/dashboard/categories"
          title="Kategoriler"
          desc="Bütün kategorileri listele"
          imgUrl="/images/category.png"
        />
        <HorizontalCard
          cardUrl="/admin/dashboard/users"
          title="Kullanıcılar"
          desc="Bütün kullanıcıları listele"
          imgUrl="/images/user.jpg"
        />
        <button onClick={closeAdminAccount}>
          <HorizontalCard
            cardUrl=""
            title="Çıkış Yap"
            desc="Admin panelden çıkış yap."
            imgUrl="/images/exit.png"
          />
        </button>
      </div>
    </>
  );
};

export default Dashboard;
