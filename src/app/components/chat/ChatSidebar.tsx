"use client";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  avatar: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', avatar: 'https://example.com/johndoe.jpg' },
  { id: 2, name: 'Jane Doe', avatar: 'https://example.com/janedoe.jpg' },
  { id: 3, name: 'Bob Smith', avatar: 'https://example.com/bobsmith.jpg' },
  //...
];

const UserItem = ({ user, isSelected, onClick }: { user: User; isSelected: boolean; onClick: () => void }) => {
  return (
    <li
      key={user.id}
      className={`py-2 px-4 cursor-pointer flex items-center ${isSelected ? 'bg-gray-300' : ''}`}
      onClick={onClick}
    >
      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
      <span>{user.name}</span>
    </li>
  );
};

const ChatSidebar = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="h-screen w-64 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isSelected={selectedUser?.id === user.id}
            onClick={() => handleUserClick(user)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
