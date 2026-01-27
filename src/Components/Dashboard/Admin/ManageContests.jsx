import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [contests, setContests] = useState([]);
  const [viewContest, setViewContest] = useState(null);

  // ================= FETCH CONTESTS =================
  useEffect(() => {
    axiosSecure.get("/all-contests").then((res) => {
      setContests(res.data);
    });
  }, [axiosSecure]);

  // ================= APPROVE / REJECT =================
  const handleApproveReject = async (id, status) => {
    try {
      await axiosSecure.put(`/approve-contest/${id}`, {
        status,
        adminEmail: user.email,
      });

      Swal.fire("Success!", `Contest ${status}`, "success");

      setContests((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete contest?",
      text: "This action is permanent",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/delete-contest/${id}`, {
        data: {
          requesterEmail: user.email,
          requesterRole: "admin", // force admin dashboard
        },
      });

      Swal.fire("Deleted!", "Contest removed", "success");

      setContests((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Contests</h2>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-800 rounded-xl shadow">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="p-4 text-left text-white font-bold">#</th>
              <th className="p-4 text-left text-white font-bold">Title</th>
              <th className="p-4 text-left text-white font-bold">Creator</th>
              <th className="p-4 text-left text-white font-bold">Status</th>
              <th className="p-4 text-right text-white font-bold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id} className="border-b text-white font-bold">
                <td className="p-4 text-white font-bold">{index + 1}</td>
                <td className="p-4 text-white font-bold">{contest.name}</td>
                <td className="p-4 text-white font-bold">{contest.creatorEmail}</td>
                <td className="p-4 text-white font-bold ">{contest.status}</td>

                <td className="p-4 flex gap-2 justify-end">
                  <button
                    onClick={() => setViewContest(contest)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() =>
                      handleApproveReject(contest._id, "confirmed")
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleApproveReject(contest._id, "rejected")
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {viewContest && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-3">{viewContest.name}</h2>
            <img
              src={viewContest.image}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <p><b>Creator:</b> {viewContest.creatorEmail}</p>
            <p><b>Description:</b> {viewContest.description}</p>
            <p><b>Type:</b> {viewContest.contestType}</p>
            <p><b>Price:</b> ${viewContest.price}</p>
            <p><b>Prize:</b> ${viewContest.prize}</p>
            <p><b>Status:</b> {viewContest.status}</p>

            <button
              onClick={() => setViewContest(null)}
              className="mt-5 w-full bg-gray-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContests;
