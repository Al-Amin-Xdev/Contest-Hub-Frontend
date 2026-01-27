import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth"; // your custom auth hook
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // current logged in user
  const [contests, setContests] = useState([]);
  const [editingContest, setEditingContest] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const userEmail = user?.email;
  const userRole = user?.role; // e.g., "admin" or "creator"


  // Getting all the contests and filtering them against user email 

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axiosSecure.get("/all-contests");
        const allContests = response.data;

        // Filter contests created by the current user
        const myContests = allContests.filter(
          (contest) => contest.creatorEmail === userEmail,
        );

        setContests(myContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    if (userEmail) fetchContests();
  }, [userEmail, axiosSecure]);

  // Open edit modal
  const handleEdit = (contest) => {
    setEditingContest(contest);
    setDeadline(new Date(contest.deadline));
    setValue("name", contest.name);
    setValue("image", contest.image);
    setValue("description", contest.description);
    setValue("price", contest.price);
    setValue("prize", contest.prize);
    setValue("taskInstruction", contest.taskInstruction);
    setValue("contestType", contest.contestType);
  };

  // Update contest
  const onSubmit = async (data) => {
    if (!deadline) {
      Swal.fire({
        icon: "error",
        title: "Deadline Required",
        text: "Please select a deadline for the contest!",
      });
      return;
    }

    try {
      const updatedData = { ...data, deadline, creatorEmail: userEmail };
      const response = await axiosSecure.put(
        `/update-contest/${editingContest._id}`,
        updatedData,
      );

      // Update local state
      setContests((prev) =>
        prev.map((c) => (c._id === editingContest._id ? response.data : c)),
      );
      setEditingContest(null);

      Swal.fire({
        icon: "success",
        title: "Contest Updated!",
        text: `Contest "${data.name}" has been updated successfully ✅`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  // Delete contest
  const handleDelete = async (contest) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This contest will be permanently deleted!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(
            `/delete-contest/${contest._id}`,
            {
              data: { requesterEmail: userEmail, requesterRole: userRole },
            },
          );
          setContests((prev) => prev.filter((c) => c._id !== contest._id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Contest has been deleted.",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: error.response?.data?.message || "Something went wrong",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Contests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => {
          const isCreator = contest.creatorEmail === userEmail;
          const canEditOrDelete = isCreator && contest.status === "pending";

          return (
            <div
              key={contest._id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {contest.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  {contest.description}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <span className="font-semibold">Price:</span> ${contest.price}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <span className="font-semibold">Prize:</span> ${contest.prize}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                  <span className="font-semibold">Type:</span>{" "}
                  {contest.contestType}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {new Date(contest.deadline).toLocaleString()}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2 mb-3">
                  {contest.status === "pending" && (
                    <FaTimesCircle className="text-yellow-500" />
                  )}
                  {contest.status === "confirmed" && (
                    <FaCheckCircle className="text-green-500" />
                  )}
                  {contest.status === "rejected" && (
                    <FaTimesCircle className="text-red-500" />
                  )}
                  <span className="capitalize">{contest.status}</span>
                </div>

                {/* Buttons */}
                {canEditOrDelete && (
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleEdit(contest)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contest)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingContest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full p-6 md:p-10 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Edit Contest
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 md:grid-cols-2"
            >
              {/* Name */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Contest Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Image */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Image URL
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  className="input input-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Description */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Price */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Price ($)
                </label>
                <input
                  type="number"
                  {...register("price", { required: true, min: 0 })}
                  className="input input-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Prize */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Prize ($)
                </label>
                <input
                  type="number"
                  {...register("prize", { required: true, min: 0 })}
                  className="input input-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Task Instruction */}
              <div className="col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Task Instruction
                </label>
                <textarea
                  {...register("taskInstruction", { required: true })}
                  className="textarea textarea-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Contest Type */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Contest Type
                </label>
                <select
                  {...register("contestType", { required: true })}
                  className="select select-bordered w-full rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select type</option>
                  <option value="design">Design</option>
                  <option value="writing">Writing</option>
                  <option value="business">Business Idea</option>
                  <option value="gaming">Gaming</option>
                </select>
              </div>
              {/* Deadline */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Deadline
                </label>
                <DatePicker
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="input input-bordered w-full rounded-xl px-3 py-2 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              {/* Buttons */}
              <div className="col-span-2 flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingContest(null)}
                  className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditContest;
