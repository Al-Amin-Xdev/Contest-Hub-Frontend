
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTrophy, FaUserCircle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [avatarURL, setAvatarURL] = useState("https://i.ibb.co/4pDNDk1/avatar.png");

  // Update avatar URL whenever user changes
  useEffect(() => {
    if (user?.photoURL && user.photoURL.trim()) {
      setAvatarURL(user.photoURL);
    } else {
      setAvatarURL("https://i.ibb.co/4pDNDk1/avatar.png");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setShowLogoutModal(true);
    setTimeout(() => {
      setShowLogoutModal(false);
      navigate("/login");
    }, 2000);
  };

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md font-semibold transition
    ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
        : "text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
    }`;

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-slate-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2">
              <FaTrophy className="text-3xl text-yellow-400" />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ContestHub
              </span>
            </NavLink>

            {/* Desktop Menu Links */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              <NavLink to="/contests" className={navLinkStyle}>All Contests</NavLink>
              <NavLink to="/extra" className={navLinkStyle}>Extra Section</NavLink>
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer"
              >
                <img
                  src={avatarURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
                />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-4 flex flex-col gap-2 z-50">

                  {/* Display Name */}
                  {user && (
                    <div className="flex items-center gap-3 border-b border-white/20 pb-2">
                      <img
                        src={avatarURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt="profile"
                        className="w-12 h-12 rounded-full border-2 border-white object-cover"
                      />
                      <div>
                        <p className="font-bold text-white">{user.displayName || "User"}</p>
                        <p className="text-sm text-gray-300">{user.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Small/Medium menu links */}
                  <div className="flex flex-col gap-1 lg:hidden">
                    <NavLink to="/" className={navLinkStyle} onClick={() => setDropdownOpen(false)}>Home</NavLink>
                    <NavLink to="/contests" className={navLinkStyle} onClick={() => setDropdownOpen(false)}>All Contests</NavLink>
                    <NavLink to="/extra" className={navLinkStyle} onClick={() => setDropdownOpen(false)}>Extra Section</NavLink>
                  </div>

                  {/* Edit Profile */}
                  {user && (
                    <NavLink
                      to="/edit-profile"
                      className={navLinkStyle}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Edit Profile
                    </NavLink>
                  )}

                  {/* Dashboard / Logout */}
                  {user ? (
                    <>
                      <NavLink to="/dashboard" className={navLinkStyle} onClick={() => setDropdownOpen(false)}>Dashboard</NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-md font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white mt-1"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 rounded-md font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white mt-1"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
          Successfully logged out!
        </div>
      )}
    </>
  );
};

export default Navbar;
