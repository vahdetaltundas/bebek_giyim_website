import "@/styles/globals.css";
import BaseLayout from "../components/layout/BaseLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import AdminLayout from "@/components/adminLayout/AdminLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const currentPagePath = router.pathname;
  if (currentPagePath.startsWith("/admin/dashboard")) {
    return (
      <AdminLayout>
        <ToastContainer />
        <Component {...pageProps} />
      </AdminLayout>
    );
  }
  return (
    <BaseLayout>
      <ToastContainer />
      <Component {...pageProps} />
    </BaseLayout>
  );
}
