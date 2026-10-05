import { PRIORITY_LABELS } from '../../utils/constants'

export function PriorityBadge({ priority }) {
  return (
    <span className={`badge badge-priority--${String(priority).toLowerCase()}`}>
      {PRIORITY_LABELS[priority] || priority}
    </span>
  )
}
