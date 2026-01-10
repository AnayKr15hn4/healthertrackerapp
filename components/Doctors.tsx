
import React, { useState, useEffect } from 'react';
import { MapPin, Star, ExternalLink, Navigation, Loader2, School } from 'lucide-react';
import { searchNearbyDoctors } from '../services/geminiService';

const Doctors: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSecaucusDoctors = async () => {
      try {
        setLoading(true);
        const doctors = await searchNearbyDoctors(40.7903, -74.0538);
        setResults(doctors);
      } catch (err) {
        setError("Unable to load doctors at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchSecaucusDoctors();
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-800">Local Specialists</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <School size={18} className="text-red-600" />
            <p>Showing medical facilities near <strong>Secaucus High School, NJ</strong></p>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="animate-spin text-red-600" size={48} />
          <p className="text-slate-500 font-medium">Fetching clinics in the Secaucus area...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length > 0 ? (
            results.map((doc, idx) => (
              <a 
                key={idx} 
                href={doc.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-red-50 p-4 rounded-2xl text-red-600">
                    <Navigation size={28} />
                  </div>
                  <ExternalLink size={20} className="text-slate-300 group-hover:text-red-500" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">{doc.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="truncate">{doc.address}</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold">4.5+</span>
                  </div>
                  <span className="text-red-600 text-xs font-bold uppercase tracking-widest">View on Maps</span>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400">
              No results found in the Secaucus vicinity.
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
        <div className="absolute right-0 top-0 opacity-10 -translate-y-1/2 translate-x-1/2">
           <MapPin size={400} />
        </div>
        <div className="flex-1 relative z-10">
          <h2 className="text-3xl font-bold mb-2">Community Driven Search</h2>
          <p className="text-slate-400 max-w-lg">
            We've preset your search to the Secaucus community hub. This ensures you find the most accessible care near major landmarks like Secaucus High School.
          </p>
        </div>
        <button className="bg-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all relative z-10">
          Explore Secaucus Map
        </button>
      </div>
    </div>
  );
};

export default Doctors;
