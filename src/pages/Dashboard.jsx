import { Link } from 'react-router-dom'
import { StatCard } from '../components/common/StatCard'
import { StatusBadge } from '../components/common/StatusBadge'
import { Icon } from '../components/common/Icon'
import { useLeads } from '../context/LeadsContext'
import { STATUSES } from '../utils/constants'
import { formatDate } from '../utils/dates'
import { formatEGP, formatPercent } from '../utils/format'

export function Dashboard() {
  const { leads, stats, followUps } = useLeads()
  const recent = [...leads]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)
  const pipelineCounts = STATUSES.map((status) => ({
    status,
    count: leads.filter((lead) => lead.status === status).length,
  }))
  const maxPipeline = Math.max(...pipelineCounts.map((item) => item.count), 1)

  return (
    <div className="stack">
      <section className="kpi-grid">
        <StatCard label="Total leads" value={stats.total} />
        <StatCard label="New leads" value={stats.newLeads} />
        <StatCard label="Hot leads" value={stats.hotLeads} hint="High priority, still open" />
        <StatCard label="Follow-ups today" value={stats.followUpsToday} />
        <StatCard label="Won deals" value={stats.wonDeals} />
        <StatCard label="Potential revenue" value={formatEGP(stats.potentialRevenue)} />
        <StatCard label="Won revenue" value={formatEGP(stats.wonRevenue)} />
        <StatCard label="Conversion rate" value={formatPercent(stats.conversionRate)} />
      </section>

      <section className="alert-row">
        <article className="alert-card">
          <Icon name="followups" />
          <div>
            <strong>
              {stats.followUpsToday} lead{stats.followUpsToday === 1 ? '' : 's'} need
              follow-up today.
            </strong>
            <p>Stay on today&apos;s calls so nothing slips.</p>
          </div>
        </article>
        <article className="alert-card alert-card--warn">
          <Icon name="alert" />
          <div>
            <strong>
              {stats.overdueFollowUps} lead{stats.overdueFollowUps === 1 ? '' : 's'} are
              overdue for follow-up.
            </strong>
            <p>Overdue opportunities are the fastest way to lose a deal.</p>
          </div>
        </article>
      </section>

      <div className="split-grid">
        <section className="panel">
          <header className="panel__head">
            <h2>Sales pipeline</h2>
            <Link to="/pipeline">Open pipeline</Link>
          </header>
          <ul className="pipeline-overview">
            {pipelineCounts.map((item) => (
              <li key={item.status}>
                <div className="bar-list__label">
                  <span>{item.status}</span>
                  <strong>{item.count}</strong>
                </div>
                <div className="bar-list__track">
                  <span style={{ width: `${(item.count / maxPipeline) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <header className="panel__head">
            <h2>Today&apos;s follow-ups</h2>
            <Link to="/followups">View all</Link>
          </header>
          {followUps.today.length === 0 ? (
            <p className="muted">No follow-ups due today.</p>
          ) : (
            <ul className="plain-list">
              {followUps.today.map((lead) => (
                <li key={lead.id}>
                  <Link to={`/leads/${lead.id}`}>{lead.name}</Link>
                  <span>{lead.service}</span>
                  <strong>{formatEGP(lead.value)}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="split-grid">
        <section className="panel">
          <header className="panel__head">
            <h2>Recent leads</h2>
            <Link to="/leads">View leads</Link>
          </header>
          <ul className="plain-list">
            {recent.map((lead) => (
              <li key={lead.id}>
                <Link to={`/leads/${lead.id}`}>{lead.name}</Link>
                <StatusBadge status={lead.status} />
                <span>{formatDate(lead.createdAt)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <header className="panel__head">
            <h2>Revenue overview</h2>
            <Link to="/analytics">Analytics</Link>
          </header>
          <div className="revenue-block">
            <div>
              <p className="muted">Potential</p>
              <p className="revenue-figure">{formatEGP(stats.potentialRevenue)}</p>
              <p className="muted">Open opportunities only. Won and lost deals are excluded.</p>
            </div>
            <div>
              <p className="muted">Won</p>
              <p className="revenue-figure">{formatEGP(stats.wonRevenue)}</p>
              <p className="muted">Closed-won revenue from customers.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
