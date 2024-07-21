import React, { useState, useEffect } from 'react';
import axiosInstance from "@/common/axiosInstance";
import UserIcon from "./UserIcon";
import { BASE_URL } from '@/common/constants';
import { getGroupInitials } from '@/common/utils';

interface ChatSidebarProps {
  connectUsers: string[];
  sendTo: string | null;
  setSendTo: React.Dispatch<React.SetStateAction<string | null>>;
  notifications: { [key: string]: number };
  setNotifications: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

interface User {
  id: number;
  username: string;
  email: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

interface Group {
  id: number;
  name: string;
  group_pic: string | null;
  description: string | null;
  created_by: string;
  created_at: string;
  members: User[]; // Assuming groups have users as members
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ connectUsers, sendTo, setSendTo, notifications, setNotifications }) => {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/user/all`);
        setUsers(response.data.response_data.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get(`/user/operation/chat/groups`);
        setGroups(response.data.response_data.data); // Adjust based on API response
      } catch (error: any) {
        console.error('Error fetching groups:', error.message);
      }
    };

    fetchGroups();
    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSendTo(user.username);
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [user.username]: 0,
    }));
  };

  const handleGroupClick = (group: Group) => {
    setSendTo(group.name); // Adjust based on how you want to identify the group
    setNotifications(prevNotifications => ({
      ...prevNotifications,
      [group.name]: 0,
    }));
  };

  const handlePublicChatClick = () => {
    setSendTo(null);
  };


  return (
    <div className="h-screen w-64 bg-slate-200 p-4">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <button
        onClick={handlePublicChatClick}
        className={`w-full text-center py-2 bg-indigo-500 text-white rounded-md mb-4`}
      >
        Public Chat
      </button>
      {error && <p className="text-red-500">{error}</p>}

      {/* Users Section */}
      <h3 className="text-md font-semibold mb-2">Users</h3>
      <ul>
        {users.map((user) => (
          <UserIcon
            key={user.id}
            user={user}
            isActive={connectUsers.includes(user.username)}
            isSelected={sendTo === user.username}
            onClick={() => handleUserClick(user)}
            notificationCount={notifications[user.username] || 0}
          />
        ))}
      </ul>

      {/* Groups Section */}
      {groups.length > 0 && (
        <>
          <h3 className="text-md font-semibold mt-6 mb-2">Groups</h3>
          <ul>
            {groups.map((group) => (
              <li
                key={group.id}
                className={`p-2 mb-2 cursor-pointer rounded-md ${sendTo === group.name ? 'bg-indigo-200' : 'hover:bg-gray-200'}`}
                onClick={() => handleGroupClick(group)}
              >
                <div className="flex items-center">
                  {group.group_pic ? (
                    <img
                      src={`${BASE_URL}/images/${group.group_pic}`}
                      alt={group.name}
                      className="h-10 w-10 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      {getGroupInitials(group.name)}
                    </div>
                  )}
                  <span className="font-medium">{group.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
