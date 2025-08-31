import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { SESSION_CONFIG } from '../../config/session'

const SessionStatusIndicator = () => {
  const { getSessionStatus, refreshSession } = useAuth()
  const [sessionInfo, setSessionInfo] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const updateSessionInfo = () => {
      const status = getSessionStatus()
      setSessionInfo(status)
    }

    updateSessionInfo()
    const interval = setInterval(updateSessionInfo, SESSION_CONFIG.INDICATOR.UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [getSessionStatus])

  if (!sessionInfo || sessionInfo === 'not_authenticated') {
    return null
  }

  if (sessionInfo === 'expired') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">Session Expired</span>
        </div>
      </div>
    )
  }

  const { timeRemaining, expiresAt } = sessionInfo
  const minutesRemaining = Math.floor(timeRemaining / 60000)
  const secondsRemaining = Math.floor((timeRemaining % 60000) / 1000)

  const getStatusColor = () => {
    if (timeRemaining > SESSION_CONFIG.WARNINGS.EXPIRING_SOON) return 'bg-green-500'
    if (timeRemaining > SESSION_CONFIG.WARNINGS.CRITICAL) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getStatusIcon = () => {
    if (timeRemaining > SESSION_CONFIG.WARNINGS.EXPIRING_SOON) return '🟢'
    if (timeRemaining > SESSION_CONFIG.WARNINGS.CRITICAL) return '🟡'
    return '🔴'
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={`${getStatusColor()} text-white px-3 py-2 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105`}
        onClick={() => setShowDetails(!showDetails)}
        title="Click to view session details"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStatusIcon()}</span>
          <span className="text-sm font-medium">
            {minutesRemaining}:{secondsRemaining.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {showDetails && SESSION_CONFIG.INDICATOR.SHOW_DETAILS && (
        <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 min-w-[280px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Status</span>
              <span className="text-sm text-green-600 dark:text-green-400">Active</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Remaining</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {minutesRemaining}m {secondsRemaining}s
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Expires At</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {expiresAt.toLocaleTimeString()}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={refreshSession}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
              >
                Refresh Session
              </button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionStatusIndicator
