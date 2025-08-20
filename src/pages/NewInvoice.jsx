import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import searchIcon from '../assets/icons/search.1 1.svg'
import notificationIcon from '../assets/icons/notification-bing.5 1.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import logoMain from '../assets/icons/logo-main.svg'
import avatarIcon from '../assets/icons/avatar.svg'
import { getNavigationWithActiveState } from '../config/navigation'
import calendarIcon from '../assets/icons/calendar.svg'
import eyeIcon from '../assets/icons/eye.svg'
import downloadIcon from '../assets/icons/ic-receipt-24px 1.svg'
import sajibPng from '../assets/icons/sajib.png'
import moreIcon from '../assets/icons/Vector.svg'
import dividerIcon from '../assets/icons/underline.svg'
import verifyIcon from '../assets/icons/email.svg'
import logoMainSmall from '../assets/icons/logo-main.svg'
import maskGroup from '../assets/icons/Rectangle 456.svg'

const NewInvoice = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState('/new-invoice')

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} min-h-screen transition-colors duration-300`}>
      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#29a073] text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Sidebar - Updated to match Figma design */}
        <div className={`fixed md:relative z-40 w-[250px] h-screen transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isDarkMode ? 'bg-[#1e1c30]' : 'bg-[#fafafa]'} flex flex-col transition-colors duration-300`}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-[25px] pt-[30px] pb-10">
            <div className="w-[30px] h-[30px]">
              <img alt="Maglo Logo" className="block max-w-none size-full" src={logoMain} />
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
                  onClick={() => {
                    item.path && navigate(item.path)
                    setIsSidebarOpen(false)
                  }}
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[220px] ${
                    item.active 
                      ? 'bg-[#c8ee44]' 
                      : isDarkMode 
                        ? 'hover:bg-[#282541]' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="relative w-5 h-5">
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  <span className={`font-['Kumbh_Sans'] text-[14px] whitespace-nowrap ${
                    item.active 
                      ? 'font-semibold text-[#929eae]' 
                      : 'font-medium text-[#929eae]'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Navigation Items - Fixed at bottom */}
            <div className="flex flex-col gap-0.5 mt-auto pb-8">
              {bottomSidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[220px] ${
                    isDarkMode 
                      ? 'hover:bg-[#282541] text-[#929eae]' 
                      : 'hover:bg-gray-100 text-[#929eae]'
                  }`}
                >
                  <div className="w-5 h-5">
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  <span className="font-['Kumbh_Sans'] font-medium text-[14px] whitespace-nowrap">{item.label}</span>
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
            <div className="w-full max-w-[1110px] mx-auto">
              {/* Figma Top Bar Design */}
              <div className="box-border content-stretch flex items-center justify-between p-0 relative size-full">
                <div className={`font-['Kumbh_Sans'] font-semibold leading-[0] relative shrink-0 text-nowrap text-[25px] ${
                  isDarkMode ? 'text-white' : 'text-[#1b212d]'
                }`}>
                  <p className="block leading-[normal] whitespace-pre">New Invoices: MGL524874</p>
                </div>
                <div className="box-border content-stretch flex gap-4 md:gap-[45px] items-center justify-start p-0 relative shrink-0">
                  <div className="box-border content-stretch flex gap-4 md:gap-[45px] items-start justify-start p-0 relative shrink-0">
                    {/* Search Icon */}
                    <div className="relative shrink-0 size-6">
                      <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                    </div>
                    {/* Notification Icon */}
                    <div className="relative shrink-0 size-6">
                      <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
                    </div>
                  </div>
                  {/* User Profile */}
                  <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} box-border content-stretch flex items-center justify-between pl-[7px] pr-[15px] py-1.5 relative rounded-[100px] shrink-0 w-[200px] md:w-[215px] transition-colors duration-300`}>
                    <div className="box-border content-stretch flex gap-3 items-center justify-start p-0 relative shrink-0">
                      <div className="relative shrink-0 size-9">
                        <img alt="Profile" className="block max-w-none size-full" height="36" src={avatarIcon} width="36" />
                      </div>
                      <div className={`font-['Kumbh_Sans'] font-semibold leading-[0] relative shrink-0 text-nowrap text-[14px] ${
                        isDarkMode ? 'text-white' : 'text-[#1b212d]'
                      }`}>
                        <p className="block leading-[normal] whitespace-pre">Mahfuzul Nabil</p>
                      </div>
                    </div>
                    <div className="relative shrink-0 size-[17px]">
                      <img alt="Dropdown" className="block max-w-none size-full" src={dropdownIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Details Section - From Figma */}
          <div className="px-4 md:px-6 lg:px-10 pb-6">
            <div className="w-full max-w-[1110px] mx-auto flex justify-end">
              <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-[19px] items-start justify-start pb-[25px] pt-5 px-[25px] relative rounded-[10px] size-full border border-neutral-100 w-full sm:w-[400px]">
                <div className="box-border content-stretch flex items-center justify-between p-0 relative shrink-0 w-[325px]">
                  <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#1b212d] text-[16px] text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Client Details</p>
                  </div>
                  <div className="relative shrink-0 size-[26px]">
                    <img alt="More" className="block max-w-none size-full" src={moreIcon} />
                  </div>
                </div>
                
                <div className="box-border content-stretch flex gap-[15px] items-center justify-start p-0 relative shrink-0">
                  <div className="relative shrink-0 size-14">
                    <img alt="Client Avatar" className="block max-w-none size-full" height="56" src={sajibPng} width="56" />
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-nowrap">
                    <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#1b212d]">
                      <p className="block leading-[normal] text-nowrap whitespace-pre">Sajib Rahman</p>
                    </div>
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae]">
                      <p className="block leading-[normal] text-nowrap whitespace-pre">rahmansajib@uihut.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="h-0 relative shrink-0 w-full sm:w-80">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <img alt="Divider" className="block max-w-none size-full" src={dividerIcon} />
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0">
                  <div className="box-border content-stretch flex gap-[5px] items-center justify-start p-0 relative shrink-0">
                    <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#1b212d] text-[16px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">UIHUT Agency LTD</p>
                    </div>
                    <div className="relative shrink-0 size-4">
                      <img alt="Verified" className="block max-w-none size-full" src={verifyIcon} />
                    </div>
                  </div>
                  <div className="font-['Kumbh_Sans:Regular',_'Noto_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#929eae] text-[16px] text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">3471 Rainy Day Drive Tulsa, USA</p>
                  </div>
                </div>
                
                <div className="bg-[#eefef2] box-border content-stretch flex gap-2.5 items-center justify-center pb-4 pt-[15px] px-5 relative rounded-[10px] shrink-0 w-full sm:w-[318px] cursor-pointer hover:bg-[#e0f7e6] transition-colors">
                  <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Add Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info Section - From Figma */}
          <div className="px-4 md:px-6 lg:px-10 pb-6">
            <div className="w-full max-w-[1110px] mx-auto flex justify-end">
              <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-5 items-start justify-center p-[25px] relative rounded-[10px] size-full border border-neutral-100 w-full sm:w-[400px]">
                <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#1b212d] text-[18px] text-nowrap">
                  <p className="block leading-[normal] whitespace-pre">Basic Info</p>
                </div>
                <div className="box-border content-stretch flex flex-col gap-[30px] items-start justify-start p-0 relative shrink-0">
                  {/* Invoice Date */}
                  <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start leading-[0] p-0 relative shrink-0">
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae] text-[14px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Invoice Date</p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] bg-[#ffffff] h-12 ml-0 mt-0 relative rounded-xl w-full max-w-[325px]">
                        <div className="absolute border border-neutral-100 border-solid inset-0 pointer-events-none rounded-xl" />
                      </div>
                      <div className="[grid-area:1_/_1] font-['Kumbh_Sans:Medium',_sans-serif] font-medium leading-[0] ml-[21px] mt-[15px] relative text-[#1b212d] text-[14px] w-[166.6px]">
                        <p className="block leading-[normal]">14 Apr 2022</p>
                      </div>
                      <div className="[grid-area:1_/_1] ml-[281px] mt-3 relative size-6">
                        <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                      </div>
                    </div>
                  </div>
                  {/* Due Date */}
                  <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start leading-[0] p-0 relative shrink-0">
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae] text-[14px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Due Date</p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] bg-[#ffffff] h-12 ml-0 mt-0 relative rounded-xl w-full max-w-[325px]">
                        <div className="absolute border border-neutral-100 border-solid inset-0 pointer-events-none rounded-xl" />
                      </div>
                      <div className="[grid-area:1_/_1] font-['Kumbh_Sans:Medium',_sans-serif] font-medium leading-[0] ml-[21px] mt-[15px] relative text-[#1b212d] text-[14px] w-[166.6px]">
                        <p className="block leading-[normal]">20 Apr 2022</p>
                      </div>
                      <div className="[grid-area:1_/_1] ml-[281px] mt-3 relative size-6">
                        <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
                  <div className="bg-[#c8ee44] box-border content-stretch flex gap-2.5 items-center justify-center px-5 py-3.5 relative rounded-[10px] shrink-0 w-full sm:w-[325px] cursor-pointer">
                    <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#1b212d] text-[16px] text-center text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Send Invoice</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex gap-5 items-start justify-start p-0 relative shrink-0">
                    <div className="bg-[#f8f8f8] box-border content-stretch flex gap-2.5 h-12 items-center justify-center pl-[35px] pr-[34px] py-3.5 relative rounded-[10px] shrink-0 cursor-pointer">
                      <div className="relative shrink-0 size-5">
                        <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                      </div>
                      <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-center text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">Preview</p>
                      </div>
                    </div>
                    <div className="bg-[#f8f8f8] box-border content-stretch flex gap-2.5 h-12 items-center justify-center pl-[27px] pr-7 py-3.5 relative rounded-[10px] shrink-0 cursor-pointer">
                      <div className="relative shrink-0 size-5">
                        <img alt="Download" className="block max-w-none size-full" src={downloadIcon} />
                      </div>
                      <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-center text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">Download</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info Card Section - From Figma */}
          <div className="px-4 md:px-6 lg:px-10 pb-6">
            <div className="w-full max-w-[1110px] mx-auto">
              <div className="relative w-[400px] h-[200px]">
                <div className="absolute bg-[#1b212d] inset-0 rounded-[10px]" />
                <div className="absolute inset-0">
                  <img alt="Mask group" className="block max-w-none size-full" src={maskGroup} />
                </div>
                <div className="absolute box-border content-stretch flex gap-[230px] inset-[17.24%_2.96%_21.55%_2.96%] items-start justify-start p-0">
                  <div className="box-border content-stretch flex gap-[15px] items-center justify-start p-0 relative shrink-0">
                    <div className="relative shrink-0 size-[37px]">
                      <img alt="Company Logo" className="block max-w-none size-full" height="37" src={logoMainSmall} width="37" />
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-0.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-nowrap">
                      <div className="font-['Gordita:Bold',_sans-serif] not-italic relative shrink-0 text-[18px]">
                        <p className="block leading-[normal] text-nowrap whitespace-pre">Maglo</p>
                      </div>
                      <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[14px]">
                        <p className="block leading-[normal] text-nowrap whitespace-pre">sales@maglo.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-col font-['Kumbh_Sans:Medium',_sans-serif] font-medium gap-2.5 items-end justify-center leading-[0] p-0 relative shrink-0 text-[#ffffff] text-[14px] text-nowrap text-right">
                    <div className="relative shrink-0">
                      <p className="block leading-[normal] text-nowrap whitespace-pre">1333 Grey Fox Farm Road</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="block leading-[normal] text-nowrap whitespace-pre">Houston, TX 77060</p>
                    </div>
                    <div className="relative shrink-0">
                      <p className="block leading-[normal] text-nowrap whitespace-pre">Bloomfield Hills, Michigan(MI), 48301</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewInvoice