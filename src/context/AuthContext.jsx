import { createContext, useContext, useMemo, useState } from 'react'
import { SESSION_KEY } from '../utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isDemoSignedIn, setIsDemoSignedIn] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      return false
    }
  })

  const value = useMemo(
    () => ({
      isDemoSignedIn,
      signInDemo() {
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          /* private mode */
        }
        setIsDemoSignedIn(true)
      },
      signOutDemo() {
        try {
          sessionStorage.removeItem(SESSION_KEY)
        } catch {
          /* private mode */
        }
        setIsDemoSignedIn(false)
      },
    }),
    [isDemoSignedIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
