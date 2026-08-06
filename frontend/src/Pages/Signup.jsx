
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { signupUser } from "../features/auth/authSlice";
const Signup = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");


  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/signin")
    }
  }, [user, navigate])


  const handleSignup = (e) => {
    e.preventDefault();

    dispatch(signupUser({
      username,
      email,
      password,

    })
    )
  }





  return (
    <>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-200">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
            <p className="text-gray-500 mt-2">
              Join us and start your journey.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Username */}
            <div className="relative group">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder=""
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 outline-none focus:border-blue-500 transition-all duration-300"
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-2 text-sm text-gray-500 transition-all
              peer-placeholder-shown:text-base
              peer-placeholder-shown:top-4
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-blue-600"
              >
                Username
              </label>
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 outline-none focus:border-blue-500 transition-all duration-300"
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
            <div className="relative group">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-6 pb-2 outline-none focus:border-blue-500 transition-all duration-300"
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

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-300"
            >
              Sign Up
            </button>

            {error && <p>{error}</p>}

            {/* Footer */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                Already have an account?
              </span>

              <Link
                to="/signin"
                className="font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;