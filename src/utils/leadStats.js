import { ACTIVE_STATUSES, SOURCES, STATUSES } from './constants'
import { followUpKind, todayISO } from './dates'

export function isActiveLead(lead) {
  return ACTIVE_STATUSES.includes(lead.status)
}

export function getDashboardStats(leads) {
  const today = todayISO()
  const total = leads.length
  const newLeads = leads.filter((lead) => lead.status === 'NEW').length
  const hotLeads = leads.filter(
    (lead) => lead.priority === 'HIGH' && isActiveLead(lead),
  ).length
  const followUpsToday = leads.filter(
    (lead) => lead.nextFollowUp === today && isActiveLead(lead),
  ).length
  const won = leads.filter((lead) => lead.status === 'WON')
  const wonDeals = won.length
  const potentialRevenue = leads
    .filter(isActiveLead)
    .reduce((sum, lead) => sum + Number(lead.value || 0), 0)
  const wonRevenue = won.reduce((sum, lead) => sum + Number(lead.value || 0), 0)
  const conversionRate = total === 0 ? 0 : (wonDeals / total) * 100
  const overdueFollowUps = leads.filter(
    (lead) => isActiveLead(lead) && followUpKind(lead.nextFollowUp, today) === 'overdue',
  ).length

  return {
    total,
    newLeads,
    hotLeads,
    followUpsToday,
    wonDeals,
    potentialRevenue,
    wonRevenue,
    conversionRate,
    overdueFollowUps,
  }
}

export function getFollowUpGroups(leads) {
  const today = todayISO()
  const groups = { overdue: [], today: [], upcoming: [] }

  leads.forEach((lead) => {
    if (!isActiveLead(lead) || !lead.nextFollowUp) return
    const kind = followUpKind(lead.nextFollowUp, today)
    if (kind) groups[kind].push(lead)
  })

  groups.overdue.sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp))
  groups.today.sort((a, b) => a.name.localeCompare(b.name))
  groups.upcoming.sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp))

  return groups
}

export function getCustomers(leads) {
  return leads
    .filter((lead) => lead.status === 'WON')
    .sort((a, b) => (b.wonAt || b.lastContact || '').localeCompare(a.wonAt || a.lastContact || ''))
}

export function getCustomerStats(leads) {
  const customers = getCustomers(leads)
  const totalCustomers = customers.length
  const totalWonRevenue = customers.reduce(
    (sum, lead) => sum + Number(lead.value || 0),
    0,
  )
  const averageDealValue = totalCustomers === 0 ? 0 : totalWonRevenue / totalCustomers
  return { totalCustomers, totalWonRevenue, averageDealValue }
}

export function getAnalytics(leads) {
  const stats = getDashboardStats(leads)
  const leadsBySource = SOURCES.map((source) => ({
    label: source,
    value: leads.filter((lead) => lead.source === source).length,
  }))
  const leadsByStatus = STATUSES.map((status) => ({
    label: status,
    value: leads.filter((lead) => lead.status === status).length,
  }))
  const customersBySource = SOURCES.map((source) => ({
    label: source,
    value: leads.filter((lead) => lead.source === source && lead.status === 'WON').length,
  }))
  const bestSource = [...customersBySource].sort((a, b) => b.value - a.value)[0]
  const allValues = leads.map((lead) => Number(lead.value || 0))
  const averageDealValue =
    leads.length === 0
      ? 0
      : allValues.reduce((sum, value) => sum + value, 0) / leads.length

  return {
    ...stats,
    leadsBySource,
    leadsByStatus,
    customersBySource,
    bestLeadSource: bestSource?.value ? bestSource.label : '—',
    averageDealValue,
  }
}

export function createHistoryEvent(type, message) {
  return {
    id: crypto.randomUUID(),
    type,
    message,
    at: new Date().toISOString(),
  }
}
