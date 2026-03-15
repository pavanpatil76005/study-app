import { createContext, useContext, ReactNode } from 'react'
import { useSubjects } from './useSubjects'

type SubjectsContextValue = ReturnType<typeof useSubjects>

const SubjectsContext = createContext<SubjectsContextValue | null>(null)

export function SubjectsProvider({ children }: { children: ReactNode }) {
  const value = useSubjects()
  return (
    <SubjectsContext.Provider value={value}>{children}</SubjectsContext.Provider>
  )
}

export function useSubjectsContext() {
  const ctx = useContext(SubjectsContext)
  if (!ctx) throw new Error('useSubjectsContext must be used within SubjectsProvider')
  return ctx
}
