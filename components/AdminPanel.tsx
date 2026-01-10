
import React from 'react';
import { HealthLogEntry } from '../types';
import { ShieldCheck, User, Calendar, ArrowUpRight, Search } from 'lucide-react';

interface AdminPanelProps {
  logs: HealthLogEntry[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ logs }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShieldCheck className="text-red-600" size={32} />
            Patient Data Center
          </h1>
          <p className="text-slate-500">Global overview of all patient activities and logged vitals.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <span className="text-slate-400 text-sm font-medium">Total Entries</span>
            <span className="text-xl font-bold text-red-600">{logs.length}</span>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Recent Health Logs</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-red-500 w-64"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Logged At</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">BP</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">BMI</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400">
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{log.patientName}</p>
                          <p className="text-xs text-slate-400">{log.gender} • {log.age} yrs • {log.weight} kg</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar size={14} />
                        {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                        {log.bloodPressure}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`font-bold px-3 py-1 rounded-lg text-sm ${
                        log.bmi < 25 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {log.bmi}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-slate-400 hover:text-red-600 transition-colors">
                        <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
