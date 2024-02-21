import "@/styles/globals.css";
import BaseLayout from "../components/layout/BaseLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <BaseLayout >
        <ToastContainer />
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
}
