export interface Card {
  id: string
  front: string
  back: string
  lastReviewed?: number
}

export interface Deck {
  id: string
  name: string
  cards: Card[]
  createdAt: number
}

export type ResourceType = 'youtube' | 'link'

export interface Resource {
  id: string
  type: ResourceType
  title: string
  url: string
  description?: string
}

export interface Subject {
  id: string
  name: string
  description?: string
  resources: Resource[]
  createdAt: number
}

export interface User {
  id: string
  email: string
  name: string
}

export interface StoredUser {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: number
}
