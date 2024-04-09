import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Cookies from "js-cookie";
import {
  OrderDeliveryInitialValue,
  OrderDeliveryValidationSchema,
} from "@/validations/ordrDeliveryValidation";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const OrderDelivery = ({ setIsProductModal, baskets, totalPrice }) => {
  const router=useRouter();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <h1 className="text-2xl">Sipariş Bilgilerinizi girin</h1>
            <Formik
              initialValues={OrderDeliveryInitialValue}
              validationSchema={OrderDeliveryValidationSchema}
              onSubmit={async (values) => {
                
                const token = Cookies.get("token");
                let message = baskets
                  .map(
                    (basket, index) =>
                      `${index + 1}. Ürün Bilgileri=\n   Ürün adı= ${
                        basket.product.productName
                      }\n   Ürün Barkod No= ${
                        basket.product.barcode
                      }\n   Ürün İstenen Adet Sayısı= ${basket.amount} Adet`
                  )
                  .join("\n");
                message = message.concat(
                  `\n-----------------------------------\nSipariş Bilgileri:\n   Ad Soyad=${values.name}\n   Telefon Numarası=${values.phoneNumber}\n   Adres Bilgisi=${values.address}\n-----------------------------------\nWeb Sitesinde Gösterilen Fiyat=${totalPrice}`
                );
                try {
                  const response=await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/orderMail`,
                    { orderMessage: message },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  toast.success(response.data.message);
                  localStorage.removeItem('baskets');
                  router.push("/")
                } catch (error) {
                  console.log(error);
                }
              }}

            >
              <Form className="flex flex-col text-sm mt-4">
                <span className="font-semibold mb-[2px]">Ad Soyad</span>
                <Field
                  type="text"
                  name="name"
                  className="border-2 p-1 text-sm px-1 outline-none"
                  placeholder="Adınızı ve soyadınızı girin..."
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
                <span className="font-semibold mb-[2px] mt-4">
                  Telefon Numarası
                </span>
                <Field
                  type="number"
                  name="phoneNumber"
                  className="border-2 p-1 text-sm px-1 outline-none"
                  placeholder="Telefon numaranızı girin..."
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500"
                />
                <span className="font-semibold mb-[2px] mt-4">Adres</span>
                <Field
                  as="textarea"
                  name="address"
                  className="border-2 p-1 text-sm px-1 outline-none"
                  placeholder="Adresinizi girin..."
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500"
                />
                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Sipariş ver
                  </button>
                </div>
              </Form>
            </Formik>
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default OrderDelivery;
