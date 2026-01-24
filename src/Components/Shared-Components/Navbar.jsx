import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTrophy, FaUserCircle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md font-semibold transition duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
        : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}

          <NavLink to="/" className="flex items-center gap-2">
            {/* Gradient Logo Icon */}
            <FaTrophy className="text-3xl text-yellow-500" />

            {/* Gradient Website Name */}
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              ContestHub
            </span>
          </NavLink>

          {/* Menu Links */}
          <div className="flex items-center gap-4 flex-wrap">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/contests" className={navLinkStyle}>
              All Contests
            </NavLink>
            <NavLink to="/extra" className={navLinkStyle}>
              Extra Section
            </NavLink>

            {/* User Section */}
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="Profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-blue-100 to-purple-200 shadow-lg rounded-xl p-3">
                    <div className="flex items-center gap-3 border-b border-purple-300 pb-2">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt="profile"
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className="font-bold text-gray-700">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <NavLink
                      to="/dashboard"
                      className="block mt-2 px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-white transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left mt-2 px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-500 hover:text-white transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
