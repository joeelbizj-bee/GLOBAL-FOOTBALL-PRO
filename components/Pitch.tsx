
import React, { useEffect, useState, useRef } from 'react';
import { Team, MatchEvent } from '../types';

interface PitchProps {
  homeTeam: Team;
  awayTeam: Team;
  onEvent: (event: MatchEvent) => void;
  onMatchEnd: (score: [number, number]) => void;
}

const Pitch: React.FC<PitchProps> = ({ homeTeam, awayTeam, onEvent, onMatchEnd }) => {
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [minute, setMinute] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(true);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setMinute(prev => {
          if (prev >= 90) {
            setIsPlaying(false);
            onMatchEnd(score);
            return 90;
          }
          
          // Simulation logic
          const chance = Math.random();
          if (chance > 0.98) {
            const isHome = Math.random() > 0.5;
            setScore(s => {
              const newScore: [number, number] = isHome ? [s[0] + 1, s[1]] : [s[0], s[1] + 1];
              onEvent({
                minute: prev + 1,
                type: 'goal',
                text: isHome ? `goal for ${homeTeam.name}!` : `goal for ${awayTeam.name}!`,
                player: isHome ? homeTeam.players[0].name : awayTeam.players[0].name
              });
              return newScore;
            });
          } else if (chance > 0.90) {
             onEvent({
                minute: prev + 1,
                type: 'shot',
                text: Math.random() > 0.5 ? `shot on target by ${homeTeam.name}` : `near miss for ${awayTeam.name}`,
              });
          }

          // Move ball
          setBallPos({
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60
          });

          return prev + 1;
        });
      }, 800);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, homeTeam, awayTeam, score]);

  return (
    <div className="relative w-full aspect-[2/3] bg-emerald-600 border-4 border-white/30 rounded-lg overflow-hidden shadow-2xl">
      {/* Pitch Markings */}
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="h-24 border-b-2 border-white/20 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-12 border-2 border-t-0 border-white/20"></div>
        </div>
        <div className="flex-1 flex items-center justify-center border-y border-white/10">
          <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center">
             <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
        <div className="h-24 border-t-2 border-white/20 relative">
           <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-12 border-2 border-b-0 border-white/20"></div>
        </div>
      </div>

      {/* Ball */}
      <div 
        className="absolute w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-700 ease-in-out z-20"
        style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
      />

      {/* Dynamic Crowd Lighting Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" />

      {/* Info Overlay */}
      <div className="absolute top-4 inset-x-4 flex justify-between items-center z-30">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex gap-4 text-sm font-bold">
          <span>{homeTeam.name} {score[0]}</span>
          <span className="text-emerald-400">-</span>
          <span>{score[1]} {awayTeam.name}</span>
        </div>
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-mono">
          {minute}'
        </div>
      </div>
    </div>
  );
};

export default Pitch;
