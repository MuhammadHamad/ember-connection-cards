
import React, { useState, useCallback } from 'react';
import { GameState, Card, VISUAL_THEMES } from '../types';
import CardComponent from './CardComponent';

interface GameScreenProps {
  gameState: GameState;
  onNext: () => void;
  onFinish: () => void;
  onToggleImpactful: (cardId: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onNext, onFinish, onToggleImpactful }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const activePlayer = gameState.players[gameState.activePlayerIndex];
  const otherPlayer = gameState.players[1 - gameState.activePlayerIndex];
  const theme = VISUAL_THEMES.find(t => t.name === gameState.visualTheme) || VISUAL_THEMES[0];

  const handleFlip = useCallback(() => {
    if (!isFlipped) setIsFlipped(true);
  }, [isFlipped]);

  const handleNextTurn = () => {
    setIsFlipped(false);
    setTimeout(() => onNext(), 300);
  };

  const handleFinish = () => {
    if (isFinishing) return;
    setIsFinishing(true);
    onFinish();
  };

  const handleSpark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState.currentCard) {
      onToggleImpactful(gameState.currentCard.id);
    }
  };

  const isDeckEmpty = gameState.deck.length === 0;

  return (
    <div className="flex flex-col min-h-[85vh] w-full max-w-full sm:max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Dynamic Player Indicators */}
      <div className="flex justify-between items-center mb-12">
        <div className={`transition-all duration-500 ${gameState.activePlayerIndex === 0 ? 'scale-110 opacity-100' : 'opacity-40 grayscale'}`}>
          <p className={`${theme.accentText} font-bold text-[10px] tracking-widest uppercase mb-1`}>Speaker 1</p>
          <h2 className="text-2xl font-serif text-white">{gameState.players[0]}</h2>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-12 w-[1px] bg-slate-800 mb-2"></div>
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Versus</p>
        </div>

        <div className={`text-right transition-all duration-500 ${gameState.activePlayerIndex === 1 ? 'scale-110 opacity-100' : 'opacity-40 grayscale'}`}>
          <p className={`${theme.accentText} font-bold text-[10px] tracking-widest uppercase mb-1`}>Speaker 2</p>
          <h2 className="text-2xl font-serif text-white">{gameState.players[1]}</h2>
        </div>
      </div>

      {/* Card Play Area */}
      <div className="flex-grow flex items-center justify-center py-4">
        {gameState.currentCard && (
          <CardComponent
            card={gameState.currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            activePlayer={activePlayer}
            otherPlayer={otherPlayer}
            visualTheme={gameState.visualTheme}
            isImpactful={gameState.impactfulCardIds.includes(gameState.currentCard.id)}
            onToggleImpactful={handleSpark}
          />
        )}
      </div>

      {/* Guidance and Navigation */}
      <div className="mt-10 h-auto flex flex-col items-center justify-center gap-4">
        {isFlipped ? (
          <button
            onClick={isDeckEmpty ? handleFinish : handleNextTurn}
            disabled={isDeckEmpty && isFinishing}
            className={`group relative flex items-center gap-3 px-12 py-4 ${theme.accentClass} text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            {isDeckEmpty ? 'Finish Journey' : 'Next Connection'}
            <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center animate-bounce mb-1`}>
              <i className="fas fa-chevron-down text-slate-600 text-xs"></i>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">{activePlayer}, pick a card</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
