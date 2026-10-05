import { Link } from 'react-router-dom'
import { formatDate, followUpKind } from '../../utils/dates'
import { formatEGP } from '../../utils/format'
import { PriorityBadge } from '../common/PriorityBadge'
import { StatusBadge } from '../common/StatusBadge'

export function FollowUpCard({ lead, onContact, onEdit }) {
  const kind = followUpKind(lead.nextFollowUp)

  return (
    <article className={`followup-card followup-card--${kind || 'upcoming'}`}>
      <div>
        <Link className="lead-name" to={`/leads/${lead.id}`}>
          {lead.name}
        </Link>
        <p className="muted">{lead.service}</p>
      </div>
      <p className="lead-card__value">{formatEGP(lead.value)}</p>
      <div className="lead-card__meta">
        <StatusBadge status={lead.status} />
        <PriorityBadge priority={lead.priority} />
        <span className={kind === 'overdue' ? 'text-danger' : ''}>
          Follow up {formatDate(lead.nextFollowUp)}
        </span>
      </div>
      <div className="row-actions">
        <button type="button" className="btn btn--small" onClick={() => onContact(lead.id)}>
          Mark as contacted
        </button>
        <button type="button" className="btn btn--small" onClick={() => onEdit(lead)}>
          Edit
        </button>
        <Link className="btn btn--small" to={`/leads/${lead.id}`}>
          Open details
        </Link>
      </div>
    </article>
  )
}
