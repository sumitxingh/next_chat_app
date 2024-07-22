'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Socket } from 'socket.io-client';
import { BASE_URL } from '@/common/constants';
import axiosInstance from '@/common/axiosInstance';

interface User {
  id: number;
  unique_id: string;
  username: string;
  email: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateGroupProps {
  socket: Socket | null;
  currentUser: User | null;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ socket, currentUser }) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // const onSubmit = async (data: any) => {
  //   if (!currentUser) {
  //     setError("You need to be logged in to create a group.");
  //     return;
  //   }

  //   try {
  //     console.log(data)
  //     socket?.emit('create-group', data);
  //   } catch (err) {
  //     setError("Failed to create group.");
  //   }
  // };

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/user/operation/create-group`, data);
      const group = response.data.response_data.data;

      setPopupMessage("Group created successfully");
      setPopupType("success");

      // Automatically hide the pop-up message after 5 seconds
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 5000);
      reset();

    } catch (error: any) {
      console.error("Register failed:", error);

      if (error.response && error.response.data) {
        setPopupMessage(`${error.response.data.error}: ${error.response.data.message}`);
      } else {
        setPopupMessage("An unexpected error occurred.");
      }

      setPopupType("error");

      // Automatically hide the pop-up message after 5 seconds
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 5000);
    }
  };



  socket?.on('group-created', (group: any) => {
    setPopupMessage(`${group.name} group created successfully.`);
    setPopupType("success");

    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 5000);
    reset();
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const picUrl = URL.createObjectURL(file);
      setImagePreview(picUrl);
      setImage(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Create New Group</h2>
      {popupMessage && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg
          ${popupType === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"}`}
          role="alert"
        >
          {popupMessage}
        </div>
      )}
      {error && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg bg-red-100 border border-red-400 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex flex-col items-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Group preview"
              className="h-32 w-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
              No Image
            </div>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById('image')?.click()}
          >
            <FontAwesomeIcon icon={faImage} className="text-3xl text-indigo-600 hover:text-indigo-800 transition duration-300 mr-2" />
            <p className="mt-1 text-sm text-gray-900">Upload group image</p>
          </button>
        </div> */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            {...register("name", { required: "Group name is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter group name"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message?.toString()}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            autoComplete="description"
            {...register("description")}
            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter group description (optional)"
          />
        </div>

        <div>
          <label htmlFor="creatorId" className="block text-sm font-medium text-gray-700">
            Creator ID
          </label>
          <input
            id="creatorId"
            type="text"
            autoComplete="creatorId"
            required
            value={currentUser?.unique_id || ''}
            {...register("creatorId", { required: "Creator ID is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${errors.creatorId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter your user ID"
            readOnly
          />
          {errors.creatorId && <p className="text-sm text-red-500 mt-1">{errors.creatorId.message?.toString()}</p>}
        </div>



        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
