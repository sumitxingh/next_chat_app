"use client"
import React, { useEffect, useState } from 'react';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import { useRouter } from 'next/navigation';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter()

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      router.push("/user-profile");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg overflow-hidden md:max-w-xl">
        <div className="px-6 py-8">
          {isLogin ? <Login /> : <Register />}

          <div className="mt-4 text-sm text-center text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  onClick={toggleForm}
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  onClick={toggleForm}
                >
                  Sign in instead
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
