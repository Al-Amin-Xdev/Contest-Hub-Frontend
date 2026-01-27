import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import AuthContext from "../../../providers/AuthContext";

const ManageUsers = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/user-roles"); 
        setUsers(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load users", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axios]);

  // Delete a user
  const handleDelete = async (uid) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/user-role/${uid}`);
      setUsers((prev) => prev.filter((u) => u.uid !== uid));
      Swal.fire("Deleted!", "User has been deleted.", "success");
    } catch {
      Swal.fire("Error", "Admin can not be deleted", "error");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-slate-800 rounded-xl shadow">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                <th className="p-4 text-left text-white font-bold">User</th>
                <th className="p-4 text-left text-white font-bold">Email</th>
                <th className="p-4 text-left text-white font-bold">Role</th>
                <th className="p-4 text-center text-white font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid} className="border-t">
                  {/* User Name + Photo */}
                  <td className="p-4 flex items-center gap-3">
                    {u.photoURL ? (
                      <img
                        src={u.photoURL}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                        {u.name?.[0] || "U"}
                      </div>
                    )}
                    <span className="font-medium text-white">{u.name}</span>
                  </td>

                  {/* Email */}
                  <td className="p-4 text-white">{u.email}</td>

                  {/* Role */}
                  <td className="p-4 text-white font-semibold">{u.role}</td>

                  {/* Delete Button */}
                  <td className="p-4 flex justify-center">
                    <button
                      onClick={() => handleDelete(u.uid)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

