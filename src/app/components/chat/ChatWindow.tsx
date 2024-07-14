import axiosInstance from '@/common/axiosInstance';
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

// Define prop types for ChatWindow component
interface ChatWindowProps {
  onTyping: (isTyping: boolean) => void;
  socket: Socket | null; // Accept socket prop
  currentUserName: string;
  sendTo: string | null;
}

interface Message {
  from: string;
  to: string;
  message: string;
  send_on: Date;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onTyping, socket, currentUserName, sendTo }) => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling

  // Effect to fetch messages when component mounts or sendTo changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/user/messages`);
        setReceivedMessages(response.data.response_data.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchMessages();
  }, [sendTo]); // Only re-fetch messages if sendTo changes

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      message.send_on = new Date(message.send_on);
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    };

    socket?.on('receive-message', handleReceiveMessage);
    socket?.on('receive-private-message', handleReceiveMessage);

    return () => {
      socket?.off('receive-message', handleReceiveMessage);
      socket?.off('receive-private-message', handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are received
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [receivedMessages]); // Run when receivedMessages changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (socket && trimmedMessage) {
      const date = new Date();
      const sendMessage: Message = { from: currentUserName, to: sendTo ?? 'all', message: trimmedMessage, send_on: date };

      socket.emit(sendTo ? 'private-message' : 'message', sendMessage);
      setMessage('');
    }
  };

  // Filter messages to show only those between currentUserName and sendTo
  const filteredMessages = receivedMessages.filter(
    (msg) =>
      (msg.from === currentUserName && msg.to === sendTo) ||
      (msg.from === sendTo && msg.to === currentUserName) ||
      (!sendTo && msg.to === 'all')
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-300 p-4 text-lg font-bold">
        {sendTo ? `Chat with ${sendTo}` : 'Public Chat'}
      </div>
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {filteredMessages.map((item: Message, index) => (
            item.from === currentUserName ? (
              <div key={index} className="bg-blue-500 text-white p-2 rounded-md max-w-xs self-end shadow-md">
                {item.message}
                <span className="block text-xs text-white">{new Date(item.send_on).toLocaleString()}</span>
              </div>
            ) : (
              <div key={index} className="bg-gray-200 p-2 rounded-md max-w-xs self-start shadow-md">
                {item.message}
                <span className="block text-xs text-gray-500">{item.from}</span>
                <span className="block text-xs text-gray-500">{new Date(item.send_on).toLocaleString()}</span>
              </div>
            )
          ))}
          <div ref={chatEndRef} /> {/* This div is used for scrolling */}
        </div>
      </div>
      <div className="p-4 bg-gray-200 flex">
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
