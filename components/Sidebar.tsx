
import React from 'react';
import { AppTab } from '../types';
import { 
  Home, 
  FileText, 
  Users, 
  LogOut,
  HeartPulse,
  ClipboardPen,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout, isAdmin }) => {
  const tabs = [
    { id: AppTab.HOME, icon: Home, label: 'Home' },
    { id: AppTab.REPORTS, icon: FileText, label: 'Reports' },
    { id: AppTab.DOCTORS, icon: Users, label: 'Doctors' },
    { id: AppTab.LOG, icon: ClipboardPen, label: 'Health Log' },
  ];

  if (isAdmin) {
    tabs.push({ id: AppTab.ADMIN, icon: ShieldCheck, label: 'Admin Panel' });
  }

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 z-50">
      <div className="mb-12 text-red-600 animate-pulse">
        <HeartPulse size={32} />
      </div>

      <nav className="flex-1 flex flex-col gap-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`p-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
                  : 'text-slate-400 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={24} />
              <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      <button 
        onClick={onLogout}
        className="p-3 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all group relative"
      >
        <LogOut size={24} />
        <span className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Logout
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
