
import React, { useState } from 'react';
import { ClipboardPen, Send, Scale, Ruler, Activity, Info, Users } from 'lucide-react';
import { HealthLogEntry } from '../types';

interface LogProps {
  onLogSubmit: (log: Omit<HealthLogEntry, 'id' | 'timestamp' | 'patientName'>) => void;
  username: string;
}

const Log: React.FC<LogProps> = ({ onLogSubmit, username }) => {
  const [formData, setFormData] = useState({
    gender: 'Male',
    age: 25,
    weight: 70,
    height: 175,
    bloodPressure: '120/80'
  });
  const [submitted, setSubmitted] = useState(false);

  const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogSubmit({
      ...formData,
      bmi: parseFloat(bmi)
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Health Diary</h1>
        <p className="text-slate-500">Log your daily vitals to keep track of your progress and share with doctors.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Users size={16} className="text-red-500" />
                  Gender
                </label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Activity size={16} className="text-red-500" />
                  Age (years)
                </label>
                <input 
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Scale size={16} className="text-red-500" />
                  Weight (kg)
                </label>
                <input 
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Ruler size={16} className="text-red-500" />
                  Height (cm)
                </label>
                <input 
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <ClipboardPen size={16} className="text-red-500" />
                  Blood Pressure
                </label>
                <input 
                  type="text"
                  value={formData.bloodPressure}
                  onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g. 120/80"
                />
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl shadow-sm text-red-600">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Calculated BMI</p>
                  <p className="text-xl font-bold text-slate-800">{bmi}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                parseFloat(bmi) < 18.5 ? 'bg-yellow-100 text-yellow-700' :
                parseFloat(bmi) < 25 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {parseFloat(bmi) < 18.5 ? 'Underweight' :
                 parseFloat(bmi) < 25 ? 'Healthy Weight' : 'Overweight'}
              </span>
            </div>

            <button 
              type="submit"
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                submitted ? 'bg-green-500 text-white' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200'
              }`}
            >
              {submitted ? (
                <>Log Successfully Saved!</>
              ) : (
                <>
                  <Send size={18} />
                  Submit Log Entry
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-bold mb-4">Why Log?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-lg text-red-400 mt-1">
                  <CheckIcon size={14} />
                </div>
                <p className="text-sm text-slate-300">Share your historical data with specialists instantly during appointments.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-500/20 p-1 rounded-lg text-red-400 mt-1">
                  <CheckIcon size={14} />
                </div>
                <p className="text-sm text-slate-300">Identify patterns in your blood pressure and heart rate over time.</p>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Note</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              All data logged here is sent to your health dashboard and can be accessed by authorized medical administrators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default Log;
