import { FaBaby } from "react-icons/fa";
import Link from "next/link";
import { registerInitialValues, registerValidationSchema } from "@/validations/registerValidation";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "cookies";
import React from "react"; 

const Register = () => { 
  const router = useRouter();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const response=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,{
          email:values.email,
          password:values.password,
          fullName:values.fullName,
          companyName:values.companyName,
          phoneNumber:values.phoneNumber,
          address:values.address
        });
        toast.success(response.data.message);
        router.push("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <section
      className="bg-gray-50 pt-10 pb-28 "
      style={{
        backgroundImage: `url('/images/resim.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:max-h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <FaBaby className="w-8 h-8 mr-2" />
          Bebek Giyim
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Hesap Oluşturun
            </h1>
            <form className="space-y-4 md:space-y-5 " onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="companyName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Şirket Adı
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  placeholder="Şirket Adı"
                  required=""
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <ErrorMessage errorMessage={formik.errors.companyName} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Adınız Soyadınız"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  required=""
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <ErrorMessage errorMessage={formik.errors.fullName} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  E-posta adresiniz
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  placeholder="name@company.com"
                  required=""
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMessage errorMessage={formik.errors.email} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Telefon Numaranız
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  placeholder="Telefon Numaranız"
                  required=""
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <ErrorMessage errorMessage={formik.errors.phoneNumber} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  required=""
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <ErrorMessage errorMessage={formik.errors.password} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Adresiniz
                </label>
                <textarea
                  name="address"
                  placeholder="Adresiniz"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                  required=""
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.touched.address && formik.errors.address ? (
                  <ErrorMessage errorMessage={formik.errors.address} />
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Kayıt Ol
              </button>
              <p className="text-sm font-light text-gray-500">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Giriş Yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = new Cookies(req, null);
  const token = cookies.get("token");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logincheck`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data.data.loginCheck) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
}
export default Register; 
