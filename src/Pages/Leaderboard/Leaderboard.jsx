import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("creators");
  const [topCreators, setTopCreators] = useState([]);
  const [topContests, setTopContests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch leaderboard data
  // ==========================
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const [usersRes, contestsRes] = await Promise.all([
          axiosSecure.get("/user-roles"),
          axiosSecure.get("/all-contests"),
        ]);

        const users = usersRes.data;
        const contests = contestsRes.data;

        // ==========================
        // Top Creators (by contest count)
        // ==========================
        const creatorMap = {};

        contests.forEach((contest) => {
          const email = contest.creatorEmail;
          if (!creatorMap[email]) {
            creatorMap[email] = {
              name: contest.name || "Unknown",
              email,
              photo:
                contest.creatorPhoto ||
                `https://ui-avatars.com/api/?name=${email}`,
              totalContests: 0,
            };
          }
          creatorMap[email].totalContests += 1;
        });

        const sortedCreators = Object.values(creatorMap).sort(
          (a, b) => b.totalContests - a.totalContests
        );

        // ==========================
        // Top Contests (by participants)
        // ==========================
        const sortedContests = contests
          .map((contest) => ({
            _id: contest._id,
            name: contest.name,
            creatorEmail: contest.creatorEmail,
            participants: contest.participantCount || 0,
          }))
          .sort((a, b) => b.participants - a.participants);

        setTopCreators(sortedCreators);
        setTopContests(sortedContests);
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
        🏆 Leaderboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("creators")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "creators"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Top Creators
        </button>

        <button
          onClick={() => setActiveTab("contests")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "contests"
              ? "bg-purple-600 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Top Contests
        </button>
      </div>

      {/* ==========================
          Top Creators
         ========================== */}
      {activeTab === "creators" && (
        <div className="max-w-5xl mx-auto grid gap-4">
          {topCreators.map((creator, index) => (
            <div
              key={creator.email}
              className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow"
            >
              <span className="text-xl font-bold w-8">{index + 1}</span>

              <img
                src={creator.photo}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {creator.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {creator.email}
                </p>
              </div>

              <span className="font-bold text-blue-600">
                {creator.totalContests} Contests
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ==========================
          Top Contests
         ========================== */}
      {activeTab === "contests" && (
        <div className="max-w-5xl mx-auto grid gap-4">
          {topContests.map((contest, index) => (
            <div
              key={contest._id}
              className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow"
            >
              <span className="text-xl font-bold w-8">{index + 1}</span>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {contest.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creator: {contest.creatorEmail}
                </p>
              </div>

              <span className="font-bold text-purple-600">
                {contest.participants} Participants
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
