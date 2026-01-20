# Ember: Connection Cards

I built **Ember** because most "icebreaker" games feel forced or repetitive. This is a 2-player conversation tool designed to facilitate actual connection through AI-curated prompts and a high-fidelity visual experience.

The core idea is simple: two people, one deck, and enough atmosphere to actually get into a deep conversation.

## What it actually does

- **Curated Decks**: Instead of a static list of questions, the app provides 7-card decks based on specific "depths" (Deep Connections, Playful & Random, Future & Dreams, or Hard Truths).
- **Atmospheric UI**: I’ve built four distinct visual modes (Ember, Ocean, Twilight, Forest). They aren't just color swaps; they change the background gradients, glow effects, and icons to set the right mood for the talk.
- **The "Spark" System**: During a session, you can mark specific cards as "Impactful Moments." This isn't just for show—it archives them into your persistent history.
- **Persistence & History**: Everything is saved to LocalStorage. If you close your browser mid-game, it’ll be there when you get back. Once a journey is finished, it’s archived in a "Journey History" log on the home screen where you can revisit those specific saved sparks later.

## Technical Choices

- **React + Tailwind**: For the speed of iteration and the ability to build a highly polished, responsive UI quickly.
- **Framer-style Animations**: I used standard CSS transitions and Tailwind's animation utilities to handle the card flips and the "floating" feeling of the setup screen.
- **Zero Backend**: I intentionally built this to be serverless and privacy-focused. Your history stays in your browser's local storage; no data is sent to a database.

## How to run it

1.  **Setup**: Install dependencies with `npm install`.
2.  **Run**: Start the dev server with `npm run dev`.
3.  **Local Storage**: Just a heads-up—if you're testing the persistence, the app looks for `ember_active_session` and `ember_journey_history` in your browser.

## Design Philosophy

I wanted this to feel "expensive" and intimate. That’s why there’s a lot of focus on:
- **Serif Typography**: Using *Playfair Display* for the prompts to make the questions feel more like "poetry" and less like "data."
- **Soft UI**: Using backdrop blurs and subtle glow gradients rather than harsh borders.
- **Intentional Friction**: The card flip is a deliberate action. It forces a moment of anticipation before the next question is revealed.

Enjoy the conversations.
