import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: err } = await signIn(email, password)
    setSubmitting(false)
    if (err) {
      setError(err)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Sign in</h1>
      <p className="text-slate-600 mb-6">
        Sign in to your account to use the study app.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</p>
        )}
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            id="login-email"
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
          <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium disabled:opacity-50"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-center text-slate-600 text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-brand-600 font-medium hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}
