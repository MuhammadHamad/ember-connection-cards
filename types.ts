
export enum ResponseType {
  OTHER_RESPONDS = 'OTHER_RESPONDS',
  BOTH_RESPOND = 'BOTH_RESPOND'
}

export interface Card {
  id: string;
  prompt: string;
  type: ResponseType;
  category: string;
}

export type VisualThemeType = 'Ember' | 'Ocean' | 'Twilight' | 'Forest';

export interface VisualThemeConfig {
  name: VisualThemeType;
  bgClass: string;
  accentClass: string;
  accentBorder: string;
  accentGlow: string;
  accentText: string;
  icon: string;
}

export const VISUAL_THEMES: VisualThemeConfig[] = [
  {
    name: 'Ember',
    bgClass: 'bg-slate-950',
    accentClass: 'bg-orange-500',
    accentBorder: 'border-orange-500',
    accentGlow: 'from-orange-500',
    accentText: 'text-orange-500',
    icon: 'fa-fire'
  },
  {
    name: 'Ocean',
    bgClass: 'bg-slate-950',
    accentClass: 'bg-cyan-500',
    accentBorder: 'border-cyan-500',
    accentGlow: 'from-cyan-500',
    accentText: 'text-cyan-500',
    icon: 'fa-water'
  },
  {
    name: 'Twilight',
    bgClass: 'bg-slate-950',
    accentClass: 'bg-purple-500',
    accentBorder: 'border-purple-500',
    accentGlow: 'from-purple-500',
    accentText: 'text-purple-500',
    icon: 'fa-moon'
  },
  {
    name: 'Forest',
    bgClass: 'bg-slate-950',
    accentClass: 'bg-emerald-500',
    accentBorder: 'border-emerald-500',
    accentGlow: 'from-emerald-500',
    accentText: 'text-emerald-500',
    icon: 'fa-leaf'
  }
];

export interface PastSession {
  id: string;
  date: string;
  players: [string, string];
  theme: string;
  impactfulPrompts: string[];
  cardCount: number;
}

export interface GameState {
  players: [string, string];
  activePlayerIndex: number;
  deck: Card[];
  drawnCards: Card[];
  currentCard: Card | null;
  impactfulCardIds: string[];
  status: 'setup' | 'loading' | 'playing' | 'finished';
  theme: string;
  visualTheme: VisualThemeType;
}

export type ThemeType = 'Deep Connections' | 'Playful & Random' | 'Future & Dreams' | 'Hard Truths';

export const THEMES: ThemeType[] = [
  'Deep Connections',
  'Playful & Random',
  'Future & Dreams',
  'Hard Truths'
];
