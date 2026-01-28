// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";


// const AllContests = () => {
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   const [contests, setContests] = useState([]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch contests
//   useEffect(() => {
//     const fetchContests = async () => {
//       try {
//         const res = await axiosSecure.get("/all-contests");

//         // ✅ Only confirmed contests
//         const confirmedContests = res.data.filter(
//           (contest) => contest.status === "confirmed"
//         );

//         setContests(confirmedContests);
//       } catch (error) {
//         console.error("Failed to load contests", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContests();
//   }, [axiosSecure]);

//   // 🔹 Create category tabs from contestType
//   const contestCategories = useMemo(() => {
//     const categories = contests
//       .map((contest) => contest.contestType)
//       .filter(Boolean);

//     return ["All", ...new Set(categories)];
//   }, [contests]);

//   // 🔹 Filter contests by selected category
//   const filteredContests =
//     activeTab === "All"
//       ? contests
//       : contests.filter(
//           (contest) => contest.contestType === activeTab
//         );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
//         Loading contests...
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 sm:py-20 bg-gray-50 dark:bg-slate-900 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center mb-10 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
//             All Contests 🎯
//           </h2>
//           <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
//             Discover exciting contests — explore details to unlock full information.
//           </p>
//         </div>

//         {/* Category Tabs */}
//         <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
//           {contestCategories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveTab(category)}
//               className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition
//                 ${
//                   activeTab === category
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                     : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
//                 }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Contest Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {filteredContests.map((contest) => (
//             <div
//               key={contest._id}
//               className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
//             >
//               {/* Image */}
//               <div className="relative h-44 sm:h-52 overflow-hidden">
//                 <img
//                   src={contest.image || "https://via.placeholder.com/400x300"}
//                   alt={contest.name}
//                   className="w-full h-full object-cover hover:scale-110 transition duration-500"
//                 />
//                 <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
//                   {contest.participants || 0} Joined
//                 </span>
//               </div>

//               {/* Content */}
//               <div className="p-5 sm:p-6">
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
//                   {contest.name}
//                 </h3>

//                 {/* 🔥 Teaser Description */}
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
//                   {contest.description?.slice(0, 60)}...
//                   <span className="text-blue-600 font-medium ml-1">
//                     explore →
//                   </span>
//                 </p>

//                 {/* Minimal Info */}
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-sm font-medium text-blue-600">
//                     {contest.contestType}
//                   </span>
//                   <span className="text-xs text-gray-400 italic">
//                     Details inside
//                   </span>
//                 </div>

//                 {/* Details Button */}
//                 <button
//                   onClick={() => navigate(`/contest/${contest._id}`)}
//                   className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredContests.length === 0 && (
//           <p className="text-center text-gray-500 mt-16">
//             No contests found for this category.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllContests;

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


// Countdown component
const Countdown = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Contest ended");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return <span className="text-sm sm:text-base font-medium text-red-600">{timeLeft}</span>;
};

const AllContests = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [contests, setContests] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch contests
  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axiosSecure.get("/all-contests");

        // Only confirmed contests
        const confirmedContests = res.data.filter(c => c.status === "confirmed");
        setContests(confirmedContests);
      } catch (error) {
        console.error("Failed to load contests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, [axiosSecure]);

  // Category tabs
  const contestCategories = useMemo(() => {
    const categories = contests.map(c => c.contestType).filter(Boolean);
    return ["All", ...new Set(categories)];
  }, [contests]);

  // Filter by category
  const filteredContests = activeTab === "All"
    ? contests
    : contests.filter(c => c.contestType === activeTab);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      Loading contests...
    </div>
  );

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            All Contests 🎯
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Discover exciting contests — explore details to unlock full information.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {contestCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition
                ${activeTab === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Contest Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredContests.map(contest => (
            <div
              key={contest._id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={contest.image || "https://via.placeholder.com/400x300"}
                  alt={contest.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                  {contest.participants || 0} Joined
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {contest.name}
                </h3>

                {/* Teaser Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 leading-relaxed">
                  {contest.description?.slice(0, 60)}...
                  <span className="text-blue-600 font-medium ml-1">
                    explore →
                  </span>
                </p>

                {/* Minimal Info + Countdown */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-blue-600">
                    {contest.contestType}
                  </span> 
                  <span className="text-white">Contest ends in:</span>
                  <Countdown deadline={contest.deadline} />
                </div>

                {/* Details Button */}
                <button
                  onClick={() => navigate(`/contest/${contest._id}`)}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContests.length === 0 && (
          <p className="text-center text-gray-500 mt-16">
            No contests found for this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default AllContests;

