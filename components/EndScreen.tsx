
import React from 'react';
import { GameState, VISUAL_THEMES } from '../types';

interface EndScreenProps {
  gameState: GameState;
  onReset: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ gameState, onReset }) => {
  const theme = VISUAL_THEMES.find(t => t.name === gameState.visualTheme) || VISUAL_THEMES[0];
  const impactfulCards = gameState.drawnCards.filter(c => gameState.impactfulCardIds.includes(c.id));

  return (
    <div className="max-w-4xl w-full mx-auto text-center py-10 sm:py-12 px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-12">
        <div className={`w-24 h-24 ${theme.accentClass} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/50 relative`}>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white"></div>
          <i className="fas fa-feather-pointed text-white text-4xl relative z-10"></i>
        </div>
        <h2 className="text-4xl sm:text-5xl font-serif text-white mb-4 italic">Journey Complete</h2>
        
        {/* Persistence Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          <p className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-[0.3em]">Session Saved to Journey Log</p>
        </div>

        <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto">
          {gameState.drawnCards.length} prompts explored. The connections you've built are now part of your story.
        </p>
      </div>

      {/* Reflection Gallery: Horizontal Scrolling Mini-Cards */}
      {impactfulCards.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-slate-800"></div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em]">Reflection Gallery</h3>
            <div className="h-[1px] w-12 bg-slate-800"></div>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x no-scrollbar mask-fade-edges">
            {impactfulCards.map((card, idx) => (
              <div 
                key={card.id} 
                className="flex-shrink-0 w-72 snap-center bg-white rounded-[2rem] p-8 text-left shadow-2xl relative overflow-hidden group border border-slate-100"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${theme.accentGlow} opacity-[0.05] rounded-bl-full group-hover:scale-150 transition-transform duration-700`}></div>
                
                <span className={`inline-block text-[10px] font-bold ${theme.accentText} uppercase tracking-widest mb-4 px-3 py-1 bg-slate-50 rounded-full border border-slate-100`}>
                  Moment {idx + 1}
                </span>
                
                <p className="text-slate-800 font-serif italic text-xl leading-relaxed mb-6 line-clamp-4">
                  "{card.prompt}"
                </p>
                
                <div className="flex items-center gap-2 text-slate-400">
                  <i className={`fas ${theme.icon} text-[10px]`}></i>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{card.category}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-[10px] uppercase tracking-widest mt-2 animate-pulse">
            <i className="fas fa-arrows-left-right mr-2"></i> Scroll to revisit sparks
          </p>
        </div>
      )}

      <div className="max-w-xl mx-auto bg-slate-900/40 backdrop-blur-md rounded-[3rem] p-8 sm:p-12 border border-slate-800/50 mb-12 shadow-2xl relative overflow-hidden">
        <i className={`fas ${theme.icon} absolute -bottom-10 -right-10 text-9xl opacity-[0.03] rotate-12`}></i>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
          <div className="text-center">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-3">Companions</p>
            <div className="flex flex-col gap-1">
              <p className="text-white text-xl font-serif">{gameState.players[0]}</p>
              <p className={`${theme.accentText} text-xs font-serif italic`}>&</p>
              <p className="text-white text-xl font-serif">{gameState.players[1]}</p>
            </div>
          </div>
          <div className="text-center sm:border-l border-slate-800/50 sm:pl-8">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-3">Theme</p>
            <p className="text-white text-xl font-serif italic mb-4">{gameState.theme}</p>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.accentClass}/10 border ${theme.accentBorder}/20`}>
              <div className={`w-2 h-2 rounded-full ${theme.accentClass} animate-pulse`}></div>
              <span className={`text-[10px] font-bold ${theme.accentText} uppercase tracking-tighter`}>{gameState.visualTheme} Atmosphere</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xs mx-auto space-y-8">
        <button
          onClick={onReset}
          className={`w-full py-5 ${theme.accentClass} text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/40 text-lg tracking-wide`}
        >
          New Exploration
        </button>
        <div className="flex flex-col gap-1 opacity-40">
           <p className="text-slate-500 text-[10px] tracking-[0.3em] uppercase">Ember Connection Deck</p>
           <p className="text-slate-600 text-[9px]">Archived for your records.</p>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
};

export default EndScreen;
