// import React, { useState, useEffect, useContext } from "react";
// import { FaUser, FaPlus, FaClipboardList, FaTrophy, FaEdit } from "react-icons/fa";
// import Swal from "sweetalert2";

// import useAxios from "../../../Hooks/useAxios";
// import AuthContext from "../../../providers/AuthContext";

// const Creator = () => {
//   const { user: currentUser } = useContext(AuthContext);
//   const axios = useAxios();

//   const [activeTab, setActiveTab] = useState("profile");
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch creator info
//   useEffect(() => {
//     if (!currentUser?.uid) return;

//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`/user-role/${currentUser.uid}`);
//         setUserData(data);
//       } catch (error) {
//         console.error("Fetch Creator Error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load creator data",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [currentUser?.uid, axios]);

//   // Edit Profile
//   const handleUpdateProfile = async () => {
//     const { value: formValues } = await Swal.fire({
//       title: "Update Profile",
//       html: `
//         <input id="swal-name" class="swal2-input" placeholder="Full Name" value="${userData?.name || ''}">
//         <input id="swal-photo" class="swal2-input" placeholder="Photo URL" value="${userData?.photoURL || ''}">
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       preConfirm: () => {
//         const name = document.getElementById("swal-name").value.trim();
//         const photoURL = document.getElementById("swal-photo").value.trim();
//         if (!name || !photoURL) {
//           Swal.showValidationMessage("Name and Photo URL are required");
//         }
//         return { name, photoURL };
//       },
//     });

//     if (formValues) {
//       try {
//         await axios.post("/user-role", {
//           uid: currentUser.uid,
//           name: formValues.name,
//           photoURL: formValues.photoURL,
//           email: userData.email,
//           role: userData.role,
//         });

//         setUserData((prev) => ({
//           ...prev,
//           name: formValues.name,
//           photoURL: formValues.photoURL,
//         }));

//         Swal.fire({
//           icon: "success",
//           title: "Profile Updated ✅",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         console.error("Update Error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Update Failed",
//           text: error.message,
//         });
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-300">
//         Loading Creator Profile...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">

//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 flex flex-col sm:flex-row items-center gap-6">
//           <img
//             src={userData?.photoURL || "https://via.placeholder.com/150"}
//             alt={userData?.name}
//             className="w-28 h-28 rounded-full border-4 border-white object-cover"
//           />
//           <div className="text-center sm:text-left flex-1">
//             <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
//               {userData?.name}
//               <FaEdit
//                 className="cursor-pointer text-white hover:text-gray-200"
//                 onClick={handleUpdateProfile}
//                 title="Edit Profile"
//               />
//             </h2>
//             <p className="text-sm sm:text-base opacity-90">{userData?.email}</p>
//             <p className="mt-1 text-xs opacity-80">Role: {userData?.role}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center sm:justify-start gap-4 bg-gray-100 dark:bg-slate-700 p-4 flex-wrap">
//           <button
//             onClick={() => setActiveTab("profile")}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
//               ${activeTab === "profile"
//                 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                 : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
//               }`}
//           >
//             <FaUser /> Profile
//           </button>
//           <button
//             onClick={() => setActiveTab("add")}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
//               ${activeTab === "add"
//                 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                 : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
//               }`}
//           >
//             <FaPlus /> Add Contest
//           </button>
//           <button
//             onClick={() => setActiveTab("myContests")}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
//               ${activeTab === "myContests"
//                 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                 : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
//               }`}
//           >
//             <FaClipboardList /> My Contests
//           </button>
//           <button
//             onClick={() => setActiveTab("submissions")}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
//               ${activeTab === "submissions"
//                 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                 : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
//               }`}
//           >
//             <FaClipboardList /> Submissions
//           </button>
//           <button
//             onClick={() => setActiveTab("edit")}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
//               ${activeTab === "edit"
//                 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                 : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
//               }`}
//           >
//             <FaTrophy /> Edit Contest
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="p-8 min-h-[300px]">
//           {activeTab === "profile" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="flex flex-col gap-2">
//                 <span className="font-semibold text-gray-700 dark:text-gray-200">Full Name</span>
//                 <span className="text-gray-900 dark:text-gray-100">{userData?.name}</span>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <span className="font-semibold text-gray-700 dark:text-gray-200">Email</span>
//                 <span className="text-gray-900 dark:text-gray-100">{userData?.email}</span>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <span className="font-semibold text-gray-700 dark:text-gray-200">Role</span>
//                 <span className="text-gray-900 dark:text-gray-100">{userData?.role}</span>
//               </div>
//             </div>
//           )}

//           {activeTab === "add" && (
//             <div className="text-center text-gray-600 dark:text-gray-300">
//               {/* Add Contest Component goes here */}
//               <p>Add Contest Component Placeholder 🚀</p>
//             </div>
//           )}

//           {activeTab === "myContests" && (
//             <div className="text-center text-gray-600 dark:text-gray-300">
//               {/* My Created Contests Component goes here */}
//               <p>My Contests Component Placeholder 📋</p>
//             </div>
//           )}

//           {activeTab === "submissions" && (
//             <div className="text-center text-gray-600 dark:text-gray-300">
//               {/* Submitted Tasks Component goes here */}
//               <p>Submissions Component Placeholder 📝</p>
//             </div>
//           )}

//           {activeTab === "edit" && (
//             <div className="text-center text-gray-600 dark:text-gray-300">
//               {/* Edit Contest Component goes here */}
//               <p>Edit Contest Component Placeholder ✏️</p>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Creator;


import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaPlus, FaClipboardList, FaTrophy, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxios from "../../../Hooks/useAxios";
import AuthContext from "../../../providers/AuthContext";
import AddContest from "./AddContest";
import MyContests from "./MyContests";
import Submissions from "./Submissions";
import EditContest from "./EditContest";

const Creator = () => {
  const { user: currentUser } = useContext(AuthContext);
  const axios = useAxios();

  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch creator info
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user-role/${currentUser.uid}`);
        setUserData(data);
      } catch (error) {
        console.error("Fetch Creator Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load creator data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser?.uid, axios]);

  // Edit Profile
  const handleUpdateProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Update Profile",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Full Name" value="${userData?.name || ''}">
        <input id="swal-photo" class="swal2-input" placeholder="Photo URL" value="${userData?.photoURL || ''}">
      `,
      focusConfirm: false,
      showCancelButton: true,
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
          email: userData.email,
          role: userData.role,
        });

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
        Loading Creator Profile...
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
            <p className="mt-1 text-xs opacity-80">Role: {userData?.role}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center sm:justify-start gap-4 bg-gray-100 dark:bg-slate-700 p-4 flex-wrap">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "profile"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaUser /> Profile
          </button>
          <button
            onClick={() => setActiveTab("addContest")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "addContest"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaPlus /> Add Contest
          </button>
          <button
            onClick={() => setActiveTab("myContests")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "myContests"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaClipboardList /> My Contests
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "submissions"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaClipboardList /> Submissions
          </button>
          <button
            onClick={() => setActiveTab("editContest")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
              ${activeTab === "editContest"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
          >
            <FaTrophy /> Edit Contest
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 min-h-[300px]">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Full Name</span>
                <span className="text-gray-900 dark:text-gray-100">{userData?.name}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Email</span>
                <span className="text-gray-900 dark:text-gray-100">{userData?.email}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">Role</span>
                <span className="text-gray-900 dark:text-gray-100">{userData?.role}</span>
              </div>
            </div>
          )}

          {activeTab === "addContest" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              {/* Insert Add Contest Component here */}
              <AddContest></AddContest>
            </div>
          )}

          {activeTab === "myContests" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              {/* Insert My Created Contests Component here */}
              <MyContests></MyContests>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              {/* Insert Submitted Tasks Component here */}
              <Submissions></Submissions>
            </div>
          )}

          {activeTab === "editContest" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              {/* Insert Edit Contest Component here */}
              <EditContest></EditContest>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Creator;
