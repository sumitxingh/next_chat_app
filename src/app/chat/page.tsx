import Head from 'next/head';
import ChatWindow from '../components/chat/ChatWindow';
import ChatSidebar from '../components/chat/ChatSidebar';


const Chat = () => {
  return (
    <div className="h-screen flex">
      {/* <Head> */}
      <title>Chat App</title>
      {/* </Head> */}
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default Chat;