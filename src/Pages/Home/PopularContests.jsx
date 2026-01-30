import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PopularContests = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 6;

  // ========================
  // Fetch contests with participant count
  // ========================
  useEffect(() => {
    const fetchContests = async () => {
      try {
        // 1️⃣ Get all contests
        const contestsRes = await axiosSecure.get("/all-contests");
        let allContests = contestsRes.data || [];

        // 2️⃣ Get participants for each contest to count
        const contestsWithParticipants = await Promise.all(
          allContests.map(async (contest) => {
            try {
              const participantsRes = await axiosSecure.get("/participants", {
                params: { contestId: contest._id, email: "" }, // backend should return all participants if email is empty
              });
              let participantCount = 0;
              if (Array.isArray(participantsRes.data)) {
                participantCount = participantsRes.data.length;
              } else if (participantsRes.data.count) {
                participantCount = participantsRes.data.count;
              }
              return { ...contest, participantCount };
            } catch (err) {
              console.error(`Failed to get participants for ${contest.name}`, err);
              return { ...contest, participantCount: 0 };
            }
          })
        );

        // 3️⃣ Sort by participantCount descending
        contestsWithParticipants.sort((a, b) => b.participantCount - a.participantCount);

        setContests(contestsWithParticipants);
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [axiosSecure]);

  // ========================
  // Pagination logic
  // ========================
  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = contests.slice(indexOfFirstContest, indexOfLastContest);
  const totalPages = Math.ceil(contests.length / contestsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-gray-900 dark:text-white text-xl font-semibold">
        Loading contests...
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Popular Contests 🔥
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Explore the most popular contests with the highest participation.
            Join now and showcase your talent to the world.
          </p>
        </div>

        {/* CONTEST GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {currentContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group h-full flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-2 sm:top-3 right-2 sm:right-4 bg-blue-600 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow">
                  {contest.participantCount} Joined
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {contest.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 flex-1 line-clamp-3">
                  {contest.description?.slice(0, 90)}...
                </p>

                <button
                  onClick={() => navigate(`/contest/${contest._id}`)}
                  className="w-full py-2 sm:py-2.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold hover:scale-105 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg border ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularContests;

