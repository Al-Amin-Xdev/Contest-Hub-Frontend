import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    confirmedContests: 0,
    totalPrize: 0,
    totalCreators: 0,
    totalParticipants: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1️⃣ Get all contests
        const contestsRes = await axiosSecure.get("/all-contests");
        const allContests = contestsRes.data || [];

        const confirmedContests = allContests.filter(
          (c) => c.status === "confirmed"
        );

        const totalPrize = confirmedContests.reduce(
          (sum, c) => sum + Number(c.prize || 0),
          0
        );

        // 2️⃣ Get all users (creators)
        const usersRes = await axiosSecure.get("/user-roles");
        const creators = usersRes.data || [];
        const totalCreators = creators.length;

        // 3️⃣ Get all participants across all contests
        let totalParticipants = 0;
        for (const contest of confirmedContests) {
          const participantsRes = await axiosSecure.get("/participants", {
            params: { contestId: contest._id, email: "" }, // fetch all participants
          });

          // If your backend only supports email query, you may need another endpoint
          // Here we assume backend returns `count` or `array of participants`
          if (participantsRes.data && Array.isArray(participantsRes.data)) {
            totalParticipants += participantsRes.data.length;
          }
        }

        setStats({
          confirmedContests: confirmedContests.length,
          totalPrize,
          totalCreators,
          totalParticipants,
        });
      } catch (err) {
        console.error("Failed to fetch banner stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (loading) {
    return (
      <section className="min-h-[400px] flex items-center justify-center text-white text-xl font-semibold">
        Loading banner stats...
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-800 text-white overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover & Create  
            <span className="block text-yellow-300 mt-2 sm:mt-3">
              Amazing Creative Contests
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-200 max-w-xl">
            Join exciting contests, showcase your talent, compete with creators
            worldwide, and win exciting prizes. Create your own contests and
            inspire creativity.
          </p>
        </div>

        {/* RIGHT CONTENT (STATS) */}
        <div className="relative w-full mt-8 lg:mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.confirmedContests}
              </h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Live Contests</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.totalPrize.toLocaleString()}<span>  USD</span>
              </h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Prize Money</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.totalCreators}
              </h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Creators</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">
                {stats.totalParticipants}
              </h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Participants</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

