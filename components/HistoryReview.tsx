
import React from 'react';
import { PastSession, VISUAL_THEMES, VisualThemeType } from '../types';

interface HistoryReviewProps {
  session: PastSession;
  onClose: () => void;
  visualTheme: VisualThemeType;
}

const HistoryReview: React.FC<HistoryReviewProps> = ({ session, onClose, visualTheme }) => {
  const theme = VISUAL_THEMES.find(t => t.name === visualTheme) || VISUAL_THEMES[0];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${theme.accentClass} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
              <i className="fas fa-box-archive text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-white italic">{session.players[0]} & {session.players[1]}</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{session.date} • {session.theme} Exploration</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar py-12 px-8">
          {session.impactfulPrompts.length > 0 ? (
            <div className="space-y-12">
              <div className="text-center">
                <p className="text-slate-400 text-sm italic max-w-sm mx-auto">
                  "These are the moments you marked as impactful during this session."
                </p>
              </div>

              {/* Enhanced Grid/List of Sparks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {session.impactfulPrompts.map((prompt, idx) => (
                  <div key={idx} className="bg-white rounded-[2rem] p-8 text-left shadow-xl relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${theme.accentGlow} opacity-[0.05] rounded-bl-full group-hover:scale-110 transition-transform duration-700`}></div>
                    <span className={`inline-block text-[10px] font-bold ${theme.accentText} uppercase tracking-widest mb-4 px-3 py-1 bg-slate-50 rounded-full border border-slate-100`}>
                      Spark #{idx + 1}
                    </span>
                    <p className="text-slate-800 font-serif italic text-xl leading-relaxed relative z-10">
                      "{prompt}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <i className="fas fa-ghost text-4xl text-slate-800 mb-2"></i>
              <h4 className="text-white font-serif italic text-xl">Quiet Session</h4>
              <p className="text-slate-500 text-sm max-w-xs">
                No specific prompts were marked as impactful in this session, but the conversation was surely worth it.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-800 bg-slate-900/50 flex justify-center">
          <button 
            onClick={onClose}
            className={`px-12 py-4 ${theme.accentClass} text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all`}
          >
            Return to Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryReview;
