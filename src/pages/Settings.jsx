import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'

// Custom CSS animations for enhanced UX
const customStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 1.2s ease-out;
  }
  
  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out;
  }
`;
import { getNavigationWithActiveState } from '../config/navigation'

// Local Figma assets
import profileImage from '../assets/profile.png'
import dashboardIcon from '../assets/icons/dashboard.svg'
import transactionsIcon from '../assets/icons/transactions.svg'
import invoicesIcon from '../assets/icons/invoices.svg'
import wallets1Icon from '../assets/icons/wallets1.svg'
import wallets2Icon from '../assets/icons/wallets2.svg'
import settingsIcon from '../assets/icons/settings.svg'
import logoIcon from '../assets/icons/logo-main.svg'
import notificationIcon from '../assets/icons/notification.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import editIcon from '../assets/icons/edit.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import emailIcon from '../assets/icons/email.svg'
import lockIcon from '../assets/icons/lock.svg'
import eyeIcon from '../assets/icons/eye.svg'

const Settings = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isEditing, setIsEditing] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'Mahfuzul Islam',
    lastName: 'Nabil',
    dateOfBirth: '27/09/1998',
    mobile: '+123 456 7890',
    email: 'hellouihut@gmail.com',
    newPassword: '••••••••',
    confirmPassword: '••••••••'
  })

  const [editableData, setEditableData] = useState({ ...formData })

  const handleUpdate = () => {
    console.log('Updating user information:', editableData)
    setFormData({ ...editableData })
    setIsEditing(false)
  }

  // Inject custom CSS animations
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = customStyles
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const handleInputChange = (field, value) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCancel = () => {
    setEditableData({ ...formData })
    setIsEditing(false)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNavigation = (path) => {
    if (path) {
      setIsNavigating(true)
      
      // Add a small delay for smooth animation
      setTimeout(() => {
        navigate(path)
        setIsSidebarOpen(false)
        setIsNavigating(false)
      }, 300)
    }
  }

  // Get navigation items with proper active state
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState(location.pathname)

  return (
    <div 
      className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} min-h-screen ${
        isNavigating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ 
        backgroundColor: isDarkMode ? '#1c1a2e' : '#ffffff',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
      }}
    >
      {/* Immediate background coverage */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ backgroundColor: isDarkMode ? '#1c1a2e' : '#ffffff' }}
      ></div>
      <div className="flex relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#29a073] text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar */}
        <div className={`fixed md:relative z-40 w-[250px] h-screen transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isDarkMode ? 'bg-[#252347]' : 'bg-[#fafafa]'} flex flex-col transition-colors duration-300`}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-[25px] pt-[30px] pb-10">
            <div className="w-[30px] h-[30px]">
              <img alt="Maglo Logo" className="block max-w-none size-full" src={logoIcon} />
            </div>
            <div className={`font-['Gordita'] font-bold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
              Maglo.
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex flex-col h-full px-[25px]">
            {/* Top Navigation Items */}
            <div className="flex flex-col gap-0.5 pt-0">
              {topSidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`group relative flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out w-[200px] ${
                    item.active 
                      ? 'bg-[#c8ee44] transform scale-[1.02] shadow-lg' 
                      : isDarkMode 
                        ? 'hover:bg-gray-700 hover:transform hover:scale-[1.02] hover:shadow-md' 
                        : 'hover:bg-gray-100 hover:transform hover:scale-[1.02] hover:shadow-md'
                  }`}
                >
                  {/* Active indicator line */}
                  {item.active && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#1b212d] rounded-r-full animate-pulse" />
                  )}
                  
                  {/* Icon with enhanced animations */}
                  <div className={`relative w-5 h-5 transition-all duration-500 ${
                    item.active ? 'transform rotate-12 scale-110' : 'group-hover:rotate-6 group-hover:scale-110'
                  }`}>
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                    {item.hasSecondIcon && (
                      <img alt={item.label} className="absolute inset-0 block max-w-none size-full" src={item.secondIcon} />
                    )}
                  </div>
                  
                  {/* Text with enhanced animations */}
                  <span className={`font-['Kumbh_Sans'] text-[12px] transition-all duration-500 ${
                    item.active 
                      ? 'font-semibold text-[#929eae] transform translate-x-1' 
                      : isDarkMode 
                        ? 'font-medium text-gray-400 group-hover:translate-x-1' 
                        : 'font-medium text-[#929eae] group-hover:translate-x-1'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                    item.active 
                      ? 'bg-gradient-to-r from-[#c8ee44]/20 to-transparent' 
                      : 'group-hover:bg-gradient-to-r group-hover:from-white/5 group-hover:to-transparent'
                  }`} />
                </div>
              ))}
            </div>

            {/* Bottom Navigation Items - Fixed at bottom */}
            <div className="flex flex-col gap-0.5 mt-auto pb-8">
              {bottomSidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`group relative flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out w-[200px] ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 hover:transform hover:scale-[1.02] hover:shadow-md text-gray-400' 
                      : 'hover:bg-gray-100 hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]'
                  }`}
                >
                  {/* Icon with enhanced animations */}
                  <div className={`w-5 h-5 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  
                  {/* Text with enhanced animations */}
                  <span className="font-['Kumbh_Sans'] font-medium text-[12px] transition-all duration-500 group-hover:translate-x-1">{item.label}</span>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-white/5 group-hover:to-transparent`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 w-full md:ml-0">
          {/* Header */}
          <div className="px-4 md:px-6 lg:px-10 py-[30px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full max-w-[1110px] mx-auto">
              <h1 className={`font-['Kumbh_Sans'] font-semibold text-[20px] sm:text-[22px] lg:text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                Settings
              </h1>
              
              {/* Top Bar */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-[45px]">
                {/* Notification Icon */}
                <div className="w-6 h-6">
                  <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
                </div>
                
                {/* Dark Mode Toggle */}
                <DarkModeToggle />
                
                {/* User Profile */}
                <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-full sm:w-[180px] lg:w-[215px] transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                      <img alt="Profile" className="block max-w-none size-full rounded-full" src={profileImage} />
                    </div>
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] sm:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} hidden sm:block`}>
                      Mahfuzul Nabil
                    </span>
                  </div>
                  <div className="w-[17px] h-[17px]">
                    <img alt="Dropdown" className="block max-w-none size-full" src={dropdownIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="mx-4 md:mx-6 lg:mx-10 rounded-[10px] px-4 md:px-6 lg:px-10 py-6 md:py-8 lg:py-10">
            {/* Account Information Section */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <h2 className={`font-['Kumbh_Sans'] font-semibold text-[18px] md:text-[20px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} mb-[5px]`}>
                Account Information
              </h2>
              <p className="font-['Kumbh_Sans'] font-normal text-[13px] md:text-[14px] text-[#929eae]">
                Update your account information
              </p>
            </div>

            {/* Personal Information Section */}
            <div className="mb-6 md:mb-8 lg:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8 lg:mb-[35px]">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-[16px] md:text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  Personal Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2.5 text-[#29a073] hover:text-green-600 font-semibold text-[13px] md:text-[14px] self-start sm:self-auto"
                >
                  <div className="w-4 h-4">
                    <img alt="Edit" className="block max-w-none size-full" src={editIcon} />
                  </div>
                  Edit
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-4 md:gap-5">
                {/* First Name & Last Name Row */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-[41px]">
                  <div className="w-full sm:w-[calc(50%-20px)] lg:w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-[15px] md:px-[25px] py-3 md:py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e] text-white' : 'border-neutral-100 bg-white text-[#1b212d]'} transition-colors duration-300 font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px]`}
                      />
                    ) : (
                      <div className={`flex items-center px-[15px] md:px-[25px] py-3 md:py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {formData.firstName}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-full sm:w-[calc(50%-20px)] lg:w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-[15px] md:px-[25px] py-3 md:py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e] text-white' : 'border-neutral-100 bg-white text-[#1b212d]'} transition-colors duration-300 font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px]`}
                      />
                    ) : (
                      <div className={`flex items-center px-[15px] md:px-[25px] py-3 md:py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {formData.lastName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date of Birth & Mobile Number Row */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-[41px]">
                  <div className="w-full sm:w-[calc(50%-20px)] lg:w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={`w-full px-[15px] md:px-[25px] py-3 md:py-3.5 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e] text-white' : 'border-neutral-100 bg-white text-[#1b212d]'} transition-colors duration-300 font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px]`}
                      />
                    ) : (
                      <div className={`flex items-center justify-between px-[15px] md:px-[25px] py-3 md:py-3.5 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {formData.dateOfBirth}
                        </span>
                        <div className="w-5 h-5">
                          <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full sm:w-[calc(50%-20px)] lg:w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                      Mobile Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className={`w-full px-[15px] md:px-[25px] py-3 md:py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e] text-white' : 'border-neutral-100 bg-white text-[#1b212d]'} transition-colors duration-300 font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px]`}
                      />
                    ) : (
                      <div className={`flex items-center px-[15px] md:px-[25px] py-3 md:py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {formData.mobile}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex flex-col gap-4 md:gap-[25px]">
                  {/* Email Field */}
                  <div className="w-full lg:w-[837px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                      Email
                    </label>
                    {isEditing ? (
                      <div className={`flex items-center gap-3 md:gap-5 px-[15px] md:px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                        <div className="w-5 h-5">
                          <img alt="Email" className="block max-w-none size-full" src={emailIcon} />
                        </div>
                        <input
                          type="email"
                          value={editableData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`flex-1 bg-transparent font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} outline-none`}
                        />
                      </div>
                    ) : (
                      <div className={`flex items-center gap-3 md:gap-5 px-[15px] md:px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                        <div className="w-5 h-5">
                          <img alt="Email" className="block max-w-none size-full" src={emailIcon} />
                        </div>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {formData.email}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Password Row */}
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-[41px]">
                    <div className="w-full sm:w-[calc(50%-20px)] lg:w-[398px]">
                      <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                        New Password
                      </label>
                      {isEditing ? (
                        <div className={`flex items-center justify-between px-[15px] md:px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-5 h-5">
                              <img alt="Lock" className="block max-w-none size-full" src={lockIcon} />
                            </div>
                            <input
                              type="password"
                              value={editableData.newPassword}
                              onChange={(e) => handleInputChange('newPassword', e.target.value)}
                              className={`flex-1 bg-transparent font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} outline-none`}
                            />
                          </div>
                          <div className="w-6 h-6">
                            <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                          </div>
                        </div>
                      ) : (
                        <div className={`flex items-center justify-between px-[15px] md:px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-5 h-5">
                              <img alt="Lock" className="block max-w-none size-full" src={lockIcon} />
                            </div>
                            <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              {formData.newPassword}
                            </span>
                          </div>
                          <div className="w-6 h-6">
                            <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full sm:w-[calc(50%-20px)] lg:w-[398px]">
                      <label className="block font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] text-[#78778b] mb-2.5">
                        Confirm Password
                      </label>
                      {isEditing ? (
                        <div className={`flex items-center justify-between px-[15px] md:px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-5 h-5">
                              <img alt="Lock" className="block max-w-none size-full" src={lockIcon} />
                            </div>
                            <input
                              type="password"
                              value={editableData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className={`flex-1 bg-transparent font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} outline-none`}
                            />
                          </div>
                          <div className="w-6 h-6">
                            <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                          </div>
                        </div>
                      ) : (
                        <div className={`flex items-center justify-between px-[15px] md:px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="w-5 h-5">
                              <img alt="Lock" className="block max-w-none size-full" src={lockIcon} />
                            </div>
                            <span className={`font-['Kumbh_Sans'] font-medium text-[13px] md:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              {formData.confirmPassword}
                            </span>
                          </div>
                          <div className="w-6 h-6">
                            <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="mt-6 md:mt-8 lg:mt-[30px] flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-[#29a073] hover:bg-green-600 text-white font-['Epilogue'] font-semibold text-[14px] md:text-[16px] leading-[26px] px-[10px] py-[10px] rounded-[10px] w-full sm:w-[190px] transition-colors duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-['Epilogue'] font-semibold text-[14px] md:text-[16px] leading-[26px] px-[10px] py-[10px] rounded-[10px] w-full sm:w-[190px] transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
