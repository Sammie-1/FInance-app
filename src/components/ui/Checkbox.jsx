import { forwardRef } from 'react'

const Checkbox = forwardRef(({ 
  label,
  checked = false,
  onChange,
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className={`flex items-center gap-[9px] ${className}`}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div 
          className={`
            w-4 h-4 rounded-[3px] border transition-all duration-200 cursor-pointer
            ${checked 
              ? 'bg-[#c8ee44] border-[#c8ee44]' 
              : 'border-[#929eae] bg-white hover:border-[#1b212d]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
        >
          {checked && (
            <svg 
              className="w-full h-full text-[#1b212d] p-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </div>
      </div>
      
      {label && (
        <label 
          className={`font-medium text-[14px] text-[#1b212d] cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
