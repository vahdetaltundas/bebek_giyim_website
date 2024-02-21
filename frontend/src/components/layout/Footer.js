import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaMailBulk,
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaFax } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-100 text-center text-neutral-600 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>x Bebek Giyim Toptan Sitemize Hoş Geldiniz:</span>
          </div>
          {/* Social network icons container */}
          <div className="flex justify-center">
            <FaFacebook className="w-5 h-5 mr-6" />
            <FaInstagram className="w-5 h-5 mr-6" />
          </div>
        </div>

        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Hakkımızda
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Hesabım
              </h6>
              <p className="mb-4">
                <Link href="/auth/login" className="text-neutral-600">
                  Giriş Yap
                </Link>
              </p>
              <p className="mb-4">
                <Link href="/auth/register" className="text-neutral-600">
                  Üye Ol
                </Link>
              </p>
              <p className="mb-4">
                <Link href="/auth/forgetpassword" className="text-neutral-600">
                  Şifremi Unuttum
                </Link>
              </p>
            </div>
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                İLETİŞİM
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaHome className="mr-3 h-5 w-5" />
                New York, NY 10012, US
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaMailBulk className="mr-3 h-5 w-5" />
                info@example.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhoneAlt className="mr-3 h-5 w-5" />+ 01 234 567 88
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaFax className="mr-3 h-5 w-5" />+ 01 234 567 89
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                HARİTA
              </h6>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12041.761721925712!2d28.8781237!3d41.0156193!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb23961a6619%3A0x705d040df2742230!2sKale%20Outlet%20Center!5e0!3m2!1str!2str!4v1708195503790!5m2!1str!2str"
                width={250}
                height={175}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/*Copyright section*/}
        <div className="bg-neutral-200 p-6 text-center">
          <span>© 2024 Copyright:</span>
          <Link
            href="https://www.linkedin.com/in/vahdet-altunda%C5%9F-2ab8b1234/"
            className="font-semibold text-neutral-600"
          >
            Vahdet Altundaş
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
