
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../../Providers/AuthContext";
import { useContext, useState } from "react";

const Login = () => {
  const { login, PopUpLogIn, resetPassword, setUser } = useContext(AuthContext); // removed setLoading
  const [loading, setLoading] = useState(false); // local loading state

  const location = useLocation();
  const navigate = useNavigate();

  // Friendly Firebase error messages
  const firebaseErrorMap = {
    "auth/wrong-password": "Incorrect password",
    "auth/user-not-found": "User not found",
    "auth/invalid-email": "Invalid email address",
  };

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userInfo = await login(email, password);
      setUser(userInfo);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back! ✅",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: firebaseErrorMap[error.code] || "Login failed. Please try again",
        timer: 2500,
        showConfirmButton: false,
      });
      console.error(error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google popup login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const userInfo = await PopUpLogIn();
      setUser(userInfo);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Signed in with Google ✅",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: error.message,
        timer: 2500,
        showConfirmButton: false,
      });
      console.error(error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your registered email",
      inputPlaceholder: "you@example.com",
      showCancelButton: true,
    });

    if (email) {
      try {
        await resetPassword(email);
        Swal.fire({
          icon: "success",
          title: "Email Sent ✅",
          text: `Password reset email sent to ${email}`,
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          timer: 3000,
          showConfirmButton: false,
        });
        console.error(error.code, error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-emerald-700 text-white justify-center items-center p-16">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">Welcome Back 🌱</h1>
          <p className="text-lg opacity-90">
            Log in to connect with farmers, traders, and consumers. Manage crops, interests, and deals — all in one place.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your credentials to continue
          </p>

          {/* Email / Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="label text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex justify-end text-sm mb-2">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-green-600 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral w-full py-3 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider my-6">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Register Now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
