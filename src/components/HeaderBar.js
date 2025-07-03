import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Notification, Setting2, User } from 'iconsax-react';
import Logo from "../assets/logo2.png";
export default function HeaderBar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'border-b-2 border-blue-500 text-blue-600'
      : 'text-gray-700 hover:text-blue-500';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow px-6 py-3 flex justify-between items-center z-50 h-[64px]">
      <div className="flex items-center space-x-6">
        <img src={Logo} alt="Logo" className="h-8 w-auto" />
        <nav className="flex space-x-6 text-sm font-medium">
          <Link to="/" className={isActive('/')}>
            Dashboard
          </Link>
          <Link to="/alerts" className={isActive('/alerts')}>
            Alerts
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Notification size="20" color='#5F6368' className="cursor-pointer hover:text-blue-500" />
        <Setting2 size="20" color='#5F6368' className="cursor-pointer hover:text-blue-500" />
        <User size="20" color='#5F6368' className="cursor-pointer hover:text-blue-500" />
        <div className='w-[1px] h-6 bg-gray-300'></div>
        <span className="text-sm font-semibold text-gray-600">Welcome Admin!</span>
      </div>
    </header>
  );
}
