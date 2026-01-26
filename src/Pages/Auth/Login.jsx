// import { useLocation, useNavigate, NavLink } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FcGoogle } from "react-icons/fc";
// import { useContext, useState } from "react";
// import AuthContext from "../../providers/AuthContext";
// import useAxios from "../../Hooks/useAxios";

// const Login = () => {
//   const { login, PopUpLogIn, resetPassword, setUser } = useContext(AuthContext);
//   const axiosInstance = useAxios();
//   const [loading, setLoading] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const firebaseErrorMap = {
//     "auth/wrong-password": "Incorrect password",
//     "auth/user-not-found": "User not found",
//     "auth/invalid-email": "Invalid email address",
//   };

//   // Normal email/password login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const form = e.target; // form reference
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       const userInfo = await login(email, password);
//       setUser(userInfo.user);

//       Swal.fire({
//         icon: "success",
//         title: "Login Successful",
//         text: `Welcome back, ${userInfo.user.displayName || "Contestant"}! ✅`,
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       form.reset(); // reset form after login
//       navigate(location?.state || "/");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: firebaseErrorMap[error.code] || "Login failed. Please try again",
//         timer: 2500,
//         showConfirmButton: false,
//       });
//       console.error(error.code, error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Google login with role check
//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       const userInfo = await PopUpLogIn();
//       const user = userInfo.user;

//       // 1️⃣ Check if user already exists in backend
//       let role;
//       try {
//         const { data } = await axiosInstance.get(`/user-role/${user.uid}`);
//         role = data?.role; // existing role
//       } catch {
//         console.log("No existing user role found, need to select role.");
//       }

//       // 2️⃣ Show role selection modal only if role not found
//       if (!role) {
//         const { value: selectedRole } = await Swal.fire({
//           title: 'Select Role',
//           input: 'radio',
//           inputOptions: {
//             user: 'User',
//             creator: 'Contest Creator',
//           },
//           inputValidator: (value) => value ? null : 'You need to choose a role!',
//           showCancelButton: true,
//           confirmButtonText: 'Continue',
//         });

//         if (!selectedRole) {
//           setLoading(false);
//           return; // user cancelled
//         }

//         role = selectedRole;

//         // 3️⃣ Save new user with role in backend
//         await axiosInstance.post("/user-role", {
//           uid: user.uid,
//           name: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//           role,
//         });
//       }

//       // 4️⃣ Save user in context with role
//       setUser({ ...user, role });

//       Swal.fire({
//         icon: "success",
//         title: "Login Successful",
//         text: `Signed in with Google as ${role}! ✅`,
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       navigate(location?.state || "/");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Google Sign-In Failed",
//         text: error.message,
//         timer: 2500,
//         showConfirmButton: false,
//       });
//       console.error(error.code, error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Password reset
//   const handleResetPassword = async () => {
//     const { value: email } = await Swal.fire({
//       title: "Reset Password",
//       input: "email",
//       inputLabel: "Enter your registered email",
//       inputPlaceholder: "you@example.com",
//       showCancelButton: true,
//     });

//     if (email) {
//       try {
//         await resetPassword(email);
//         Swal.fire({
//           icon: "success",
//           title: "Email Sent ✅",
//           text: `Password reset email sent to ${email}`,
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error.message,
//           timer: 3000,
//           showConfirmButton: false,
//         });
//         console.error(error.code, error.message);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       {/* Branding / Banner */}
//       <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-700 to-purple-700 text-white justify-center items-center p-16">
//         <div className="max-w-md">
//           <h1 className="text-5xl font-bold mb-4">Welcome Back 🎉</h1>
//           <p className="text-lg opacity-90">
//             Log in to ContestHub to participate, create, and manage exciting contests.  
//             Track your wins and showcase your achievements to the community.
//           </p>
//         </div>
//       </div>

//       {/* Login Form */}
//       <div className="flex flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-slate-900">
//         <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10">
//           <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
//             Sign In
//           </h2>
//           <p className="text-sm text-gray-500 dark:text-gray-300 text-center mb-6">
//             Enter your credentials to access your dashboard
//           </p>

//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="label text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 required
//                 className="input input-bordered w-full rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="label text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 required
//                 className="input input-bordered w-full rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white"
//               />
//             </div>

//             <div className="flex justify-end text-sm mb-2">
//               <button
//                 type="button"
//                 onClick={handleResetPassword}
//                 className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="btn w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="divider my-6 text-gray-400">OR</div>

//           <button
//             onClick={handleGoogleLogin}
//             disabled={loading}
//             className="btn btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition text-white"
//           >
//             <FcGoogle size={22} />
//             Continue with Google
//           </button>

//           <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
//             Don't have an account?{" "}
//             <NavLink
//               to="/register"
//               className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
//             >
//               Register Now
//             </NavLink>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useLocation, useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../providers/AuthContext";
import useAxios from "../../Hooks/useAxios";
import useRole from "../../Hooks/useRole";

const Login = () => {
  const { login, PopUpLogIn, setUser } =
    useContext(AuthContext);

  const axiosInstance = useAxios();
  const { role, loading: roleLoading } = useRole();

  const [loading, setLoading] = useState(false);

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
        text: `Welcome back, ${
          userInfo.user.displayName || "Contestant"
        }! ✅`,
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      // ❌ no navigate here (handled by role effect)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          firebaseErrorMap[error.code] ||
          "Login failed. Please try again",
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
        const { data } = await axiosInstance.get(
          `/user-role/${user.uid}`
        );
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-700 to-purple-700 text-white justify-center items-center p-16">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">Welcome Back 🎉</h1>
          <p className="text-lg opacity-90">
            Log in to ContestHub to participate, create, and manage
            exciting contests.
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-slate-900">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
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

          <div className="divider my-6">OR</div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="btn btn-outline w-full flex gap-2"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600">
              Register Now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
