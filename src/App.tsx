import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './store/AuthContext'
import { DecksProvider } from './store/DecksContext'
import { SubjectsProvider } from './store/SubjectsContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Decks from './pages/Decks'
import DeckDetail from './pages/DeckDetail'
import Study from './pages/Study'
import Timer from './pages/Timer'
import Subjects from './pages/Subjects'
import SubjectDetail from './pages/SubjectDetail'
import Assistant from './pages/Assistant'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthGate from './pages/AuthGate'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          <AuthGate>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:id" element={<SubjectDetail />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/decks/:id" element={<DeckDetail />} />
              <Route path="/study/:id" element={<Study />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthGate>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <DecksProvider>
        <SubjectsProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </SubjectsProvider>
      </DecksProvider>
    </AuthProvider>
  )
}
