import React, { useState, useEffect } from 'react';
import axiosInstance from "@/common/axiosInstance";
import UserIcon from "./UserIcon";

interface ChatSidebarProps {
  connectUsers: string[];
  sendTo: string | null;
  setSendTo: React.Dispatch<React.SetStateAction<string | null>>;
  notifications: { [key: string]: number }; // Add notifications prop
  setNotifications: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>; //
}

interface User {
  id: number;
  username: string;
  email: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ connectUsers, sendTo, setSendTo, notifications, setNotifications }) => {
  const [error, setError] = useState<string | null>(null);
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
    setSendTo(user.username);
    const { } = notifications
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [user.username]: 0, // Set notification count to zero
    }));
  };

  const handlePublicChatClick = () => {
    setSendTo(null); // Set to null for public chat
  };

  return (
    <div className="h-screen w-64 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <button
        onClick={handlePublicChatClick}
        className={`w-full text-center py-2 bg-indigo-500 text-white rounded-md mb-4`}
      >
        Public Chat
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {users.map((user) => (
          <UserIcon
            key={user.id}
            user={user}
            isActive={connectUsers.includes(user.username)}
            isSelected={sendTo === user.username}
            onClick={() => handleUserClick(user)}
            notificationCount={notifications[user.username] || 0} // Pass notification count
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
