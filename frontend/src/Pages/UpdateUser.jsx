import React, { useEffect, useState } from "react";
import { Camera, User } from "lucide-react";
import { updateUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
      }));

      if (user.profilePicture?.url) {
        setPreview(user.profilePicture.url);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // console.log(e.target.value);
    // console.log(e.target.name);
    // console.log(e.target.files[0]);

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
        }));

        setPreview(URL.createObjectURL(file));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(formData));

    setFormData({
      username: "",
      email: "",
      password: "",
      profilePicture: null,
    });
  };

  return (
    <section>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Profile</h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Update your profile information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 sm:h-36 sm:w-36">
              {/* TODO:
                  Show selected profile image here.
                  Otherwise show User icon.
              */}

              {preview ? (
                <img src={preview} alt="Profile" />
              ) : (
                <User size={55} className="text-gray-400" />
              )}
            </div>

            {/* Image Upload */}
            <label
              htmlFor="profilePicture"
              className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Camera size={18} />

              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
                name="profilePicture"
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <form
          className="flex flex-col items-center space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <div className="w-full sm:w-[80%]">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              value={formData.value}
              onChange={handleChange}
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          {/* Email */}
          <div className="w-full sm:w-[80%]">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              value={formData.value}
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          {/* Password */}
          <div className="w-full sm:w-[80%]">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              New Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.value}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white dark:focus:ring-white"
            />
          </div>

          {/* Update Button */}
          <div className="flex w-full justify-center pt-2">
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-8 py-3 font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateUser;
