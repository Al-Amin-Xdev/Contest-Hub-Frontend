import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [contests, setContests] = useState([]);

  const userEmail = user?.email;

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axiosSecure.get("/all-contests");
        const allContests = response.data;

        const myContests = allContests.filter(
          (contest) => contest.creatorEmail === userEmail
        );

        setContests(myContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    if (userEmail) fetchContests();
  }, [axiosSecure, userEmail]);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
        My Created Contests
      </h1>

      {contests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest) => (
            <div
              key={contest._id || contest.id}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow ${
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

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Name & Type */}
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {contest.name}
                  </h2>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-700/30 px-2 py-1 rounded-full">
                    {contest.contestType || contest.type}
                  </span>
                </div>

                {/* Details */}
                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-2 mb-3">
                  <p>
                    <span className="font-semibold">Entry Price:</span> ${contest.price}
                  </p>
                  <p>
                    <span className="font-semibold">Prize:</span> ${contest.prize}
                  </p>
                  <p>
                    <span className="font-semibold">Deadline:</span>{" "}
                    {new Date(contest.deadline).toLocaleString()}
                  </p>
                  <p className="line-clamp-3">
                    <span className="font-semibold">Task:</span>{" "}
                    {contest.taskInstruction || contest.task}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    Created by You
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    ID: {contest._id?.slice(-6)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-20 text-lg">
          You haven't created any contests yet.
        </p>
      )}
    </div>
  );
};

export default MyContests;
