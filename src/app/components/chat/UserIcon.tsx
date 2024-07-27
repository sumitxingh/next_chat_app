import { BASE_URL } from "@/common/constants";

interface User {
  id: number;
  username: string;
  email: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

interface UserItemProps {
  user: User;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
  notificationCount: number; // New prop for notification count
}

const UserIcon: React.FC<UserItemProps> = ({ user, isActive, isSelected, onClick, notificationCount }) => {
  return (
    <li
      className={`relative py-2 px-4 cursor-pointer flex items-center md:flex-row flex-col ${isSelected ? 'bg-indigo-200' : ''} `}
      onClick={onClick}
    >
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 ml-auto md:order-1 bg-red-500 text-white rounded-full py-1 px-2 text-sm">
          {notificationCount}
        </span>
      )}
      <div className="relative">
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
        {isActive && (
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <span className="ml-2">{user.username}</span>
    </li>
  );
};

export default UserIcon;
