'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faRocket, faSmile, faUsers } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (this is a placeholder, replace with real auth check)
    const storedUser = localStorage.getItem('user');
    const accessToken = Cookies.get('accessToken');
    if (storedUser && accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNavigation = (path: string) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push('/auth'); // Redirect to auth page if not authenticated
    }
  };

  return (
    <div className="bg-indigo-800 min-h-screen">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Welcome to Chat App</h1>
          <p className="mt-4 text-lg text-gray-300">
            "Connecting people is not just a matter of technology, it's about creating moments that matter."
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => handleNavigation('/chat')}
            className="block p-6 bg-indigo-700 rounded-lg shadow-lg text-center hover:bg-indigo-600 transition duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faComments} className="text-white text-3xl mb-4" />
            <h2 className="text-lg font-medium text-white">Chat Now</h2>
          </div>
          <div
            onClick={() => handleNavigation('/user/profile')}
            className="block p-6 bg-indigo-700 rounded-lg shadow-lg text-center hover:bg-indigo-600 transition duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSmile} className="text-white text-3xl mb-4" />
            <h2 className="text-lg font-medium text-white">Your Profile</h2>
          </div>
          <div
            onClick={() => handleNavigation('/user')}
            className="block p-6 bg-indigo-700 rounded-lg shadow-lg text-center hover:bg-indigo-600 transition duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUsers} className="text-white text-3xl mb-4" />
            <h2 className="text-lg font-medium text-white">Find Users</h2>
          </div>
          <div
            onClick={() => handleNavigation('/about')}
            className="block p-6 bg-indigo-700 rounded-lg shadow-lg text-center hover:bg-indigo-600 transition duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon={faRocket} className="text-white text-3xl mb-4" />
            <h2 className="text-lg font-medium text-white">Learn More</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
