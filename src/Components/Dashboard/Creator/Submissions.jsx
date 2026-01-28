import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";

// Sample dummy submissions data
const sampleSubmissions = [
  {
    id: "1",
    contestName: "Logo Design Challenge",
    participantName: "Alice Johnson",
    participantEmail: "alice@example.com",
    submissionTask: "Logo designed using Illustrator",
    isWinner: false,
  },
  {
    id: "2",
    contestName: "Logo Design Challenge",
    participantName: "Bob Smith",
    participantEmail: "bob@example.com",
    submissionTask: "Vector-based logo with minimal colors",
    isWinner: false,
  },
  {
    id: "3",
    contestName: "Business Plan Contest",
    participantName: "Charlie Brown",
    participantEmail: "charlie@example.com",
    submissionTask: "Comprehensive business plan PDF",
    isWinner: true,
  },
];

const Submissions = () => {
  const [submissions, setSubmissions] = useState(sampleSubmissions);

  const handleDeclareWinner = (id) => {
    // Update state: only one winner per contest
    const contestId = submissions.find((s) => s.id === id).contestName;
    const updated = submissions.map((s) =>
      s.contestName === contestId
        ? { ...s, isWinner: s.id === id }
        : s
    );
    setSubmissions(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Submitted Tasks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col">
              {/* Contest Name */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {submission.contestName}
              </h2>

              {/* Participant Info */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <span className="font-semibold">Participant:</span>{" "}
                {submission.participantName}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {submission.participantEmail}
              </p>

              {/* Task Info */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                <span className="font-semibold">Task Submitted:</span>{" "}
                {submission.submissionTask}
              </p>

              {/* Winner Badge */}
              {submission.isWinner && (
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <FaTrophy />
                  Winner
                </div>
              )}

              {/* Declare Winner Button */}
              {!submission.isWinner && (
                <button
                  onClick={() => handleDeclareWinner(submission.id)}
                  className="mt-auto bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition font-semibold"
                >
                  Declare Winner
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
