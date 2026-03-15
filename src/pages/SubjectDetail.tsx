import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSubjectsContext } from '../store/SubjectsContext'

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com') && u.searchParams.has('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`
    }
    if (u.hostname === 'youtu.be' && u.pathname.slice(1)) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    }
    if (u.hostname.includes('youtube.com') && u.searchParams.has('list')) {
      return `https://www.youtube.com/embed/videoseries?list=${u.searchParams.get('list')}`
    }
  } catch {
    return null
  }
  return null
}

export default function SubjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { getSubject, addResource, deleteResource } = useSubjectsContext()
  const subject = id ? getSubject(id) : null

  const [showForm, setShowForm] = useState(false)
  const [type, setType] = useState<'youtube' | 'link'>('youtube')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !title.trim() || !url.trim()) return
    addResource(subject.id, type, title.trim(), url.trim(), description.trim() || undefined)
    setTitle('')
    setUrl('')
    setDescription('')
    setShowForm(false)
  }

  if (!subject) {
    return (
      <div>
        <p className="text-slate-600">Subject not found.</p>
        <Link to="/subjects" className="text-brand-600 mt-4 inline-block">
          ← Back to Subjects
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/subjects" className="text-brand-600 mb-4 inline-block">
        ← Back to Subjects
      </Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">{subject.name}</h1>
      {subject.description && (
        <p className="text-slate-600 mb-6">{subject.description}</p>
      )}

      <button
        type="button"
        onClick={() => setShowForm((s) => !s)}
        className="mb-6 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
      >
        {showForm ? 'Cancel' : 'Add YouTube / Link'}
      </button>

      {showForm && (
        <form onSubmit={handleAdd} className="p-4 mb-8 bg-slate-100 rounded-xl">
          <div className="flex gap-2 mb-3">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                checked={type === 'youtube'}
                onChange={() => setType('youtube')}
              />
              YouTube
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                checked={type === 'link'}
                onChange={() => setType('link')}
              />
              Link
            </label>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (e.g. Lecture 1 - Calculus)"
            className="w-full px-4 py-2 mb-2 border rounded-lg"
            required
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/..."
            className="w-full px-4 py-2 mb-2 border rounded-lg"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (optional)"
            className="w-full px-4 py-2 mb-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
          >
            Add
          </button>
        </form>
      )}

      <h2 className="text-xl font-semibold text-slate-800 mb-4">Classes & links</h2>
      {subject.resources.length === 0 ? (
        <p className="text-slate-500">No videos or links yet. Add one above.</p>
      ) : (
        <ul className="space-y-6">
          {subject.resources.map((res) => {
            const embedUrl = res.type === 'youtube' ? getYoutubeEmbedUrl(res.url) : null
            return (
              <li
                key={res.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-600 hover:underline break-all"
                    >
                      {res.title}
                    </a>
                    {res.description && (
                      <p className="text-slate-600 text-sm mt-1">{res.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteResource(subject.id, res.id)}
                    className="text-red-500 hover:text-red-700 text-sm shrink-0"
                  >
                    Remove
                  </button>
                </div>
                {embedUrl && (
                  <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <iframe
                      src={embedUrl}
                      title={res.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {res.type === 'link' && (
                  <p className="mt-2 text-sm text-slate-500">
                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline break-all">
                      {res.url}
                    </a>
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
