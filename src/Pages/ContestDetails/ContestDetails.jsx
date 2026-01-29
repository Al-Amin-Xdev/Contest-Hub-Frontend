// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Stripe setup
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// // ========================
// // Countdown Component
// // ========================
// const Countdown = ({ deadline, onExpire }) => {
//   const [timeLeft, setTimeLeft] = useState("");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const end = new Date(deadline).getTime();
//       const distance = end - now;

//       if (distance <= 0) {
//         setTimeLeft("00d 00h 00m 00s");
//         if (onExpire) onExpire();
//         clearInterval(interval);
//         return;
//       }

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [deadline, onExpire]);

//   return <span className="text-red-600 font-semibold text-lg sm:text-xl">{timeLeft}</span>;
// };

// // ========================
// // Submission Modal
// // ========================
// const SubmissionModal = ({
//   contest,
//   userData,
//   isOpen,
//   onClose,
//   handleSubmitWork,
//   submitting,
//   workTitle,
//   setWorkTitle,
//   workDescription,
//   setWorkDescription,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-lg relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//           Submit Your Work
//         </h2>

//         <p className="text-gray-600 dark:text-gray-300 mb-4">
//           Contest: <span className="font-semibold">{contest.name}</span>
//         </p>

//         <input
//           type="text"
//           placeholder="Work Title"
//           value={workTitle}
//           readOnly
//           className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white bg-gray-100 cursor-not-allowed"
//         />
//         <textarea
//           placeholder="Work Link / Resource"
//           value={workDescription}
//           onChange={(e) => setWorkDescription(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white resize-none"
//           rows={4}
//         />

//         <button
//           onClick={handleSubmitWork}
//           disabled={submitting}
//           className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
//         >
//           {submitting ? "Submitting..." : "Submit Work"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ========================
// // Payment Form
// // ========================
// const CheckoutForm = ({ contest, userData, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const [processing, setProcessing] = useState(false);

//  const handlePayment = async (e) => {
//   e.preventDefault();
//   if (!stripe || !elements) return;

//   setProcessing(true);

//   try {
//     // ✅ ensure numeric amount
//     const amount = Number(contest.entryFee);

//     if (!amount || amount <= 0) {
//       alert("Invalid entry fee");
//       setProcessing(false);
//       return;
//     }

//     // ✅ call backend
//     const res = await axiosSecure.post("/create-payment-intent", {
//       amount: amount * 100, // cents
//     });

//     if (!res.data?.clientSecret) {
//       throw new Error("Client secret not received");
//     }

//     const clientSecret = res.data.clientSecret;

//     const card = elements.getElement(CardElement);

//     const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card,
//         billing_details: {
//           name: userData.name,
//           email: userData.email,
//         },
//       },
//     });

//     if (paymentResult.error) {
//       alert(paymentResult.error.message);
//       setProcessing(false);
//       return;
//     }

//     if (paymentResult.paymentIntent.status === "succeeded") {
//       // ✅ join contest only after payment success
//       await axiosSecure.post("/join-contest", {
//         contestId: contest._id,
//         participantName: userData.name,
//         participantEmail: userData.email,
//         participantRole: userData.role,
//         participantUid: userData.uid,
//         contestInfo: contest,
//         paymentStatus: "paid",
//         transactionId: paymentResult.paymentIntent.id,
//       });

//       alert("Payment successful! You are registered.");
//       onSuccess();
//     }
//   } catch (err) {
//     console.error("Payment failed:", err);
//     alert(err.message || "Payment failed");
//   } finally {
//     setProcessing(false);
//   }
// };

//   return (
//     <form onSubmit={handlePayment} className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
//         Register for {contest.name} (${contest.entryFee})
//       </h2>
//       <CardElement className="p-2 border rounded-lg bg-white dark:bg-slate-700 mb-4" />
//       <button
//   type="submit"
//   disabled={!stripe || !elements || processing} // disable until Stripe is ready
//   className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold hover:scale-105 transition"
// >
//   {processing ? "Processing..." : !stripe ? "Loading..." : "Pay & Register"}
// </button>

//     </form>
//   );
// };

// // ========================
// // Main ContestDetails Component
// // ========================
// const ContestDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [contest, setContest] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isExpired, setIsExpired] = useState(false);
//   const [hasJoined, setHasJoined] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);

//   const [workTitle, setWorkTitle] = useState("");
//   const [workDescription, setWorkDescription] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch user role
//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const res = await axiosSecure.get("/user-roles");
//         const matchedUser = res.data.find((u) => u.email === user.email);
//         if (matchedUser) setUserData(matchedUser);
//       } catch (err) {
//         console.error("Failed to fetch user role:", err);
//       }
//     };
//     fetchUserRole();
//   }, [user.email, axiosSecure]);

//   // Fetch contest
//   useEffect(() => {
//     const fetchContest = async () => {
//       try {
//         const res = await axiosSecure.get("/all-contests");
//         const matchedContest = res.data.find((c) => c._id === id);
//         if (matchedContest) setContest(matchedContest);
//       } catch (err) {
//         console.error("Failed to fetch contest:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContest();
//   }, [id, axiosSecure]);

//   // Check join status
//   useEffect(() => {
//     if (!contest || !userData) return;

//     const checkJoinStatus = async () => {
//       try {
//         const res = await axiosSecure.get("/participants", {
//           params: { contestId: contest._id, email: userData.email },
//         });
//         setHasJoined(res.data.joined);
//       } catch (err) {
//         console.error("Failed to check join status:", err);
//       }
//     };

//     checkJoinStatus();
//   }, [contest, userData, axiosSecure]);

//   // Submit work
//   const handleSubmitWork = async () => {
//     if (!workDescription) {
//       alert("Please provide your work link or resources.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const payload = {
//         contestId: contest._id,
//         participantName: userData.name,
//         participantEmail: userData.email,
//         participantRole: userData.role,
//         participantUid: userData.uid,
//         contestInfo: contest,
//         workTitle: contest.name,
//         workDescription,
//       };

//       const res = await axiosSecure.post("/submit-work", payload);
//       if (res.data.success) {
//         alert("Work submitted successfully!");
//         setModalOpen(false);
//         setWorkDescription("");
//       }
//     } catch (err) {
//       console.error("Submit Work Error:", err);
//       alert(err.response?.data?.message || "Failed to submit work");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
//         Loading contest details...
//       </div>
//     );

//   if (!contest)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
//         Contest not found.
//       </div>
//     );

//   return (
//     <section className="py-16 bg-gray-50 dark:bg-slate-900 min-h-screen">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 mb-12">
//           {/* Contest Image */}
//           <div className="flex-shrink-0 w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
//             <img
//               src={contest.image || "https://via.placeholder.com/600x400"}
//               alt={contest.name}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Contest Info */}
//           <div className="flex-1">
//             <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
//               {contest.name}
//             </h1>

//             <div className="flex flex-wrap items-center gap-4 mb-4">
//               <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
//                 {contest.contestType}
//               </span>
//               <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-sm">
//                 Prize: ${contest.prize}
//               </span>
//               <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium text-sm">
//                 Entry Fee: ${contest.entryFee}
//               </span>
//               <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-full font-medium text-sm">
//                 Created by: {contest.creatorEmail}
//               </span>
//             </div>

//             <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
//               {contest.description || "No description provided."}
//             </p>

//             {/* Countdown */}
//             <div className="mb-6">
//               <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">
//                 Time Remaining:
//               </p>
//               <Countdown deadline={contest.deadline} onExpire={() => setIsExpired(true)} />
//             </div>

//             {contest.taskInstruction && (
//               <div className="mb-6">
//                 <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                   Task Instructions:
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-300">{contest.taskInstruction}</p>
//               </div>
//             )}

//             {/* Register / Submit Work */}
//             {!hasJoined ? (
//               <button
//                 disabled={isExpired}
//                 onClick={() => setShowPayment(true)}
//                 className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition ${
//                   isExpired
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
//                 }`}
//               >
//                 {isExpired ? "Contest Closed" : "Register & Pay"}
//               </button>
//             ) : (
//               <button
//                 onClick={() => {
//                   setModalOpen(true);
//                   setWorkTitle(contest.name);
//                 }}
//                 className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:scale-105 transition"
//               >
//                 Submit Work
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Stripe Payment Form */}
//         {showPayment && userData && (
//           <Elements stripe={stripePromise}>
//             <CheckoutForm
//               contest={contest}
//               userData={userData}
//               onSuccess={() => {
//                 setShowPayment(false);
//                 setHasJoined(true);
//               }}
//             />
//           </Elements>
//         )}

//         {/* Submission Modal */}
//         <SubmissionModal
//           contest={contest}
//           userData={userData}
//           isOpen={modalOpen}
//           onClose={() => setModalOpen(false)}
//           handleSubmitWork={handleSubmitWork}
//           submitting={submitting}
//           workTitle={workTitle}
//           setWorkTitle={setWorkTitle}
//           workDescription={workDescription}
//           setWorkDescription={setWorkDescription}
//         />
//       </div>
//     </section>
//   );
// };

// export default ContestDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, onExpire]);

  return (
    <span className="text-red-600 font-semibold text-lg sm:text-xl">
      {timeLeft}
    </span>
  );
};

// ========================
// Submission Modal
// ========================
const SubmissionModal = ({
  contest,
  userData,
  isOpen,
  onClose,
  handleSubmitWork,
  submitting,
  workTitle,
  setWorkTitle,
  workDescription,
  setWorkDescription,
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
          placeholder="Work Title"
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
        />

        <button
          onClick={handleSubmitWork}
          disabled={submitting}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
        >
          {submitting ? "Submitting..." : "Submit Work"}
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
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [workTitle, setWorkTitle] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ========================
  // Fetch user role
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
  // Fetch contest
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
  // Check join status
  // ========================
  useEffect(() => {
    if (!contest || !userData) return;

    const checkJoinStatus = async () => {
      try {
        const res = await axiosSecure.get("/participants", {
          params: { contestId: contest._id, email: userData.email },
        });
        setHasJoined(res.data.joined);
      } catch (err) {
        console.error("Failed to check join status:", err);
      }
    };

    checkJoinStatus();
  }, [contest, userData, axiosSecure]);

  // ========================
  // Submit work
  // ========================
  const handleSubmitWork = async () => {
    if (!workDescription) {
      alert("Please provide your work link or resources.");
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
      }
    } catch (err) {
      console.error("Submit Work Error:", err);
      alert(err.response?.data?.message || "Failed to submit work");
    } finally {
      setSubmitting(false);
    }
  };

console.log(contest);
  


 // ========================
// Stripe-hosted checkout
// ========================
const handlePayAndRegister = async () => {
  if (!contest || !userData) return;

  try {
    // Convert contest price to a number
    let priceNumber = Number(contest.price);

    if (!priceNumber || isNaN(priceNumber) || priceNumber <= 0) {
      alert("Invalid contest entry fee.");
      return;
    }

    const amountInCents = Math.round(priceNumber * 100);

    // Send correct fields to backend
    const res = await axiosSecure.post("/create-checkout-session", {
      amount: amountInCents,          // ⚡ must be in cents
      currency: "usd",                // ⚡ required by Stripe
      email: userData.email,          // optional but recommended
      contestId: contest._id,         // optional metadata
      contestName: contest.name,      // optional metadata
    });

    if (!res.data?.url) {
      throw new Error("Checkout session URL not received");
    }

    // redirect to Stripe checkout
    window.location.href = res.data.url;

  } catch (err) {
    console.error("Failed to create checkout session:", err);
    alert(err.response?.data?.message || "Payment failed");
  }
};



  // ========================
  // Handle success redirect
  // ========================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success" && userData) {
      setHasJoined(true);
      alert("Payment successful!");
      // optional: clear query params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [userData]);

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
                Entry Fee: ${contest.entryFee}
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
              <Countdown
                deadline={contest.deadline}
                onExpire={() => setIsExpired(true)}
              />
            </div>

            {contest.taskInstruction && (
              <div className="mb-6">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Task Instructions:
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {contest.taskInstruction}
                </p>
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
                onClick={() => {
                  setModalOpen(true);
                  setWorkTitle(contest.name);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 hover:scale-105 transition"
              >
                Submit Work
              </button>
            )}
          </div>
        </div>

        {/* Submission Modal */}
        <SubmissionModal
          contest={contest}
          userData={userData}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          handleSubmitWork={handleSubmitWork}
          submitting={submitting}
          workTitle={workTitle}
          setWorkTitle={setWorkTitle}
          workDescription={workDescription}
          setWorkDescription={setWorkDescription}
        />
      </div>
    </section>
  );
};

export default ContestDetails;
