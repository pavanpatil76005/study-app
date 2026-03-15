import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDecksContext } from '../store/DecksContext'

export default function DeckDetail() {
  const { id } = useParams<{ id: string }>()
  const { getDeck, addCard, updateCard, deleteCard } = useDecksContext()
  const deck = id ? getDeck(id) : null

  const [showForm, setShowForm] = useState(false)
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [editFront, setEditFront] = useState('')
  const [editBack, setEditBack] = useState('')

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

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (front.trim() && back.trim()) {
      addCard(deck.id, front.trim(), back.trim())
      setFront('')
      setBack('')
      setShowForm(false)
    }
  }

  const startEdit = (cardId: string, cardFront: string, cardBack: string) => {
    setEditingCardId(cardId)
    setEditFront(cardFront)
    setEditBack(cardBack)
  }

  const saveEdit = () => {
    if (editingCardId && editFront.trim() && editBack.trim()) {
      updateCard(deck.id, editingCardId, editFront.trim(), editBack.trim())
      setEditingCardId(null)
    }
  }

  return (
    <div>
      <Link to="/decks" className="text-brand-600 mb-4 inline-block">
        ← Back to Decks
      </Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">{deck.name}</h1>
      <p className="text-slate-600 mb-6">{deck.cards.length} cards</p>

      <div className="flex gap-4 mb-6">
        <Link
          to={`/study/${deck.id}`}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium disabled:opacity-50"
          style={{ pointerEvents: deck.cards.length === 0 ? 'none' : undefined }}
        >
          Study
        </Link>
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium"
        >
          {showForm ? 'Cancel' : 'Add card'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="p-4 mb-6 bg-slate-100 rounded-xl">
          <input
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Front"
            className="w-full px-4 py-2 mb-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back"
            className="w-full px-4 py-2 mb-2 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
          >
            Add card
          </button>
        </form>
      )}

      <ul className="space-y-2">
        {deck.cards.map((card) => (
          <li
            key={card.id}
            className="p-4 bg-white rounded-xl border border-slate-200"
          >
            {editingCardId === card.id ? (
              <div>
                <input
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  className="w-full px-3 py-1 mb-2 border rounded"
                  placeholder="Front"
                />
                <input
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  className="w-full px-3 py-1 mb-2 border rounded"
                  placeholder="Back"
                />
                <button
                  type="button"
                  onClick={saveEdit}
                  className="text-brand-600 font-medium"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCardId(null)}
                  className="ml-2 text-slate-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="font-medium text-slate-800">{card.front}</p>
                <p className="text-slate-600 text-sm mt-1">{card.back}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      startEdit(card.id, card.front, card.back)
                    }
                    className="text-sm text-slate-500 hover:text-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCard(deck.id, card.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {deck.cards.length === 0 && !showForm && (
        <p className="text-slate-500">No cards in this deck yet.</p>
      )}
    </div>
  )
}
