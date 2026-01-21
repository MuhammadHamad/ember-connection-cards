
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Card, VisualThemeType, VISUAL_THEMES, PastSession } from './types';
import PlayerSetup from './components/PlayerSetup';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import HistoryReview from './components/HistoryReview';
import { generateDeck } from './services/deckService';

const STORAGE_KEY = 'ember_active_session';
const HISTORY_KEY = 'ember_journey_history';

const App: React.FC = () => {
  const isFinishingRef = useRef(false);

  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to hydrate session", e);
      }
    }
    return {
      players: ['', ''],
      activePlayerIndex: 0,
      deck: [],
      drawnCards: [],
      currentCard: null,
      impactfulCardIds: [],
      status: 'setup',
      theme: 'Deep Connections',
      visualTheme: 'Ember'
    };
  });

  const [history, setHistory] = useState<PastSession[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // State for reviewing a specific past session
  const [reviewingSession, setReviewingSession] = useState<PastSession | null>(null);

  useEffect(() => {
    if (state.status === 'setup') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const handleStartGame = async (p1: string, p2: string, deckTheme: string, visualTheme: VisualThemeType) => {
    isFinishingRef.current = false;
    setState(prev => ({ ...prev, status: 'loading', players: [p1, p2], theme: deckTheme, visualTheme, impactfulCardIds: [] }));
    
    try {
      const deck = await generateDeck(deckTheme);
      const [first, ...rest] = deck;
      setState(prev => ({
        ...prev,
        deck: rest,
        currentCard: first,
        drawnCards: [],
        activePlayerIndex: 0,
        status: 'playing'
      }));
    } catch (error) {
      console.error("Deck preparation failed", error);
      setState(prev => ({ ...prev, status: 'setup' }));
    }
  };

  const toggleImpactful = (cardId: string) => {
    setState(prev => ({
      ...prev,
      impactfulCardIds: prev.impactfulCardIds.includes(cardId)
        ? prev.impactfulCardIds.filter(id => id !== cardId)
        : [...prev.impactfulCardIds, cardId]
    }));
  };

  const handleNextTurn = useCallback(() => {
    setState(prev => {
      if (prev.deck.length === 0) return prev;
      const newDrawn = prev.currentCard ? [...prev.drawnCards, prev.currentCard] : prev.drawnCards;
      const [nextCard, ...remainingDeck] = prev.deck;
      return {
        ...prev,
        drawnCards: newDrawn,
        currentCard: nextCard,
        deck: remainingDeck,
        activePlayerIndex: (prev.activePlayerIndex + 1) % 2
      };
    });
  }, []);

  const handleFinish = useCallback(() => {
    if (isFinishingRef.current) return;
    isFinishingRef.current = true;

    let newPastSession: PastSession | null = null;

    setState(prev => {
      const finalDrawn = prev.currentCard ? [...prev.drawnCards, prev.currentCard] : prev.drawnCards;
      
      newPastSession = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        players: prev.players,
        theme: prev.theme,
        impactfulPrompts: finalDrawn
          .filter(c => prev.impactfulCardIds.includes(c.id))
          .map(c => c.prompt),
        cardCount: finalDrawn.length
      };
      
      return {
        ...prev,
        drawnCards: finalDrawn,
        status: 'finished'
      };
    });

    if (newPastSession) {
      setHistory(h => [newPastSession!, ...h].slice(0, 50));
    }
  }, []);

  const handleReset = useCallback(() => {
    isFinishingRef.current = false;
    setState({
      players: ['', ''],
      activePlayerIndex: 0,
      deck: [],
      drawnCards: [],
      currentCard: null,
      impactfulCardIds: [],
      status: 'setup',
      theme: 'Deep Connections',
      visualTheme: state.visualTheme
    });
  }, [state.visualTheme]);

  const clearHistory = () => {
    setHistory([]);
  };

  const currentTheme = VISUAL_THEMES.find(t => t.name === state.visualTheme) || VISUAL_THEMES[0];

  return (
    <div className={`min-h-screen ${currentTheme.bgClass} flex flex-col items-center justify-center px-2 py-4 sm:p-4 transition-all duration-1000 overflow-x-hidden relative selection:bg-white selection:text-slate-900`}>
      
      {state.status === 'playing' && (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-900/50 z-[100]">
          <div 
            className={`h-full ${currentTheme.accentClass} transition-all duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
            style={{ width: `${(state.drawnCards.length / (state.drawnCards.length + (state.deck?.length || 0) + 1)) * 100}%` }}
          />
        </div>
      )}

      {state.status !== 'setup' && (
        <div className="fixed top-3 right-3 sm:top-8 sm:right-8 z-[110] flex flex-col items-end gap-2">
          <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-slate-900/30 hover:bg-slate-800 text-slate-500 hover:text-white rounded-full border border-slate-800/50 transition-all text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-xl group"
          >
              <i className="fas fa-home text-[10px] group-hover:-translate-y-0.5 transition-transform"></i>
              <span className="hidden sm:inline">Home</span>
          </button>
          {state.status === 'playing' && (
            <p className="text-[8px] text-slate-600 uppercase tracking-widest px-2">Autosave Active</p>
          )}
        </div>
      )}

      {state.status === 'setup' && (
        <div className="w-full animate-float max-h-screen overflow-y-auto no-scrollbar py-10 sm:py-12">
          <PlayerSetup 
            onStart={handleStartGame} 
            history={history} 
            onClearHistory={clearHistory}
            onReviewSession={setReviewingSession}
          />
        </div>
      )}

      {state.status === 'loading' && (
        <div className="text-center space-y-12">
          <div className="relative">
            <div className={`w-32 h-32 border-[1px] border-slate-800/50 rounded-full flex items-center justify-center animate-pulse mx-auto`}>
              <div className={`w-24 h-24 border-2 border-transparent ${currentTheme.accentBorder.replace('border-', 'border-t-')} rounded-full animate-spin`}></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className={`fas ${currentTheme.icon} ${currentTheme.accentText} text-2xl animate-bounce`}></i>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-white italic tracking-wide">Igniting the sparks...</h2>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Curating your {state.theme} deck</p>
          </div>
        </div>
      )}

      {state.status === 'playing' && (
        <GameScreen 
          gameState={state} 
          onNext={handleNextTurn} 
          onFinish={handleFinish}
          onToggleImpactful={toggleImpactful}
        />
      )}

      {state.status === 'finished' && (
        <EndScreen 
          gameState={state} 
          onReset={handleReset} 
        />
      )}

      {/* History Review Modal */}
      {reviewingSession && (
        <HistoryReview 
          session={reviewingSession} 
          onClose={() => setReviewingSession(null)} 
          visualTheme={state.visualTheme}
        />
      )}

      {/* Dynamic Background Atmosphere */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div 
          className={`absolute transition-all duration-1000 w-[70%] h-[70%] bg-gradient-to-br ${currentTheme.accentGlow} to-transparent blur-[140px] rounded-full`}
          style={{ 
            top: state.activePlayerIndex === 0 ? '-15%' : '60%', 
            left: state.activePlayerIndex === 0 ? '-15%' : '60%',
            opacity: state.activePlayerIndex === 0 ? 0.08 : 0.02,
            transform: `scale(${state.activePlayerIndex === 0 ? 1.3 : 0.8})`
          }}
        ></div>
        <div 
          className={`absolute transition-all duration-1000 w-[70%] h-[70%] bg-gradient-to-tl ${currentTheme.accentGlow} to-transparent blur-[140px] rounded-full`}
          style={{ 
            bottom: state.activePlayerIndex === 1 ? '-15%' : '60%', 
            right: state.activePlayerIndex === 1 ? '-15%' : '60%',
            opacity: state.activePlayerIndex === 1 ? 0.08 : 0.02,
            transform: `scale(${state.activePlayerIndex === 1 ? 1.3 : 0.8})`
          }}
        ></div>
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-slate-900/20 to-transparent transition-opacity duration-1000 ${state.status === 'playing' ? 'opacity-100' : 'opacity-0'}`}
        ></div>
      </div>
      
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default App;
