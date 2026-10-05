import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createMockLeads } from '../data/mockLeads'
import { storageService } from '../services/storageService'
import { todayISO } from '../utils/dates'
import {
  createHistoryEvent,
  getAnalytics,
  getCustomerStats,
  getCustomers,
  getDashboardStats,
  getFollowUpGroups,
} from '../utils/leadStats'

const LeadsContext = createContext(null)

function withHistory(lead, event) {
  return {
    ...lead,
    history: [...(lead.history || []), event],
  }
}

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    const stored = storageService.loadLeads()
    if (stored && stored.length > 0) return stored
    return createMockLeads()
  })
  const [notice, setNotice] = useState('')

  useEffect(() => {
    storageService.saveLeads(leads)
  }, [leads])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  const value = useMemo(() => {
    const stats = getDashboardStats(leads)
    const followUps = getFollowUpGroups(leads)
    const customers = getCustomers(leads)
    const customerStats = getCustomerStats(leads)
    const analytics = getAnalytics(leads)

    function getLeadById(id) {
      return leads.find((lead) => lead.id === id) || null
    }

    function addLead(fields) {
      const lead = {
        id: crypto.randomUUID(),
        createdAt: todayISO(),
        lastContact: '',
        history: [createHistoryEvent('created', 'Lead created.')],
        ...fields,
        value: Number(fields.value) || 0,
      }
      if (lead.status === 'WON') {
        lead.wonAt = todayISO()
        lead.nextFollowUp = ''
      }
      setLeads((current) => [lead, ...current])
      setNotice('Lead saved.')
      return lead
    }

    function updateLead(id, fields) {
      setLeads((current) =>
        current.map((lead) => {
          if (lead.id !== id) return lead
          const next = {
            ...lead,
            ...fields,
            value:
              fields.value == null ? lead.value : Number(fields.value) || 0,
          }
          if (fields.status && fields.status !== lead.status) {
            next.history = [
              ...(lead.history || []),
              createHistoryEvent(
                'status',
                `Status changed from ${lead.status} to ${fields.status}.`,
              ),
            ]
            if (fields.status === 'WON') {
              next.wonAt = fields.wonAt || todayISO()
              next.nextFollowUp = ''
            }
          }
          return next
        }),
      )
      setNotice('Lead updated.')
    }

    function deleteLead(id) {
      setLeads((current) => current.filter((lead) => lead.id !== id))
      setNotice('Lead deleted.')
    }

    function updateLeadStatus(id, status) {
      updateLead(id, { status })
    }

    function markAsContacted(id) {
      setLeads((current) =>
        current.map((lead) => {
          if (lead.id !== id) return lead
          const nextStatus = lead.status === 'NEW' ? 'CONTACTED' : lead.status
          return withHistory(
            {
              ...lead,
              lastContact: todayISO(),
              status: nextStatus,
            },
            createHistoryEvent('contact', 'Marked as contacted.'),
          )
        }),
      )
      setNotice('Lead marked as contacted.')
    }

    function resetDemoData() {
      const seeded = createMockLeads()
      setLeads(seeded)
      storageService.saveLeads(seeded)
      setNotice('Demo data restored.')
    }

    return {
      leads,
      notice,
      stats,
      followUps,
      customers,
      customerStats,
      analytics,
      addLead,
      updateLead,
      deleteLead,
      getLeadById,
      updateLeadStatus,
      markAsContacted,
      resetDemoData,
      clearNotice: () => setNotice(''),
    }
  }, [leads, notice])

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
}

export function useLeads() {
  const context = useContext(LeadsContext)
  if (!context) {
    throw new Error('useLeads must be used inside LeadsProvider')
  }
  return context
}
