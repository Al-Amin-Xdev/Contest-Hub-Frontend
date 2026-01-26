import { useLocation, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../providers/AuthContext";
import useAxios from "../../Hooks/useAxios";
import useRole from "../../Hooks/useRole";

const Login = () => {
  const { login, PopUpLogIn, setUser, resetPassword } = useContext(AuthContext);

  const axiosInstance = useAxios();
  const { role, loading: roleLoading } = useRole();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const firebaseErrorMap = {
    "auth/wrong-password": "Incorrect password",
    "auth/user-not-found": "User not found",
    "auth/invalid-email": "Invalid email address",
  };

  /* ================= ROLE BASED REDIRECT ================= */
  useEffect(() => {
    if (roleLoading) return;
    if (!role) return;

    // if user was redirected from private route
    if (location.state) {
      navigate(location.state, { replace: true });
      return;
    }

    if (role === "admin") {
      navigate("/dashboard/admin-profile", { replace: true });
    } else if (role === "creator") {
      navigate("/dashboard/creator-profile", { replace: true });
    } else {
      navigate("/dashboard/profile", { replace: true });
    }
  }, [role, roleLoading, navigate, location]);

  /* ================= EMAIL / PASSWORD LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userInfo = await login(email, password);
      setUser(userInfo.user);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${userInfo.user.displayName || "Contestant"}! ✅`,
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      // ❌ no navigate here (handled by role effect)
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

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const userInfo = await PopUpLogIn();
      const user = userInfo.user;

      let role;

      try {
        const { data } = await axiosInstance.get(`/user-role/${user.uid}`);
        role = data?.role;
      } catch {
        console.log("No role found, selecting role...");
      }

      if (!role) {
        const { value: selectedRole } = await Swal.fire({
          title: "Select Role",
          input: "radio",
          inputOptions: {
            user: "User",
            creator: "Contest Creator",
          },
          inputValidator: (value) =>
            value ? null : "You need to choose a role!",
          showCancelButton: true,
          confirmButtonText: "Continue",
        });

        if (!selectedRole) {
          setLoading(false);
          return;
        }

        role = selectedRole;

        await axiosInstance.post("/user-role", {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role,
        });
      }

      setUser({ ...user, role });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Signed in with Google as ${role}! ✅`,
        timer: 2000,
        showConfirmButton: false,
      });

      // ❌ no navigate here
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

  //Reset Pass
  // Handle Reset Password
  const handleResetPassword = async () => {
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

    try {
      setLoading(true);
      await resetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "A password reset link has been sent to your email.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.code === "auth/user-not-found"
            ? "No account found with this email."
            : "Failed to send reset email.",
        timer: 2500,
        showConfirmButton: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-700 to-purple-700 text-white justify-center items-center p-16">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">Welcome Back 🎉</h1>
          <p className="text-lg opacity-90">
            Log in to ContestHub to participate, create, and manage exciting
            contests.
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-slate-900">
        <div className="w-full max-w-md bg-white dark:bg-slate-700 rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center mb-6  text-white">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input input-bordered w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button
              onClick={handleResetPassword}
              className="text-md hover:text-blue-600 text-white font-medium transition"
            >
              Forgot Password?
            </button>
          </div>

          <div className="divider  text-white my-6">OR</div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-outline w-full flex gap-2 bg-black"
          >
            <FcGoogle size={22} />{" "}
            <span className="font-bold text-lg text-white">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-sm mt-6  text-white">
            Don't have an account?{" "}
            <NavLink to="/register" className=" text-white">
              Register Now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
