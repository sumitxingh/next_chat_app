// pages/user.tsx
'use client';

import { useEffect, useState } from "react";
import UserCard from "../components/card/UserCard";
import axiosInstance from "@/common/axiosInstance";
import SkeletonUserList from "../components/card/UserCardSekeltonLoader/SkeletonUserList";

const User: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/user/all`);
        setUsers(response.data.response_data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User List</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          <p>Error: {error}</p>
        </div>
      )}
      {loading ? (
        <SkeletonUserList /> // Show skeleton loader while loading
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user: any, idx: number) => (
            <UserCard user={user} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
