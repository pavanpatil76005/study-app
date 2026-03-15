import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/subjects', label: 'Subjects' },
  { to: '/decks', label: 'Decks' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/timer', label: 'Timer' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-600">
            Engg Study
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <nav className="flex gap-4">
                  {nav.map(({ to, label }) => {
                    const isActive =
                      location.pathname === to ||
                      (to !== '/' && location.pathname.startsWith(to + '/'))
                    return (
                      <Link
                        key={to}
                        to={to}
                        className={
                          isActive
                            ? 'text-brand-600 font-medium'
                            : 'text-slate-600 hover:text-slate-900'
                        }
                      >
                        {label}
                      </Link>
                    )
                  })}
                </nav>
                <span className="text-slate-500 text-sm hidden sm:inline">
                  {user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <nav className="flex gap-3">
                <Link
                  to="/login"
                  className={
                    location.pathname === '/login'
                      ? 'text-brand-600 font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className={
                    location.pathname === '/register'
                      ? 'text-brand-600 font-medium'
                      : 'text-slate-600 hover:text-slate-900'
                  }
                >
                  Create account
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
