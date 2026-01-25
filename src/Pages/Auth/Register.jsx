import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../providers/AuthContext";

const Register = () => {
  const { register, setUser, setLoading } = useContext(AuthContext);
  const [loading, setBtnLoading] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setBtnLoading(true);

    const name = event.target.name.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    register(email, password)
      .then((userInfo) => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created ✅",
          timer: 2000,
          showConfirmButton: false,
        });

        updateProfile(userInfo.user, { displayName: name, photoURL })
          .then(() => {
            setUser({
              ...userInfo.user,
              displayName: name,
              photoURL: photoURL,
            });

            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              text: "Profile updated successfully ✅",
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "info",
              title: "Profile Update Failed",
              text: "Profile could not be updated",
              timer: 2000,
              showConfirmButton: false,
            });
          });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setBtnLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Branding / Banner Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-700 to-purple-700 text-white justify-center items-center p-16">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">Join ContestHub 🎉</h1>
          <p className="text-lg opacity-90">
            Create, participate, and manage exciting contests. Showcase your skills, win prizes, and connect with the community.
          </p>
        </div>
      </div>

      {/* Register Form */}
      <div className="flex flex-1 justify-center items-center p-6 bg-gray-50 dark:bg-slate-900">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center mb-6">
            Sign up to start creating and joining contests
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-gray-700 dark:text-gray-200">Profile Photo URL</label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="input input-bordered w-full rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-6">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
