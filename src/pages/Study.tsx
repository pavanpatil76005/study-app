import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDecksContext } from '../store/DecksContext'

export default function Study() {
  const { id } = useParams<{ id: string }>()
  const { getDeck } = useDecksContext()
  const deck = id ? getDeck(id) : null

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const cards = deck?.cards ?? []
  const card = cards[index]

  const goNext = useCallback(() => {
    setFlipped(false)
    setIndex((i) => (i + 1) % cards.length)
  }, [cards.length])

  const goPrev = useCallback(() => {
    setFlipped(false)
    setIndex((i) => (i - 1 + cards.length) % cards.length)
  }, [cards.length])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      }
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  if (!deck) {
    return (
      <div>
        <p className="text-slate-600">Deck not found.</p>
        <Link to="/decks" className="text-brand-600 mt-4 inline-block">
          ← Back to Decks
        </Link>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div>
        <p className="text-slate-600">No cards in this deck.</p>
        <Link to={`/decks/${deck.id}`} className="text-brand-600 mt-4 inline-block">
          ← Back to deck
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to={`/decks/${deck.id}`} className="text-brand-600 mb-4 inline-block">
        ← Back to {deck.name}
      </Link>
      <p className="text-slate-600 mb-4">
        Card {index + 1} of {cards.length} · Space to flip, arrows to navigate
      </p>

      <div
        onClick={() => setFlipped((f) => !f)}
        className="min-h-[200px] flex items-center justify-center p-8 bg-white rounded-2xl border-2 border-slate-200 cursor-pointer hover:border-brand-400 transition select-none"
      >
        <p className="text-xl text-center text-slate-800">
          {flipped ? card.back : card.front}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={goPrev}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
