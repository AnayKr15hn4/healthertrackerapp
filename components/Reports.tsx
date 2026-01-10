
import React, { useState } from 'react';
import { HEALTH_CONDITIONS } from '../constants';
import { Heart, Wind, Clock, Shuffle, Sparkles } from 'lucide-react';

const Reports: React.FC = () => {
  const [conditions, setConditions] = useState(HEALTH_CONDITIONS);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRandomize = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const shuffled = [...HEALTH_CONDITIONS]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      
      setConditions(shuffled);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Condition Reports</h1>
          <p className="text-slate-500">Explore and learn about common health metrics and conditions.</p>
        </div>
        <button 
          onClick={handleRandomize}
          disabled={isAnimating}
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 text-red-600 font-bold hover:bg-red-50 hover:border-red-100 transition-all active:scale-95 disabled:opacity-50"
        >
          <Shuffle size={18} className={isAnimating ? 'animate-spin' : ''} />
          Randomize Disease Info
        </button>
      </header>

      <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 transition-opacity duration-400 ${isAnimating ? 'opacity-30 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        {conditions.map((condition) => (
          <div 
            key={condition.id} 
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <img 
                src={condition.image} 
                alt={condition.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                <h3 className="text-white text-xl font-bold">{condition.name}</h3>
              </div>
            </div>

            <div className="flex-1 p-8 flex flex-col">
              <div className="hidden md:block mb-4">
                <div className="flex items-center justify-between">
                  <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={12} />
                    Medical Insight
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mt-2">{condition.name}</h3>
              </div>
              
              <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1">
                {condition.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-red-600 mb-1">
                    <Wind size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Breath Rate</span>
                  </div>
                  <p className="font-bold text-slate-800">{condition.vitals.breathRate}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-red-500 mb-1">
                    <Heart size={16} />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Heart Rate</span>
                  </div>
                  <p className="font-bold text-slate-800">{condition.vitals.heartRate}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {condition.vitals.conditions.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 font-medium">
                    {tag}
                  </span>
                ))}
                <div className="ml-auto flex items-center gap-1 text-slate-400">
                  <Clock size={14} />
                  <span className="text-xs">{condition.affectedAgeGroup} Age Group</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {conditions.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">No disease reports available. Try randomizing!</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
