import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { isDemoSignedIn, signInDemo } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('demo@leadflow.app')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState('')

  if (isDemoSignedIn) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required for this demo screen.')
      return
    }
    signInDemo()
    navigate('/dashboard')
  }

  return (
    <main className="login-screen">
      <section className="login-card">
        <p className="eyebrow">LeadFlow</p>
        <h1>Sign in to your workspace</h1>
        <p className="muted">
          This is a demo login screen only. It does not verify credentials or
          connect to a backend.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@business.com"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter a demo password"
            />
          </label>
          {error ? <p className="field__error">{error}</p> : null}
          <button type="submit" className="btn btn--primary btn--full">
            Sign in
          </button>
        </form>
        <p className="demo-note">Demo account — no real authentication.</p>
      </section>
    </main>
  )
}
