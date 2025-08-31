/**
 * Session Management Configuration
 * Centralized configuration for session timeout and activity detection
 */

export const SESSION_CONFIG = {
  TIMEOUT_MS: process.env.REACT_APP_SESSION_TIMEOUT_MS || 30 * 60 * 1000,
  
  ACTIVITY: {
    DEBOUNCE_MS: 1000,
    EVENTS: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'],
    UPDATE_INTERVAL: 30000,
  },
  
  WARNINGS: {
    CRITICAL: 60 * 1000,
    WARNING: 2 * 60 * 1000,
    EXPIRING_SOON: 5 * 60 * 1000,
  },
  
  INDICATOR: {
    UPDATE_INTERVAL: 60000,
    SHOW_DETAILS: true,
  },
  
  SECURITY: {
    CLEAR_STORAGE_ON_TIMEOUT: true,
    FORCE_REAUTH_ON_EXPIRY: true,
    LOG_TIMEOUT_EVENTS: true,
  }
}

export const getSessionTimeoutLabel = () => {
  const minutes = Math.floor(SESSION_CONFIG.TIMEOUT_MS / 60000)
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`
}

export const getWarningLabels = () => ({
  critical: `${Math.floor(SESSION_CONFIG.WARNINGS.CRITICAL / 1000)} seconds`,
  warning: `${Math.floor(SESSION_CONFIG.WARNINGS.WARNING / 60000)} minutes`,
  expiringSoon: `${Math.floor(SESSION_CONFIG.WARNINGS.EXPIRING_SOON / 60000)} minutes`
})

export const validateSessionConfig = () => {
  const errors = []
  
  if (SESSION_CONFIG.TIMEOUT_MS < 60000) {
    errors.push('Session timeout must be at least 1 minute')
  }
  
  if (SESSION_CONFIG.WARNINGS.CRITICAL >= SESSION_CONFIG.WARNINGS.WARNING) {
    errors.push('Critical warning threshold must be less than warning threshold')
  }
  
  if (SESSION_CONFIG.WARNINGS.WARNING >= SESSION_CONFIG.TIMEOUT_MS) {
    errors.push('Warning threshold must be less than session timeout')
  }
  
  return errors
}
