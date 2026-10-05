import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { StatCard } from '../components/common/StatCard'
import { useLeads } from '../context/LeadsContext'
import { formatDate } from '../utils/dates'
import { formatEGP } from '../utils/format'

export function Customers() {
  const { customers, customerStats } = useLeads()

  return (
    <div className="stack">
      <section className="kpi-grid kpi-grid--3">
        <StatCard label="Total customers" value={customerStats.totalCustomers} />
        <StatCard
          label="Total won revenue"
          value={formatEGP(customerStats.totalWonRevenue)}
        />
        <StatCard
          label="Average deal value"
          value={formatEGP(customerStats.averageDealValue)}
        />
      </section>

      {customers.length === 0 ? (
        <EmptyState
          title="No customers yet."
          description="When a lead is marked WON, it appears here as a customer."
        />
      ) : (
        <>
          <div className="desktop-only table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Deal value</th>
                  <th>Source</th>
                  <th>Date won</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <Link className="lead-name" to={`/leads/${lead.id}`}>
                        {lead.name}
                      </Link>
                    </td>
                    <td>{lead.phone}</td>
                    <td>{lead.service}</td>
                    <td>{formatEGP(lead.value)}</td>
                    <td>{lead.source}</td>
                    <td>{formatDate(lead.wonAt || lead.lastContact)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-only card-grid">
            {customers.map((lead) => (
              <article className="lead-card" key={lead.id}>
                <Link className="lead-name" to={`/leads/${lead.id}`}>
                  {lead.name}
                </Link>
                <p className="muted">{lead.phone}</p>
                <p>{lead.service}</p>
                <p className="lead-card__value">{formatEGP(lead.value)}</p>
                <p className="muted">
                  {lead.source} · {formatDate(lead.wonAt || lead.lastContact)}
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
