// import React, { useEffect, useState } from "react";
// import { FaTrophy } from "react-icons/fa";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const Submissions = () => {
//   const axiosSecure = useAxiosSecure();
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewWorkId, setViewWorkId] = useState(null); // Track which submission is being viewed

//   // ========================
//   // Fetch all submissions
//   // ========================
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const res = await axiosSecure.get("/submit-work"); // GET all submissions
//         setSubmissions(res.data);
//       } catch (err) {
//         console.error("Failed to fetch submissions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubmissions();
//   }, [axiosSecure]);

//   // ========================
//   // Declare Winner
//   // ========================
//   const handleDeclareWinner = async (submissionId, contestId) => {
//     try {
//       // PUT request to backend to set this submission as winner
//       await axiosSecure.put(`/submit-work/${submissionId}/winner`, { contestId });

//       // Update frontend state: only one winner per contest
//       const updated = submissions.map((s) =>
//         s.contestInfo._id === contestId
//           ? { ...s, winStatus: s._id === submissionId ? "winner" : null }
//           : s
//       );
//       setSubmissions(updated);
//       alert("Winner declared successfully!");
//     } catch (err) {
//       console.error("Failed to declare winner:", err);
//       alert("Failed to declare winner");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
//         Loading submissions...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//         Submitted Tasks
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {submissions.map((submission) => (
//           <div
//             key={submission._id}
//             className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
//           >
//             <div className="p-4 flex-1 flex flex-col">
//               {/* Contest Name */}
//               <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
//                 {submission.contestInfo.name}
//               </h2>

//               {/* Participant Info */}
//               <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
//                 <span className="font-semibold">Participant:</span>{" "}
//                 {submission.participant.participantName}
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
//                 <span className="font-semibold">Email:</span>{" "}
//                 {submission.participant.participantEmail}
//               </p>

//               {/* Task Info */}
//               {viewWorkId === submission._id ? (
//                 <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
//                   <span className="font-semibold">Work Submitted:</span>{" "}
//                   {submission.workDescription}
//                 </p>
//               ) : (
//                 <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 truncate">
//                   <span className="font-semibold">Work Submitted:</span>{" "}
//                   {submission.workDescription}
//                 </p>
//               )}

//               {/* Winner Badge */}
//               {submission.winStatus === "winner" && (
//                 <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
//                   <FaTrophy />
//                   Winner
//                 </div>
//               )}

//               {/* Buttons */}
//               <div className="mt-auto flex flex-col gap-2">
//                 <button
//                   onClick={() =>
//                     setViewWorkId(viewWorkId === submission._id ? null : submission._id)
//                   }
//                   className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold"
//                 >
//                   {viewWorkId === submission._id ? "Hide Work" : "View Work"}
//                 </button>

//                 {submission.winStatus !== "winner" && (
//                   <button
//                     onClick={() =>
//                       handleDeclareWinner(submission._id, submission.contestInfo._id)
//                     }
//                     className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition font-semibold"
//                   >
//                     Declare Winner
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Submissions;


import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Submissions = () => {
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewWorkId, setViewWorkId] = useState(null); // Track which submission is being viewed

  // Modal state
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("success"); // "success" or "error"

  // ========================
  // Fetch all submissions
  // ========================
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axiosSecure.get("/submit-work"); // GET all submissions
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
        showModal("Failed to fetch submissions", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [axiosSecure]);

  // ========================
  // Show Modal
  // ========================
  const showModal = (message, type = "success") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2500); // auto-hide after 2.5s
  };

  // ========================
  // Declare Winner
  // ========================
  const handleDeclareWinner = async (submissionId, contestId) => {
    try {
      await axiosSecure.put(`/submit-work/${submissionId}/winner`, { contestId });

      // Update frontend state: only one winner per contest
      const updated = submissions.map((s) =>
        s.contestInfo._id === contestId
          ? { ...s, winStatus: s._id === submissionId ? "winner" : null }
          : s
      );
      setSubmissions(updated);
      showModal("Winner declared successfully!", "success");
    } catch (err) {
      console.error("Failed to declare winner:", err);
      showModal("Failed to declare winner", "error");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading submissions...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 relative">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Submitted Tasks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <div
            key={submission._id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col">
              {/* Contest Name */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {submission.contestInfo.name}
              </h2>

              {/* Participant Info */}
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <span className="font-semibold">Participant:</span>{" "}
                {submission.participant.participantName}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {submission.participant.participantEmail}
              </p>

              {/* Task Info */}
              {viewWorkId === submission._id ? (
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                  <span className="font-semibold">Work Submitted:</span>{" "}
                  {submission.workDescription}
                </p>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 truncate">
                  <span className="font-semibold">Work Submitted:</span>{" "}
                  {submission.workDescription}
                </p>
              )}

              {/* Winner Badge */}
              {submission.winStatus === "winner" && (
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <FaTrophy />
                  Winner
                </div>
              )}

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-2">

                {submission.winStatus !== "winner" && (
                  <button
                    onClick={() =>
                      handleDeclareWinner(submission._id, submission.contestInfo._id)
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition font-semibold"
                  >
                    Declare Winner
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Notification */}
      {modalVisible && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 border-l-4 p-4 rounded shadow-lg z-50 flex items-center gap-3 border-l-green-500 dark:border-l-green-400">
          <span
            className={`font-semibold ${
              modalType === "success" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
            }`}
          >
            {modalMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default Submissions;
