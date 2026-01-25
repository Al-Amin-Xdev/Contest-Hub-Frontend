import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20 text-gray-200">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 backdrop-blur-xl border-t border-white/10"></div>

      {/* Centered container */}
      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ContestHub
            </h2>
            <p className="mt-4 text-sm text-gray-300 max-w-sm leading-relaxed">
              A modern contest platform where creators launch ideas, users
              compete with passion, and winners get celebrated globally.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {["Home", "All Contests", "Leaderboard", "Dashboard"].map(
                (item) => (
                  <li
                    key={item}
                    className="cursor-pointer hover:text-indigo-400 transition"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {[FaFacebookF, FaLinkedinIn, FaGithub].map((Icon, i) => (
                <a
                  key={i}
                  className="p-3 rounded-full bg-white/10 border border-white/20
                  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500
                  hover:text-white transition-all duration-300 shadow-md"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 text-center md:text-left">
          <p>© 2025 ContestHub. All rights reserved.</p>
          <p className="text-gray-300">
            Built with <span className="text-indigo-400">React</span>,{" "}
            <span className="text-indigo-400">Express</span> &{" "}
            <span className="text-indigo-400">MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
