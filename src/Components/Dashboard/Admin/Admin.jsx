import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxios from "../../../Hooks/useAxios";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Shared-Components/Loader";

const Admin= () => {
  const { user: currentUser } = useContext(AuthContext);
  const axios = useAxios();

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin info
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user-role/${currentUser.uid}`);
        setAdminData(data);
      } catch (error) {
        console.error("Fetch Admin Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load admin data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [currentUser?.uid, axios]);

  // Edit Admin Profile
  const handleEditProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Admin Profile",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Full Name" value="${adminData?.name || ''}">
        <input id="swal-photo" class="swal2-input" placeholder="Photo URL" value="${adminData?.photoURL || ''}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value.trim();
        const photoURL = document.getElementById("swal-photo").value.trim();

        if (!name || !photoURL) {
          Swal.showValidationMessage("All fields are required");
        }
        return { name, photoURL };
      },
    });

    if (formValues) {
      try {
        await axios.post("/user-role", {
          uid: currentUser.uid,
          name: formValues.name,
          email: formValues.email,
          photoURL: formValues.photoURL,
          role: "Admin",
        });

        setAdminData((prev) => ({
          ...prev,
          name: formValues.name,
          email: formValues.email,
          photoURL: formValues.photoURL,
        }));

        Swal.fire({
          icon: "success",
          title: "Profile Updated ✅",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Update Error:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error.message,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-300">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={adminData?.photoURL || "https://via.placeholder.com/150"}
            alt={adminData?.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-3">
              {adminData?.name}
              <FaEdit
                className="cursor-pointer hover:text-gray-200"
                onClick={handleEditProfile}
                title="Edit Profile"
              />
            </h2>
            <p className="text-white/90 mt-1">{adminData?.email}</p>
            <p className="text-white/80 mt-2 text-lg font-bold">Admin</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-4 text-center shadow hover:scale-105 transform transition">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">123</p>
          </div>
          <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-4 text-center shadow hover:scale-105 transform transition">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Contests</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">45</p>
          </div>
          <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-4 text-center shadow hover:scale-105 transform transition">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Active Admins</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
