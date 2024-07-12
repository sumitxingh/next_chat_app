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
  const [receivedMessage, setReceivedMessage] = useState<Message[]>([]);


  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      message.send_on = new Date(message.send_on);
      setReceivedMessage((prevMessages) => [...prevMessages, message]);
    };
    socket?.on('receive-message', (message: Message) => {
      // convert message.send_on to Date object
      message.send_on = new Date(message.send_on);
      setReceivedMessage([...receivedMessage, message]);
    })

    socket?.on('receive-private-message', (message: Message) => {
      // convert message.send_on to Date object
      message.send_on = new Date(message.send_on);
      setReceivedMessage([...receivedMessage, message]);
    })

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
    const isValidMessage = message.trim() !== '';

    if (socket && isValidMessage) {
      if (sendTo) {
        const date = new Date()
        const sendMessage = { from: currentUserName, to: sendTo, message, send_on: date }
        console.log(`send private message:`)
        console.log(sendMessage);
        socket.emit('private-message', sendMessage); // Emit the private message via socket
      } else {
        const date = new Date()
        const sendMessage = { from: currentUserName, to: 'all', message, send_on: date }
        console.log(`send message:`)
        console.log(sendMessage);
        socket.emit('message', sendMessage); // Emit the message via socket
      }
    }

    setMessage('');
  };
  console.log(receivedMessage)

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {receivedMessage.map((item: Message, index) => (
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
