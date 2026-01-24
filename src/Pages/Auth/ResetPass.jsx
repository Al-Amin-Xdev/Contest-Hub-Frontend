import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../AuthProvider/firebase.init";
import Swal from "sweetalert2";
import { useNavigate, NavLink } from "react-router-dom";

const ResetPass = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "info",
        title: "Reset Password",
        text: "Please enter your email first!",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "A password reset link has been sent to your email.",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send reset email. Please check your email address.",
          timer: 2000,
          showConfirmButton: false,
        });
        console.error(error);
      });
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Send Reset Link To Your Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
