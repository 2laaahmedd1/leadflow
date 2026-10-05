import { STATUSES } from '../../utils/constants'
import { LeadCard } from '../leads/LeadCard'

export function PipelineColumn({ status, leads, onStatusChange }) {
  return (
    <section className="pipeline-column">
      <header className="pipeline-column__head">
        <h2>{status}</h2>
        <span>{leads.length}</span>
      </header>
      <div className="pipeline-column__list">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            extra={
              <label className="field field--compact">
                <span className="sr-only">Change status for {lead.name}</span>
                <select
                  value={lead.status}
                  onChange={(event) => onStatusChange(lead.id, event.target.value)}
                >
                  {STATUSES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            }
          />
        ))}
        {leads.length === 0 ? (
          <p className="muted pipeline-empty">No leads in this stage.</p>
        ) : null}
      </div>
    </section>
  )
}
