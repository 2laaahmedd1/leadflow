import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { Modal } from '../components/common/Modal'
import { PriorityBadge } from '../components/common/PriorityBadge'
import { StatusBadge } from '../components/common/StatusBadge'
import { LeadForm } from '../components/leads/LeadForm'
import { useLeads } from '../context/LeadsContext'
import { STATUSES } from '../utils/constants'
import { formatDate } from '../utils/dates'
import { formatEGP } from '../utils/format'

export function LeadDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getLeadById, updateLead, deleteLead, markAsContacted, updateLeadStatus } =
    useLeads()
  const lead = getLeadById(id)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  if (!lead) {
    return (
      <section className="panel">
        <h2>Lead not found.</h2>
        <p className="muted">This lead does not exist or was deleted.</p>
        <Link className="btn btn--primary" to="/leads">
          Back to Leads
        </Link>
      </section>
    )
  }

  const history = [...(lead.history || [])].sort((a, b) =>
    b.at.localeCompare(a.at),
  )

  return (
    <div className="stack">
      <div className="page-toolbar">
        <Link to="/leads" className="btn btn--ghost">
          Back to Leads
        </Link>
        <div className="row-actions">
          <button type="button" className="btn" onClick={() => markAsContacted(lead.id)}>
            Mark as contacted
          </button>
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => setDeleting(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <section className="panel detail-hero">
        <div>
          <h2>{lead.name}</h2>
          <p className="muted">{lead.service || 'No service listed'}</p>
        </div>
        <p className="revenue-figure">{formatEGP(lead.value)}</p>
      </section>

      <section className="detail-grid">
        <article className="panel">
          <h3>Contact</h3>
          <dl className="meta-list">
            <div>
              <dt>Phone</dt>
              <dd>{lead.phone || '—'}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{lead.email || '—'}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{lead.source}</dd>
            </div>
          </dl>
        </article>
        <article className="panel">
          <h3>Opportunity</h3>
          <dl className="meta-list">
            <div>
              <dt>Status</dt>
              <dd>
                <label className="field field--compact">
                  <span className="sr-only">Change status</span>
                  <select
                    value={lead.status}
                    onChange={(event) =>
                      updateLeadStatus(lead.id, event.target.value)
                    }
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>
                <PriorityBadge priority={lead.priority} />
              </dd>
            </div>
            <div>
              <dt>Current badge</dt>
              <dd>
                <StatusBadge status={lead.status} />
              </dd>
            </div>
          </dl>
        </article>
        <article className="panel">
          <h3>Dates</h3>
          <dl className="meta-list">
            <div>
              <dt>Created</dt>
              <dd>{formatDate(lead.createdAt)}</dd>
            </div>
            <div>
              <dt>Last contact</dt>
              <dd>{formatDate(lead.lastContact)}</dd>
            </div>
            <div>
              <dt>Next follow-up</dt>
              <dd>{formatDate(lead.nextFollowUp)}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="panel">
        <h3>Notes</h3>
        <p>{lead.notes || 'No notes yet.'}</p>
      </section>

      <section className="panel">
        <h3>Activity</h3>
        {history.length === 0 ? (
          <p className="muted">No activity recorded yet.</p>
        ) : (
          <ol className="timeline">
            {history.map((item) => (
              <li key={item.id}>
                <strong>{item.message}</strong>
                <span>{new Date(item.at).toLocaleString('en-GB')}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <Modal open={editing} title="Edit lead" onClose={() => setEditing(false)}>
        <LeadForm
          initialLead={lead}
          onSubmit={(fields) => {
            updateLead(lead.id, fields)
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
          submitLabel="Save changes"
        />
      </Modal>

      <ConfirmDialog
        open={deleting}
        title="Delete lead"
        message="Are you sure you want to delete this lead?"
        onCancel={() => setDeleting(false)}
        onConfirm={() => {
          deleteLead(lead.id)
          navigate('/leads')
        }}
      />
    </div>
  )
}
