import { useNavigate } from "react-router-dom";

const PopularContests = () => {
  const navigate = useNavigate();

  // Dummy data (later replace with backend data)
  const contests = [
    {
      id: 1,
      name: "Creative Logo Design Challenge",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      participants: 320,
      description:
        "Design a modern and creative logo for a startup brand. Showcase your creativity and design skills.",
    },
    {
      id: 2,
      name: "Article Writing Competition",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      participants: 280,
      description:
        "Write a compelling and insightful article on emerging technology trends and their impact on society.",
    },
    {
      id: 3,
      name: "Mobile App UI Design Contest",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      participants: 410,
      description:
        "Create a stunning and user-friendly mobile app UI that delivers a seamless user experience.",
    },
    {
      id: 4,
      name: "Gaming Review Challenge",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      participants: 190,
      description:
        "Share your honest and detailed review of a popular video game and help gamers make better choices.",
    },
    {
      id: 5,
      name: "Business Idea Pitch Contest",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      participants: 260,
      description:
        "Pitch an innovative business idea that solves real-world problems and has strong market potential.",
    },
  ];

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
          {contests
            .sort((a, b) => b.participants - a.participants)
            .slice(0, 5)
            .map((contest) => (
              <div
                key={contest.id}
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
                    {contest.participants} Joined
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {contest.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 sm:mb-5 flex-1 line-clamp-3">
                    {contest.description.slice(0, 90)}...
                  </p>

                  <button
                    onClick={() => navigate(`/contest/${contest.id}`)}
                    className="w-full py-2 sm:py-2.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold hover:scale-105 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* SHOW ALL BUTTON */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14">
          <button
            onClick={() => navigate("/contests")}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Show All Contests →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularContests;
