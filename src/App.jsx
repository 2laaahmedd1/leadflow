import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LeadsProvider } from './context/LeadsContext'
import { DashboardLayout } from './layouts/DashboardLayout'
import { Analytics } from './pages/Analytics'
import { Customers } from './pages/Customers'
import { Dashboard } from './pages/Dashboard'
import { FollowUps } from './pages/FollowUps'
import { LeadDetails } from './pages/LeadDetails'
import { Leads } from './pages/Leads'
import { Login } from './pages/Login'
import { Pipeline } from './pages/Pipeline'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <AuthProvider>
      <LeadsProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/:id" element={<LeadDetails />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="followups" element={<FollowUps />} />
            <Route path="customers" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </LeadsProvider>
    </AuthProvider>
  )
}
