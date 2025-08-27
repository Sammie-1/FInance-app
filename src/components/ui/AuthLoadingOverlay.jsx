import { useDarkMode } from '../../hooks/useDarkMode'
import LoadingSpinner from './LoadingSpinner'

const AuthLoadingOverlay = ({ 
  isVisible = false, 
  title = 'Authenticating...', 
  subtitle = 'Please wait while we verify your credentials',
  progress = null 
}) => {
  const { isDarkMode } = useDarkMode()
  
  if (!isVisible) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Animated backdrop */}
      <div 
        className={`
          absolute inset-0 transition-all duration-500
          ${isDarkMode ? 'bg-[#1c1a2e]/95' : 'bg-white/95'}
          backdrop-blur-md
        `}
        style={{
          backgroundImage: isDarkMode 
            ? 'radial-gradient(circle at 30% 40%, rgba(200, 238, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(41, 160, 115, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 40%, rgba(200, 238, 68, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(41, 160, 115, 0.05) 0%, transparent 50%)'
        }}
      />
      
      {/* Loading content */}
      <div className={`
        relative z-10 text-center p-8 rounded-2xl max-w-md mx-4
        ${isDarkMode ? 'bg-[#1e1c30]/80' : 'bg-white/80'}
        backdrop-blur-xl border 
        ${isDarkMode ? 'border-[#282541]/50' : 'border-gray-200/50'}
        shadow-2xl transform transition-all duration-500 animate-fade-in-up
      `}>
        {/* Animated logo or brand element */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Pulsing background circle */}
            <div className="absolute inset-0 bg-[#c8ee44]/20 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-[#c8ee44]/10 rounded-full animate-pulse" />
            
            {/* Main spinner */}
            <div className="relative bg-[#c8ee44] rounded-full p-4 shadow-lg">
              <LoadingSpinner size="lg" variant="white" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className={`
          font-['Kumbh_Sans'] font-semibold text-xl mb-2
          ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}
        `}>
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className={`
          font-['Kumbh_Sans'] font-medium text-sm
          ${isDarkMode ? 'text-[#929eae]' : 'text-gray-600'}
          mb-4
        `}>
          {subtitle}
        </p>
        
        {/* Progress bar (if provided) */}
        {progress !== null && (
          <div className="w-full mb-4">
            <div className={`
              w-full h-2 rounded-full overflow-hidden
              ${isDarkMode ? 'bg-[#282541]' : 'bg-gray-200'}
            `}>
              <div 
                className="h-full bg-[#c8ee44] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <p className={`
              text-xs mt-2 font-['Kumbh_Sans'] font-medium
              ${isDarkMode ? 'text-[#929eae]' : 'text-gray-500'}
            `}>
              {Math.round(progress)}% complete
            </p>
          </div>
        )}
        
        {/* Animated dots */}
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#c8ee44] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthLoadingOverlay
