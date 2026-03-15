import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDecksContext } from '../store/DecksContext'

export default function Decks() {
  const { decks, addDeck, deleteDeck, updateDeck } = useDecksContext()
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const name = newName.trim()
    if (name) {
      addDeck(name)
      setNewName('')
    }
  }

  const startEdit = (id: string, name: string) => {
    setEditingId(id)
    setEditName(name)
  }

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateDeck(editingId, editName.trim())
      setEditingId(null)
      setEditName('')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Decks</h1>

      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New deck name"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
        >
          Add deck
        </button>
      </form>

      {decks.length === 0 ? (
        <p className="text-slate-600">No decks yet. Create one above.</p>
      ) : (
        <ul className="space-y-3">
          {decks.map((deck) => (
            <li
              key={deck.id}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              {editingId === deck.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    className="flex-1 px-3 py-1 border rounded"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="text-brand-600 font-medium"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={`/decks/${deck.id}`}
                    className="flex-1 font-medium text-slate-800 hover:text-brand-600"
                  >
                    {deck.name}
                    <span className="text-slate-500 font-normal ml-2">
                      ({deck.cards.length} cards)
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => startEdit(deck.id, deck.name)}
                    className="text-slate-500 hover:text-slate-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDeck(deck.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
