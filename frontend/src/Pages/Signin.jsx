import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signinUser } from "../features/auth/authSlice";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  const handleSignin = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      signinUser({
        email,
        password,
      }),
    );

    if (signinUser.fulfilled.match(result)) {
      const user = result.payload;

      if (user.role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-200 dark:bg-black">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSignin}>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 outline-none transition-all duration-300 focus:border-blue-600"
            />

            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all
              peer-placeholder-shown:text-base
              peer-placeholder-shown:top-4
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-600"
            >
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 outline-none transition-all duration-300 focus:border-blue-600"
            />

            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all
              peer-placeholder-shown:text-base
              peer-placeholder-shown:top-4
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-600"
            >
              Password
            </label>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold transition-all duration-300 hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Don't have an account?</span>

            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
