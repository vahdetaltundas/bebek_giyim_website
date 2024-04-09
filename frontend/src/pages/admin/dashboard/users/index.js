import {
  deleteItem,
  fetchUsers,
  userActivatedStatus,
} from "@/pages/api/hello";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const handleDelete = async (id) => {
    const token = Cookies.get("adminToken");
    try {
      await deleteItem("users", id, token);
      toast.success("Ürününüz silindi");
      getUsers();
    } catch (error) {
      console.log(error);
      toast.error("Ürününüz silinemedi!");
    }
  };
  const getUsers = async () => {
    const token = Cookies.get("adminToken");
    try {
      const response = await fetchUsers(token);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const userActivation = async (url, id, text) => {
    const token = Cookies.get("adminToken");
    try {
      const response = await userActivatedStatus(url, id, token);
      getUsers();
      toast.success(text);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="mx-auto max-w-full px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Kullanıcılar Listesi</h2>
          <span className="text-xs text-gray-500">
          Kayıtlı kullanıcıların hesaplarını görüntüleyin
          </span>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">İsim Soyisim</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">TelefonNo</th>
                <th className="px-5 py-3">Aktivasyon Durumu</th>
                <th className="px-5 py-3">Hesabı Onayla</th>
                <th className="px-5 py-3">Kullanıcıyı Sil</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.id}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <p className="whitespace-no-wrap">{user.full_name}</p>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.email}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{user.phone_number}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    {user.activation ? (
                      <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                        Hesap Onaylandı
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
                        Hesap Onay Bekliyor
                      </span>
                    )}
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    {!user.activation ? (
                      <button
                        onClick={() =>
                          userActivation(
                            "userActivated",
                            user.id,
                            "Kullanıcı Hesabı Onaylandı"
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2  border rounded-full"
                      >
                        Onayla
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          userActivation("userActivatedRemove", user.id,"Kullanıcı Hesabı Onayı Kalktı")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2  border rounded-full"
                      >
                        Onay Kaldır
                      </button>
                    )}
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full"
                      >
                        Kullanıcıyı Sil
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
