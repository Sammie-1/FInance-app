import { useState, useEffect } from 'react'
import { useSession } from '../../hooks/useSession'

const SessionWarningModal = () => {
  const { 
    showWarning, 
    timeRemaining, 
    formatTimeRemaining, 
    refreshSession,
    isSessionCritical 
  } = useSession()
  
  const [isVisible, setIsVisible] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (showWarning) {
      setIsVisible(true)
      setCountdown(Math.floor(timeRemaining / 1000))
    } else {
      setIsVisible(false)
    }
  }, [showWarning, timeRemaining])

  useEffect(() => {
    if (!isVisible || countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsVisible(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible, countdown])

  const handleRefreshSession = () => {
    refreshSession()
    setIsVisible(false)
  }

  const handleContinue = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  const isCritical = isSessionCritical()
  const timeFormatted = formatTimeRemaining(timeRemaining)

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className={`px-6 py-4 rounded-t-xl ${
          isCritical ? 'bg-red-500' : 'bg-yellow-500'
        } text-white`}>
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {isCritical ? '⚠️' : '⏰'}
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {isCritical ? 'Session Expiring Soon!' : 'Session Timeout Warning'}
              </h3>
              <p className="text-sm opacity-90">
                {isCritical 
                  ? 'Your session will expire in less than 1 minute' 
                  : 'Your session will expire soon'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-mono font-bold text-gray-800 dark:text-gray-200 mb-2">
              {timeFormatted}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {isCritical 
                ? 'Time remaining before automatic logout'
                : 'Time remaining before session expires'
              }
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRefreshSession}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                isCritical 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isCritical ? 'Extend Session Now' : 'Extend Session'}
            </button>
            
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Continue Working
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {isCritical 
              ? '⚠️ Critical: Session will expire very soon'
              : '💡 Tip: Extend your session to avoid interruption'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default SessionWarningModal
