import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { User } from '../types'
import { getSession, signInUser as doSignIn, registerUser as doRegister, signOutUser as doSignOut } from '../utils/auth'

type AuthContextValue = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(getSession())
    setLoading(false)
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { user: u, error } = await doSignIn(email, password)
    setUser(u)
    return { error }
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    const { user: u, error } = await doRegister(email, password, name)
    setUser(u)
    return { error }
  }, [])

  const signOut = useCallback(() => {
    doSignOut()
    setUser(null)
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    signIn,
    register,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
