import { PipelineColumn } from '../components/pipeline/PipelineColumn'
import { useLeads } from '../context/LeadsContext'
import { STATUSES } from '../utils/constants'

export function Pipeline() {
  const { leads, updateLeadStatus } = useLeads()

  return (
    <div className="pipeline-board">
      {STATUSES.map((status) => (
        <PipelineColumn
          key={status}
          status={status}
          leads={leads.filter((lead) => lead.status === status)}
          onStatusChange={updateLeadStatus}
        />
      ))}
    </div>
  )
}
