import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}, ref) => {
  const baseClasses = 'font-semibold rounded-[10px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-[#c8ee44] text-[#1b212d] hover:bg-[#b8de34] focus:ring-[#c8ee44] border-none',
    secondary: 'border border-[#f2f2f2] text-[#78778b] hover:bg-gray-50 focus:ring-gray-200 bg-white',
    ghost: 'text-[#1b212d] hover:bg-gray-100 focus:ring-gray-200 border-none'
  }
  
  const sizes = {
    default: 'px-5 py-3.5 text-[16px]',
    sm: 'px-3 py-2 text-[14px]',
    lg: 'px-6 py-4 text-[18px]'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
