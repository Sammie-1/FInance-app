import { forwardRef, useState } from 'react'

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  className = '',
  error,
  required = false,
  showPasswordToggle = false,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const actualType = type === 'password' && showPassword ? 'text' : type
  
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="font-medium text-[14px] text-[#1b212d] mb-2.5 px-0">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={actualType}
          placeholder={placeholder}
          className={`
            w-full px-5 py-[15px] pb-4 text-[14px] font-medium
            border border-[#f2f2f2] rounded-[10px]
            placeholder:text-[#78778b] text-[#1b212d]
            focus:outline-none focus:ring-2 focus:ring-[#c8ee44] focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-300 focus:ring-red-500' : ''}
            ${type === 'password' ? 'pr-12' : ''}
          `}
          {...props}
        />
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#78778b] hover:text-[#1b212d] transition-colors"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      
      {error && (
        <span className="text-red-500 text-[12px] mt-1">{error}</span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
