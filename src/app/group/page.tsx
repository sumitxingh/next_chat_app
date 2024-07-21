'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/common/axiosInstance';
import { BASE_URL } from '@/common/constants';
import Link from 'next/link';
import { getGroupInitials } from '@/common/utils';

interface Group {
  id: number;
  unique_id: string;
  name: string;
  description: string;
  group_pic: string | null;
  conversation_id: string;
  created_at: string;
  created_by: string;
  participants_count: number;
}

const GroupList: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    try {
      const response = await axiosInstance.get('/user/operation/chat/my-groups');
      setGroups(response.data.response_data.data);
    } catch (err: any) {
      setError('Failed to fetch groups.');
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">My Groups</h2>
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg bg-red-100 border border-red-400 text-red-700" role="alert">
          {error}
        </div>
      )}
      <div className="space-y-4">
        {groups.map(group => (
          <Link key={group.unique_id} href={`/group/update/${group.unique_id}`}>
            <div className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out bg-white mb-4">
              <div className="flex items-center space-x-4">
                {group.group_pic ? (
                  <img src={`${BASE_URL}/images/${group.group_pic}`} alt={group.name} className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">{getGroupInitials(group.name)}</div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-600">{group.description}</p>
                  <p className="text-sm text-gray-500">Members: {group.participants_count}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
