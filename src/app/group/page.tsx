'use client'
import { useEffect, useRef, useState } from "react";
import CreateGroup from "../components/group/CreateGroup";
import { io, Socket } from "socket.io-client";
import Cookies from 'js-cookie';
import { BASE_URL } from "@/common/constants";

interface User {
  id: number;
  unique_id: string;
  username: string;
  email: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
}

const Group = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sendTo, setSendTo] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = Cookies.get('accessToken');

    if (storedUser && accessToken) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      const socket = io(BASE_URL, {
        timeout: 1000,
        autoConnect: true,
        auth: {
          token: accessToken,
          username: JSON.parse(storedUser).username,
        },
      });

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on('token-expired', () => {
        setIsAuthenticated(false);
        alert('Session expired. Please log in again.');
      });

      socketRef.current = socket;

      return () => {
        socket.disconnect();
      };
    } else {
      setIsAuthenticated(false);
    }
  }, [sendTo]);

  const handleTyping = (isTyping: boolean) => {
    if (socketRef.current) {
      socketRef.current.emit('typing', isTyping);
    }
  };

  if (!isAuthenticated) {
    return <h1>Please Login</h1>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg overflow-hidden md:max-w-xl">
        <div className="px-6 py-8">
          <CreateGroup socket={socketRef.current} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Group;