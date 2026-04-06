import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageCircleQuestion, FileQuestion, Users, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'FAQs Management', icon: MessageCircleQuestion, path: '/faqs' },
    { name: 'Unanswered Queries', icon: FileQuestion, path: '/unanswered' },
    { name: 'User Activities', icon: Users, path: '/activities' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo Area */}
      <div className="p-6 pb-8 flex items-center gap-3 border-b border-transparent">
        <img src={logo} alt="College Logo" className="w-full h-auto object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                  isActive
                    ? 'bg-[#c2e2a8] text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-gray-100 mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-800 tracking-tight">GYALPOZHING</span>
              <span className="text-[10px] text-gray-500">admin.gcit@rub.edu.bt</span>
            </div>
          </div>
          
          <button className="w-full flex justify-center items-center gap-2 bg-[#f28b22] hover:bg-[#e07a1b] text-white py-2.5 rounded-md font-medium text-sm transition-colors mt-2">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
