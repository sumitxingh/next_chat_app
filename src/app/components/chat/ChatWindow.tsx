"use client";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: number;
}

const messages: Message[] = [
  { id: 1, text: 'Hello!', sender: 'John Doe', timestamp: 1643723400 },
  { id: 2, text: 'Hi!', sender: 'Jane Doe', timestamp: 1643723410 },
  //...
];

const MessageItem = ({ message }: { message: Message }) => (
  <li className="py-2">
    <span className="text-gray-600 mr-2">{message.sender}</span>
    <span className="text-gray-800 mr-2">{message.text}</span>
    <span className="text-gray-600">{new Date(message.timestamp * 1000).toLocaleTimeString()}</span>
  </li>
);

const ChatWindow = () => {
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Here you can implement the logic to send the message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-3/6 w-full p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Chat</h2>
      <ul>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 p-2 text-sm text-gray-700 border rounded-l"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
