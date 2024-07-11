'use client';
import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client'; // Import Socket type from socket.io-client
import ChatWindow from '../components/chat/ChatWindow';
import ChatSidebar from '../components/chat/ChatSidebar';
import { BASE_URL } from '@/common/constants';

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]); // Ensure connectedUsers is typed as string[]
  const [typingUsers, setTypingUsers] = useState<string[]>([]); // Ensure typingUsers is typed as string[]
  const socketRef = useRef<Socket>(); // Specify the type for socketRef.current

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = Cookies.get('accessToken');

    if (storedUser && accessToken) {
      setIsAuthenticated(true);
      const socket = io(BASE_URL, {
        timeout: 1000,
        autoConnect: true,
        auth: {
          token: accessToken
        }
      });

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on('users', (users: string[]) => { // Ensure users is typed as string[]
        setConnectedUsers(users);
      });

      socket.on('typing', ({ username, isTyping }: { username: string, isTyping: boolean }) => { // Ensure username is typed as string and isTyping as boolean
        setTypingUsers(prevTypingUsers => {
          if (isTyping && !prevTypingUsers.includes(username)) {
            return [...prevTypingUsers, username];
          } else if (!isTyping) {
            return prevTypingUsers.filter(user => user !== username);
          }
          return prevTypingUsers;
        });
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
  }, []);

  const handleTyping = (isTyping: boolean) => {
    if (socketRef.current) {
      socketRef.current.emit('typing', isTyping);
    }
  };

  if (!isAuthenticated) {
    return <h1>Please Login</h1>;
  }

  return (
    <div className="h-screen flex">
      <title>Chat App</title>
      <ChatSidebar connectUsers={connectedUsers} />
      <div className="w-1/4 border-r p-4">
        {/* <h2>Connected Users</h2>
        <ul>
          {connectedUsers.map((user, index) => (
            <li key={index}>{user} - <span className="text-green-500">Online</span></li>
          ))}
        </ul> */}
        <h3>Typing Users</h3>
        <ul>
          {typingUsers.map((user, index) => (
            <li key={index}>{user} is typing...</li>
          ))}
        </ul>
      </div>
      <ChatWindow onTyping={handleTyping} />
    </div>
  );
};

export default Chat;
