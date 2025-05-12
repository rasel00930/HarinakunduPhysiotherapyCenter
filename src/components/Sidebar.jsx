import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, User, FileText } from "lucide-react";
import logo from "../assets/logo.jpg";


const Sidebar = ({ showTable, toggleTable }) => {
  const navItemClass = ({ isActive }) =>
    `flex items-center justify-start px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-green-100 text-green-700"
        : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
    }`;

  return (
    <div className="w-full md:w-57 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col items-center py-6 px-4">
      
      {/* ✅ Centered Logo */}
      <div className="flex justify-center w-full mb-8">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-20 rounded-full object-cover"
        />
      </div>

      <nav className="flex flex-col gap-4 w-full">
        <NavLink
          to="/dashboard?view=home"
          className={navItemClass}
          onClick={(e) => {
            e.preventDefault();
            toggleTable();
          }}
        >
          <Home size={20} className="mr-2" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard/analytics" className={navItemClass}>
          <BarChart2 size={20} className="mr-2" />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={navItemClass}>
          <User size={20} className="mr-2" />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/dashboard/daily-statement" className={navItemClass}>
          <FileText size={20} className="mr-2" />
          <span>Daily Statement</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;




