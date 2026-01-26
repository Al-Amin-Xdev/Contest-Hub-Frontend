import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AllContests = () => {
  const navigate = useNavigate();

  // Dummy contest data (later replace with backend API)
  const contests = [
    {
      id: 1,
      name: "Creative Logo Design Challenge",
      type: "Image Design",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      participants: 320,
      description:
        "Design a modern and creative logo for a startup brand. Showcase your creativity and design skills.",
    },
    {
      id: 2,
      name: "Article Writing Competition",
      type: "Article Writing",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      participants: 280,
      description:
        "Write a compelling and insightful article on emerging technology trends and their impact on society.",
    },
    {
      id: 3,
      name: "Mobile App UI Design Contest",
      type: "Image Design",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      participants: 410,
      description:
        "Create a stunning and user-friendly mobile app UI that delivers a seamless user experience.",
    },
    {
      id: 4,
      name: "Gaming Review Challenge",
      type: "Article Writing",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      participants: 190,
      description:
        "Share your honest and detailed review of a popular video game and help gamers make better choices.",
    },
    {
      id: 5,
      name: "Business Idea Pitch Contest",
      type: "Business Ideas",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      participants: 260,
      description:
        "Pitch an innovative business idea that solves real-world problems and has strong market potential.",
    },
  ];

  // Get unique contest types for tabs
  const contestTypes = ["All", ...new Set(contests.map((c) => c.type))];

  const [activeTab, setActiveTab] = useState("All");

  // Filter contests based on active tab
  const filteredContests =
    activeTab === "All"
      ? contests
      : contests.filter((c) => c.type === activeTab);

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            All Contests 🎯
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse all approved contests. Filter by contest type to find what interests you most.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {contestTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`px-6 py-2 rounded-full font-semibold transition
                ${
                  activeTab === type
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContests.map((contest) => (
            <div
              key={contest.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group"
            >
              {/* Contest Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                  {contest.participants} Joined
                </span>
              </div>

              {/* Contest Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {contest.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">
                  {contest.description.slice(0, 90)}...
                </p>
                <button
                  onClick={() => navigate(`/contest/${contest.id}`)} // Later, add login check
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllContests;
