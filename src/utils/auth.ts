import type { User, StoredUser } from '../types'
import { generateId } from './storage'

const USERS_KEY = 'study-app-users'
const SESSION_KEY = 'study-app-session'

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as StoredUser[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as User
    return data?.id && data?.email ? data : null
  } catch {
    return null
  }
}

function setSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<{ user: User | null; error?: string }> {
  const trimmedEmail = email.trim().toLowerCase()
  const trimmedName = name.trim() || trimmedEmail.split('@')[0]
  if (!trimmedEmail || !password) {
    return { user: null, error: 'Email and password are required.' }
  }
  if (password.length < 6) {
    return { user: null, error: 'Password must be at least 6 characters.' }
  }
  const users = getStoredUsers()
  if (users.some((u) => u.email === trimmedEmail)) {
    return { user: null, error: 'An account with this email already exists.' }
  }
  const passwordHash = await hashPassword(password)
  const id = generateId()
  const stored: StoredUser = {
    id,
    email: trimmedEmail,
    name: trimmedName,
    passwordHash,
    createdAt: Date.now(),
  }
  saveStoredUsers([...users, stored])
  const user: User = { id: stored.id, email: stored.email, name: stored.name }
  setSession(user)
  return { user }
}

export async function signInUser(
  email: string,
  password: string
): Promise<{ user: User | null; error?: string }> {
  const trimmedEmail = email.trim().toLowerCase()
  if (!trimmedEmail || !password) {
    return { user: null, error: 'Email and password are required.' }
  }
  const users = getStoredUsers()
  const stored = users.find((u) => u.email === trimmedEmail)
  if (!stored) {
    return { user: null, error: 'No account found with this email.' }
  }
  const passwordHash = await hashPassword(password)
  if (passwordHash !== stored.passwordHash) {
    return { user: null, error: 'Incorrect password.' }
  }
  const user: User = { id: stored.id, email: stored.email, name: stored.name }
  setSession(user)
  return { user }
}

export function signOutUser(): void {
  clearSession()
}
