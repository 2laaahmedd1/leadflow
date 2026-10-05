import { NavLink } from 'react-router-dom'
import { Icon } from '../components/common/Icon'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/leads', label: 'Leads', icon: 'leads' },
  { to: '/pipeline', label: 'Pipeline', icon: 'pipeline' },
  { to: '/followups', label: 'Follow-ups', icon: 'followups' },
  { to: '/customers', label: 'Customers', icon: 'customers' },
  { to: '/analytics', label: 'Analytics', icon: 'analytics' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

export function Sidebar({ open, onNavigate }) {
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <div className="sidebar__brand">
        <span className="logo-mark">LF</span>
        <div>
          <strong>LeadFlow</strong>
          <p>Turn every lead into an opportunity.</p>
        </div>
      </div>
      <nav className="sidebar__nav" aria-label="Main">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'is-active' : ''}`
            }
            onClick={onNavigate}
          >
            <Icon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
