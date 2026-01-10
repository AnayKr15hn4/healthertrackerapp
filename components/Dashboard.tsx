
import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { 
  Activity, 
  Droplets, 
  Weight, 
  Ruler, 
  Sparkles,
  ChevronRight,
  ClipboardPen,
  PartyPopper,
  Users
} from 'lucide-react';
import { getDailyHealthTip } from '../services/geminiService';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [tip, setTip] = useState<string>("Updating your health insights...");

  useEffect(() => {
    if (user.username) {
      getDailyHealthTip(user.username).then(setTip);
    }
  }, [user.username]);

  const stats = [
    { label: 'Gender', value: user.gender || 'Not Specified', icon: Users, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Age', value: user.age > 0 ? `${user.age} yrs` : '00', icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Weight', value: user.weight > 0 ? `${user.weight} kg` : '000', icon: Weight, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Height', value: user.height > 0 ? `${user.height} cm` : '000', icon: Ruler, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const hasData = user.age > 0 || user.weight > 0 || user.height > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hello, {user.username}!</h1>
          <p className="text-slate-500">Welcome back to your health overview.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 max-w-md">
          <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600 shrink-0">
            <Sparkles size={20} />
          </div>
          <p className="text-sm text-slate-600 font-medium italic">"{tip}"</p>
        </div>
      </header>

      {!hasData && (
        <div className="bg-red-600 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-red-200">
          <div className="bg-white/20 p-4 rounded-2xl">
            <ClipboardPen size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold">Complete your profile</h3>
            <p className="text-red-100">Head over to the Health Log tab to enter your initial vitals for tracking.</p>
          </div>
          <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg whitespace-nowrap hover:bg-red-50 transition-colors">
            Log Now
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-red-50 to-rose-100 p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[400px]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative z-10 space-y-4 animate-in zoom-in-90 duration-1000">
            <div className="inline-flex p-3 bg-red-600 rounded-full text-white shadow-lg mb-4 animate-bounce">
              <PartyPopper size={32} />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-500 to-red-800 drop-shadow-sm select-none">
              Welcome to our <br/> website
            </h2>
            
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
            
            <p className="text-slate-500 text-lg font-medium max-w-md mx-auto">
              We're thrilled to have you here. Your journey to a healthier lifestyle starts with a single click.
            </p>
          </div>

          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-red-600/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-600/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-600 to-rose-700 p-8 rounded-3xl shadow-lg text-white">
            <p className="text-red-100 text-sm font-medium mb-1">Current Status</p>
            <h3 className="text-3xl font-bold mb-6">{hasData ? 'Active Monitoring' : 'Setup Required'}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-red-100">Blood Pressure</span>
                <span className="font-bold">{user.bloodPressure || '00/00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-100">Last Sync</span>
                <span className="font-bold">{hasData ? 'Just now' : 'Never'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming check-up</h3>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl opacity-50 grayscale">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <div className="text-red-600 font-bold text-center leading-none">
                  <p className="text-xs uppercase">--</p>
                  <p className="text-lg">--</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">No scheduled tasks</p>
                <p className="text-xs text-slate-500">Contact a doctor to start.</p>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
