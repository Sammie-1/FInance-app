# Session Timeout System

## Overview

This implementation provides a comprehensive 30-minute session timeout system with automatic logout, activity detection, and user-friendly warnings. The system ensures security by automatically signing out inactive users while providing a smooth user experience.

## Features

### 🔒 **Security Features**
- **30-minute automatic timeout** after inactivity
- **Activity detection** (mouse, keyboard, scroll, touch)
- **Page visibility handling** (tab switching, window focus)
- **Automatic logout** on session expiry
- **Force re-authentication** after timeout

### 🎯 **User Experience**
- **Visual session indicator** with countdown timer
- **Warning modal** when session is about to expire
- **Session refresh** capability
- **Color-coded status** (green → yellow → red)
- **Responsive design** for all screen sizes

### ⚙️ **Configuration**
- **Centralized settings** in `src/config/session.js`
- **Environment variables** support
- **Customizable thresholds** for warnings
- **Debounced activity detection**

## Architecture

### Core Components

1. **AuthContext** (`src/contexts/AuthContext.jsx`)
   - Session timer management
   - Activity detection
   - Automatic logout handling

2. **Route Protection** (`src/App.jsx`)
   - Enhanced `ProtectedRoute` component
   - Session validation
   - Automatic redirects

3. **Session Status Indicator** (`src/components/ui/SessionStatusIndicator.jsx`)
   - Visual countdown timer
   - Color-coded status
   - Detailed session information

4. **Warning Modal** (`src/components/ui/SessionWarningModal.jsx`)
   - Timeout warnings
   - Session extension options
   - Critical session alerts

5. **Custom Hook** (`src/hooks/useSession.js`)
   - Session state management
   - Warning thresholds
   - Utility functions

6. **Configuration** (`src/config/session.js`)
   - Centralized settings
   - Environment variables
   - Validation functions

## Configuration

### Session Settings

```javascript
export const SESSION_CONFIG = {
  // Session timeout duration (30 minutes default)
  TIMEOUT_MS: process.env.REACT_APP_SESSION_TIMEOUT_MS || 30 * 60 * 1000,
  
  // Activity detection settings
  ACTIVITY: {
    DEBOUNCE_MS: 1000,           // 1 second debounce
    EVENTS: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'],
    UPDATE_INTERVAL: 30000,      // Update every 30 seconds
  },
  
  // Warning thresholds
  WARNINGS: {
    CRITICAL: 60 * 1000,         // 1 minute - critical warning
    WARNING: 2 * 60 * 1000,      // 2 minutes - warning modal
    EXPIRING_SOON: 5 * 60 * 1000, // 5 minutes - color change
  },
  
  // Security settings
  SECURITY: {
    CLEAR_STORAGE_ON_TIMEOUT: true,
    FORCE_REAUTH_ON_EXPIRY: true,
    LOG_TIMEOUT_EVENTS: true,
  }
}
```

### Environment Variables

```bash
# .env file
REACT_APP_SESSION_TIMEOUT_MS=1800000  # 30 minutes in milliseconds
```

## Usage

### Basic Implementation

```jsx
import { useAuth } from '../contexts/AuthContext'
import { useSession } from '../hooks/useSession'

function MyComponent() {
  const { currentUser, sessionExpired } = useAuth()
  const { timeRemaining, isSessionCritical } = useSession()
  
  if (sessionExpired) {
    return <div>Please sign in again</div>
  }
  
  return (
    <div>
      <p>Session expires in: {Math.floor(timeRemaining / 60000)} minutes</p>
      {isSessionCritical() && <p>⚠️ Session expiring soon!</p>}
    </div>
  )
}
```

### Adding to Dashboard

```jsx
import SessionStatusIndicator from '../components/ui/SessionStatusIndicator'
import SessionWarningModal from '../components/ui/SessionWarningModal'

function Dashboard() {
  return (
    <div>
      {/* Session Management Components */}
      <SessionStatusIndicator />
      <SessionWarningModal />
      
      {/* Your dashboard content */}
    </div>
  )
}
```

## Activity Detection

### Monitored Events
- **Mouse**: `mousedown`, `mousemove`, `click`
- **Keyboard**: `keypress`
- **Touch**: `touchstart`
- **Scroll**: `scroll`

### Smart Detection
- **Debounced**: Prevents excessive timer resets
- **Page Visibility**: Pauses timer when tab is hidden
- **Window Focus**: Resumes timer when window gains focus
- **Passive Listeners**: Optimized for performance

## Warning System

### Warning Levels

1. **🟢 Green (> 5 minutes)**
   - Normal operation
   - No warnings

2. **🟡 Yellow (2-5 minutes)**
   - Warning modal appears
   - Session extension option

3. **🔴 Red (< 1 minute)**
   - Critical warning
   - Urgent session extension

### Warning Modal

```jsx
<SessionWarningModal />
```

- Shows when session has < 2 minutes remaining
- Provides "Extend Session" button
- Countdown timer display
- Dismissible with "Continue Working"

## Security Features

### Automatic Logout
- **30-minute timeout** on inactivity
- **Clears all session data** (localStorage, sessionStorage)
- **Forces re-authentication** on next access

### Route Protection
- **Protected routes** check session validity
- **Automatic redirects** to sign-in page
- **No bypass** of expired sessions

### Data Cleanup
- **Session timer cleanup** on component unmount
- **Event listener cleanup** to prevent memory leaks
- **Storage clearing** on timeout

## Performance Considerations

### Optimization Features
- **Debounced activity detection** (1-second delay)
- **Passive event listeners** for scroll events
- **Efficient timer management** with cleanup
- **Minimal re-renders** with useCallback and useMemo

### Memory Management
- **Proper cleanup** of timers and listeners
- **Ref-based state** to avoid unnecessary re-renders
- **Efficient interval updates** (30 seconds for warnings, 1 minute for display)

## Testing

### Manual Testing
1. **Start a session** by signing in
2. **Wait for warnings** (2 minutes, 1 minute)
3. **Test activity detection** by moving mouse/typing
4. **Verify timeout** after 30 minutes of inactivity
5. **Check re-authentication** requirement after timeout

### Automated Testing
```javascript
// Example test structure
describe('Session Timeout', () => {
  test('should show warning at 2 minutes', () => {
    // Mock time and verify warning appears
  })
  
  test('should logout after 30 minutes', () => {
    // Mock timeout and verify logout
  })
  
  test('should reset timer on activity', () => {
    // Mock user activity and verify timer reset
  })
})
```

## Troubleshooting

### Common Issues

1. **Timer not resetting**
   - Check if activity events are being captured
   - Verify debounce configuration

2. **Warnings not showing**
   - Check warning threshold configuration
   - Verify component mounting

3. **Session not expiring**
   - Check timeout configuration
   - Verify Firebase auth integration

### Debug Mode

```javascript
// Enable debug logging
SESSION_CONFIG.SECURITY.LOG_TIMEOUT_EVENTS = true
```

## Future Enhancements

### Planned Features
- **Multi-tab synchronization** for consistent session state
- **Offline session handling** for network interruptions
- **Role-based timeout** for different user types
- **Session analytics** and reporting

### Customization Options
- **User-configurable** timeout preferences
- **Remember me** functionality
- **Session extension** limits
- **Activity patterns** learning

## Support

For technical support or feature requests, please refer to the project documentation or create an issue in the repository.

---

**Note**: This system is designed for production use with proper security considerations. Always test thoroughly in your specific environment before deployment.
