import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

// Define prop types for ChatWindow component
interface ChatWindowProps {
  onTyping: (isTyping: boolean) => void;
  socket: Socket | null; // Accept socket prop
  currentUserName: string; //
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

  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      message.send_on = new Date(message.send_on);
      setReceivedMessages((prevMessages) => [...prevMessages, message]);


    };

    socket?.on('receive-message', handleReceiveMessage);
    socket?.on('receive-private-message', handleReceiveMessage);

    const handleKeyDown = () => {
      onTyping(true);
    };

    const handleKeyUp = () => {
      onTyping(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      socket?.off('receive-message', handleReceiveMessage);
      socket?.off('receive-private-message', handleReceiveMessage);
    };
  }, [onTyping, socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    const isValidMessage = message.trim() !== '';

    if (socket && isValidMessage) {
      const date = new Date();
      const sendMessage = { from: currentUserName, to: sendTo ?? 'all', message, send_on: date };

      if (sendTo) {
        console.log(`send private message:`, sendMessage);
        socket.emit('private-message', sendMessage); // Emit the private message via socket
      } else {
        console.log(`send message:`, sendMessage);
        socket.emit('message', sendMessage); // Emit the message via socket
      }
    }

    setMessage('');
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
      {/* Header for the selected user */}
      <div className="bg-gray-300 p-4 text-lg font-bold">
        {sendTo ? `Chat with ${sendTo}` : 'Public Chat'}
      </div>
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {filteredMessages.map((item: Message, index) => (
            item.from === currentUserName ? (
              <div key={index} className="bg-blue-500 text-white p-2 rounded-md max-w-xs self-end shadow-md">
                {item.message}
                <span className="block text-xs text-white">{item.send_on.toLocaleString()}</span>
              </div>
            ) : (
              <div key={index} className="bg-gray-200 p-2 rounded-md max-w-xs self-start shadow-md">
                {item.message}
                {item.to !== 'all' && <span className="block text-xs text-red-400">private message</span>}
                <span className="block text-xs text-gray-500">{item.from}</span>
                <span className="block text-xs text-gray-500">{item.send_on.toLocaleString()}</span>
              </div>
            )
          ))}
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
