import { useState, useEffect, useCallback } from 'react'
import type { Deck, Card } from '../types'
import { loadDecks, saveDecks, generateId } from '../utils/storage'

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([])

  useEffect(() => {
    setDecks(loadDecks())
  }, [])

  useEffect(() => {
    if (decks.length >= 0) saveDecks(decks)
  }, [decks])

  const addDeck = useCallback((name: string) => {
    setDecks((prev) => [
      ...prev,
      { id: generateId(), name, cards: [], createdAt: Date.now() },
    ])
  }, [])

  const updateDeck = useCallback((id: string, name: string) => {
    setDecks((prev) =>
      prev.map((d) => (d.id === id ? { ...d, name } : d))
    )
  }, [])

  const deleteDeck = useCallback((id: string) => {
    setDecks((prev) => prev.filter((d) => d.id !== id))
  }, [])

  const getDeck = useCallback(
    (id: string) => decks.find((d) => d.id === id),
    [decks]
  )

  const addCard = useCallback((deckId: string, front: string, back: string) => {
    const card: Card = {
      id: generateId(),
      front,
      back,
    }
    setDecks((prev) =>
      prev.map((d) =>
        d.id === deckId ? { ...d, cards: [...d.cards, card] } : d
      )
    )
  }, [])

  const updateCard = useCallback(
    (deckId: string, cardId: string, front: string, back: string) => {
      setDecks((prev) =>
        prev.map((d) =>
          d.id === deckId
            ? {
                ...d,
                cards: d.cards.map((c) =>
                  c.id === cardId ? { ...c, front, back } : c
                ),
              }
            : d
        )
      )
    },
    []
  )

  const deleteCard = useCallback((deckId: string, cardId: string) => {
    setDecks((prev) =>
      prev.map((d) =>
        d.id === deckId
          ? { ...d, cards: d.cards.filter((c) => c.id !== cardId) }
          : d
      )
    )
  }, [])

  return {
    decks,
    addDeck,
    updateDeck,
    deleteDeck,
    getDeck,
    addCard,
    updateCard,
    deleteCard,
  }
}
