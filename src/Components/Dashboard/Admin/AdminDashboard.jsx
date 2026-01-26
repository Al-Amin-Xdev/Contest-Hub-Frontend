import React, { useState } from "react";
import { FaUsers, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <span className="text-md opacity-90">Welcome, Admin</span>
      </header>

      {/* Tabs */}
      <div className="flex justify-center sm:justify-start gap-4 bg-white dark:bg-slate-800 p-4 shadow-sm flex-wrap">
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
            ${activeTab === "users"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            }`}
        >
          <FaUsers /> Manage Users
        </button>
        <button
          onClick={() => setActiveTab("contests")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition
            ${activeTab === "contests"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            }`}
        >
          <FaClipboardList /> Manage Contests
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "users" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Users Management
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
              {/* User Table Placeholder */}
              <p className="text-gray-500 dark:text-gray-300 text-center py-10">
                User Table Goes Here 🧑‍💻
              </p>
            </div>
          </div>
        )}

        {activeTab === "contests" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Contests Management
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
              {/* Contests Table Placeholder */}
              <p className="text-gray-500 dark:text-gray-300 text-center py-10">
                Contests Table Goes Here 🏆
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
