import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaMailBulk,
  FaWhatsapp,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-100 text-center text-neutral-600 lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Baby Corner Bebek Giyim Toptan Sitemize Hoş Geldiniz:</span>
          </div>
          <div className="flex justify-center">
            <a href={`https://wa.me/+905400303461`} target="_blank" rel="noopener noreferrer" >
              <FaWhatsapp className="w-5 h-5 mr-6 hover:text-green-800" />
            </a>

            <a href="https://www.instagram.com/babycorner_tr/">
              <FaInstagram className="w-5 h-5 mr-6" />
            </a>
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
                <FaHome className="mr-3 h-5 w-9" />
                Sururi Mahallesi Hocahanı sokak Ambarcı iş Merkezi No:19 iç Kapı
                No:2 Fatih/İSTANBUL
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaMailBulk className="mr-3 h-5 w-5" />
                bilgi.babycorner@gmal.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhoneAlt className="mr-3 h-5 w-5" />
                0540 030 34 61
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                HARİTA
              </h6>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5149785317362!2d28.971774300000003!3d41.013988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab994c7871d5b%3A0x9ee92727f1f534b4!2sSururi%2C%20Hocahan%C4%B1%20Sok.%20No%3A19%2C%2034120%20Fatih%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1712942958480!5m2!1str!2str"
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
