import { useState, useEffect, useCallback } from 'react'
import type { Subject, Resource } from '../types'
import { loadSubjects, saveSubjects, generateId, getDefaultSubjects } from '../utils/storage'

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    setSubjects(loadSubjects())
  }, [])

  useEffect(() => {
    if (subjects.length >= 0) saveSubjects(subjects)
  }, [subjects])

  const addSubject = useCallback((name: string, description?: string) => {
    setSubjects((prev) => [
      ...prev,
      {
        id: generateId(),
        name,
        description,
        resources: [],
        createdAt: Date.now(),
      },
    ])
  }, [])

  const updateSubject = useCallback(
    (id: string, name: string, description?: string) => {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, name, description: description ?? s.description } : s
        )
      )
    },
    []
  )

  const deleteSubject = useCallback((id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const getSubject = useCallback(
    (id: string) => subjects.find((s) => s.id === id),
    [subjects]
  )

  const addResource = useCallback(
    (
      subjectId: string,
      type: 'youtube' | 'link',
      title: string,
      url: string,
      description?: string
    ) => {
      const resource: Resource = {
        id: generateId(),
        type,
        title,
        url,
        description,
      }
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === subjectId
            ? { ...s, resources: [...s.resources, resource] }
            : s
        )
      )
    },
    []
  )

  const updateResource = useCallback(
    (
      subjectId: string,
      resourceId: string,
      updates: Partial<Pick<Resource, 'title' | 'url' | 'description' | 'type'>>
    ) => {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === subjectId
            ? {
                ...s,
                resources: s.resources.map((r) =>
                  r.id === resourceId ? { ...r, ...updates } : r
                ),
              }
            : s
        )
      )
    },
    []
  )

  const deleteResource = useCallback((subjectId: string, resourceId: string) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subjectId
          ? { ...s, resources: s.resources.filter((r) => r.id !== resourceId) }
          : s
      )
    )
  }, [])

  const loadDefaultSubjects = useCallback(() => {
    setSubjects(getDefaultSubjects())
  }, [])

  return {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    getSubject,
    addResource,
    updateResource,
    deleteResource,
    loadDefaultSubjects,
  }
}
