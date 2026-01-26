import React, { useState } from "react";

const ManageContests = () => {
  // Dummy contest data (replace with backend API fetch)
  const [contests, setContests] = useState([
    {
      id: 1,
      title: "Logo Design Challenge",
      creator: "Alice Johnson",
      status: "Pending",
    },
    {
      id: 2,
      title: "Business Idea Pitch",
      creator: "Bob Smith",
      status: "Pending",
    },
    {
      id: 3,
      title: "Gaming Review Contest",
      creator: "Charlie Brown",
      status: "Approved",
    },
    {
      id: 4,
      title: "Art Illustration Contest",
      creator: "Diana Prince",
      status: "Rejected",
    },
    {
      id: 5,
      title: "Essay Writing Contest",
      creator: "Ethan Hunt",
      status: "Pending",
    },
  ]);

  // Action handlers
  const handleAction = (contestId, action) => {
    setContests((prevContests) =>
      prevContests.map((contest) =>
        contest.id === contestId
          ? {
              ...contest,
              status:
                action === "confirm"
                  ? "Approved"
                  : action === "reject"
                    ? "Rejected"
                    : contest.status,
            }
          : contest,
      ),
    );

    // TODO: Connect with backend API for Confirm / Reject / Delete actions
    console.log(`Contest ID ${contestId} action: ${action}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Manage Contests
      </h2>

      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full border-collapse bg-white dark:bg-slate-800 shadow rounded-xl overflow-hidden table-fixed">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="text-left w-10 p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                #
              </th>
              <th className="text-left w-1/3 p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                Title
              </th>
              <th className="text-left w-1/4 p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                Creator
              </th>
              <th className="text-left w-20 p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                Status
              </th>
              <th className="text-left w-1/4 p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={contest.id}
                className={`border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700 transition`}
              >
                <td className="p-4 text-gray-700 dark:text-gray-200">
                  {index + 1}
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-200">
                  {contest.title}
                </td>
                <td className="p-4 text-gray-700 dark:text-gray-200">
                  {contest.creator}
                </td>
                <td
                  className={`p-4 font-semibold ${
                    contest.status === "Approved"
                      ? "text-green-600 dark:text-green-400"
                      : contest.status === "Rejected"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {contest.status}
                </td>
                <td className="p-4 flex flex-wrap gap-2 justify-start sm:justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
                    onClick={() => handleAction(contest.id, "confirm")}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                    onClick={() => handleAction(contest.id, "reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                    onClick={() => handleAction(contest.id, "delete")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="sm:hidden mt-6 space-y-4">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                {contest.title}
              </h3>
              <span
                className={`font-semibold ${
                  contest.status === "Approved"
                    ? "text-green-600 dark:text-green-400"
                    : contest.status === "Rejected"
                      ? "text-red-600 dark:text-red-400"
                      : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {contest.status}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-2">
              Creator: {contest.creator}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
                onClick={() => handleAction(contest.id, "confirm")}
              >
                Confirm
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                onClick={() => handleAction(contest.id, "reject")}
              >
                Reject
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                onClick={() => handleAction(contest.id, "delete")}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContests;
