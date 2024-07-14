'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/common/axiosInstance';
import { BASE_URL } from '@/common/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

interface User {
  id: number;
  unique_id: string;
  username: string;
  profile_pic: string | null;
  email: string;
  reset_token: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ProfileUpdateForm = () => {
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const accessToken = Cookies.get('accessToken');
    if (userInfo && accessToken) {
      const user = JSON.parse(userInfo);
      if (user) {
        setValue('username', user.username);
        setProfilePic(user.profile_pic);
      }
    } else {
      router.push('/auth');
    }
  }, [setValue, router]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('username', data.username);
    if (data.password) {
      formData.append('password', data.password);
    }

    // const profilePicFile = data.profile_pic && data.profile_pic[0];
    if (selectedFile) {
      formData.append('profile_pic', selectedFile);
    }

    // Log the formData contents for debugging
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await axiosInstance.put(`${BASE_URL}/user/auth/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        const user: User = response.data.response_data.data;
        setApiSuccess(response.data?.messages?.success_message ?? 'Profile updated successfully');
        setProfilePic(user?.profile_pic);
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const picUrl = URL.createObjectURL(file);
      setProfilePic(picUrl);
      setSelectedFile(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Update Profile</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {apiError && <p className="text-sm text-red-500">{apiError}</p>}
        {apiSuccess && <p className="text-sm text-green-500">{apiSuccess}</p>}

        <div className="flex flex-col items-center">
          {profilePic ? (
            <img
              src={profilePic.startsWith('blob:') ? profilePic : `${BASE_URL}/images/${profilePic}`}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
              U
            </div>
          )}
          <input
            id="profile_pic"
            type="file"
            accept="image/*"
            {...register('profile_pic')}
            onChange={handleProfilePicChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById('profile_pic')?.click()}
          >
            <FontAwesomeIcon icon={faImage} className="text-3xl text-indigo-600 hover:text-indigo-800 transition duration-300 mr-2" />
            <p className='className="mt-1 text-sm text-gray-900"'>upload profile pic</p>
          </button>
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Username is required' })}
            className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username?.message?.toString()}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="Enter your new password"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password?.message?.toString()}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
