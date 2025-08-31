import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { SESSION_CONFIG } from '../config/session'

/**
 * Custom hook for session management
 * Provides easy access to session status, timeout warnings, and session controls
 */
export const useSession = () => {
  const { getSessionStatus, refreshSession, sessionExpired } = useAuth()
  const [sessionInfo, setSessionInfo] = useState(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    const updateSessionInfo = () => {
      const status = getSessionStatus()
      setSessionInfo(status)
      
      if (status && status !== 'not_authenticated' && status !== 'expired') {
        const timeRemaining = status.timeRemaining
        setShowWarning(timeRemaining < SESSION_CONFIG.WARNINGS.WARNING)
      }
    }

    updateSessionInfo()
    const interval = setInterval(updateSessionInfo, SESSION_CONFIG.ACTIVITY.UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [getSessionStatus])

  const formatTimeRemaining = useCallback((timeRemaining) => {
    if (!timeRemaining) return '00:00'
    
    const minutes = Math.floor(timeRemaining / 60000)
    const seconds = Math.floor((timeRemaining % 60000) / 1000)
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  const getSessionStatusLabel = useCallback(() => {
    if (!sessionInfo) return 'Loading...'
    
    switch (sessionInfo) {
      case 'not_authenticated':
        return 'Not Signed In'
      case 'expired':
        return 'Session Expired'
      default:
        return 'Active'
    }
  }, [sessionInfo])

  const isSessionExpiringSoon = useCallback(() => {
    if (!sessionInfo || sessionInfo === 'not_authenticated' || sessionInfo === 'expired') {
      return false
    }
    
    return sessionInfo.timeRemaining < SESSION_CONFIG.WARNINGS.EXPIRING_SOON
  }, [sessionInfo])

  const isSessionCritical = useCallback(() => {
    if (!sessionInfo || sessionInfo === 'not_authenticated' || sessionInfo === 'expired') {
      return false
    }
    
    return sessionInfo.timeRemaining < SESSION_CONFIG.WARNINGS.CRITICAL
  }, [sessionInfo])

  const getSessionColor = useCallback(() => {
    if (!sessionInfo || sessionInfo === 'not_authenticated' || sessionInfo === 'expired') {
      return 'gray'
    }
    
    const timeRemaining = sessionInfo.timeRemaining
    
    if (timeRemaining > SESSION_CONFIG.WARNINGS.EXPIRING_SOON) return 'green'
    if (timeRemaining > SESSION_CONFIG.WARNINGS.CRITICAL) return 'yellow'
    return 'red'
  }, [sessionInfo])

  return {
    sessionInfo,
    sessionExpired,
    showWarning,
    
    getSessionStatusLabel,
    formatTimeRemaining,
    
    isSessionExpiringSoon,
    isSessionCritical,
    getSessionColor,
    
    refreshSession,
    
    timeRemaining: sessionInfo?.timeRemaining || 0,
    expiresAt: sessionInfo?.expiresAt || null,
    isActive: sessionInfo && sessionInfo !== 'not_authenticated' && sessionInfo !== 'expired'
  }
}
