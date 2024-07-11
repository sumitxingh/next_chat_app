import React, { useState, useEffect } from 'react';

// Define prop types for ChatWindow component
interface ChatWindowProps {
  onTyping: (isTyping: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onTyping }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
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
    };
  }, [onTyping]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    // Emit the message here
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        {/* Display chat messages here */}
        {/* Example message display (replace with actual messages) */}
        <div className="flex flex-col gap-2">
          <div className="bg-blue-500 text-white p-2 rounded-md max-w-xs self-end shadow-md">
            Example Message
          </div>
          {/* Add more message elements as needed */}
        </div>
      </div>
      <div className="p-4 bg-gray-200">
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
