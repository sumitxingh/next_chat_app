import { BASE_URL } from '@/common/constants';
import React from 'react';

interface UserCardProps {
  user: {
    id: number;
    username: string;
    email: string;
    profile_pic: string | null;
    created_at: string;
    updated_at: string;
  }
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div
      key={user.id}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          {user.profile_pic ? (
            <img
              src={`${BASE_URL}/images/${user.profile_pic}`}
              alt={`${user.username}'s profile`}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
              {user.username[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="text-gray-500">
        <p>created at: <span className="text-gray-700">{new Date(user.created_at).toLocaleString()}</span></p>
        {/* <p>Updated At: <span className="text-gray-700">{new Date(user.updated_at).toLocaleString()}</span></p> */}
      </div>
    </div>
  );
};

export default UserCard;
