"use client";
import axiosInstance from "@/common/axiosInstance";
import { BASE_URL } from "@/common/constants";
import { useEffect, useState } from "react";
import UserIcon from "./UserIcon";

interface ChatSidebarProps {
  connectUsers: string[];
}

interface User {
  id: number;
  username: string;
  email: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}



const ChatSidebar: React.FC<ChatSidebarProps> = ({ connectUsers }) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

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

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="h-screen w-64 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {users.map((user) => (
          <UserIcon
            key={user.id}
            user={user}
            isActive={connectUsers.includes(user.username)}
            isSelected={selectedUser?.id === user.id}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
