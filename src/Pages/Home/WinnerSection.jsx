// import React from "react";

// const WinnerSection = () => {
//   // Dummy winner data (later replace with backend API)
//   const winners = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       contest: "Creative Logo Design",
//       prize: "$500",
//       photo: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       id: 2,
//       name: "Mark Thompson",
//       contest: "Article Writing Competition",
//       prize: "$300",
//       photo: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       id: 3,
//       name: "Sophia Lee",
//       contest: "Mobile App UI Design",
//       prize: "$450",
//       photo: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//   ];

//   return (
//     <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center mb-10 sm:mb-12 md:mb-14">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
//             🏆 Celebrate Our Recent Winners
//           </h2>
//           <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-100 max-w-2xl mx-auto px-2">
//             See who’s winning big! Get inspired and join our contests to showcase your talent and claim exciting prizes.
//           </p>
//         </div>

//         {/* Winners Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//           {winners.map((winner) => (
//             <div
//               key={winner.id}
//               className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center hover:scale-105 transition hover:bg-white/20"
//             >
//               <img
//                 src={winner.photo}
//                 alt={winner.name}
//                 className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-white object-cover mb-3 sm:mb-4"
//               />
//               <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{winner.name}</h3>
//               <p className="text-xs sm:text-sm mt-1 text-gray-100 line-clamp-2">{winner.contest}</p>
//               <span className="mt-2 sm:mt-3 px-3 sm:px-4 py-1 bg-yellow-400 text-gray-900 text-xs sm:text-sm font-semibold rounded-full">
//                 {winner.prize}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Total Winners / Call-to-Action */}
//         <div className="mt-10 sm:mt-12 md:mt-16 text-center">
//           <p className="text-base sm:text-lg md:text-xl font-semibold px-2">
//             🌟 Over 1500 participants have won exciting prizes!
//           </p>
//           <button
//             className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-white text-purple-700 font-bold hover:scale-105 transition hover:bg-gray-100"
//           >
//             Join a Contest Now
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default WinnerSection;

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { NavLink } from "react-router";

const WinnerSection = () => {
  const axiosSecure = useAxiosSecure();
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // For slider

  const winnersPerPage = 3; // number of winners visible at once

  // ========================
  // Fetch all winners
  // ========================
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        // Get all submissions marked as winner
        const res = await axiosSecure.get("/submit-work"); // GET all submissions
        const winnerSubmissions = res.data.filter((sub) => sub.winStatus === "winner");

        // Map to winner data
        const winnerData = winnerSubmissions.map((sub) => ({
          id: sub._id,
          name: sub.participant.participantName,
          contest: sub.contestInfo.name,
          prize: `$${sub.contestInfo.prize || 0}`,
          photo: sub.participant.photo || `https://ui-avatars.com/api/?name=${sub.participant.participantName}&background=4f46e5&color=fff`,
        }));

        setWinners(winnerData);
      } catch (err) {
        console.error("Failed to fetch winners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [axiosSecure]);

  // ========================
  // Slider navigation
  // ========================
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - winnersPerPage + winners.length) % winners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + winnersPerPage) % winners.length);
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-900 dark:text-white text-xl font-semibold">
        Loading winners...
      </div>
    );
  }

  if (!winners.length) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-900 dark:text-white text-xl font-semibold">
        No winners yet.
      </div>
    );
  }

  // Get visible winners
  const visibleWinners = winners.slice(currentIndex, currentIndex + winnersPerPage);
  // If at end, wrap around
  if (visibleWinners.length < winnersPerPage) {
    visibleWinners.push(...winners.slice(0, winnersPerPage - visibleWinners.length));
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            🏆 Celebrate Our Recent Winners
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-100 max-w-2xl mx-auto px-2">
            See who’s winning big! Get inspired and join our contests to showcase your talent and claim exciting prizes.
          </p>
        </div>

        {/* Slider */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
          >
            <FaArrowLeft />
          </button>

          {/* Winners Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mx-auto w-full">
            {visibleWinners.map((winner) => (
              <div
                key={winner.id}
                className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center hover:scale-105 transition hover:bg-white/20"
              >
                <img
                  src={winner.photo}
                  alt={winner.name}
                  className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-white object-cover mb-3 sm:mb-4"
                />
                <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{winner.name}</h3>
                <p className="text-xs sm:text-sm mt-1 text-gray-100 line-clamp-2">{winner.contest}</p>
                <span className="mt-2 sm:mt-3 px-3 sm:px-4 py-1 bg-yellow-400 text-gray-900 text-xs sm:text-sm font-semibold rounded-full">
                  {winner.prize}
                </span>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Total Winners / Call-to-Action */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <p className="text-base sm:text-lg md:text-xl font-semibold px-2">
            🌟 Over {winners.length} participants have won exciting prizes!
          </p>
          <NavLink to="/contests"><button
            className="mt-4 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-white text-purple-700 font-bold hover:scale-105 transition hover:bg-gray-100"
          >
            Join a Contest Now
          </button></NavLink>
        </div>

      </div>
    </section>
  );
};

export default WinnerSection;

