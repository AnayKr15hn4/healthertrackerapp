
import React, { useState } from 'react';
import { HeartPulse, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

interface AuthProps {
  onLogin: (username: string, isAdmin?: boolean, jalgiMode?: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      if (username.toLowerCase() === 'jalgi' && password.toLowerCase() === 'jalgi') {
        onLogin('jalgi', false, true);
        return;
      }

      if (username === 'king' && password === 'king') {
        onLogin(username, true);
      } else {
        onLogin(username, false);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 bg-red-600 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute top-0 right-0 p-24 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 p-32 bg-rose-900/40 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-xl text-red-600 shadow-xl">
              <HeartPulse size={32} />
            </div>
            <span className="text-2xl font-bold tracking-tight">HealthAppTracker</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">Your Personal Health Assistant.</h1>
          <p className="text-xl text-red-100 mb-12">Monitor your vitals, get AI-powered insights, and discover expert care, all in one place.</p>
          
          <div className="space-y-6">
            <FeatureItem text="Secure digital health passport" />
            <FeatureItem text="Daily AI wellness recommendations" />
            <FeatureItem text="Direct connection to specialists" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-12 justify-center">
            <HeartPulse size={32} className="text-red-600" />
            <span className="text-xl font-bold text-slate-800">HealthAppTracker</span>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {isSignUp ? 'Join Tracker' : 'Welcome Back'}
            </h2>
            <p className="text-slate-500 mb-8">
              {isSignUp ? 'Create your account to start tracking.' : 'Login to access your health dashboard.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 active:scale-95"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-slate-500 font-medium hover:text-red-600 transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400">
            <Shield size={16} />
            <span className="text-sm">End-to-end encrypted medical storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="bg-white/20 p-1 rounded-full">
      <CheckCircle2 size={18} />
    </div>
    <span className="font-medium text-red-50">{text}</span>
  </div>
);

export default Auth;
