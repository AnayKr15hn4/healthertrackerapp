
import React from 'react';
import { HelpCircle, ShieldCheck, FileText, Smartphone, Mail, Globe } from 'lucide-react';

const Info: React.FC = () => {
  const sections = [
    {
      title: 'App Guide',
      icon: HelpCircle,
      items: ['Connecting wearables', 'Understanding heart charts', 'Privacy controls']
    },
    {
      title: 'Data Security',
      icon: ShieldCheck,
      items: ['HIPAA Compliance', 'End-to-end encryption', 'Your data rights']
    },
    {
      title: 'Terms & Policies',
      icon: FileText,
      items: ['Terms of Service', 'Cookie Policy', 'Medical Disclaimer']
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Information Center</h1>
        <p className="text-slate-500">Learn more about HealthAppTracker and managing your data.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="bg-red-50 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <section.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-500 hover:text-red-600 cursor-pointer transition-colors">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-red-600 to-rose-700 p-12 rounded-[3rem] text-white flex flex-col items-center text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Smartphone size={200} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Need further assistance?</h2>
        <p className="text-red-100 mb-8 max-w-xl">Our support team is available 24/7 to help you with any technical issues or questions about your account security.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-red-50 transition-colors">
            <Mail size={20} />
            Contact Support
          </button>
          <button className="bg-rose-500/30 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-rose-500/40 transition-colors">
            <Globe size={20} />
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
