// src/pages/admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import API from "../../api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) return <p className="text-red-600 text-center mt-8">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Registered Users
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
