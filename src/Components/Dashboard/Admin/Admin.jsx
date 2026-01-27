import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import AuthContext from "../../../providers/AuthContext";
import Loading from "../../Shared-Components/Loader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";

const PIE_COLORS = ["#22c55e", "#facc15", "#ef4444"];

const Admin = () => {
  const { user: currentUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [adminData, setAdminData] = useState(null);
  const [usersCount, setUsersCount] = useState(0);
  const [activeAdmins, setActiveAdmins] = useState(0);
  const [contestStats, setContestStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchAll = async () => {
      try {
        setLoading(true);

        // Admin info
        const adminRes = await axiosSecure.get(`/user-role/${currentUser.uid}`);
        setAdminData(adminRes.data);

        // Users
        const usersRes = await axiosSecure.get("/user-roles");
        setUsersCount(usersRes.data.length);

        // Active admins
        const admins = usersRes.data.filter(
          (u) => u.role?.toLowerCase() === "admin",
        );
        setActiveAdmins(admins.length);

        // Contests
        const contestsRes = await axiosSecure.get("/all-contests");

        const confirmed = contestsRes.data.filter(
          (c) => c.status === "confirmed",
        ).length;
        const pending = contestsRes.data.filter(
          (c) => c.status === "pending",
        ).length;
        const rejected = contestsRes.data.filter(
          (c) => c.status === "rejected",
        ).length;

        setContestStats([
          { name: "Confirmed", value: confirmed },
          { name: "Pending", value: pending },
          { name: "Rejected", value: rejected },
        ]);
      } catch (err) {
        Swal.fire("Error", "Failed to load admin dashboard", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [currentUser?.uid, axiosSecure]);

  // ================= EDIT PROFILE =================
  const handleEditProfile = async () => {
    const { value } = await Swal.fire({
      title: "Edit Admin Profile",
      html: `
        <input id="name" class="swal2-input" value="${adminData?.name || ""}">
        <input id="photo" class="swal2-input" value="${adminData?.photoURL || ""}">
      `,
      showCancelButton: true,
      preConfirm: () => ({
        name: document.getElementById("name").value,
        photoURL: document.getElementById("photo").value,
      }),
    });

    if (!value) return;

    await axiosSecure.post("/user-role", {
      uid: currentUser.uid,
      name: value.name,
      email: adminData.email,
      photoURL: value.photoURL,
      role: "Admin",
    });

    setAdminData((p) => ({ ...p, ...value }));
    Swal.fire("Updated", "Profile updated successfully", "success");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 flex items-center gap-6">
          <img
            src={adminData?.photoURL}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-white flex gap-3">
              {adminData?.name}
              <FaEdit onClick={handleEditProfile} className="cursor-pointer" />
            </h2>
            <p className="text-white/90 break-all sm:break-words max-w-full">
              {adminData?.email}
            </p>

            <p className="text-white font-semibold mt-1">Admin</p>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {/* TOTAL USERS - BAR CHART */}
          <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-6 shadow">
            <h3 className="text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Total Users
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[{ name: "Users", value: usersCount }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ACTIVE ADMINS - RADIAL */}
          <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-6 shadow flex flex-col items-center justify-center">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Active Admins
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={[{ name: "Admins", value: activeAdmins }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" fill="#22c55e" cornerRadius={10} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>

            <p className="text-2xl font-bold text-green-600 mt-2">
              {activeAdmins}
            </p>
          </div>
          {/* CONTEST STATUS - PIE */}
          <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl p-6 shadow">
            <h3 className="text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Contest Status
            </h3>

            {/* Pie Chart Container */}
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={contestStats}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {contestStats.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                {/* No Legend inside chart */}
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend with Counts */}
            <div className="flex justify-center gap-6 mt-4 flex-wrap">
              {contestStats.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
