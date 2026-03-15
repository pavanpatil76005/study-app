import { Link } from 'react-router-dom'
import { useDecksContext } from '../store/DecksContext'
import { useSubjectsContext } from '../store/SubjectsContext'

export default function Home() {
  const { decks } = useDecksContext()
  const { subjects } = useSubjectsContext()
  const totalCards = decks.reduce((n, d) => n + d.cards.length, 0)
  const totalVideos = subjects.reduce((n, s) => n + s.resources.length, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Engineering Study App
      </h1>
      <p className="text-slate-600 mb-8">
        Study material with YouTube classes, flashcards, AI assistant, and focus timer.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/subjects"
          className="block p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Subjects</h2>
          <p className="text-slate-600 text-sm">
            {subjects.length} subject{subjects.length !== 1 ? 's' : ''}, {totalVideos} video
            {totalVideos !== 1 ? 's' : ''} / links
          </p>
        </Link>
        <Link
          to="/decks"
          className="block p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Flashcards</h2>
          <p className="text-slate-600 text-sm">
            {decks.length} deck{decks.length !== 1 ? 's' : ''}, {totalCards} card
            {totalCards !== 1 ? 's' : ''}
          </p>
        </Link>
        <Link
          to="/assistant"
          className="block p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-1">AI Assistant</h2>
          <p className="text-slate-600 text-sm">
            Ask questions on math, programming, DSA, etc.
          </p>
        </Link>
        <Link
          to="/timer"
          className="block p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition sm:col-span-2 lg:col-span-1"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Timer</h2>
          <p className="text-slate-600 text-sm">
            Pomodoro-style focus sessions
          </p>
        </Link>
      </div>
    </div>
  )
}
