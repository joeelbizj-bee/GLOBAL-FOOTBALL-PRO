
import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Users, Shield, Play, Settings, ChevronRight, MessageCircle } from 'lucide-react';
import { GameState, Team, Stadium, MatchEvent } from './types';
import { TEAMS, STADIUMS } from './constants';
import { generateCommentary, getLiveNews } from './geminiService';
import Pitch from './components/Pitch';

const App: React.FC = () => {
  const [view, setView] = useState<GameState>('MENU');
  const [selectedHome, setSelectedHome] = useState<Team>(TEAMS[0]);
  const [selectedAway, setSelectedAway] = useState<Team>(TEAMS[1]);
  const [selectedStadium, setSelectedStadium] = useState<Stadium>(STADIUMS[0]);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [news, setNews] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getLiveNews().then(setNews);
  }, []);

  const startMatchmaking = () => {
    setView('MATCHMAKING');
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setView('PLAYING');
    }, 3000);
  };

  const handleMatchEvent = useCallback(async (event: MatchEvent) => {
    setEvents(prev => [event, ...prev].slice(0, 5));
    if (event.type === 'goal') {
      const commentary = await generateCommentary(
        selectedHome.name,
        selectedAway.name,
        event.text,
        `${event.minute}'`
      );
      setEvents(prev => [{ minute: event.minute, type: 'commentary', text: commentary }, ...prev].slice(0, 5));
    }
  }, [selectedHome, selectedAway]);

  const renderMenu = () => (
    <div className="flex flex-col h-full bg-zinc-950 p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Global Football Pro</h1>
          <p className="text-zinc-500 text-xs">worldwide live matches & real teams</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Trophy size={20} />
        </div>
      </header>

      {/* Live News Ticker */}
      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
        <h2 className="text-[10px] uppercase font-bold text-emerald-500 mb-2 tracking-widest">live updates</h2>
        <div className="space-y-2">
          {news.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={startMatchmaking}
          className="col-span-2 relative h-48 rounded-3xl overflow-hidden group active:scale-[0.98] transition-all"
        >
          <img src="https://picsum.photos/seed/football/600/400" className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-700" alt="Play" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6 text-left">
            <span className="block text-xs uppercase font-bold tracking-[0.2em] text-emerald-400 mb-1">online arena</span>
            <span className="text-2xl font-black uppercase">play match</span>
          </div>
          <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
            <Play fill="currentColor" size={20} />
          </div>
        </button>

        <button className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col gap-3 active:scale-95 transition-all text-left">
          <Users className="text-emerald-500" />
          <div>
            <span className="block text-sm font-bold uppercase tracking-wide">squad</span>
            <span className="text-xs text-zinc-500">manage team</span>
          </div>
        </button>

        <button className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col gap-3 active:scale-95 transition-all text-left">
          <Shield className="text-emerald-500" />
          <div>
            <span className="block text-sm font-bold uppercase tracking-wide">Stadium</span>
            <span className="text-xs text-zinc-500">unlock items</span>
          </div>
        </button>
      </div>

      {/* Rewards Bar */}
      <div className="mt-auto bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Trophy size={18} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase">season pass</p>
            <p className="text-[10px] text-zinc-500">Level 12 - 450 XP to Next</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-zinc-600" />
      </div>
    </div>
  );

  const renderMatchmaking = () => (
    <div className="h-full bg-black flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-12">
        <div className="w-32 h-32 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
        <Users className="absolute inset-0 m-auto text-emerald-500" size={40} />
      </div>
      <h2 className="text-3xl font-black uppercase mb-2">matchmaking</h2>
      <p className="text-zinc-500 text-sm max-w-[200px]">finding opponent based on skill and connection...</p>
      
      <div className="mt-12 w-full max-w-xs space-y-4">
        <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
           <div className="flex items-center gap-3">
             <img src={selectedHome.logo} className="w-8 h-8 rounded-full" alt="Me" />
             <span className="font-bold text-sm uppercase">You</span>
           </div>
           <span className="text-emerald-500 text-[10px] font-bold">READY</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
           <span className="text-zinc-600 text-sm italic">searching for opponent...</span>
        </div>
      </div>
    </div>
  );

  const renderPlaying = () => (
    <div className="h-full bg-zinc-950 flex flex-col">
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
        <Pitch 
          homeTeam={selectedHome} 
          awayTeam={selectedAway} 
          onEvent={handleMatchEvent}
          onMatchEnd={() => setView('STATS')}
        />
        
        <div className="flex-1 bg-zinc-900 rounded-3xl border border-zinc-800 p-6 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle size={16} className="text-emerald-500" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">live commentary</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {events.length === 0 && (
              <p className="text-zinc-600 text-xs italic">match is heating up...</p>
            )}
            {events.map((ev, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-2xl text-sm animate-in slide-in-from-right-2 duration-300 ${
                  ev.type === 'goal' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 
                  ev.type === 'commentary' ? 'bg-blue-500/5 border border-blue-500/10 text-zinc-300 italic' :
                  'bg-zinc-800/50 text-zinc-400'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <span className="flex-1">{ev.text}</span>
                  <span className="text-[10px] font-mono text-zinc-600">{ev.minute}'</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-zinc-900 border-t border-zinc-800">
        <button 
          onClick={() => setView('MENU')}
          className="w-full py-4 bg-zinc-800 rounded-2xl text-sm font-bold uppercase active:scale-[0.98] transition-all"
        >
          forfeit match
        </button>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="h-full bg-zinc-950 p-8 flex flex-col items-center text-center animate-in zoom-in-95">
      <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30">
        <Trophy size={48} />
      </div>
      <h2 className="text-4xl font-black uppercase mb-2">Victory!</h2>
      <p className="text-zinc-400 mb-8">you dominated the pitch with {selectedHome.name}</p>
      
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800">
          <p className="text-emerald-500 font-bold text-2xl">+150</p>
          <p className="text-[10px] text-zinc-500 uppercase">Skill Points</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800">
          <p className="text-emerald-500 font-bold text-2xl">+500</p>
          <p className="text-[10px] text-zinc-500 uppercase">Coins Earned</p>
        </div>
      </div>

      <button 
        onClick={() => {
          setEvents([]);
          setView('MENU');
        }}
        className="mt-auto w-full py-4 bg-white text-black rounded-3xl font-black uppercase tracking-tighter shadow-lg"
      >
        collect rewards
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 max-w-md mx-auto bg-black text-white shadow-2xl overflow-hidden flex flex-col select-none">
      <main className="flex-1 overflow-hidden">
        {view === 'MENU' && renderMenu()}
        {view === 'MATCHMAKING' && renderMatchmaking()}
        {view === 'PLAYING' && renderPlaying()}
        {view === 'STATS' && renderStats()}
      </main>

      {/* Bottom Navigation */}
      {view !== 'PLAYING' && view !== 'MATCHMAKING' && (
        <nav className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around px-4">
          <button className="p-3 text-emerald-500 flex flex-col items-center gap-1">
            <Play size={20} fill="currentColor" />
            <span className="text-[10px] font-bold uppercase">play</span>
          </button>
          <button className="p-3 text-zinc-600 flex flex-col items-center gap-1">
            <Users size={20} />
            <span className="text-[10px] font-bold uppercase">squad</span>
          </button>
          <button className="p-3 text-zinc-600 flex flex-col items-center gap-1">
            <Trophy size={20} />
            <span className="text-[10px] font-bold uppercase">rank</span>
          </button>
          <button className="p-3 text-zinc-600 flex flex-col items-center gap-1">
            <Settings size={20} />
            <span className="text-[10px] font-bold uppercase">opts</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
