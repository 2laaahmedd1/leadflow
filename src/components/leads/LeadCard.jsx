import { Link } from 'react-router-dom'
import { formatDate, followUpKind } from '../../utils/dates'
import { formatEGP } from '../../utils/format'
import { PriorityBadge } from '../common/PriorityBadge'
import { StatusBadge } from '../common/StatusBadge'

export function LeadCard({ lead, onEdit, onDelete, extra }) {
  const kind = followUpKind(lead.nextFollowUp)

  return (
    <article className={`lead-card ${kind === 'overdue' ? 'lead-card--overdue' : ''}`}>
      <div className="lead-card__top">
        <div>
          <Link className="lead-name" to={`/leads/${lead.id}`}>
            {lead.name}
          </Link>
          <p className="muted">{lead.service || 'No service listed'}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      <p className="lead-card__value">{formatEGP(lead.value)}</p>
      <div className="lead-card__meta">
        <PriorityBadge priority={lead.priority} />
        <span>{lead.source}</span>
        <span className={kind === 'overdue' ? 'text-danger' : ''}>
          {formatDate(lead.nextFollowUp)}
        </span>
      </div>
      {extra}
      {(onEdit || onDelete) && (
        <div className="row-actions">
          <Link className="btn btn--small" to={`/leads/${lead.id}`}>
            View
          </Link>
          {onEdit ? (
            <button type="button" className="btn btn--small" onClick={() => onEdit(lead)}>
              Edit
            </button>
          ) : null}
          {onDelete ? (
            <button
              type="button"
              className="btn btn--small btn--danger-text"
              onClick={() => onDelete(lead)}
            >
              Delete
            </button>
          ) : null}
        </div>
      )}
    </article>
  )
}
