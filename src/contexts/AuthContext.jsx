import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { SESSION_CONFIG } from '../config/session'
import AuthLoadingOverlay from '../components/ui/AuthLoadingOverlay'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)
  
  const sessionTimerRef = useRef(null)
  const lastActivityRef = useRef(Date.now())
  const isActiveRef = useRef(true)

  const resetSessionTimer = useCallback(() => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current)
    }
    
    lastActivityRef.current = Date.now()
    
    sessionTimerRef.current = setTimeout(() => {
      handleSessionTimeout()
    }, SESSION_CONFIG.TIMEOUT_MS)
  }, [])

  const handleSessionTimeout = useCallback(async () => {
    if (SESSION_CONFIG.SECURITY.LOG_TIMEOUT_EVENTS) {
      console.log('Session timeout - logging out user')
    }
    
    setSessionExpired(true)
    
    try {
      await signOut(auth)
      
      if (SESSION_CONFIG.SECURITY.CLEAR_STORAGE_ON_TIMEOUT) {
        localStorage.removeItem('userSession')
        sessionStorage.clear()
      }
    } catch (error) {
      console.error('Session timeout logout error:', error)
    }
  }, [])

  const handleUserActivity = useCallback(() => {
    if (!isActiveRef.current || !currentUser) return
    
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current)
    }
    
    setTimeout(() => {
      if (isActiveRef.current && currentUser) {
        resetSessionTimer()
      }
    }, SESSION_CONFIG.ACTIVITY.DEBOUNCE_MS)
  }, [currentUser, resetSessionTimer])

  useEffect(() => {
    if (!currentUser) return

    const events = SESSION_CONFIG.ACTIVITY.EVENTS
    
    const activityHandler = () => {
      handleUserActivity()
    }

    events.forEach(event => {
      document.addEventListener(event, activityHandler, { passive: true })
    })

    resetSessionTimer()

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, activityHandler)
      })
      
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current)
      }
    }
  }, [currentUser, handleUserActivity, resetSessionTimer])

  useEffect(() => {
    if (!currentUser) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false
        if (sessionTimerRef.current) {
          clearTimeout(sessionTimerRef.current)
        }
      } else {
        isActiveRef.current = true
        resetSessionTimer()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [currentUser, resetSessionTimer])

  useEffect(() => {
    if (!currentUser) return

    const handleFocus = () => {
      isActiveRef.current = true
      resetSessionTimer()
    }

    const handleBlur = () => {
      isActiveRef.current = false
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current)
      }
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [currentUser, resetSessionTimer])

  useEffect(() => {
    return () => {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
      
      if (user) {
        setSessionExpired(false)
      }
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    try {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current)
      }
      
      localStorage.removeItem('userSession')
      sessionStorage.clear()
      
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const refreshSession = useCallback(() => {
    if (currentUser) {
      resetSessionTimer()
    }
  }, [currentUser, resetSessionTimer])

  const getSessionStatus = useCallback(() => {
    if (!currentUser) return 'not_authenticated'
    if (sessionExpired) return 'expired'
    
    const timeRemaining = SESSION_CONFIG.TIMEOUT_MS - (Date.now() - lastActivityRef.current)
    return {
      status: 'active',
      timeRemaining: Math.max(0, timeRemaining),
      expiresAt: new Date(lastActivityRef.current + SESSION_CONFIG.TIMEOUT_MS)
    }
  }, [currentUser, sessionExpired])

  const value = {
    currentUser,
    logout,
    loading,
    sessionExpired,
    refreshSession,
    getSessionStatus
  }

  if (loading) {
    return (
      <AuthContext.Provider value={value}>
        <AuthLoadingOverlay 
          isVisible={true}
          title="Initializing App..."
          subtitle="Setting up your secure connection"
        />
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
