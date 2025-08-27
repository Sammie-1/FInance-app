import { useNotification } from '../../contexts/NotificationContext'
import { useDarkMode } from '../../hooks/useDarkMode'

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification()
  const { isDarkMode } = useDarkMode()

  if (notifications.length === 0) return null

  const getNotificationStyles = (type) => {
    const baseStyles = {
      success: {
        bg: isDarkMode ? 'bg-green-900/20' : 'bg-green-50',
        border: 'border-green-200',
        icon: '✓',
        iconBg: 'bg-green-500',
        text: isDarkMode ? 'text-green-300' : 'text-green-800',
        title: isDarkMode ? 'text-green-200' : 'text-green-900'
      },
      error: {
        bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-50',
        border: 'border-red-200',
        icon: '✕',
        iconBg: 'bg-red-500',
        text: isDarkMode ? 'text-red-300' : 'text-red-800',
        title: isDarkMode ? 'text-red-200' : 'text-red-900'
      },
      warning: {
        bg: isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: '⚠',
        iconBg: 'bg-yellow-500',
        text: isDarkMode ? 'text-yellow-300' : 'text-yellow-800',
        title: isDarkMode ? 'text-yellow-200' : 'text-yellow-900'
      },
      info: {
        bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'ℹ',
        iconBg: 'bg-blue-500',
        text: isDarkMode ? 'text-blue-300' : 'text-blue-800',
        title: isDarkMode ? 'text-blue-200' : 'text-blue-900'
      }
    }
    return baseStyles[type] || baseStyles.info
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => {
        const styles = getNotificationStyles(notification.type)
        
        return (
          <div
            key={notification.id}
            className={`
              ${styles.bg} ${styles.border} border
              rounded-lg shadow-lg backdrop-blur-sm
              transform transition-all duration-300 ease-in-out
              animate-slide-in-right
              hover:shadow-xl hover:scale-105
              relative overflow-hidden
            `}
            style={{
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            {/* Progress bar for auto-dismiss */}
            {notification.duration > 0 && (
              <div 
                className={`absolute top-0 left-0 h-1 ${styles.iconBg} transition-all`}
                style={{
                  width: '100%',
                  animation: `shrink ${notification.duration}ms linear`
                }}
              />
            )}
            
            <div className="p-4">
              <div className="flex items-start">
                {/* Icon */}
                <div className={`
                  ${styles.iconBg} 
                  rounded-full w-8 h-8 flex items-center justify-center 
                  text-white font-bold text-sm mr-3 flex-shrink-0
                  shadow-md
                `}>
                  {styles.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  {notification.title && (
                    <p className={`
                      font-['Kumbh_Sans'] font-semibold text-sm leading-5 mb-1
                      ${styles.title}
                    `}>
                      {notification.title}
                    </p>
                  )}
                  <p className={`
                    font-['Kumbh_Sans'] font-medium text-sm leading-5
                    ${styles.text}
                  `}>
                    {notification.message}
                  </p>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => removeNotification(notification.id)}
                  className={`
                    ml-2 flex-shrink-0 rounded-lg p-1.5 inline-flex 
                    ${styles.text} hover:bg-black/10 
                    transition-colors duration-200 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
                  `}
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )
      })}
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default NotificationContainer
