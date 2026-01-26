const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-800 text-white overflow-hidden">
      {/* Overlay pattern */}
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

          {/* SEARCH BAR */}
          <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex flex-col sm:flex-row items-center shadow-lg w-full sm:max-w-xl gap-2 sm:gap-0">
            <input
              type="text"
              placeholder="Search contests (Design, Writing...)"
              className="flex-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 outline-none rounded-lg text-sm sm:text-base"
            />
            <button
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition text-sm sm:text-base"
              onClick={() => console.log("Search clicked (dummy)")}
            >
              Search
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 mt-2 sm:mt-3">
            🔍 Search by contest category (backend logic coming soon)
          </p>
        </div>

        {/* RIGHT CONTENT (STATS) */}
        <div className="relative w-full mt-8 lg:mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">500+</h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Live Contests</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">$50K+</h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Prize Money</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">2K+</h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Creators</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition">
              <h3 className="text-2xl sm:text-3xl font-bold">10K+</h3>
              <p className="text-gray-200 mt-1 text-xs sm:text-base">Participants</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
