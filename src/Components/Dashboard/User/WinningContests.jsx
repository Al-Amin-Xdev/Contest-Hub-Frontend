// import React from 'react';

// const WinningContests = () => {
//     return (
//         <div>
//             <h1>Winning Contests</h1>
//         </div>
//     );
// };

// export default WinningContests;

import React, { useContext } from "react";
import { FaTrophy } from "react-icons/fa";
import AuthContext from "../../../providers/AuthContext";

const WinningContests = () => {
  const { user: currentUser } = useContext(AuthContext);

  // Dummy data for current user's winning contests (replace with backend fetch later)
  const winningContests = [
    {
      id: 1,
      name: "Logo Design Challenge",
      prize: "$200",
      date: "2026-02-10",
    },
    {
      id: 2,
      name: "Article Writing Contest",
      prize: "$150",
      date: "2026-02-15",
    },
    {
      id: 3,
      name: "Mobile App UI/UX Design",
      prize: "$300",
      date: "2026-03-01",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Contests You Won
        </h2>

        {winningContests.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            You haven't won any contests yet. Keep participating! 🎯
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {winningContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition"
              >
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {contest.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      Prize Won: <span className="font-medium">{contest.prize}</span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Contest Date: {contest.date}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-yellow-400 font-semibold">
                    <FaTrophy /> {currentUser?.displayName || "You"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
            onClick={() => alert("Navigate to all your winning contests page")}
          >
            Show All Winning Contests
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinningContests;
