'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faComments, faCircleUser, faUsers, faUsers as faGroup } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center'
      : 'text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center';
  };

  return (
    <nav className="bg-indigo-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <FontAwesomeIcon icon={faBars} className="block h-6 w-6" />
              ) : (
                <FontAwesomeIcon icon={faTimes} className="block h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-xl font-bold">
                Chat App
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {pathname === '/auth' ? (
                  <Link href="/" className={getLinkClass('/')}>
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Home
                  </Link>
                ) : (
                  <>
                    <Link href="/" className={getLinkClass('/')}>
                      <FontAwesomeIcon icon={faHome} className="mr-2" />
                      Home
                    </Link>
                    <Link href="/chat" className={getLinkClass('/chat')}>
                      <FontAwesomeIcon icon={faComments} className="mr-2" />
                      Chat
                    </Link>
                    <Link href="/user/profile" className={getLinkClass('/user/profile')}>
                      <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
                      Profile
                    </Link>
                    <Link href="/user" className={getLinkClass('/user')}>
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />
                      Users
                    </Link>
                    <Link href="/group" className={getLinkClass('/group')}>
                      <FontAwesomeIcon icon={faGroup} className="mr-2" />
                      Group
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {pathname === '/auth' ? (
            <Link href="/" className={getLinkClass('/')}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          ) : (
            <>
              <Link href="/" className={getLinkClass('/')}>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
              <Link href="/chat" className={getLinkClass('/chat')}>
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                Chat
              </Link>
              <Link href="/user/profile" className={getLinkClass('/user/profile')}>
                <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
                Profile
              </Link>
              <Link href="/user" className={getLinkClass('/user')}>
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Users
              </Link>
              <Link href="/group" className={getLinkClass('/group')}>
                <FontAwesomeIcon icon={faGroup} className="mr-2" />
                Group
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
