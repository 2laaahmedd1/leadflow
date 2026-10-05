import { useState } from 'react'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { useLeads } from '../context/LeadsContext'

export function Settings() {
  const { resetDemoData, leads } = useLeads()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="stack">
      <section className="panel">
        <h2>Workspace</h2>
        <dl className="meta-list">
          <div>
            <dt>Product</dt>
            <dd>LeadFlow</dd>
          </div>
          <div>
            <dt>Currency</dt>
            <dd>Egyptian Pound (EGP)</dd>
          </div>
          <div>
            <dt>Stored leads</dt>
            <dd>{leads.length}</dd>
          </div>
          <div>
            <dt>Persistence</dt>
            <dd>LocalStorage on this browser</dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <h2>Demo data</h2>
        <p className="muted">
          LeadFlow Version 1 keeps data on this device only. There is no backend,
          cloud sync, or real login.
        </p>
        <button type="button" className="btn" onClick={() => setConfirmReset(true)}>
          Restore demo leads
        </button>
      </section>

      <section className="panel">
        <h2>Coming later</h2>
        <p className="muted">
          Real authentication, backend storage, AI follow-up suggestions, and
          WhatsApp or email integrations are planned. They are not part of this
          MVP.
        </p>
      </section>

      <ConfirmDialog
        open={confirmReset}
        title="Restore demo data"
        message="This replaces the current leads with the original demo set."
        confirmLabel="Restore"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetDemoData()
          setConfirmReset(false)
        }}
      />
    </div>
  )
}
