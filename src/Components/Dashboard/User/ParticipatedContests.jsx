// import React from 'react';

// const ParticipatedContests = () => {
//     return (
//         <div>
//             <h1>Participated Contests</h1>
//         </div>
//     );
// };

// export default ParticipatedContests;

import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ParticipatedContests = () => {
  // Dummy data: replace this with backend data later
  const participatedContests = [
    {
      id: 1,
      name: "Logo Design Challenge",
      image: "https://via.placeholder.com/400x250",
      paymentStatus: "Paid",
      deadline: "2026-02-10",
      description:
        "Create a unique and modern logo for our upcoming tech event...",
    },
    {
      id: 2,
      name: "Article Writing Contest",
      image: "https://via.placeholder.com/400x250",
      paymentStatus: "Pending",
      deadline: "2026-02-15",
      description:
        "Write an engaging article about sustainability in technology...",
    },
    {
      id: 3,
      name: "Mobile App UI/UX Design",
      image: "https://via.placeholder.com/400x250",
      paymentStatus: "Paid",
      deadline: "2026-03-01",
      description:
        "Design a modern mobile app UI/UX for a social networking platform...",
    },
    {
      id: 4,
      name: "Gaming Review Contest",
      image: "https://via.placeholder.com/400x250",
      paymentStatus: "Paid",
      deadline: "2026-03-10",
      description:
        "Review the latest trending games and submit your insights...",
    },
    {
      id: 5,
      name: "Business Idea Pitch",
      image: "https://via.placeholder.com/400x250",
      paymentStatus: "Pending",
      deadline: "2026-03-15",
      description:
        "Submit your innovative business idea with a short presentation...",
    },
  ];

  // Sort by upcoming deadline
  const sortedContests = participatedContests.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          My Participated Contests
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContests.map((contest) => (
            <div
              key={contest.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {contest.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                    {contest.description.length > 60
                      ? contest.description.slice(0, 60) + "..."
                      : contest.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {contest.paymentStatus === "Paid" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {contest.paymentStatus}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Deadline: {contest.deadline}
                  </span>
                </div>
                <button
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
                  onClick={() => alert("Navigate to contest details page")}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => alert("Navigate to All Contests page")}
          >
            Show All Contests
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipatedContests;
