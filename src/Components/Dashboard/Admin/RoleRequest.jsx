import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import AuthContext from "../../../providers/AuthContext";

const RoleRequest = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch pending role requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get("/role-requests");
        setRequests(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load role requests", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axios]);





  // Approve request
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve role request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });
    console.log(id, user.uid)

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(`/role-requests/approve/${id}`, {
        adminUid: user.uid,
      });

      setRequests((prev) => prev.filter((r) => r._id !== id));
      Swal.fire("Approved", "Role updated successfully", "success");
    } catch {
      Swal.fire("Error", "Approval failed", "error");
    }
  };




  // Reject request
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject role request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(`/role-requests/reject/${id}`, {
        adminUid: user.uid,
      });

      setRequests((prev) => prev.filter((r) => r._id !== id));
      Swal.fire("Rejected", "Request rejected", "success");
    } catch {
      Swal.fire("Error", "Rejection failed", "error");
    }
  };







  if (loading) {
    return <div className="p-6 text-center">Loading requests...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Role Change Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-slate-800 rounded-xl shadow">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                <th className="p-4 text-left text-white font-bold">User</th>
                <th className="p-4 text-left text-white font-bold">Current Role</th>
                <th className="p-4 text-left text-white font-bold">Requested Role</th>
                <th className="p-4 text-left text-white font-bold">Reason</th>
                <th className="p-4 text-center text-white font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-4">
                    <div className="font-medium text-white">{r.name}</div>
                    <div className="text-sm text-gray-500 text-white">{r.email}</div>
                  </td>
                  <td className="p-4 text-white">{r.currentRole}</td>
                  <td className="p-4 font-semibold text-blue-600 text-yellow-400">
                    {r.requestedRole}
                  </td>
                  <td className="p-4 text-white">{r.reason}</td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(r._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(r._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
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

export default RoleRequest;