import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: err } = await register(email, password, name)
    setSubmitting(false)
    if (err) {
      setError(err)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Create account</h1>
      <p className="text-slate-600 mb-6">
        Register to save your study material and progress.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</p>
        )}
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium disabled:opacity-50"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-4 text-center text-slate-600 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
