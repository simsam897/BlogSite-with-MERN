import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Mail, User } from "lucide-react";

import { getAllUsers, deleteUser } from "../../features/auth/authSlice";

const AllUsers = () => {
  const dispatch = useDispatch();

  
  const { users = [], loading, error } = useSelector((state) => state.auth);

  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Delete user
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (confirmDelete) {
      await dispatch(deleteUser(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>

          <p className="mt-2 text-gray-500">
            View and manage all registered users.
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">{error}</p>
        )}

        {/* Users */}
        {loading && users.length === 0 ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <div className="rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm">
            No users found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
              >
                {/* User Information */}
                <div className="flex min-w-0 items-center gap-3">
                  {/* Profile Image */}
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User size={24} />
                    </div>
                  )}

                  {/* User Details */}
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-800">
                      {user.username}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail size={14} />

                      <span className="truncate">{user.email}</span>
                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                      Role: {user.role}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  disabled={loading}
                  className="rounded-md p-2 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                  title="Delete User"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
