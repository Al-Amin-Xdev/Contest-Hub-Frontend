import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

// ========================
// Countdown Component
// ========================
const Countdown = ({ deadline, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("00d 00h 00m 00s");
        if (onExpire) onExpire();
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  return (
    <span className="text-red-600 font-semibold text-lg sm:text-xl">{timeLeft}</span>
  );
};

// ========================
// Submission Modal
// ========================
const SubmissionModal = ({
  contest,
  isOpen,
  onClose,
  handleSubmitWork,
  submitting,
  workTitle,
  setWorkDescription,
  workDescription,
  hasSubmittedWork
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Submit Your Work
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Contest: <span className="font-semibold">{contest.name}</span>
        </p>

        <input
          type="text"
          value={workTitle}
          readOnly
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white bg-gray-100 cursor-not-allowed"
        />

        <textarea
          placeholder="Work Link / Resource"
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white resize-none"
          rows={4}
          disabled={hasSubmittedWork} // ✅ disable textarea if already submitted
        />

        <button
          onClick={handleSubmitWork}
          disabled={submitting || hasSubmittedWork} // ✅ disable button if already submitted
          className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${
            hasSubmittedWork
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
          }`}
        >
          {hasSubmittedWork ? "Work Submitted" : submitting ? "Submitting..." : "Submit Work"}
        </button>
      </div>
    </div>
  );
};

// ========================
// Main ContestDetails Component
// ========================
const ContestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [contest, setContest] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [workDescription, setWorkDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmittedWork, setHasSubmittedWork] = useState(false); // ✅ state to track submission
  const registrationDoneRef = useRef(false);

  // ========================
  // Fetch user info
  // ========================
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axiosSecure.get("/user-roles");
        const matchedUser = res.data.find((u) => u.email === user.email);
        if (matchedUser) setUserData(matchedUser);
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      }
    };
    fetchUserRole();
  }, [user.email, axiosSecure]);

  // ========================
  // Fetch contest info
  // ========================
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await axiosSecure.get("/all-contests");
        const matchedContest = res.data.find((c) => c._id === id);
        if (matchedContest) setContest(matchedContest);
      } catch (err) {
        console.error("Failed to fetch contest:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContest();
  }, [id, axiosSecure]);

  // ========================
  // Check if user already joined
  // ========================
  useEffect(() => {
    if (!contest || !userData) return;

    const checkJoinStatus = async () => {
      try {
        const res = await axiosSecure.get("/participants", {
          params: { contestId: contest._id, email: userData.email },
        });
        setHasJoined(res.data.joined);

        // ✅ check if user already submitted work
        if (res.data.workSubmitted) {
          setHasSubmittedWork(true);
        }
      } catch (err) {
        console.error("Failed to check join status:", err);
      }
    };

    checkJoinStatus();
  }, [contest, userData, axiosSecure]);

  // ========================
  // Handle payment & registration
  // ========================
  const handlePayAndRegister = async () => {
    if (!contest || !userData) return;

    try {
      const priceNumber = Number(contest.price);
      if (!priceNumber || isNaN(priceNumber) || priceNumber <= 0) {
        alert("Invalid contest entry fee.");
        return;
      }

      const amountInCents = Math.round(priceNumber * 100);

      const res = await axiosSecure.post("/create-checkout-session", {
        amount: amountInCents,
        currency: "usd",
        email: userData.email,
        contestId: contest._id,
        contestName: contest.name,
      });

      if (!res.data?.url) throw new Error("Checkout URL not received");

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment failed:", err);
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  // ========================
  // Register participant after payment success
  // ========================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (
      params.get("payment") === "success" &&
      userData &&
      contest &&
      !registrationDoneRef.current
    ) {
      registrationDoneRef.current = true;

      const registerParticipant = async () => {
        try {
          await axiosSecure.post("/participants", {
            contestId: contest._id,
            userInfo: {
              name: userData.name,
              email: userData.email,
              role: userData.role,
              uid: userData.uid,
            },
            paymentInfo: {
              amount: contest.price,
              currency: "USD",
              date: new Date(),
            },
          });

          setHasJoined(true);
          alert("Payment successful! You are now registered.");
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
          console.error("Failed to register participant:", err);
          alert("Payment succeeded but registration failed. Contact support.");
        }
      };

      registerParticipant();
    }
  }, [axiosSecure, contest, userData]);

  // ========================
  // Submit work
  // ========================
  const handleSubmitWork = async () => {
    if (hasSubmittedWork) {
      alert("You can submit only once!");
      return;
    }

    if (!workDescription) {
      alert("Please enter your work link or description.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        contestId: contest._id,
        participantName: userData.name,
        participantEmail: userData.email,
        participantRole: userData.role,
        participantUid: userData.uid,
        contestInfo: contest,
        workTitle: contest.name,
        workDescription,
      };

      const res = await axiosSecure.post("/submit-work", payload);
      if (res.data.success) {
        alert("Work submitted successfully!");
        setModalOpen(false);
        setWorkDescription("");
        setHasSubmittedWork(true); // ✅ mark as submitted
      }
    } catch (err) {
      console.error("Submit work error:", err);
      alert(err.response?.data?.message || "Failed to submit work");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading contest details...
      </div>
    );

  if (!contest)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Contest not found.
      </div>
    );

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 mb-12">
          {/* Contest Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={contest.image || "https://via.placeholder.com/600x400"}
              alt={contest.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contest Info */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {contest.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                {contest.contestType}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                Prize: ${contest.prize}
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium text-sm">
                Entry Fee: ${contest.price}
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-full font-medium text-sm">
                Created by: {contest.creatorEmail}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
              {contest.description || "No description provided."}
            </p>

            {/* Countdown */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">
                Time Remaining:
              </p>
              <Countdown deadline={contest.deadline} onExpire={() => setIsExpired(true)} />
            </div>

            {contest.taskInstruction && (
              <div className="mb-6">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Task Instructions:
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{contest.taskInstruction}</p>
              </div>
            )}

            {/* Register / Submit Work */}
            {!hasJoined ? (
              <button
                disabled={isExpired}
                onClick={handlePayAndRegister}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition ${
                  isExpired
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
                }`}
              >
                {isExpired ? "Contest Closed" : "Register & Pay"}
              </button>
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                disabled={hasSubmittedWork} // ✅ disable if already submitted
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition ${
                  hasSubmittedWork
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-teal-600 hover:scale-105"
                }`}
              >
                {hasSubmittedWork ? "Work Submitted" : "Submit Work"}
              </button>
            )}
          </div>
        </div>

        {/* Submission Modal */}
        <SubmissionModal
          contest={contest}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          handleSubmitWork={handleSubmitWork}
          submitting={submitting}
          workTitle={contest.name}
          workDescription={workDescription}
          setWorkDescription={setWorkDescription}
          hasSubmittedWork={hasSubmittedWork} // ✅ pass to modal
        />
      </div>
    </section>
  );
};

export default ContestDetails;
