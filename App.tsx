
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Doctors from './components/Doctors';
import Auth from './components/Auth';
import Log from './components/Log';
import AdminPanel from './components/AdminPanel';
import JalgiEasterEgg from './components/JalgiEasterEgg';
import { AppTab, UserProfile, HealthLogEntry } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [patientLogs, setPatientLogs] = useState<HealthLogEntry[]>([]);
  const [isJalgiMode, setIsJalgiMode] = useState(false);

  useEffect(() => {
    const savedLogs = localStorage.getItem('vitaltrack_logs');
    if (savedLogs) {
      setPatientLogs(JSON.parse(savedLogs));
    }
    const savedUser = localStorage.getItem('vitaltrack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string, isAdmin?: boolean, jalgiMode?: boolean) => {
    if (jalgiMode) {
      setIsJalgiMode(true);
      return;
    }

    const existingLogs = patientLogs.filter(l => l.patientName === username);
    const latest = existingLogs[0];

    const profile: UserProfile = {
      username: username,
      gender: latest?.gender || 'Not Specified',
      age: latest?.age || 0,
      weight: latest?.weight || 0,
      height: latest?.height || 0,
      bloodType: 'TBD',
      bloodPressure: latest?.bloodPressure || '00/00',
      isAdmin: isAdmin || false
    };

    setUser(profile);
    setIsLoggedIn(true);
    localStorage.setItem('vitaltrack_user', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab(AppTab.HOME);
    setIsJalgiMode(false);
    localStorage.removeItem('vitaltrack_user');
  };

  const handleNewLog = (data: Omit<HealthLogEntry, 'id' | 'timestamp' | 'patientName'>) => {
    const newEntry: HealthLogEntry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      patientName: user?.username || 'Guest',
      timestamp: new Date().toISOString()
    };
    
    const updatedLogs = [newEntry, ...patientLogs];
    setPatientLogs(updatedLogs);
    localStorage.setItem('vitaltrack_logs', JSON.stringify(updatedLogs));

    if (user) {
      const updatedUser = { 
        ...user, 
        gender: data.gender,
        age: data.age, 
        weight: data.weight, 
        height: data.height,
        bloodPressure: data.bloodPressure
      };
      setUser(updatedUser);
      localStorage.setItem('vitaltrack_user', JSON.stringify(updatedUser));
    }
  };

  if (isJalgiMode) {
    return (
      <div onClick={() => setIsJalgiMode(false)}>
        <JalgiEasterEgg />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-red-100">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
        isAdmin={user?.isAdmin}
      />
      
      <main className="flex-1 pl-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
          {activeTab === AppTab.HOME && user && <Dashboard user={user} />}
          {activeTab === AppTab.REPORTS && <Reports />}
          {activeTab === AppTab.DOCTORS && <Doctors />}
          {activeTab === AppTab.LOG && user && <Log onLogSubmit={handleNewLog} username={user.username} />}
          {activeTab === AppTab.ADMIN && user?.isAdmin && <AdminPanel logs={patientLogs} />}
        </div>
      </main>
    </div>
  );
};

export default App;
