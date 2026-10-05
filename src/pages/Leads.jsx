import { useMemo, useState } from 'react'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { EmptyState } from '../components/common/EmptyState'
import { FilterBar } from '../components/common/FilterBar'
import { Modal } from '../components/common/Modal'
import { SearchBar } from '../components/common/SearchBar'
import { LeadCard } from '../components/leads/LeadCard'
import { LeadForm } from '../components/leads/LeadForm'
import { LeadTable } from '../components/leads/LeadTable'
import { useLeads } from '../context/LeadsContext'
import { PRIORITIES, SOURCES, STATUSES } from '../utils/constants'

export function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('ALL')
  const [priority, setPriority] = useState('ALL')
  const [source, setSource] = useState('ALL')
  const [sort, setSort] = useState('newest')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const result = leads.filter((lead) => {
      const matchesQuery =
        !needle ||
        [lead.name, lead.phone, lead.email, lead.service]
          .join(' ')
          .toLowerCase()
          .includes(needle)
      const matchesStatus = status === 'ALL' || lead.status === status
      const matchesPriority = priority === 'ALL' || lead.priority === priority
      const matchesSource = source === 'ALL' || lead.source === source
      return matchesQuery && matchesStatus && matchesPriority && matchesSource
    })

    result.sort((a, b) => {
      if (sort === 'value-desc') return Number(b.value) - Number(a.value)
      if (sort === 'value-asc') return Number(a.value) - Number(b.value)
      return b.createdAt.localeCompare(a.createdAt)
    })

    return result
  }, [leads, query, status, priority, source, sort])

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(lead) {
    setEditing(lead)
    setFormOpen(true)
  }

  function handleSubmit(fields) {
    if (editing) {
      updateLead(editing.id, fields)
    } else {
      addLead(fields)
    }
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <div className="stack">
      <div className="page-toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder="Search name, phone, email, service" />
        <button type="button" className="btn btn--primary" onClick={openCreate}>
          Add lead
        </button>
      </div>

      <FilterBar>
        <label className="field field--compact">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="ALL">All statuses</option>
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field field--compact">
          <span>Priority</span>
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="ALL">All priorities</option>
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field field--compact">
          <span>Source</span>
          <select value={source} onChange={(event) => setSource(event.target.value)}>
            <option value="ALL">All sources</option>
            {SOURCES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field field--compact">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="value-desc">Highest value</option>
            <option value="value-asc">Lowest value</option>
          </select>
        </label>
      </FilterBar>

      {filtered.length === 0 ? (
        <EmptyState
          title={leads.length === 0 ? 'No leads yet.' : 'No matching leads.'}
          description={
            leads.length === 0
              ? 'Add your first lead to start tracking follow-ups and revenue.'
              : 'Try a different search or filter combination.'
          }
          action={
            leads.length === 0 ? (
              <button type="button" className="btn btn--primary" onClick={openCreate}>
                Add your first lead
              </button>
            ) : null
          }
        />
      ) : (
        <>
          <div className="desktop-only">
            <LeadTable leads={filtered} onEdit={openEdit} onDelete={setDeleting} />
          </div>
          <div className="mobile-only card-grid">
            {filtered.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={openEdit}
                onDelete={setDeleting}
              />
            ))}
          </div>
        </>
      )}

      <Modal
        open={formOpen}
        title={editing ? 'Edit lead' : 'Add lead'}
        onClose={() => setFormOpen(false)}
      >
        <LeadForm
          key={editing?.id || 'new'}
          initialLead={editing}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          submitLabel={editing ? 'Save changes' : 'Save lead'}
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete lead"
        message="Are you sure you want to delete this lead?"
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          deleteLead(deleting.id)
          setDeleting(null)
        }}
      />
    </div>
  )
}
