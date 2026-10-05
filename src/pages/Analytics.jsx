import { BarList } from '../components/analytics/BarList'
import { StatCard } from '../components/common/StatCard'
import { useLeads } from '../context/LeadsContext'
import { formatEGP, formatPercent } from '../utils/format'

export function Analytics() {
  const { analytics } = useLeads()

  return (
    <div className="stack">
      <section className="kpi-grid">
        <StatCard label="Conversion rate" value={formatPercent(analytics.conversionRate)} />
        <StatCard label="Potential revenue" value={formatEGP(analytics.potentialRevenue)} />
        <StatCard label="Won revenue" value={formatEGP(analytics.wonRevenue)} />
        <StatCard label="Average deal value" value={formatEGP(analytics.averageDealValue)} />
        <StatCard label="Best lead source" value={analytics.bestLeadSource} hint="Most customers won" />
        <StatCard label="Won deals" value={analytics.wonDeals} />
      </section>

      <div className="split-grid">
        <section className="panel">
          <h2>Leads by source</h2>
          <BarList items={analytics.leadsBySource} />
        </section>
        <section className="panel">
          <h2>Leads by status</h2>
          <BarList items={analytics.leadsByStatus} />
        </section>
      </div>

      <section className="panel">
        <h2>Customers by source</h2>
        <BarList items={analytics.customersBySource} />
      </section>
    </div>
  )
}
