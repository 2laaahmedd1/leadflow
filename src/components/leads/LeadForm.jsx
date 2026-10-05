import { useEffect, useState } from 'react'
import { PRIORITIES, SOURCES, STATUSES } from '../../utils/constants'
import { addDaysISO, todayISO } from '../../utils/dates'
import { parseMoney } from '../../utils/format'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  source: 'Facebook',
  service: '',
  value: '',
  status: 'NEW',
  priority: 'MEDIUM',
  nextFollowUp: '',
  notes: '',
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.phone.trim()) errors.phone = 'Phone number is required.'
  const value = parseMoney(form.value)
  if (!Number.isFinite(value) || value < 0) {
    errors.value = 'Deal value must be a valid number.'
  }
  if (!form.status) errors.status = 'Status is required.'
  if (!form.priority) errors.priority = 'Priority is required.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email or leave this blank.'
  }
  return errors
}

export function LeadForm({ initialLead, onSubmit, onCancel, submitLabel = 'Save lead' }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialLead) {
      setForm({
        name: initialLead.name || '',
        phone: initialLead.phone || '',
        email: initialLead.email || '',
        source: initialLead.source || 'Facebook',
        service: initialLead.service || '',
        value: initialLead.value ?? '',
        status: initialLead.status || 'NEW',
        priority: initialLead.priority || 'MEDIUM',
        nextFollowUp: initialLead.nextFollowUp || '',
        notes: initialLead.notes || '',
      })
    } else {
      setForm({
        ...emptyForm,
        nextFollowUp: addDaysISO(todayISO(), 1),
      })
    }
    setErrors({})
  }, [initialLead])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      service: form.service.trim(),
      notes: form.notes.trim(),
      value: parseMoney(form.value),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="Name" error={errors.name}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ahmed Hassan"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+20 100 000 0000"
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@email.com"
          />
        </Field>
        <Field label="Source">
          <select name="source" value={form.source} onChange={handleChange}>
            {SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Service">
          <input
            name="service"
            value={form.service}
            onChange={handleChange}
            placeholder="Apartment Finishing"
          />
        </Field>
        <Field label="Deal value (EGP)" error={errors.value}>
          <input
            name="value"
            inputMode="decimal"
            value={form.value}
            onChange={handleChange}
            placeholder="50000"
            aria-invalid={Boolean(errors.value)}
          />
        </Field>
        <Field label="Status" error={errors.status}>
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Priority" error={errors.priority}>
          <select name="priority" value={form.priority} onChange={handleChange}>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Next follow-up">
          <input
            name="nextFollowUp"
            type="date"
            value={form.nextFollowUp}
            onChange={handleChange}
          />
        </Field>
        <Field label="Notes" className="form-span">
          <textarea
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
            placeholder="What did they ask for?"
          />
        </Field>
      </div>
      <div className="form__actions">
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      {children}
      {error ? <em className="field__error">{error}</em> : null}
    </label>
  )
}
