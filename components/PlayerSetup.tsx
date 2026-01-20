
import React, { useState } from 'react';
import { THEMES, ThemeType, VISUAL_THEMES, VisualThemeType, PastSession } from '../types';

interface PlayerSetupProps {
  onStart: (p1: string, p2: string, deckTheme: string, visualTheme: VisualThemeType) => void;
  history: PastSession[];
  onClearHistory: () => void;
  onReviewSession: (session: PastSession) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStart, history, onClearHistory, onReviewSession }) => {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [deckTheme, setDeckTheme] = useState<ThemeType>(THEMES[0]);
  const [visualTheme, setVisualTheme] = useState<VisualThemeType>('Ember');
  const [showHistory, setShowHistory] = useState(history.length > 0);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (p1.trim() && p2.trim()) {
      onStart(p1.trim(), p2.trim(), deckTheme, visualTheme);
    }
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmClear) {
      onClearHistory();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      // Reset confirmation state after 3 seconds if not clicked again
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  const currentTheme = VISUAL_THEMES.find(t => t.name === visualTheme) || VISUAL_THEMES[0];

  return (
    <div className="max-w-lg mx-auto space-y-8 px-4 pb-20">
      <div className="p-8 bg-slate-800/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 shadow-2xl">
        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-3xl ${currentTheme.accentClass}/20 mb-4 transition-colors`}>
            <i className={`fas ${currentTheme.icon} ${currentTheme.accentText} text-3xl`}></i>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2 italic">Ember</h1>
          <p className="text-slate-400">Two players. One deck. Real connection.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Player 1</label>
              <input
                required
                type="text"
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 focus:border-white focus:ring-0 outline-none transition-all text-white placeholder-slate-600"
                placeholder="Name..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Player 2</label>
              <input
                required
                type="text"
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 focus:border-white focus:ring-0 outline-none transition-all text-white placeholder-slate-600"
                placeholder="Name..."
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Conversation Depth</label>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDeckTheme(t)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    deckTheme === t
                      ? 'bg-white border-white text-slate-950 shadow-lg'
                      : 'bg-slate-900/30 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Visual Atmosphere</label>
            <div className="grid grid-cols-4 gap-2">
              {VISUAL_THEMES.map((vt) => (
                <button
                  key={vt.name}
                  type="button"
                  onClick={() => setVisualTheme(vt.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                    visualTheme === vt.name
                      ? `bg-slate-700/50 ${vt.accentBorder} scale-105`
                      : 'bg-slate-900/30 border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${vt.accentClass}`}></div>
                  <span className="text-[10px] font-bold text-white uppercase">{vt.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4 ${currentTheme.accentClass} text-white rounded-[1.5rem] font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl mt-4`}
          >
            Begin Journey
          </button>
        </form>
      </div>

      {/* Persistence Feature: Past Journeys Log */}
      {history.length > 0 && (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 p-8 shadow-inner overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 rounded-full"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400`}>
                <i className="fas fa-box-archive text-xs"></i>
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Journey History</h3>
            </div>
            
            <button 
              type="button"
              onClick={handleClearClick}
              className={`text-[9px] font-bold uppercase tracking-widest transition-all px-3 py-1.5 rounded-lg border ${
                confirmClear 
                  ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' 
                  : 'bg-slate-800/50 border-transparent text-slate-600 hover:text-red-400'
              }`}
            >
              {confirmClear ? 'Tap again to delete' : 'Clear All Logs'}
            </button>
          </div>
          
          <div className="ember-scroll space-y-4 max-h-60 overflow-y-auto pr-2">
            {history.map(session => (
              <button 
                key={session.id} 
                type="button"
                onClick={() => onReviewSession(session)}
                className="w-full text-left bg-slate-800/40 rounded-2xl p-5 border border-slate-700/40 group hover:border-white/20 transition-all hover:bg-slate-800/60 active:scale-[0.98]"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-white transition-colors">
                      {session.players[0]} & {session.players[1]}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-500 text-[9px] uppercase tracking-widest">{session.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className="text-slate-500 text-[9px] uppercase tracking-widest">{session.theme}</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700/50 flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-400">{session.cardCount} cards</span>
                    <i className="fas fa-chevron-right text-[8px] text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all"></i>
                  </div>
                </div>
                
                {session.impactfulPrompts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fas fa-star text-orange-500 text-[8px]"></i>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Saved Highlight</span>
                    </div>
                    <p className="text-slate-300 text-[11px] italic leading-relaxed">
                      "{session.impactfulPrompts[0]}"
                      {session.impactfulPrompts.length > 1 && (
                        <span className="text-slate-600 ml-1"> + {session.impactfulPrompts.length - 1} more</span>
                      )}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerSetup;
