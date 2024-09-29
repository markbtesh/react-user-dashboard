"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaTable, FaBell, FaUserAlt, FaSmileWink, FaUserAstronaut, FaNewspaper } from 'react-icons/fa';

const SidebarItem = ({ href, icon: Icon, label }) => {
  const pathname = usePathname(); // Get the current path to highlight active link

  // Common className with dynamic classes for active/inactive states
  const itemClasses = `flex items-center space-x-3 cursor-pointer p-3 rounded-md shadow transition-all duration-300 ${
    pathname === href ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white' : 'hover:bg-gray-700'
  }`;

  return (
    <li>
      {/* Use Link with className applied directly */}
      <Link href={href} className={itemClasses}>
        <Icon />
        <span>{label}</span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <div className="fixed bg-gradient-to-b from-gray-900 to-gray-800 text-white h-[calc(100vh-32px)] w-64 py-6 px-4 rounded-xl shadow-lg m-4">
      {/* Sidebar header */}
      <h2 className="text-2xl font-bold mb-10 flex items-center">Micro <FaSmileWink /> Manager </h2>

      <ul className="space-y-4">
        <SidebarItem href="/" icon={FaHome} label="Dashboard" />
        <SidebarItem href="/task-manager" icon={FaTable} label="Task Manager" />
        <SidebarItem href="/calendar" icon={FaBell} label="Calendar" />
        <SidebarItem href="/documents" icon={FaUserAstronaut} label="Project Collaborate" />
        <SidebarItem href="/clients" icon={FaUserAlt} label="Clients" />
        <SidebarItem href="/news" icon={FaNewspaper} label="News" />
      </ul>
    </div>
  );
};

export default Sidebar;
