import { Card, ResponseType } from "../types";

const HARD_CODED_DECKS: Record<string, Card[]> = {
  'Deep Connections': [
    { id: 'deep-1', prompt: 'What is a core memory from your childhood that shaped you?', type: ResponseType.BOTH_RESPOND, category: 'Identity' },
    { id: 'deep-2', prompt: 'When do you feel most understood by someone?', type: ResponseType.BOTH_RESPOND, category: 'Connection' },
    { id: 'deep-3', prompt: 'What belief about yourself took you years to unlearn?', type: ResponseType.OTHER_RESPONDS, category: 'Growth' },
    { id: 'deep-4', prompt: 'What is something you wish more people noticed about you?', type: ResponseType.OTHER_RESPONDS, category: 'Presence' },
    { id: 'deep-5', prompt: 'What does “feeling safe” look like in a relationship to you?', type: ResponseType.BOTH_RESPOND, category: 'Trust' },
    { id: 'deep-6', prompt: 'What is a small act of care that means a lot to you?', type: ResponseType.BOTH_RESPOND, category: 'Love' },
    { id: 'deep-7', prompt: 'What is one thing you are proud of that you rarely say out loud?', type: ResponseType.OTHER_RESPONDS, category: 'Pride' }
  ],
  'Playful & Random': [
    { id: 'play-1', prompt: 'If our friendship/relationship had a theme song, what would it be?', type: ResponseType.BOTH_RESPOND, category: 'Vibes' },
    { id: 'play-2', prompt: 'What is your most harmlessly ridiculous opinion?', type: ResponseType.OTHER_RESPONDS, category: 'Chaos' },
    { id: 'play-3', prompt: 'Pick a superpower — but it comes with an annoying side effect. What is it?', type: ResponseType.BOTH_RESPOND, category: 'Imagination' },
    { id: 'play-4', prompt: 'What is a tiny thing that instantly improves your day?', type: ResponseType.BOTH_RESPOND, category: 'Joy' },
    { id: 'play-5', prompt: 'If you could swap lives with a fictional character for 24 hours, who would it be?', type: ResponseType.OTHER_RESPONDS, category: 'Stories' },
    { id: 'play-6', prompt: 'What is your go-to “I need comfort” food or drink?', type: ResponseType.BOTH_RESPOND, category: 'Comfort' },
    { id: 'play-7', prompt: 'What is a skill you would learn instantly if you could?', type: ResponseType.OTHER_RESPONDS, category: 'Curiosity' }
  ],
  'Future & Dreams': [
    { id: 'future-1', prompt: 'What is a risk you are currently afraid to take?', type: ResponseType.OTHER_RESPONDS, category: 'Courage' },
    { id: 'future-2', prompt: 'If everything worked out, what would your life look like in 5 years?', type: ResponseType.BOTH_RESPOND, category: 'Vision' },
    { id: 'future-3', prompt: 'What is a dream you have that feels “too big” to say?', type: ResponseType.OTHER_RESPONDS, category: 'Dreams' },
    { id: 'future-4', prompt: 'What is one habit that future-you will thank you for?', type: ResponseType.BOTH_RESPOND, category: 'Momentum' },
    { id: 'future-5', prompt: 'Who do you want to become — not what do you want to do?', type: ResponseType.BOTH_RESPOND, category: 'Becoming' },
    { id: 'future-6', prompt: 'What would you try if you knew you could not fail?', type: ResponseType.OTHER_RESPONDS, category: 'Fearless' },
    { id: 'future-7', prompt: 'What is something you want to build with your time and energy?', type: ResponseType.OTHER_RESPONDS, category: 'Create' }
  ],
  'Hard Truths': [
    { id: 'truth-1', prompt: 'What pattern do you keep repeating even though you know it hurts you?', type: ResponseType.OTHER_RESPONDS, category: 'Patterns' },
    { id: 'truth-2', prompt: 'What is a boundary you wish you set sooner?', type: ResponseType.OTHER_RESPONDS, category: 'Boundaries' },
    { id: 'truth-3', prompt: 'What do you avoid talking about because it feels uncomfortable?', type: ResponseType.BOTH_RESPOND, category: 'Avoidance' },
    { id: 'truth-4', prompt: 'What is something you need to forgive yourself for?', type: ResponseType.OTHER_RESPONDS, category: 'Healing' },
    { id: 'truth-5', prompt: 'When you are stressed, how do you tend to treat the people closest to you?', type: ResponseType.BOTH_RESPOND, category: 'Stress' },
    { id: 'truth-6', prompt: 'If you could change one thing about our dynamic, what would it be?', type: ResponseType.OTHER_RESPONDS, category: 'Connection' },
    { id: 'truth-7', prompt: 'What is a hard truth you learned recently that changed you?', type: ResponseType.BOTH_RESPOND, category: 'Growth' }
  ]
};

export const generateDeck = async (theme: string): Promise<Card[]> => {
  const deck = HARD_CODED_DECKS[theme] ?? HARD_CODED_DECKS['Deep Connections'];
  return deck.map(card => ({ ...card }));
};
