'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../components/loading/LoadingScreen";
import { BASE_URL } from "@/common/constants";
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

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push("/auth");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/auth"); // Redirect to login if no user is found
    }
  }, [router]);

  if (!user) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center mb-4">
          {user.profile_pic ? (
            <img
              src={`${BASE_URL}/images/${user.profile_pic}`}
              alt={`${user.username}'s profile`}
              className="h-24 w-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mb-4">
              {user.username[0].toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="text-left space-y-2">
          {/* <p><strong>ID:</strong> {user.id}</p> */}
          {/* <p><strong>Unique ID:</strong> {user.unique_id}</p> */}
          <p><strong>Is Active:</strong> {user.is_active ? "Yes" : "No"}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
          {/* <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p> */}
        </div>
        <button
          onClick={handleSignOut}
          className="mt-6 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
