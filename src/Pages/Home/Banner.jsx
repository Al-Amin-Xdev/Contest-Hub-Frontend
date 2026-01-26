const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-800 text-white">
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover & Create  
            <span className="block text-yellow-300 mt-2">
              Amazing Creative Contests
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-xl">
            Join exciting contests, showcase your talent, compete with creators
            worldwide, and win exciting prizes. Create your own contests and
            inspire creativity.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 bg-white rounded-xl p-2 flex items-center shadow-lg max-w-xl">
            <input
              type="text"
              placeholder="Search contests by type (Design, Writing, Gaming...)"
              className="flex-1 px-4 py-3 text-gray-700 outline-none rounded-lg"
            />
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition"
              onClick={() => console.log("Search clicked (dummy)")}
            >
              Search
            </button>
          </div>

          <p className="text-sm text-gray-300 mt-3">
            🔍 Search by contest category (backend logic coming soon)
          </p>
        </div>

        {/* RIGHT CONTENT (IMAGE / STATS) */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-200 mt-1">Live Contests</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold">$50K+</h3>
              <p className="text-gray-200 mt-1">Prize Money</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold">2K+</h3>
              <p className="text-gray-200 mt-1">Creators</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-gray-200 mt-1">Participants</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
