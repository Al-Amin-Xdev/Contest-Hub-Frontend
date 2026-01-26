import React, { useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  // Dummy data (replace with API fetch)
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "User" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Creator" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Admin" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "User" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "Creator" },
  ]);

  // Handle role change with confirmation modal
  const handleRoleChange = (userId, newRole) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    Swal.fire({
      title: `Change role for ${user.name}?`,
      text: `Role will change from ${user.role} → ${newRole}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === userId ? { ...u, role: newRole, rejected: newRole !== "Admin" && u.rejected !== true } : u
          )
        );

        Swal.fire({
          icon: "success",
          title: `Role changed to ${newRole}`,
          timer: 1500,
          showConfirmButton: false,
        });

        // TODO: Call backend API to save role change
        console.log(`User ID ${userId} role changed to ${newRole}`);
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Manage Users
      </h2>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full table-fixed border-collapse bg-white dark:bg-slate-800 shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="w-10 text-left p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">#</th>
              <th className="w-1/4 text-left p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">Name</th>
              <th className="w-1/4 text-left p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">Email</th>
              <th className="w-1/6 text-left p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">Role</th>
              <th className="w-1/4 text-left p-4 text-gray-700 dark:text-gray-200 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700 transition`}
              >
                <td className="p-4 text-gray-700 dark:text-gray-200">{index + 1}</td>
                <td className="p-4 text-gray-700 dark:text-gray-200">{user.name}</td>
                <td className="p-4 text-gray-700 dark:text-gray-200">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border rounded-md px-3 py-1 text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  >
                    <option value="User">User</option>
                    <option value="Creator">Creator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 flex flex-wrap justify-end gap-2">
                  <button
                    className={`${
                      user.rejected ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                    } text-white px-3 py-1 rounded-md text-sm transition`}
                    onClick={() => console.log(`${user.rejected ? "Rejected" : "Approved"} User ID ${user.id}`)}
                  >
                    {user.rejected ? "Reject" : "Approve"}
                  </button>
                  {!user.rejected && (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                      onClick={() => console.log(`User ID ${user.id} deleted`)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden mt-6 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">{user.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-300">{user.role}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-200 mb-2">{user.email}</p>
            <div className="flex flex-wrap gap-2 justify-end">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="border rounded-md px-3 py-1 text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
              >
                <option value="User">User</option>
                <option value="Creator">Creator</option>
                <option value="Admin">Admin</option>
              </select>
              <button
                className={`${user.rejected ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"} text-white px-3 py-1 rounded-md text-sm transition`}
                onClick={() => console.log(`${user.rejected ? "Rejected" : "Approved"} User ID ${user.id}`)}
              >
                {user.rejected ? "Reject" : "Approve"}
              </button>
              {!user.rejected && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                  onClick={() => console.log(`User ID ${user.id} deleted`)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
