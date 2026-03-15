# Study App – Build Plan

A practical plan to build a study app from scratch. Adjust features and tech choices to match your goals.

---

## 1. Define What Your Study App Does

Pick one or combine several:

| Feature | Description |
|--------|-------------|
| **Flashcards** | Create decks, flip cards, spaced repetition |
| **Notes** | Organize notes by subject, search, markdown |
| **Quizzes** | Multiple choice / short answer, track scores |
| **Pomodoro / Timer** | Focus sessions (e.g. 25 min work, 5 min break) |
| **Progress** | Streaks, time studied, goals |

**Suggested MVP:** Start with **Flashcards + simple Timer**, then add Notes and Quizzes.

---

## 2. Tech Stack Options

### Option A – Web app (good default)
- **Frontend:** React (or Next.js) + TypeScript
- **Styling:** Tailwind CSS
- **State:** React state or Zustand
- **Storage:** LocalStorage first, later add a backend/DB

### Option B – Full-stack (users + sync)
- **Frontend:** React/Next.js
- **Backend:** Node.js (Express) or Next.js API routes
- **Database:** SQLite, PostgreSQL, or Supabase
- **Auth:** NextAuth, Clerk, or Supabase Auth

### Option C – Mobile-first
- **React Native** or **Expo** for iOS/Android
- Or **PWA** (web app that works offline)

**Recommendation:** Start with **Option A** (React + TypeScript + Tailwind, LocalStorage). Add backend when you need accounts and sync.

---

## 3. Project Structure (Web)

```
app/
├── public/
├── src/
│   ├── components/     # UI: Card, Deck, Timer, etc.
│   ├── pages/          # Home, Decks, Study, Settings
│   ├── hooks/          # useFlashcards, useTimer, useLocalStorage
│   ├── store/          # State (e.g. Zustand)
│   ├── types/          # TypeScript types
│   ├── utils/          # helpers, storage
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

---

## 4. Implementation Phases

### Phase 1 – Setup & shell (Day 1)
- [ ] Create React + TypeScript project (Vite or Create React App)
- [ ] Add Tailwind CSS
- [ ] Define routes: Home, Decks, Study, Timer (and optionally Notes)
- [ ] Basic layout: header, nav, main content area

### Phase 2 – Flashcards (Core)
- [ ] Data model: `Deck` (id, name, cards[]), `Card` (id, front, back)
- [ ] LocalStorage: save/load decks and cards
- [ ] **Decks page:** list decks, create, rename, delete
- [ ] **Cards page:** add/edit/delete cards in a deck
- [ ] **Study page:** show one card, flip on click, “next” / “previous”
- [ ] Optional: mark card “known” / “review” for simple spaced repetition

### Phase 3 – Timer (Pomodoro)
- [ ] Timer component: start/pause/reset
- [ ] Presets: e.g. 25 min work, 5 min short break, 15 min long break
- [ ] Optional: sound or notification when session ends
- [ ] Optional: log study time per deck (store in LocalStorage)

### Phase 4 – Polish & UX
- [ ] Dark/light theme
- [ ] Keyboard shortcuts (e.g. Space to flip, Arrow keys for next/prev)
- [ ] Responsive layout (mobile-friendly)
- [ ] Empty states and loading states

### Phase 5 – Optional extras
- [ ] **Notes:** simple markdown notes per subject/deck
- [ ] **Quizzes:** generate multiple choice from card backs, track score
- [ ] **Progress:** streaks, total cards studied, time per week
- [ ] **Export/import:** JSON or CSV for decks

---

## 5. Data Models (TypeScript)

```ts
// types/index.ts
export interface Card {
  id: string;
  front: string;
  back: string;
  lastReviewed?: number;  // timestamp, for spaced repetition
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  createdAt: number;
}
```

---

## 6. Suggested Order of Work

1. **Week 1:** Setup project, routing, layout, one sample deck in state.
2. **Week 2:** Full CRUD for decks and cards, LocalStorage persistence.
3. **Week 3:** Study mode (flip, next/prev), then Timer.
4. **Week 4:** Theming, shortcuts, responsive, and any one “nice-to-have” (e.g. notes or quizzes).

---

## 7. Next Step

Choose one:

- **“Set up the project”** – I’ll give you exact commands and file contents for React + TypeScript + Tailwind and the folder structure above.
- **“Start with flashcards only”** – I’ll outline the components and data flow for decks and cards first.
- **“I want [X]”** – Tell me your stack (e.g. Next.js, Vue) or extra features (e.g. auth, mobile), and I’ll adapt this plan.

Once you pick, we can go step-by-step in your `app` folder.
