import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import icReceiptIcon from '../assets/icons/ic-receipt-24px 1.svg'
import searchIcon from '../assets/icons/search.1 1.svg'
import notificationIcon from '../assets/icons/notification-bing.5 1.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import moreIcon from '../assets/icons/Vector.svg'
import filterIcon from '../assets/icons/bx-filter 1.svg'
import logoMain from '../assets/icons/logo-main.svg'
import avatarIcon from '../assets/icons/avatar.svg'
import { getNavigationWithActiveState } from '../config/navigation'

// Local images for avatars and UI
import profilePng from '../assets/profile.png'
import figmaPng from '../assets/icons/figma.png'
import uihutPng from '../assets/icons/UIHUT.png'
import citiPng from '../assets/icons/citi.png'
import bitcoinPng from '../assets/icons/bitcoin.png'
import netflixPng from '../assets/icons/netflix.png'
import instagramPng from '../assets/icons/instagram.png'
import sajibPng from '../assets/icons/sajib.png'

const Invoices = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCreateInvoice = () => {
    navigate('/create-invoice')
  }

  // Get navigation items with proper active state
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState(location.pathname)

  const invoices = [
    {
      id: 'MGL524874',
      client: 'Gadget Gallery LTD',
      avatar: profilePng,
      date: '14 Apr 2022',
      time: 'at 8:00 PM',
      orders: '20',
      amount: '$420.84',
      status: 'Pending',
      statusColor: 'bg-[#fff1e5] text-[#f2994a]'
    },
    {
      id: 'MGL524250',
      client: 'Figma Subscription',
      avatar: figmaPng,
      date: '12 Apr 2022',
      time: 'at 8:00 PM',
      orders: '01',
      amount: '$244.80',
      status: 'Paid',
      statusColor: 'bg-[#d9ffe9] text-[#27ae60]'
    },
    {
      id: 'MGL524874',
      client: 'Jack Dawson Eric',
      avatar: instagramPng,
      date: '12 Apr 2022',
      time: 'at 9:00 AM',
      orders: '02',
      amount: '$200.00',
      status: 'Unpaid',
      statusColor: 'bg-[#ffefef] text-[#eb5757]'
    },
    {
      id: 'MGL524140',
      client: 'UIHUT Subscription',
      avatar: uihutPng,
      date: '24 Mar 2022',
      time: 'at 8:00 PM',
      orders: '01',
      amount: '$84.00',
      status: 'Paid',
      statusColor: 'bg-[#d9ffe9] text-[#27ae60]'
    },
    {
      id: 'MGL524245',
      client: 'Citi Bank Ltd.',
      avatar: citiPng,
      date: '10 Mar 2022',
      time: 'at 8:00 PM',
      orders: 'Withdraw',
      amount: '$420.84',
      status: 'Pending',
      statusColor: 'bg-[#fff1e5] text-[#f2994a]'
    },
    {
      id: 'MGL524254',
      client: 'Bitcoin Transaction',
      avatar: bitcoinPng,
      date: '08 Mar 2022',
      time: 'at 8:00 PM',
      orders: 'Technology',
      amount: '$400.11',
      status: 'Pending',
      statusColor: 'bg-[#fff1e5] text-[#f2994a]'
    },
    {
      id: 'MGL524487',
      client: 'Netflix Subscription',
      avatar: netflixPng,
      date: '02 Mar 2022',
      time: 'at 7:00 PM',
      orders: '01',
      amount: '$420.84',
      status: 'Paid',
      statusColor: 'bg-[#d9ffe9] text-[#27ae60]'
    },
    {
      id: 'MGL524598',
      client: 'Sajib Rahman',
      avatar: sajibPng,
      date: '01 Mar 2022',
      time: 'at 8:00 PM',
      orders: 'Withdraw',
      amount: '$500.10',
      status: 'Paid',
      statusColor: 'bg-[#d9ffe9] text-[#27ae60]'
    }
  ]

  const filteredInvoices = invoices.filter(invoice =>
    invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

        {/* Sidebar - Dynamic Theme */}
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
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[200px] ${
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
                  <span className={`font-['Kumbh_Sans'] text-[14px] ${
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
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[200px] ${
                    isDarkMode 
                      ? 'hover:bg-[#282541] text-[#929eae]' 
                      : 'hover:bg-gray-100 text-[#929eae]'
                  }`}
                >
                  <div className="w-5 h-5">
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  <span className="font-['Kumbh_Sans'] font-medium text-[14px]">{item.label}</span>
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
                Invoices
              </h1>
              
              {/* Top Bar */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-[45px]">
                {/* Search Icon */}
                <div className="w-6 h-6">
                  <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                </div>
                
                {/* Notification Icon */}
                <div className="w-6 h-6">
                  <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
                </div>
                
                {/* Dark Mode Toggle */}
                <DarkModeToggle />
                
                {/* User Profile */}
                <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-full sm:w-[180px] lg:w-[215px] transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                      <img alt="Profile" className="block max-w-none size-full rounded-full" src={avatarIcon} />
                    </div>
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] sm:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
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

          {/* Search and Actions Bar */}
          <div className="px-4 md:px-6 lg:px-10 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between w-full max-w-[1110px] mx-auto">
              {/* Search Bar - Dynamic Theme */}
              <div className={`flex-1 max-w-full lg:max-w-[400px] rounded-[15px] border flex items-center gap-[15px] px-[15px] py-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-[#282541] border-[#201e34]' 
                  : 'bg-[#f8f8f8] border-neutral-100'
              }`}>
                                  <div className="w-6 h-6">
                    <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                  </div>
                <input
                  type="text"
                  placeholder="Search invoices"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 bg-transparent font-['Kumbh_Sans'] font-normal text-[14px] ${
                    isDarkMode 
                      ? 'text-[#78778b] placeholder-[#78778b]' 
                      : 'text-[#929eae] placeholder-[#929eae]'
                  } outline-none`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                 {/* Create Invoice Button */}
                 <button 
                   onClick={handleCreateInvoice}
                   className="bg-[#c8ee44] hover:bg-[#b8de34] active:bg-[#a8ce24] text-[#1b212d] font-['Kumbh_Sans'] font-semibold text-[14px] px-5 py-3.5 rounded-[10px] flex items-center gap-2.5 justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#c8ee44] focus:ring-opacity-50 cursor-pointer"
                   aria-label="Create new invoice"
                   title="Create new invoice"
                 >
                   <div className="w-5 h-5">
                     <img alt="Create Invoice" className="block max-w-none size-full" src={icReceiptIcon} />
                   </div>
                   Create Invoice
                 </button>

                {/* Filters Button */}
                <button className={`border font-['Kumbh_Sans'] font-medium text-[14px] px-5 py-3.5 rounded-[10px] flex items-center gap-2.5 justify-center transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-[#201e34] text-white hover:bg-[#282541]' 
                    : 'border-neutral-100 text-[#1b212d] hover:bg-gray-50'
                }`}>
                  <div className="w-5 h-5">
                    <img alt="Filters" className="block max-w-none size-full" src={filterIcon} />
                  </div>
                  Filters
                </button>
              </div>
            </div>
          </div>

                     {/* Table Headers - Hidden on mobile and tablet */}
           <div className="px-4 md:px-6 lg:px-10 mb-4">
             <div className="w-full max-w-[1110px] mx-auto">
               <div className={`hidden lg:flex font-['Kumbh_Sans'] font-semibold text-[#78778b] text-[12px] uppercase tracking-wide py-3 px-4 rounded-lg transition-colors duration-300 ${
                 isDarkMode ? 'bg-[#201e34]' : 'bg-gray-50'
               }`}>
                 <div className="w-[250px] pl-4">NAME/CLIENT</div>
                 <div className="w-[150px] text-center">DATE</div>
                 <div className="w-[150px] text-center">ORDERS/TYPE</div>
                 <div className="w-[150px] text-center">AMOUNT</div>
                 <div className="w-[180px] text-center">STATUS</div>
                 <div className="w-[100px] text-center">ACTION</div>
               </div>
             </div>
           </div>

          {/* Invoices List */}
          <div className="px-4 md:px-6 lg:px-10">
            <div className="w-full max-w-[1110px] mx-auto">
              <div className="flex flex-col gap-5">
                                 {filteredInvoices.map((invoice, index) => (
                   <div key={index} className={`border-b pb-5 last:border-b-0 transition-colors duration-200 ${
                     isDarkMode ? 'border-[#201e34] hover:bg-[#282541]' : 'border-neutral-100 hover:bg-gray-50'
                   }`}>
                    {/* Mobile/Tablet Layout */}
                    <div className="lg:hidden">
                      <div className="flex flex-col gap-4">
                        {/* Client Info Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[15px]">
                            <div className="w-[38px] h-[38px]">
                              <img alt={invoice.client} className="block max-w-none size-full rounded-full" src={invoice.avatar} />
                            </div>
                                                      <div className="flex flex-col">
                            <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              {invoice.client}
                            </span>
                            <span className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#929eae]">
                              Inv: {invoice.id}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`inline-flex px-[15px] py-2 rounded font-['Kumbh_Sans'] font-medium text-[12px] ${invoice.statusColor}`}>
                            {invoice.status}
                          </div>
                          <button className="w-[25px] h-[25px]">
                            <img alt="More" className="block max-w-none size-full" src={moreIcon} />
                          </button>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="grid grid-cols-2 gap-4 pl-[53px]">
                        <div>
                          <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {invoice.date}
                          </div>
                          <div className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#929eae]">
                            {invoice.time}
                          </div>
                        </div>
                        <div>
                          <div className="font-['Kumbh_Sans'] font-semibold text-[14px] text-[#929eae]">
                            {invoice.orders}
                          </div>
                          <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {invoice.amount}
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>

                                         {/* Desktop Layout */}
                     <div className="hidden lg:flex lg:items-center w-full py-4">
                       {/* Client Info */}
                       <div className="flex items-center gap-[15px] w-[250px] pl-4">
                         <div className="w-[38px] h-[38px]">
                           <img alt={invoice.client} className="block max-w-none size-full rounded-full" src={invoice.avatar} />
                         </div>
                         <div className="flex flex-col">
                           <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                             {invoice.client}
                           </span>
                           <span className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#929eae]">
                             Inv: {invoice.id}
                           </span>
                         </div>
                       </div>

                       {/* Date */}
                       <div className="w-[150px] text-center">
                         <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                           {invoice.date}
                         </div>
                         <div className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#929eae]">
                           {invoice.time}
                         </div>
                       </div>

                       {/* Orders/Type */}
                       <div className="w-[150px] text-center">
                         <div className="font-['Kumbh_Sans'] font-semibold text-[14px] text-[#929eae]">
                           {invoice.orders}
                         </div>
                       </div>

                       {/* Amount */}
                       <div className="w-[150px] text-center">
                         <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                           {invoice.amount}
                         </div>
                       </div>

                       {/* Status */}
                       <div className="w-[180px] text-center">
                         <div className={`inline-flex px-[15px] py-2 rounded font-['Kumbh_Sans'] font-medium text-[12px] ${invoice.statusColor}`}>
                           {invoice.status}
                         </div>
                       </div>

                       {/* Action */}
                       <div className="w-[100px] text-center">
                         <button className="w-[25px] h-[25px] mx-auto">
                           <img alt="More" className="block max-w-none size-full" src={moreIcon} />
                         </button>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices
