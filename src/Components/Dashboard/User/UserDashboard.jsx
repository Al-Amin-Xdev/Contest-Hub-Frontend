import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaClipboardList, FaTrophy, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import AuthContext from "../../../providers/AuthContext";
import ParticipatedContests from "./ParticipatedContests";
import WinningContests from "./WinningContests";
import Loading from "../../Shared-Components/Loader";

const UserDashboard = () => {
  const { user: currentUser } = useContext(AuthContext);
  const axios = useAxios();

  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user-role/${currentUser.uid}`);
        setUserData(data);
      } catch (error) {
        console.error("Fetch User Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load user data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser?.uid, axios]);

  // Handle profile update using POST /user-role API
  const handleUpdateProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update Profile",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Full Name" value="${userData?.name || ''}">
        <input id="swal-photo" class="swal2-input" placeholder="Photo URL" value="${userData?.photoURL || ''}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const name = document.getElementById("swal-name").value.trim();
        const photoURL = document.getElementById("swal-photo").value.trim();
        if (!name || !photoURL) {
          Swal.showValidationMessage("Name and Photo URL are required");
        }
        return { name, photoURL };
      },
    });

    if (formValues) {
      try {
        await axios.post("/user-role", {
          uid: currentUser.uid,
          name: formValues.name,
          photoURL: formValues.photoURL,
          email: userData.email, // keep existing email
          role: userData.role,   // keep role
        });

        // Update local state
        setUserData((prev) => ({
          ...prev,
          name: formValues.name,
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={userData?.photoURL || "https://via.placeholder.com/150"}
            alt={userData?.name}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              {userData?.name}
              <FaEdit
                className="cursor-pointer text-white hover:text-gray-200"
                onClick={handleUpdateProfile}
                title="Edit Profile"
              />
            </h2>
            <p className="text-sm sm:text-base opacity-90">{userData?.email}</p>
            <p className="mt-2 text-sm sm:text-base font-semibold bg-white dark:bg-slate-700 inline-block px-3 py-1 rounded-full shadow">
              Role: <span className="text-blue-500">{userData?.role}</span>
            </p>
          </div>
        </div>

        {/* 🔹 Banner */}
        <div className="text-center py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-t-3xl shadow-md mb-4">
          User Dashboard
        </div>

        {/* Tabs */}
        <div className="flex justify-center sm:justify-start gap-4 bg-gray-100 dark:bg-slate-700 p-4 rounded-b-3xl">
          <button
            onClick={() => setActiveTab("participated")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "participated"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaClipboardList /> Participated
          </button>
          <button
            onClick={() => setActiveTab("winning")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "winning"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaTrophy /> Winning
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "participated" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <ParticipatedContests />
            </div>
          )}

          {activeTab === "winning" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <WinningContests />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

