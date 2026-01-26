import React from "react";
import { FaTrophy, FaUsers, FaLightbulb, FaLaptopCode } from "react-icons/fa";

const ExtraSection = () => {
  const features = [
    {
      id: 1,
      icon: <FaTrophy size={30} className="text-purple-600" />,
      title: "Win Exciting Prizes",
      description:
        "Participate in contests and stand a chance to win amazing prizes. Showcase your talent and get rewarded.",
    },
    {
      id: 2,
      icon: <FaUsers size={30} className="text-purple-600" />,
      title: "Join a Creative Community",
      description:
        "Connect with creators worldwide. Collaborate, learn, and grow together in a vibrant community.",
    },
    {
      id: 3,
      icon: <FaLightbulb size={30} className="text-purple-600" />,
      title: "Showcase Your Ideas",
      description:
        "Present your unique ideas and creative solutions. Gain recognition and boost your portfolio.",
    },
    {
      id: 4,
      icon: <FaLaptopCode size={30} className="text-purple-600" />,
      title: "Develop Your Skills",
      description:
        "Improve your creative, technical, and professional skills by participating in real-world challenges.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Why Join ContestHub? 🚀
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ContestHub helps you showcase your talent, connect with a creative community, and win amazing prizes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button className="px-10 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-105 transition">
            Explore Contests Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExtraSection;
