
import React from 'react';
import { Card, ResponseType, VISUAL_THEMES, VisualThemeType } from '../types';

interface CardComponentProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
  activePlayer: string;
  otherPlayer: string;
  visualTheme: VisualThemeType;
  isImpactful: boolean;
  onToggleImpactful: (e: React.MouseEvent) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ 
  card, isFlipped, onFlip, otherPlayer, visualTheme, isImpactful, onToggleImpactful 
}) => {
  const theme = VISUAL_THEMES.find(t => t.name === visualTheme) || VISUAL_THEMES[0];

  return (
    <div className="w-full max-w-full sm:max-w-sm aspect-[3/4] card-perspective cursor-pointer group mx-auto" onClick={onFlip}>
      <div className={`relative w-full h-full card-inner ${isFlipped ? 'card-flipped' : ''}`}>
        
        {/* Front of Card (Face Down) */}
        <div className="absolute inset-0 card-front bg-slate-900 rounded-[2.5rem] border-[10px] sm:border-[12px] border-slate-800 shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 overflow-hidden">
          <div className={`absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${theme.accentGlow} via-transparent to-transparent`}></div>
          <div className="relative z-10 text-center">
            <div className={`w-24 h-24 rounded-full border-2 border-slate-700 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
              <i className={`fas ${theme.icon} ${theme.accentText} text-3xl animate-pulse`}></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-slate-300 italic mb-2">Ember</h3>
            <p className="text-slate-500 text-sm tracking-widest uppercase">Tap to reveal</p>
          </div>
        </div>

        {/* Back of Card (Face Up) */}
        <div className={`absolute inset-0 card-back bg-white text-slate-900 rounded-[2.5rem] border-[10px] sm:border-[12px] ${theme.accentBorder.replace('border-', 'border-opacity-10 border-')} shadow-2xl flex flex-col p-6 sm:p-10`}>
          <div className="flex justify-between items-center mb-6">
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${theme.accentText} px-3 py-1 bg-slate-50 rounded-full border border-slate-100`}>
              {card.category}
            </span>
            <button 
              onClick={onToggleImpactful}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isImpactful ? theme.accentClass + ' text-white scale-110 shadow-lg' : 'bg-slate-50 text-slate-300 hover:text-slate-400'}`}
              title="Mark as impactful moment"
            >
              <i className={`fas fa-star ${isImpactful ? 'animate-bounce' : ''}`}></i>
            </button>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif leading-snug italic font-medium text-slate-800 break-words [overflow-wrap:anywhere]">
              "{card.prompt}"
            </p>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${theme.accentClass} flex items-center justify-center text-white shadow-sm`}>
                <i className={`fas ${card.type === ResponseType.BOTH_RESPOND ? 'fa-users' : 'fa-user'}`}></i>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Response Guide</p>
                <p className="text-sm font-semibold text-slate-700">
                  {card.type === ResponseType.BOTH_RESPOND 
                    ? 'Both players share thoughts' 
                    : `${otherPlayer}'s turn to speak`}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardComponent;
