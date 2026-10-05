import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLeads } from '../context/LeadsContext'
import { Toast } from '../components/common/Toast'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function DashboardLayout() {
  const { isDemoSignedIn } = useAuth()
  const { notice } = useLeads()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!isDemoSignedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div className="app-main">
        <Header onMenu={() => setMenuOpen((open) => !open)} />
        <div className="page">
          <Outlet />
        </div>
      </div>
      <Toast message={notice} />
    </div>
  )
}
