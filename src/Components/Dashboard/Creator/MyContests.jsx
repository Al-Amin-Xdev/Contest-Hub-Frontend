// import React from 'react';

// const MyContests = () => {
//     return (
//         <div>
//             <h1>My Contests</h1>
//         </div>
//     );
// };

// export default MyContests;

import React, { useState } from "react";

// Sample contests
const sampleContests = [
  {
    id: "1",
    name: "Logo Design Challenge",
    status: "Pending",
    price: 20,
    prize: 100,
    deadline: "2026-02-10",
    task: "Design a logo for our brand",
    type: "Design",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: "2",
    name: "Business Plan Contest",
    status: "Pending",
    price: 50,
    prize: 500,
    deadline: "2026-03-01",
    task: "Write a detailed business plan",
    type: "Business",
    image: "https://via.placeholder.com/400x200",
  },
];

const MyContests = () => {
  const [contests, setContests] = useState(sampleContests);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Created Contests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests
          .filter((c) => c.status === "Pending")
          .map((contest) => (
            <div
              key={contest.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Contest Image */}
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex-1 flex flex-col">
                {/* Contest Name */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {contest.name}
                </h2>

                {/* Contest Type & Status */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-600/40 dark:text-blue-200 rounded-full">
                    {contest.type}
                  </span>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      contest.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-600/40 dark:text-yellow-200"
                        : contest.status === "Confirmed"
                        ? "bg-green-100 text-green-800 dark:bg-green-600/40 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-600/40 dark:text-red-200"
                    }`}
                  >
                    {contest.status}
                  </span>
                </div>

                {/* Contest Details */}
                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1 flex-1">
                  <p>
                    <span className="font-semibold">Price:</span> ${contest.price}
                  </p>
                  <p>
                    <span className="font-semibold">Prize:</span> ${contest.prize}
                  </p>
                  <p>
                    <span className="font-semibold">Deadline:</span> {contest.deadline}
                  </p>
                  <p>
                    <span className="font-semibold">Task:</span> {contest.task}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyContests;
