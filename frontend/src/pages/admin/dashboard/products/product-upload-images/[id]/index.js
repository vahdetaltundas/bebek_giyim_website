import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const router = useRouter();
  const { id } = router.query;
  const handleFileChange = (event, index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = event.target.files[0];
    setSelectedFiles(newSelectedFiles);
  };

  const handleUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      if (file) {
        formData.append(`images`, file);
      }
    });

    // Yetkilendirme tokeni
    const token = Cookies.get("adminToken");

    // API isteği için başlık oluştur
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/upload/${id}`, formData, config)
      .then((response) => {
        router.push("/admin/dashboard/products");
        toast.success("Resimler Başarıyla Yüklendi");
      })
      .catch((error) => {
        toast.error("Resimler Yüklerken Hata Oluştu")
        console.error("Error uploading files:", error);
      });
  };

  return (
    <div>
      {[0, 1, 2].map((index) => (
        <div key={index} className="border mb-2  ">
          
          
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none"
              onChange={(e) => handleFileChange(e, index)}
              accept=".jpeg, .jpg, .png, .gif"
            />
          </label>
        </div>
      ))}
      <button className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleUpload}>Resimleri Yükle</button>
    </div>
  );
};
export async function getServerSideProps({ req, params }) {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }
}
export default UploadImages;
