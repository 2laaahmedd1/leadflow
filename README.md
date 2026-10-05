# LeadFlow

LeadFlow is a professional lead-management and follow-up web app for small and medium-sized businesses. It gives a business owner one place to track leads, follow-ups, pipeline stages, customers, and revenue.

**Never lose a potential customer just because you forgot to follow up.**

This repository is a Version 1 MVP. It is designed as a portfolio-ready SaaS demo: realistic data, calculated metrics, and a complete workflow from lead to won deal.

## Problem solved

Leads arrive from Facebook, Instagram, WhatsApp, phone, websites, and referrals. Owners often forget who to call back, which opportunities are still open, and which deals are worth the most money.

LeadFlow organizes that work around one loop:

**Leads → Follow-up → Sales pipeline → Customers → Revenue**

## Key features

- Demo login screen (UI only)
- Dashboard KPIs calculated from live lead data
- Lead CRUD, search, filters, and sorting
- Lead details with activity history
- Visual sales pipeline with status changes
- Overdue, today, and upcoming follow-ups
- Customers generated from `WON` leads
- Analytics by source, status, conversion, and revenue
- LocalStorage persistence after refresh
- Responsive desktop, tablet, and mobile layouts

## Tech stack

- React 19
- Vite
- JavaScript and JSX
- React Router
- React Context and Hooks
- CSS (no UI kit)
- LocalStorage

The only extra runtime dependency beyond React is `react-router-dom`.

## Architecture

- **Pages** render routes.
- **Layouts** provide the sidebar, header, and demo-session guard.
- **Context** holds lead state and writes through to LocalStorage.
- **Services** isolate LocalStorage reads and writes.
- **Utils** own dates, currency, and business calculations.
- **Components** stay reusable and small.

Metrics are never hard-coded. Potential revenue excludes `WON` and `LOST`. Won revenue includes only `WON`.

## Folder structure

```
src/
├── components/
├── context/
├── data/
├── hooks/          (reserved for future hooks)
├── layouts/
├── pages/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

## Installation

```bash
npm install
```

## Running locally

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

```bash
npm run build
```

## LocalStorage

Leads are stored under `leadflow.leads.v1`.

- On first visit, realistic mock leads are seeded.
- After that, the app loads the saved list.
- Every create, update, status change, or delete is written back.
- Invalid JSON is ignored and treated as empty/unusable storage.
- Settings can restore the original demo set.

The demo sign-in flag is kept in `sessionStorage` (`leadflow.demoSession`). It is not authentication.

## Demo workflow

1. Open LeadFlow and sign in on the demo screen (`demo@leadflow.app` / `demo`).
2. Review Dashboard KPIs.
3. Go to **Leads** and add:

   - Name: Ahmed Hassan
   - Service: Apartment Finishing
   - Value: 50000
   - Source: Facebook
   - Status: INTERESTED
   - Priority: HIGH
   - Next follow-up: tomorrow

4. Confirm the lead appears in Leads and that Dashboard numbers move.
5. Open **Pipeline** and find Ahmed under INTERESTED.
6. Change Ahmed to NEGOTIATION, then to WON.
7. Confirm Ahmed appears in **Customers**, won revenue includes 50,000 EGP, potential revenue drops, and conversion updates.
8. Refresh the browser. The lead should still be there.

The seed data already includes an Ahmed Hassan example. Adding another Ahmed is expected and useful for the workflow above.

## Current limitations

- Authentication is UI-only. Any email and password that pass the form will enter the demo.
- There is no backend, database, or multi-user access.
- Data lives in this browser only.
- AI is not implemented.
- WhatsApp, email, billing, and team roles are not implemented.

## Future roadmap

**Version 2:** real authentication, backend, database, user accounts, multiple businesses, cloud persistence.

**Version 3:** AI follow-up suggestions, generated follow-up messages, smart prioritization, cold-lead detection, automated reminders.

**Version 4:** WhatsApp and email integrations, team members, roles, advanced reporting, subscription plans, SaaS billing.
