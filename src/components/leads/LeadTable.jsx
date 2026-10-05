import { Link } from 'react-router-dom'
import { formatDate, followUpKind } from '../../utils/dates'
import { formatEGP } from '../../utils/format'
import { PriorityBadge } from '../common/PriorityBadge'
import { StatusBadge } from '../common/StatusBadge'

export function LeadTable({ leads, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Service</th>
            <th>Source</th>
            <th>Value</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Next follow-up</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const kind = followUpKind(lead.nextFollowUp)
            return (
              <tr key={lead.id}>
                <td>
                  <Link className="lead-name" to={`/leads/${lead.id}`}>
                    {lead.name}
                  </Link>
                  <p className="muted">{lead.phone}</p>
                </td>
                <td>{lead.service || '—'}</td>
                <td>{lead.source}</td>
                <td>{formatEGP(lead.value)}</td>
                <td>
                  <StatusBadge status={lead.status} />
                </td>
                <td>
                  <PriorityBadge priority={lead.priority} />
                </td>
                <td>
                  <span className={kind === 'overdue' ? 'text-danger' : ''}>
                    {formatDate(lead.nextFollowUp)}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <Link className="btn btn--small" to={`/leads/${lead.id}`}>
                      View
                    </Link>
                    <button
                      type="button"
                      className="btn btn--small"
                      onClick={() => onEdit(lead)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn--small btn--danger-text"
                      onClick={() => onDelete(lead)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
