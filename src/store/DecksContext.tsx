import { createContext, useContext, ReactNode } from 'react'
import { useDecks } from './useDecks'

type DecksContextValue = ReturnType<typeof useDecks>

const DecksContext = createContext<DecksContextValue | null>(null)

export function DecksProvider({ children }: { children: ReactNode }) {
  const value = useDecks()
  return (
    <DecksContext.Provider value={value}>{children}</DecksContext.Provider>
  )
}

export function useDecksContext() {
  const ctx = useContext(DecksContext)
  if (!ctx) throw new Error('useDecksContext must be used within DecksProvider')
  return ctx
}
