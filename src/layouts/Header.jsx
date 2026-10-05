import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from '../components/common/Icon'

const titles = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/pipeline': 'Pipeline',
  '/followups': 'Follow-ups',
  '/customers': 'Customers',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

export function Header({ onMenu }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOutDemo } = useAuth()
  const title =
    titles[location.pathname] ||
    (location.pathname.startsWith('/leads/') ? 'Lead details' : 'LeadFlow')

  function handleSignOut() {
    signOutDemo()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <button
        type="button"
        className="btn btn--ghost menu-btn"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Icon name="menu" />
      </button>
      <div>
        <p className="eyebrow">LeadFlow</p>
        <h1>{title}</h1>
      </div>
      <button type="button" className="btn btn--ghost" onClick={handleSignOut}>
        <Icon name="logout" />
        Sign out
      </button>
    </header>
  )
}
