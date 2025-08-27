import { useDarkMode } from '../../hooks/useDarkMode'

const LoadingSpinner = ({ size = 'md', variant = 'primary', className = '' }) => {
  const { isDarkMode } = useDarkMode()
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const variantClasses = {
    primary: 'border-[#c8ee44] border-t-transparent',
    white: 'border-white border-t-transparent',
    dark: 'border-gray-700 border-t-transparent',
    subtle: isDarkMode ? 'border-gray-600 border-t-transparent' : 'border-gray-300 border-t-transparent'
  }
  
  return (
    <div className={`
      ${sizeClasses[size]} 
      ${variantClasses[variant]}
      ${className}
      border-2 rounded-full animate-spin
    `} />
  )
}

export default LoadingSpinner
