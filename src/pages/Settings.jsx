import { useState } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'

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
  const [isEditing, setIsEditing] = useState(false)
  const [formData] = useState({
    firstName: 'Mahfuzul Islam',
    lastName: 'Nabil',
    dateOfBirth: '27/09/1998',
    mobile: '+123 456 7890',
    email: 'hellouihut@gmail.com',
    newPassword: '••••••••',
    confirmPassword: '••••••••'
  })



  const handleUpdate = () => {
    console.log('Updating user information:', formData)
    setIsEditing(false)
  }

  const topSidebarItems = [
    { icon: dashboardIcon, label: 'Dashboard', active: false },
    { icon: transactionsIcon, label: 'Transactions', active: false },
    { icon: invoicesIcon, label: 'Invoices', active: false },
    { icon: wallets1Icon, label: 'My Wallets', active: false, hasSecondIcon: true, secondIcon: wallets2Icon },
    { icon: settingsIcon, label: 'Settings', active: true }
  ]

  const bottomSidebarItems = [
    { icon: dashboardIcon, label: 'Help', active: false },
    { icon: dashboardIcon, label: 'Logout', active: false }
  ]

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} min-h-screen transition-colors duration-300`}>
      <DarkModeToggle />
      
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-[250px] h-screen ${isDarkMode ? 'bg-[#252347]' : 'bg-[#fafafa]'} flex flex-col transition-colors duration-300`}>
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
          <div className="flex flex-col justify-between flex-1 px-[25px] pb-[100px]">
            {/* Top Navigation Items */}
            <div className="flex flex-col gap-0.5">
              {topSidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[200px] ${
                    item.active 
                      ? 'bg-[#c8ee44]' 
                      : isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="relative w-5 h-5">
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                    {item.hasSecondIcon && (
                      <img alt={item.label} className="absolute inset-0 block max-w-none size-full" src={item.secondIcon} />
                    )}
                  </div>
                  <span className={`font-['Kumbh_Sans'] text-[12px] ${
                    item.active 
                      ? 'font-semibold text-[#929eae]' 
                      : isDarkMode 
                        ? 'font-medium text-gray-400' 
                        : 'font-medium text-[#929eae]'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Navigation Items */}
            <div className="flex flex-col gap-0.5">
              {bottomSidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[200px] ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-400' 
                      : 'hover:bg-gray-100 text-[#929eae]'
                  }`}
                >
                  <div className="w-5 h-5">
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  <span className="font-['Kumbh_Sans'] font-medium text-[12px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="px-10 py-[30px]">
            <div className="flex items-center justify-between w-[1110px]">
              <h1 className={`font-['Kumbh_Sans'] font-semibold text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                Settings
              </h1>
              
              {/* Top Bar */}
              <div className="flex items-center gap-[45px]">
                {/* Notification Icon */}
                <div className="w-6 h-6">
                  <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
                </div>
                
                {/* User Profile */}
                <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-[215px] transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                      <img alt="Profile" className="block max-w-none size-full rounded-full" src={profileImage} />
                    </div>
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
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
          <div className="mx-10 rounded-[10px] px-10 py-10">
            {/* Account Information Section */}
            <div className="mb-10">
              <h2 className={`font-['Kumbh_Sans'] font-semibold text-[20px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} mb-[5px]`}>
                Account Information
              </h2>
              <p className="font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae]">
                Update your account information
              </p>
            </div>

            {/* Personal Information Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-[35px]">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  Personal Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2.5 text-[#29a073] hover:text-green-600 font-semibold text-[14px]"
                >
                  <div className="w-4 h-4">
                    <img alt="Edit" className="block max-w-none size-full" src={editIcon} />
                  </div>
                  Edit
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-5">
                {/* First Name & Last Name Row */}
                <div className="flex gap-[41px]">
                  <div className="w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                      First Name
                    </label>
                    <div className={`flex items-center px-[25px] py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                      <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        {formData.firstName}
                      </span>
                    </div>
                  </div>
                  <div className="w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                      Last
                    </label>
                    <div className={`flex items-center px-[25px] py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                      <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        {formData.lastName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date of Birth & Mobile Number Row */}
                <div className="flex gap-[41px]">
                  <div className="w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                      Date of Birth
                    </label>
                    <div className={`flex items-center justify-between px-[25px] py-3.5 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                      <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        {formData.dateOfBirth}
                      </span>
                      <div className="w-5 h-5">
                        <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                      </div>
                    </div>
                  </div>
                  <div className="w-[398px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                      Mobile Number
                    </label>
                    <div className={`flex items-center px-[25px] py-4 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-neutral-100 bg-white'} transition-colors duration-300`}>
                      <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        {formData.mobile}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex flex-col gap-[25px]">
                  {/* Email Field */}
                  <div className="w-[837px]">
                    <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                      Email
                    </label>
                    <div className={`flex items-center gap-5 px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                      <div className="w-5 h-5">
                        <img alt="Email" className="block max-w-none size-full" src={emailIcon} />
                      </div>
                      <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        {formData.email}
                      </span>
                    </div>
                  </div>

                  {/* Password Row */}
                  <div className="flex gap-[41px]">
                    <div className="w-[398px]">
                      <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                        New Password
                      </label>
                      <div className={`flex items-center justify-between px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                        <div className="flex items-center gap-5">
                          <div className="w-5 h-5">
                            <img alt="Lock" className="block max-w-none size-full" src={lockIcon} />
                          </div>
                          <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {formData.newPassword}
                          </span>
                        </div>
                        <div className="w-6 h-6">
                          <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                        </div>
                      </div>
                    </div>
                    <div className="w-[398px]">
                      <label className="block font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b] mb-2.5">
                        Confirm Password
                      </label>
                      <div className={`flex items-center justify-between px-[25px] py-3 rounded-[10px] border ${isDarkMode ? 'border-[#2a2550] bg-[#1c1a2e]' : 'border-[#f1f1f3] bg-white'} transition-colors duration-300`}>
                        <div className="flex items-center gap-5">
                          <div className="w-5 h-5">
                            <img alt="Lock" className="block max-w-none size-full" src={lockIcon} />
                          </div>
                          <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {formData.confirmPassword}
                          </span>
                        </div>
                        <div className="w-6 h-6">
                          <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-[30px]">
                <button
                  onClick={handleUpdate}
                  className="bg-[#29a073] hover:bg-green-600 text-white font-['Epilogue'] font-semibold text-[16px] leading-[26px] px-[13px] py-[13px] rounded-[10px] w-[190px] transition-colors duration-200"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
