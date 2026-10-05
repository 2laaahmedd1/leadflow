import { useState } from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { Modal } from '../components/common/Modal'
import { FollowUpCard } from '../components/followups/FollowUpCard'
import { LeadForm } from '../components/leads/LeadForm'
import { useLeads } from '../context/LeadsContext'

export function FollowUps() {
  const { followUps, markAsContacted, updateLead } = useLeads()
  const [editing, setEditing] = useState(null)

  const sections = [
    { key: 'overdue', title: 'Overdue', items: followUps.overdue },
    { key: 'today', title: 'Today', items: followUps.today },
    { key: 'upcoming', title: 'Upcoming', items: followUps.upcoming },
  ]

  const total = sections.reduce((sum, section) => sum + section.items.length, 0)

  return (
    <div className="stack">
      {total === 0 ? (
        <EmptyState
          title="No follow-ups due."
          description="When a lead has a next follow-up date, it will appear here."
        />
      ) : (
        sections.map((section) => (
          <section key={section.key} className="panel">
            <header className="panel__head">
              <h2>{section.title}</h2>
              <span>{section.items.length}</span>
            </header>
            {section.items.length === 0 ? (
              <p className="muted">Nothing in this group.</p>
            ) : (
              <div className="card-grid">
                {section.items.map((lead) => (
                  <FollowUpCard
                    key={lead.id}
                    lead={lead}
                    onContact={markAsContacted}
                    onEdit={setEditing}
                  />
                ))}
              </div>
            )}
          </section>
        ))
      )}

      <Modal open={Boolean(editing)} title="Edit lead" onClose={() => setEditing(null)}>
        {editing ? (
          <LeadForm
            initialLead={editing}
            onSubmit={(fields) => {
              updateLead(editing.id, fields)
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
            submitLabel="Save changes"
          />
        ) : null}
      </Modal>
    </div>
  )
}
