import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import searchIcon from '../assets/icons/search.1 1.svg'
import notificationIcon from '../assets/icons/notification-bing.5 1.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import logoMain from '../assets/icons/logo-main.svg'
// Import local transaction icons
import appleIcon from '../assets/icons/citi.png' // Using citi.png for Apple (closest match)
import netflixIcon from '../assets/icons/netflix.png'
import figmaIcon from '../assets/icons/figma.png'
import bitcoinIcon from '../assets/icons/bitcoin.png'
import sajibIcon from '../assets/icons/sajib.png'
import uiHutIcon from '../assets/icons/UIHUT.png'
import instagramIcon from '../assets/icons/instagram.png'
import cityBankIcon from '../assets/icons/citi.png'
// Import profile avatar
import profileAvatar from '../assets/icons/Ellipse 2.svg'
import { getNavigationWithActiveState } from '../config/navigation'

const Transactions = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Get navigation items with proper active state
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState(location.pathname)

  const transactions = [
    {
      id: 'MGL0124877',
      name: 'Iphone 13 Pro MAX',
      business: 'Apple. Inc',
      avatar: appleIcon,
      type: 'Mobile',
      amount: '$420.84',
      isNegative: false,
      date: '14 Apr 2022',
      time: 'at 8:00 PM'
    },
    {
      id: 'MGL0124585',
      name: 'Netflix Subscription',
      business: 'Netflix',
      avatar: netflixIcon,
      type: 'Entertainment',
      amount: '$100.00',
      isNegative: false,
      date: '05 Apr 2022',
      time: 'at 7:00 PM'
    },
    {
      id: 'MGL0124124',
      name: 'Figma Subscription',
      business: 'Figma. Inc',
      avatar: figmaIcon,
      type: 'Software',
      amount: '$244.20',
      isNegative: false,
      date: '02 Apr 2022',
      time: 'at 10:00 PM'
    },
    {
      id: 'MGL0128544',
      name: 'Bitcoin Transaction',
      business: 'Coinbase',
      avatar: bitcoinIcon,
      type: 'Technology',
      amount: '$520.84',
      isNegative: true,
      date: '02 Apr 2022',
      time: 'at 6:00 AM'
    },
    {
      id: 'MGL0122143',
      name: 'Sajib Rahman',
      business: 'Appsumo',
      avatar: sajibIcon,
      type: 'Withdraw',
      amount: '$500.10',
      isNegative: false,
      date: '30 Mar 2022',
      time: 'at 9:00 PM'
    },
    {
      id: 'MGL0124244',
      name: 'UIHUT Subscription',
      business: 'UIHUT',
      avatar: uiHutIcon,
      type: 'Payment',
      amount: '$84.00',
      isNegative: true,
      date: '24 Mar 2022',
      time: 'at 8:00 PM'
    },
    {
      id: 'MGL0124877',
      name: 'Instagram Ads',
      business: 'Meta',
      avatar: instagramIcon,
      type: 'Entertainment',
      amount: '$100.00',
      isNegative: false,
      date: '20 Mar 2022',
      time: 'at 9:00 PM'
    },
    {
      id: 'MGL0127749',
      name: 'Citi Bank Ltd.',
      business: 'City Bank',
      avatar: cityBankIcon,
      type: 'Withdraw',
      amount: '$400.11',
      isNegative: false,
      date: '10 Mar 2022',
      time: 'at 7:00 AM'
    }
  ]

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full max-w-[1110px] mx-auto">
                             <h1 className={`font-['Kumbh_Sans'] font-semibold text-[20px] sm:text-[22px] lg:text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                 Transactions
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
                       <img alt="Profile" className="block max-w-none size-full rounded-full" src={profileAvatar} />
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

                     {/* Search Bar - Dynamic Theme */}
           <div className="px-4 md:px-6 lg:px-10 mb-6">
             <div className="w-full max-w-[1110px] mx-auto">
               <div className={`${isDarkMode ? 'bg-[#282541] border-[#201e34]' : 'bg-[#f8f8f8] border-neutral-100'} rounded-[15px] border flex items-center gap-[15px] px-[15px] py-3 transition-colors duration-300`}>
                                 <div className="w-6 h-6">
                  <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                </div>
                 <input
                   type="text"
                   placeholder="Search anything on Transactions"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className={`flex-1 bg-transparent font-['Kumbh_Sans'] font-normal text-[14px] ${isDarkMode ? 'text-[#78778b] placeholder-[#78778b]' : 'text-[#929eae] placeholder-[#929eae]'} outline-none`}
                 />
               </div>
             </div>
           </div>

                                           {/* Table Headers - Hidden on mobile and tablet */}
            <div className="px-4 md:px-6 lg:px-10 mb-4">
              <div className="w-full max-w-[1110px] mx-auto">
                <div className={`hidden lg:flex font-['Kumbh_Sans'] font-semibold text-[#78778b] text-[12px] uppercase tracking-wide py-4 px-4 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#201e34]' : 'bg-gray-50'}`}>
                  <div className="w-[237px] pl-4">NAME/BUSINESS</div>
                  <div className="w-[123px] text-center">TYPE</div>
                  <div className="w-[148px] text-center">AMOUNT</div>
                  <div className="w-[148px] text-center">DATE</div>
                  <div className="w-[158px] text-center">INVOICE ID</div>
                  <div className="w-[100px] text-center">ACTION</div>
                </div>
              </div>
            </div>

          {/* Transactions List */}
          <div className="px-4 md:px-6 lg:px-10">
            <div className="w-full max-w-[1110px] mx-auto">
              <div className="flex flex-col gap-5">
                                 {filteredTransactions.map((transaction, index) => (
                   <div key={index} className={`border-b pb-5 last:border-b-0 transition-colors duration-200 ${isDarkMode ? 'border-[#201e34] hover:bg-[#282541]' : 'border-neutral-100 hover:bg-gray-50'}`}>
                    {/* Mobile/Tablet Layout */}
                    <div className="lg:hidden">
                      <div className="flex flex-col gap-4">
                        {/* Transaction Info Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[15px]">
                            <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
                              <img alt={transaction.name} className="block max-w-none size-full object-cover" src={transaction.avatar} />
                            </div>
                                                         <div className="flex flex-col">
                               <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                 {transaction.name}
                               </span>
                               <span className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#78778b]">
                                 {transaction.business}
                               </span>
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                               {transaction.type}
                             </span>
                             <button className="bg-[#c8ee44] hover:bg-[#b8de34] text-[#1b212d] font-['Kumbh_Sans'] font-semibold text-[14px] px-5 py-2.5 rounded transition-colors duration-200">
                               View
                             </button>
                           </div>
                         </div>

                         {/* Details Row */}
                         <div className="grid grid-cols-2 gap-4 pl-[55px]">
                           <div>
                             <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                               {transaction.isNegative ? `- ${transaction.amount}` : transaction.amount}
                             </div>
                             <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                               {transaction.date}
                             </div>
                           </div>
                           <div>
                             <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                               {transaction.id}
                             </div>
                             <div className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#78778b]">
                               {transaction.time}
                             </div>
                           </div>
                         </div>
                      </div>
                    </div>

                                         {/* Desktop Layout */}
                     <div className="hidden lg:flex lg:items-center w-full py-4">
                       {/* Name and Business */}
                       <div className="flex items-center gap-3.5 w-[237px] pl-4">
                         <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
                           <img alt={transaction.name} className="block max-w-none size-full object-cover" src={transaction.avatar} />
                         </div>
                         <div className="flex flex-col">
                           <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                             {transaction.name}
                           </span>
                           <span className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#78778b]">
                             {transaction.business}
                           </span>
                         </div>
                       </div>

                       {/* Type */}
                       <div className="w-[123px] text-center px-4">
                         <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                           {transaction.type}
                         </div>
                       </div>

                       {/* Amount */}
                       <div className="w-[148px] text-center px-4">
                         <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                           {transaction.isNegative ? `- ${transaction.amount}` : transaction.amount}
                         </div>
                       </div>

                       {/* Date */}
                       <div className="w-[148px] text-center px-4">
                         <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                           {transaction.date}
                         </div>
                         <div className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#78778b]">
                           {transaction.time}
                         </div>
                       </div>

                       {/* Invoice ID */}
                       <div className="w-[158px] text-center px-4">
                         <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                           {transaction.id}
                         </div>
                       </div>

                       {/* Action */}
                       <div className="w-[100px] text-center px-4">
                         <button className="bg-[#c8ee44] hover:bg-[#b8de34] text-[#1b212d] font-['Kumbh_Sans'] font-semibold text-[14px] px-5 py-2.5 rounded transition-colors duration-200">
                           View
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

export default Transactions
