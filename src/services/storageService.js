import { STORAGE_KEY } from '../utils/constants'

function isValidLead(lead) {
  return (
    lead &&
    typeof lead === 'object' &&
    typeof lead.id === 'string' &&
    typeof lead.name === 'string'
  )
}

export const storageService = {
  loadLeads() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!Array.isArray(parsed)) return null
      const leads = parsed.filter(isValidLead)
      return leads
    } catch {
      return null
    }
  },

  saveLeads(leads) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
      return true
    } catch {
      return false
    }
  },

  clearLeads() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore quota / private mode */
    }
  },
}
