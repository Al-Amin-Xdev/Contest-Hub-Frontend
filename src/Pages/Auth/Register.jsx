import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import AuthContext from "../../Providers/AuthContext";
import { useContext, useState } from "react";

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
            setUser({ ...userInfo, displayName: name, photoURL });

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
      {/* Branding Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-emerald-700 text-white justify-center items-center p-16">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">Join the Agro Community 🌱</h1>
          <p className="text-lg opacity-90">
            Post your crops, browse listings, and collaborate directly with farmers, traders, and consumers.
          </p>
        </div>
      </div>

      {/* Register Form */}
      <div className="flex flex-1 justify-center items-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign up to start managing your crops and connecting with the community.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="label text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="label text-sm font-medium">Profile Photo URL</label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                required
                className="input input-bordered w-full rounded-lg px-4 py-2"
              />
            </div>

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
                minLength={6}
                className="input input-bordered w-full rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral w-full mt-4 py-3 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-medium hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
