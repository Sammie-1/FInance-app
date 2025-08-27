import LoadingSpinner from './LoadingSpinner'
import { useDarkMode } from '../../hooks/useDarkMode'

const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false,
  variant = 'primary',
  size = 'md',
  loadingText = 'Loading...',
  className = '',
  ...props 
}) => {
  const { isDarkMode } = useDarkMode()
  
  const baseClasses = "relative flex items-center justify-center font-['Kumbh_Sans'] font-semibold rounded-[10px] border-0 cursor-pointer transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variantClasses = {
    primary: `bg-[#c8ee44] hover:bg-[#b8de34] text-[#1b212d] focus:ring-[#c8ee44]/50 disabled:bg-gray-300 disabled:text-gray-500`,
    secondary: isDarkMode 
      ? `bg-transparent border border-[#282541] hover:bg-[#282541] text-white focus:ring-gray-600/50 disabled:border-gray-700 disabled:text-gray-600`
      : `bg-white border border-neutral-100 hover:bg-gray-50 text-gray-700 focus:ring-gray-300/50 disabled:border-gray-200 disabled:text-gray-400`,
    ghost: isDarkMode
      ? `bg-transparent hover:bg-[#282541] text-[#929eae] focus:ring-gray-600/50 disabled:text-gray-700`
      : `bg-transparent hover:bg-gray-50 text-gray-600 focus:ring-gray-300/50 disabled:text-gray-400`
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3.5 text-[16px]',
    lg: 'px-6 py-4 text-lg'
  }
  
  const isDisabled = disabled || loading
  
  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'cursor-not-allowed opacity-75' : 'hover:shadow-lg hover:-translate-y-0.5'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {/* Loading overlay with blur effect */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-[10px] backdrop-blur-[1px]">
          <div className="flex items-center gap-2">
            <LoadingSpinner 
              size="sm" 
              variant={variant === 'primary' ? 'dark' : 'subtle'} 
            />
            <span className="text-sm font-medium">
              {loadingText}
            </span>
          </div>
        </div>
      )}
      
      {/* Button content with opacity transition */}
      <div className={`
        flex items-center gap-2 transition-opacity duration-300
        ${loading ? 'opacity-0' : 'opacity-100'}
      `}>
        {children}
      </div>
    </button>
  )
}

export default LoadingButton
