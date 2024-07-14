'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/common/constants";
import UserCard from "../components/card/UserCard";
import axiosInstance from "@/common/axiosInstance";

const User: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/user/all`);
        setUsers(response.data.response_data.data);
      } catch (error: any) {
        setError(error.message);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user: any, idx: number) => (
          <UserCard user={user} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default User;
