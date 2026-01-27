// import React, { useState, useEffect, useContext } from "react";
// import { FaEdit } from "react-icons/fa";
// import Swal from "sweetalert2";

// import AuthContext from "../../../providers/AuthContext";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const Creator= () => {
//   const { user: currentUser } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [roleRequest, setRoleRequest] = useState(null); // store current request if exists

//   // Fetch creator info & existing role request
//   useEffect(() => {
//     if (!currentUser?.uid) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // fetch user role
//         const { data: user } = await axiosSecure.get(`/user-role/${currentUser.uid}`);
//         setUserData(user);

//         // fetch any pending role request
//         const { data: request } = await axiosSecure.get(`/role-requests/${currentUser.uid}`);
//         if (request?.status === "pending") {
//           setRoleRequest(request);
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load data",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentUser?.uid, axiosSecure]);

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
//         await axiosSecure.post("/user-role", {
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

//   // Request Role Change
//   const handleRequestRoleChange = async () => {
//     if (roleRequest) {
//       Swal.fire({
//         icon: "info",
//         title: "Pending Request",
//         text: `You already have a pending request to become "${roleRequest.requestedRole}".`,
//       });
//       return;
//     }

//     const { value: requestedRole } = await Swal.fire({
//       title: "Request Role Change",
//       input: "select",
//       inputOptions: {
//         user: "User",
//         admin: "Admin",
//       },
//       inputPlaceholder: "Select a role",
//       showCancelButton: true,
//     });

//     if (!requestedRole || requestedRole === userData.role) return;

//     const { value: reason } = await Swal.fire({
//       title: "Reason for Role Change",
//       input: "textarea",
//       inputPlaceholder: "Why do you want this role?",
//       showCancelButton: true,
//       inputValidator: (value) => {
//         if (!value) return "Reason is required!";
//       },
//     });

//     if (!reason) return;

//     try {
//       const { data: request } = await axiosSecure.post("/role-requests", {
//         uid: currentUser.uid,
//         name: userData.name,
//         email: userData.email,
//         photoURL: userData.photoURL,
//         currentRole: userData.role,
//         requestedRole,
//         reason,
//         status: "pending",
//         requestedAt: new Date(),
//         reviewedAt: null,
//         reviewedBy: null,
//       });

//       setRoleRequest(request);

//       Swal.fire({
//         icon: "success",
//         title: "Request Submitted ✅",
//         text: "Your role request has been sent to admin for approval.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Role Request Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Request Failed",
//         text: error.message,
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-300">
//         Loading Profile...
//       </div>
//     );
//   }

//   return (
//      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">

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

//             {/* Role Badge */}
//             <p className="mt-2 text-sm sm:text-base font-semibold bg-white dark:bg-slate-700 inline-block px-3 py-1 rounded-full shadow">
//               Role: <span className="text-blue-500">{userData?.role}</span>
//             </p>

//             {/* Role Request Section */}
//             <div className="mt-4 flex flex-col gap-2">
//               {roleRequest ? (
//                 <p className="text-sm sm:text-base font-semibold bg-yellow-100 dark:bg-yellow-700 inline-block px-3 py-1 rounded-full shadow">
//                   Your role request to <strong>{roleRequest.requestedRole}</strong> is currently <strong>{roleRequest.status}</strong>.
//                 </p>
//               ) : (
//                 <button
//                   onClick={handleRequestRoleChange}
//                   className="py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
//                 >
//                   Request Role Change
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Profile Info */}
//         <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-2">
//             <span className="font-semibold text-gray-700 dark:text-gray-200">Full Name</span>
//             <span className="text-gray-900 dark:text-gray-100">{userData?.name}</span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <span className="font-semibold text-gray-700 dark:text-gray-200">Email</span>
//             <span className="text-gray-900 dark:text-gray-100">{userData?.email}</span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <span className="font-semibold text-gray-700 dark:text-gray-200">Role</span>
//             <span className="text-gray-900 dark:text-gray-100">{userData?.role}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Creator;


// Version 1
//==============================================================================================================

// import React, { useState, useEffect, useContext } from "react";
// import { FaEdit } from "react-icons/fa";
// import Swal from "sweetalert2";

// import useAxios from "../../../Hooks/useAxios";
// import AuthContext from "../../../providers/AuthContext";

// const CreatorProfile = () => {
//   const { user: currentUser } = useContext(AuthContext);
//   const axios = useAxios();

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
//         Loading Profile...
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

//         {/* Profile Info */}
//         <div className="p-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div className="flex flex-col gap-2">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Full Name</span>
//               <span className="text-gray-900 dark:text-gray-100">{userData?.name}</span>
//             </div>
//             <div className="flex flex-col gap-2">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Email</span>
//               <span className="text-gray-900 dark:text-gray-100">{userData?.email}</span>
//             </div>
//             <div className="flex flex-col gap-2">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Role</span>
//               <span className="text-gray-900 dark:text-gray-100">{userData?.role}</span>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CreatorProfile;

//Version 2
//==============================================================================================================

import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AuthContext from "../../../providers/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreatorProfile = () => {
  const { user: currentUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
 
  const [userData, setUserData] = useState(null);
  const [roleRequest, setRoleRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch creator info
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure.get(`/user-role/${currentUser.uid}`);
        setUserData(data);

        // Fetch pending role request if any
        const { data: request } = await axiosSecure.get(`/role-requests/${currentUser.uid}`);
        setRoleRequest(request);
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
  }, [currentUser?.uid, axiosSecure]);

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
        await axiosSecure.post("/user-role", {
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

  // Role request
  const handleRoleRequest = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Request Role Change",
      html: `
        <select id="swal-role" class="swal2-input">
          <option value="" disabled selected>Select Role</option>
          <option value="Creator">Creator</option>
          <option value="Admin">Admin</option>
        </select>
        <textarea id="swal-reason" class="swal2-textarea" placeholder="Reason for role change"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Send Request",
      preConfirm: () => {
        const requestedRole = document.getElementById("swal-role").value;
        const reason = document.getElementById("swal-reason").value.trim();
        if (!requestedRole || !reason) {
          Swal.showValidationMessage("Role and reason are required");
        }
        return { requestedRole, reason };
      },
    });

    if (formValues) {
      try {
        const { data } = await axiosSecure.post("/role-requests", {
          uid: currentUser.uid,
          name: userData.name,
          email: userData.email,
          photoURL: userData.photoURL,
          currentRole: userData.role,
          requestedRole: formValues.requestedRole,
          reason: formValues.reason,
        });

        setRoleRequest(data);

        Swal.fire({
          icon: "success",
          title: "Request Sent ✅",
          text: `Your request to become a ${formValues.requestedRole} has been submitted`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Role Request Error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error.response?.data?.message || error.message,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-300">
        Loading Profile...
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

            {/* Role Request Section */}
            {roleRequest ? (
              <p className="mt-3 text-sm text-yellow-400">
                Your role request to <strong>{roleRequest.requestedRole}</strong> is currently <strong>{roleRequest.status}</strong>.
              </p>
            ) : (
              <button
                className="mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
                onClick={handleRoleRequest}
              >
                Request Role Change
              </button>
            )}

          </div>
        </div>

        {/* Profile Info */}
        <div className="p-8">
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
        </div>

      </div>
    </div>
  );
};

export default CreatorProfile;

