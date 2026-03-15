# Engineering Study App

Study material for engineering: YouTube classes, flashcards, AI assistant, focus timer. Data is stored in your browser (LocalStorage).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Features

- **Subjects** – Engineering subjects (Math, Physics, Programming, DSA, DBMS, etc.) with **YouTube links** for classes. Add your own subjects and video/playlist links; videos can be embedded on the subject page.
- **Flashcards** – Decks and cards; study mode with flip (Space) and arrows.
- **AI Assistant** – Chat with an AI for help on concepts (requires OpenAI API key).
- **Timer** – Pomodoro: Focus (25m), Short break (5m), Long break (15m).

## AI Assistant setup

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys).
2. Create a `.env` file in the project root (copy from `.env.example`):
   ```
   VITE_OPENAI_API_KEY=your-key-here
   ```
3. Restart the dev server (`npm run dev`).

## Build

```bash
npm run build
npm run preview
```
