
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AddContest = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [deadline, setDeadline] = useState(null);

  const onSubmit = (data) => {
    if (!deadline) {
      Swal.fire({
        icon: "error",
        title: "Deadline Required",
        text: "Please select a deadline for the contest!",
      });
      return;
    }

    const contestData = { ...data, deadline };
    console.log("Contest Submitted:", contestData);

    Swal.fire({
      icon: "success",
      title: "Contest Added!",
      text: `Contest "${data.name}" has been added successfully ✅`,
      timer: 2000,
      showConfirmButton: false,
    });

    reset();
    setDeadline(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Add New Contest
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">

          {/* Name */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Contest Name
            </label>
            <input
              type="text"
              placeholder="Enter contest name"
              {...register("name", { required: "Contest name is required" })}
              className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Contest Image URL
            </label>
            <input
              type="text"
              placeholder="Paste image URL"
              {...register("image", { required: "Image URL is required" })}
              className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              placeholder="Describe your contest"
              {...register("description", { required: "Description is required" })}
              className="textarea textarea-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Entry Price ($)
            </label>
            <input
              type="number"
              placeholder="0"
              {...register("price", { required: "Price is required", min: 0 })}
              className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* Prize Money */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Prize Money ($)
            </label>
            <input
              type="number"
              placeholder="0"
              {...register("prize", { required: "Prize money is required", min: 0 })}
              className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.prize && <p className="text-red-500 text-sm mt-1">{errors.prize.message}</p>}
          </div>

          {/* Task Instruction */}
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Task Instruction
            </label>
            <textarea
              placeholder="Instructions for participants"
              {...register("taskInstruction", { required: "Task instructions are required" })}
              className="textarea textarea-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.taskInstruction && <p className="text-red-500 text-sm mt-1">{errors.taskInstruction.message}</p>}
          </div>

          {/* Contest Type */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Contest Type
            </label>
            <select
              {...register("contestType", { required: "Contest type is required" })}
              className="select select-bordered w-full rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select type</option>
              <option value="design">Design</option>
              <option value="writing">Writing</option>
              <option value="business">Business Idea</option>
              <option value="gaming">Gaming</option>
            </select>
            {errors.contestType && <p className="text-red-500 text-sm mt-1">{errors.contestType.message}</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="Pp"
              className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
              placeholderText="Select deadline"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transform transition-all shadow-lg"
            >
              Add Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContest;


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // your secured Axios

// const AddContest = () => {
//   const axios = useAxiosSecure(); // Firebase-secured Axios instance
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [deadline, setDeadline] = useState(null);

//   const onSubmit = async (data) => {
//     if (!deadline) {
//       Swal.fire({
//         icon: "error",
//         title: "Deadline Required",
//         text: "Please select a deadline for the contest!",
//       });
//       return;
//     }

//     const contestData = { ...data, deadline };

//     try {
//       // Send contest data to backend
//       const response = await axios.post("/all-contests", contestData);

//       Swal.fire({
//         icon: "success",
//         title: "Contest Added!",
//         text: `Contest "${response.data.name}" has been added successfully ✅`,
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       reset();
//       setDeadline(null);
//     } catch (error) {
//       console.error("Add Contest Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: "Failed to add contest. Please try again!",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
//       <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12">
//         <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
//           Add New Contest
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">

//           {/* Name */}
//           <div className="col-span-2">
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Contest Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter contest name"
//               {...register("name", { required: "Contest name is required" })}
//               className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//           </div>

//           {/* Image */}
//           <div className="col-span-2">
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Contest Image URL
//             </label>
//             <input
//               type="text"
//               placeholder="Paste image URL"
//               {...register("image", { required: "Image URL is required" })}
//               className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             />
//             {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
//           </div>

//           {/* Description */}
//           <div className="col-span-2">
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Description
//             </label>
//             <textarea
//               placeholder="Describe your contest"
//               {...register("description", { required: "Description is required" })}
//               className="textarea textarea-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             />
//             {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Entry Price ($)
//             </label>
//             <input
//               type="number"
//               placeholder="0"
//               {...register("price", { required: "Price is required", min: 0 })}
//               className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             />
//             {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//           </div>

//           {/* Prize Money */}
//           <div>
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Prize Money ($)
//             </label>
//             <input
//               type="number"
//               placeholder="0"
//               {...register("prize", { required: "Prize money is required", min: 0 })}
//               className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             />
//             {errors.prize && <p className="text-red-500 text-sm mt-1">{errors.prize.message}</p>}
//           </div>

//           {/* Task Instruction */}
//           <div className="col-span-2">
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Task Instruction
//             </label>
//             <textarea
//               placeholder="Instructions for participants"
//               {...register("taskInstruction", { required: "Task instructions are required" })}
//               className="textarea textarea-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             />
//             {errors.taskInstruction && <p className="text-red-500 text-sm mt-1">{errors.taskInstruction.message}</p>}
//           </div>

//           {/* Contest Type */}
//           <div>
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Contest Type
//             </label>
//             <select
//               {...register("contestType", { required: "Contest type is required" })}
//               className="select select-bordered w-full rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//             >
//               <option value="">Select type</option>
//               <option value="design">Design</option>
//               <option value="writing">Writing</option>
//               <option value="business">Business Idea</option>
//               <option value="gaming">Gaming</option>
//             </select>
//             {errors.contestType && <p className="text-red-500 text-sm mt-1">{errors.contestType.message}</p>}
//           </div>

//           {/* Deadline */}
//           <div>
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Deadline
//             </label>
//             <DatePicker
//               selected={deadline}
//               onChange={(date) => setDeadline(date)}
//               showTimeSelect
//               dateFormat="Pp"
//               className="input input-bordered w-full rounded-xl px-4 py-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
//               placeholderText="Select deadline"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-2">
//             <button
//               type="submit"
//               className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transform transition-all shadow-lg"
//             >
//               Add Contest
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddContest;
