
import React, { useEffect, useState } from 'react';

const JalgiEasterEgg: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: ['#dc2626', '#ef4444', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <div className="relative">
        <h1 className="text-white text-9xl font-black animate-ping">JALGI</h1>
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute text-2xl font-bold whitespace-nowrap opacity-0"
              style={{
                left: '50%',
                top: '50%',
                color: p.color,
                animation: `jalgi-explode ${p.duration}s infinite ${p.delay}s ease-out`
              }}
            >
              jalgi
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes jalgi-explode {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + ${(Math.random() - 0.5) * 800}px),
              calc(-50% + ${(Math.random() - 0.5) * 800}px)
            ) scale(2) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default JalgiEasterEgg;
