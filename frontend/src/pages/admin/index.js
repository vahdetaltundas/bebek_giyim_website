import ErrorMessage from '@/components/errorMessage/ErrorMessage';
import { loginInitialValues, loginValidationSchema } from '@/validations/loginValidation';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react'
import { FaBaby } from 'react-icons/fa'
import { toast } from 'react-toastify';

const Index = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/adminLogin`,
          {
            email: values.email,
            password: values.password,
          }
        );
        console.log(response);
        const token = response.data.token;
        document.cookie = `adminToken=${token}; path=/`;
        toast.success(response.data.message);
        router.push("/admin/dashboard");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <section
      className="bg-gray-50 p-10"
      style={{
        backgroundImage: `url('/images/resim.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:max-h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <FaBaby className="w-8 h-8 mr-2" />
          Admin Giriş
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Hesabınıza Giriş Yapın
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <ErrorMessage errorMessage={formik.errors.password} />
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies({ req });
  const token = cookies.adminToken || null;

  try {
    const loginCheck = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logincheck`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(loginCheck.data.data.loginCheck){
      return {
        redirect: {
          destination: "/admin/dashboard",
          permanent: false,
        },
    };
    }else{
      return {
        props:{}
      };
    }
    
  } catch (error) {
    return {
      props:{}
    };
  }
}

export default Index;
