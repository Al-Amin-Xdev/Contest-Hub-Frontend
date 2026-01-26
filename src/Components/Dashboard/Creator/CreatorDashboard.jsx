import React, { useState } from "react";
import { FaPlus, FaClipboardList, FaTrophy } from "react-icons/fa";

import AddContest from "./AddContest";
import MyContests from "./MyContests";
import Submissions from "./Submissions";
import EditContest from "./EditContest";

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("addContest");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-lg overflow-hidden">

        {/* Tabs */}
        <div className="flex justify-center sm:justify-start gap-4 bg-gray-100 dark:bg-slate-700 p-4 flex-wrap">
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
          {activeTab === "addContest" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <AddContest />
            </div>
          )}

          {activeTab === "myContests" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <MyContests />
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <Submissions />
            </div>
          )}

          {activeTab === "editContest" && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <EditContest />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CreatorDashboard;
