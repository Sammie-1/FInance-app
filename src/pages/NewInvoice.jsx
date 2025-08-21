import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const invoiceState = location?.state || {}
  const invoiceId = invoiceState.invoiceId || 'MGL524874'
  const clientName = invoiceState.clientName || 'Sajib Rahman'
  const clientEmail = invoiceState.clientEmail || 'rahmansajib@uihut.com'
  const companyName = invoiceState.companyName || 'UIHUT Agency LTD'
  const companyAddress = invoiceState.companyAddress || '3471 Rainy Day Drive Tulsa, USA'
  const invoiceDate = invoiceState.invoiceDate || '14 Apr 2022'
  const dueDate = invoiceState.dueDate || '20 Apr 2022'
  
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

        {/* Dark Mode Toggle */}
        <div className="fixed top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 z-50">
          <DarkModeToggle />
        </div>

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
                <div className={`font-['Kumbh_Sans'] font-semibold leading-[0] relative shrink-0 text-nowrap text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  <p className="block leading-[normal] whitespace-pre">New Invoices: {invoiceId}</p>
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

          {/* Main Content Area - Two Column Layout */}
          <div className="px-4 md:px-6 lg:px-10 pb-6">
            <div className="w-full max-w-[1110px] mx-auto flex flex-col lg:flex-row gap-6">
              {/* Left Content - Invoice Details */}
              <div className="flex-1">
                {/* Company Header Card - From Figma */}
                <div className="relative w-full h-[100px] mb-6">
                  <div className="absolute bg-[#1b212d] inset-0 rounded-[10px]" />
                  <div className="absolute inset-0">
                    <img alt="Mask group" className="block max-w-none size-full object-cover rounded-[10px]" src={maskGroup} />
                  </div>
                  <div className="absolute flex items-center justify-between inset-[20px_24px] p-0">
                    <div className="flex gap-[15px] items-center">
                      <div className="w-[40px] h-[40px]">
                        <img alt="Company Logo" className="block max-w-none size-full" src={logoMainSmall} />
                      </div>
                      <div className="flex flex-col gap-1 text-[#ffffff]">
                        <div className="font-['Gordita'] font-bold text-[20px]">
                          Maglo
                        </div>
                        <div className="font-['Kumbh_Sans'] font-normal text-[14px]">
                          sales@maglo.com
                        </div>

                      </div>

                    </div>
                    <div className="flex flex-col font-['Kumbh_Sans'] font-medium gap-1 items-end text-[#ffffff] text-[14px] text-right">
                      <div>1333 Grey Fox Farm Road</div>
                      <div>Houston, TX 77060</div>
                      <div>Bloomfield Hills, Michigan(MI), 48301</div>
                    </div>
                  </div>
                </div>

                {/* Invoice Header Section - From Figma */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#f8f9fa] border-neutral-100'} rounded-[10px] border p-6 mb-6`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className={`font-['Kumbh_Sans'] font-semibold text-[16px] mb-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          Invoice Number
                        </h3>
                        <div className={`font-['Kumbh_Sans'] font-medium text-[16px] mb-1 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {invoiceId}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae] mb-1`}>
                          Issued Date: {invoiceDate}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae]`}>
                          Due Date: {dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <h3 className={`font-['Kumbh_Sans'] font-semibold text-[16px] mb-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          Billed to
                        </h3>
                        <div className={`font-['Kumbh_Sans'] font-medium text-[16px] mb-1 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {clientName}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae] mb-1`}>
                          {companyAddress.split(',')[0]}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae]`}>
                          {companyAddress.split(',').slice(1).join(',').trim()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Items Table */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} rounded-[10px] border p-6 mb-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                      Invoice Items
                    </h3>
                    <button className="bg-[#c8ee44] hover:bg-[#b8de34] px-4 py-2 rounded-[8px] font-['Kumbh_Sans'] font-semibold text-[14px] text-[#1b212d]">
                      Add Item
                    </button>
                  </div>
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 mb-4 pb-3 border-b border-neutral-100">
                    <div className="col-span-5">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Description
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Qty
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Rate
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Amount
                      </span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Action
                      </span>
                    </div>
                  </div>
                  
                  {/* Sample Invoice Items */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 items-center py-3">
                      <div className="col-span-5">
                        <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          Website Design
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'} mt-1`}>
                          Complete website redesign and development
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          1
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          $350.00
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          $350.00
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <button className="w-6 h-6 flex items-center justify-center">
                          <img alt="More" className="block max-w-none size-full" src={moreIcon} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4 items-center py-3">
                      <div className="col-span-5">
                        <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          SEO Optimization
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'} mt-1`}>
                          Search engine optimization setup
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          1
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          $70.84
                        </span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          $70.84
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <button className="w-6 h-6 flex items-center justify-center">
                          <img alt="More" className="block max-w-none size-full" src={moreIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Summary */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} rounded-[10px] border p-6`}>
                  <div className="flex justify-end">
                    <div className="w-full max-w-[300px] space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                          Subtotal:
                        </span>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          $420.84
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                          Tax (0%):
                        </span>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          $0.00
                        </span>
                      </div>
                      <div className="border-t border-neutral-100 pt-4">
                        <div className="flex justify-between items-center">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            Total:
                          </span>
                          <span className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            $420.84
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Sidebar - Client Details & Basic Info */}
              <div className="w-full lg:w-[400px] space-y-6">
                {/* Client Details Section */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#ffffff] border-neutral-100'} box-border content-stretch flex flex-col gap-[19px] items-start justify-start pb-[25px] pt-5 px-[25px] relative rounded-[10px] border w-full`}>
                  <div className="box-border content-stretch flex items-center justify-between p-0 relative shrink-0 w-full">
                    <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
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
                      <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        <p className="block leading-[normal] text-nowrap whitespace-pre">{clientName}</p>
                    </div>
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae]">
                        <p className="block leading-[normal] text-nowrap whitespace-pre">{clientEmail}</p>
                    </div>
                  </div>
                </div>
                
                  <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <img alt="Divider" className="block max-w-none size-full" src={dividerIcon} />
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0">
                  <div className="box-border content-stretch flex gap-[5px] items-center justify-start p-0 relative shrink-0">
                      <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        <p className="block leading-[normal] whitespace-pre">{companyName}</p>
                    </div>
                    <div className="relative shrink-0 size-4">
                      <img alt="Verified" className="block max-w-none size-full" src={verifyIcon} />
                    </div>
                  </div>
                  <div className="font-['Kumbh_Sans:Regular',_'Noto_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#929eae] text-[16px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">{companyAddress}</p>
                  </div>
                </div>
                
                  <div className="bg-[#eefef2] box-border content-stretch flex gap-2.5 items-center justify-center pb-4 pt-[15px] px-5 relative rounded-[10px] shrink-0 w-full cursor-pointer hover:bg-[#e0f7e6] transition-colors">
                  <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Add Customer</p>
              </div>
            </div>
          </div>

          {/* Basic Info Section - From Figma */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#ffffff] border-neutral-100'} box-border content-stretch flex flex-col gap-5 items-start justify-center p-[25px] relative rounded-[10px] border w-full`}>
                  <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[18px] text-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  <p className="block leading-[normal] whitespace-pre">Basic Info</p>
                </div>
                <div className="box-border content-stretch flex flex-col gap-[30px] items-start justify-start p-0 relative shrink-0">
                  {/* Invoice Date */}
                  <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start leading-[0] p-0 relative shrink-0">
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae] text-[14px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Invoice Date</p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                        <div className={`[grid-area:1_/_1] ${isDarkMode ? 'bg-[#282541]' : 'bg-[#ffffff]'} h-12 ml-0 mt-0 relative rounded-xl w-full max-w-[325px]`}>
                          <div className={`absolute ${isDarkMode ? 'border-[#201e34]' : 'border-neutral-100'} border border-solid inset-0 pointer-events-none rounded-xl`} />
                      </div>
                        <div className={`[grid-area:1_/_1] font-['Kumbh_Sans:Medium',_sans-serif] font-medium leading-[0] ml-[21px] mt-[15px] relative text-[14px] w-[166.6px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          <p className="block leading-[normal]">{invoiceDate}</p>
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
                        <div className={`[grid-area:1_/_1] ${isDarkMode ? 'bg-[#282541]' : 'bg-[#ffffff]'} h-12 ml-0 mt-0 relative rounded-xl w-full max-w-[325px]`}>
                          <div className={`absolute ${isDarkMode ? 'border-[#201e34]' : 'border-neutral-100'} border border-solid inset-0 pointer-events-none rounded-xl`} />
                      </div>
                        <div className={`[grid-area:1_/_1] font-['Kumbh_Sans:Medium',_sans-serif] font-medium leading-[0] ml-[21px] mt-[15px] relative text-[14px] w-[166.6px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          <p className="block leading-[normal]">{dueDate}</p>
                      </div>
                      <div className="[grid-area:1_/_1] ml-[281px] mt-3 relative size-6">
                        <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
                    <div className="bg-[#c8ee44] box-border content-stretch flex gap-2.5 items-center justify-center px-5 py-3.5 relative rounded-[10px] shrink-0 w-full cursor-pointer">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewInvoice

