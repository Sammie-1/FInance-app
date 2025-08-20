import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import { getNavigationWithActiveState } from '../config/navigation'
// Local assets
import logoMain from '../assets/icons/logo-main.svg'
import avatarIcon from '../assets/icons/avatar.svg'
import notificationIcon from '../assets/icons/notification-bing.5 1.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import searchIcon from '../assets/icons/search.1 1.svg'
import plusIcon from '../assets/icons/plus 1.svg'
import upIcon from '../assets/icons/Up.svg'
import downIcon from '../assets/icons/Down.svg'
import internationalIcon from '../assets/icons/International.svg'
import wallets1Icon from '../assets/icons/wallets1.svg'
import wallets2Icon from '../assets/icons/wallets2.svg'
import citiPng from '../assets/icons/citi.png'
import uihutPng from '../assets/icons/UIHUT.png'
import bitcoinPng from '../assets/icons/bitcoin.png'
import netflixPng from '../assets/icons/netflix.png'
import rectangle479Png from '../assets/icons/Rectangle 479.png'
import rectangle480Png from '../assets/icons/Rectangle 480.png'
import payoneerPng from '../assets/icons/payoneer.png'
import remitlyPng from '../assets/icons/remitly.png'
import wisePng from '../assets/icons/wise.png'
import paypalPng from '../assets/icons/paypal.png'
import mastercardIcon from '../assets/icons/mastercard.svg'
import visaIcon from '../assets/icons/Group.svg'

const MyWallets = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Get navigation items with proper active state
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState(location.pathname)

  const allPayments = [
    {
      id: 1,
      name: 'Payoneer',
      logo: payoneerPng,
      date: '20 Apr 2022, 06:55 PM',
      amount: '+ $4800.24',
      type: 'credit'
    },
    {
      id: 2,
      name: 'Remitly',
      logo: remitlyPng,
      date: '18 Apr 2022, 08:58 PM',
      amount: '- $1800.24',
      type: 'debit'
    },
    {
      id: 3,
      name: 'Wise',
      logo: wisePng,
      date: '15 Apr 2022, 02:55 AM',
      amount: '- $24.32',
      type: 'debit'
    },
    {
      id: 4,
      name: 'Paypal',
      logo: paypalPng,
      date: '14 Apr 2022, 07:40 PM',
      amount: '- $400.32',
      type: 'debit'
    }
  ]

  const upcomingPayments = [
    {
      id: 1,
      name: 'Facebook Ads',
      logo: rectangle479Png,
      date: '20 Apr 2022, 06:55 PM',
      amount: '$400.00',
      type: 'upcoming'
    },
    {
      id: 2,
      name: 'LinkedIn Ads',
      logo: rectangle480Png,
      date: '18 Apr 2022, 08:58 PM',
      amount: '$200.50',
      type: 'upcoming'
    }
  ]

  const handleAddNewCard = () => {
    console.log('Add New Card clicked')
    // Add your add new card logic here
  }

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
              <h1 className={`font-['Kumbh_Sans'] font-semibold text-[20px] sm:text-[22px] lg:text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} whitespace-nowrap`}>
                My Wallets
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
                <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-full sm:w-[180px] lg:w-[215px] transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                      <img alt="Profile" className="block max-w-none size-full rounded-full" src={avatarIcon} />
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

          {/* Content Grid */}
          <div className="px-4 md:px-6 lg:px-10">
            <div className="w-full max-w-[1110px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                                 {/* Left Column - Credit Cards */}
                 <div className="lg:col-span-5 space-y-6">
                   {/* Credit Cards */}
                   <div className="space-y-4 max-w-[354px] mx-auto lg:mx-0">
                                         {/* Card 1 - Primary */}
                     <div className="relative h-[210px] w-full max-w-[354px] rounded-[15px] overflow-hidden shadow-xl">
                       <div className="absolute inset-0 bg-gradient-to-br from-[#4A4A49] to-[#20201F]"></div>
                       <div className="relative h-full p-6 flex flex-col justify-between">
                         {/* Top Section */}
                         <div className="flex items-start justify-between">
                           <div className="flex items-center gap-3">
                             <div className="font-['Gordita'] font-bold text-white text-[16px]">
                               Maglo.
                             </div>
                             <div className="w-px h-5 bg-[#626260]"></div>
                             <div className="font-['Gordita'] font-medium text-[#626260] text-[12px]">
                               Universal Bank
                             </div>
                           </div>
                           <div className="w-8 h-8">
                             <img alt="Card Chip" className="block max-w-none size-full" src={wallets1Icon} />
                           </div>
                         </div>
                         
                         {/* Card Number */}
                         <div className="font-['Gordita'] font-bold text-white text-[17px] tracking-[1.7px]">
                           5495 7381 3759 2321
                         </div>
                         
                         {/* Bottom Section */}
                         <div className="flex items-center justify-between">
                           <div className="font-['Gordita'] font-medium text-[#868685] text-[14px] tracking-[0.28px]">
                             04/24
                           </div>
                           <div className="w-[47px] h-9">
                             <img alt="International" className="block max-w-none size-full" src={internationalIcon} />
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Card 2 - Secondary */}
                     <div className="relative h-[172px] w-full max-w-[324px] rounded-[15px] overflow-hidden shadow-lg">
                       <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff66] to-[#ffffff1a] backdrop-blur-[5px]"></div>
                       <div className="absolute inset-0 border-[0.5px] border-white rounded-[15px]"></div>
                       <div className="relative h-full p-6 flex flex-col justify-between">
                         {/* Top Section */}
                         <div className="flex items-start justify-between">
                           <div className="flex items-center gap-3">
                             <div className="font-['Gordita'] font-bold text-white text-[16px]">
                               Maglo.
                             </div>
                             <div className="w-px h-5 bg-neutral-100"></div>
                             <div className="font-['Gordita'] font-medium text-neutral-100 text-[12px]">
                               Commercial Bank
                             </div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="w-[47px] h-[36px]">
                               <img alt="Mastercard" className="block max-w-none size-full" src={mastercardIcon} />
                             </div>
                           </div>
                         </div>
                         
                         {/* Card Number */}
                         <div className="font-['Gordita'] font-bold text-[#1b212d] text-[16px] tracking-[1.6px]">
                           85952548****
                         </div>
                         
                         {/* Bottom Section */}
                         <div className="font-['Gordita'] font-medium text-[#929eae] text-[12px] tracking-[0.24px]">
                           09/25
                         </div>
                         {/* VISA badge */}
                         <div className="absolute bottom-4 right-4 w-[32px] h-[20px]">
                           <img alt="Visa" className="block max-w-none size-full" src={visaIcon} />
                         </div>
                       </div>
                     </div>

                                         {/* Balance Card */}
                     <div className={`${isDarkMode ? 'bg-[#201e34] border-[#282541]' : 'bg-neutral-50 border-neutral-100'} rounded-[10px] border p-6 transition-colors duration-300 w-full max-w-[354px]`}>
                       <div className="space-y-4">
                         {/* Balance Section */}
                         <div className="space-y-2">
                           <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                             Your Balance
                           </div>
                           <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                               <div className={`font-['Kumbh_Sans'] font-semibold text-[20px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                 $5240.<span className="text-[#929eae]">00</span>
                               </div>
                             </div>
                             <div className="flex items-center gap-4">
                               {/* Up Arrow */}
                               <div className="flex items-center gap-1">
                                 <div className="w-4 h-4">
                                   <img alt="Up" className="block max-w-none size-full" src={upIcon} />
                                 </div>
                                 <div className="font-['Kumbh_Sans'] font-medium text-[#19d076] text-[14px]">
                                   23.65%
                                 </div>
                               </div>
                               {/* Down Arrow */}
                               <div className="flex items-center gap-1">
                                 <div className="w-4 h-4 rotate-180">
                                   <img alt="Down" className="block max-w-none size-full" src={downIcon} />
                                 </div>
                                 <div className="font-['Kumbh_Sans'] font-medium text-[#e5363d] text-[14px]">
                                   10.40%
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Divider */}
                         <div className="h-px bg-neutral-100"></div>

                         {/* Bottom Section */}
                         <div className="flex items-center justify-between">
                           <div className="space-y-2">
                             <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                               Currency
                             </div>
                             <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                               USD / US Dollar
                             </div>
                           </div>
                           <div className="space-y-2">
                             <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                               Status
                             </div>
                             <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                               Active
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>

                                         {/* Add New Card Button */}
                     <button 
                       onClick={handleAddNewCard}
                       className={`w-full max-w-[354px] ${isDarkMode ? 'bg-[#282541] border-[#201e34] hover:bg-[#1e1c30]' : 'bg-[#f8f8f8] border-neutral-100 hover:bg-gray-50'} border rounded-[10px] px-5 py-3.5 flex items-center gap-2.5 justify-center transition-colors duration-200`}
                     >
                      <div className="w-5 h-5">
                        <img alt="Plus" className="block max-w-none size-full" src={plusIcon} />
                      </div>
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#29a073]'}`}>
                        Add New Card
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Column - Payments */}
                <div className="lg:col-span-7 space-y-6">
                  {/* My Payments */}
                  <div className="space-y-4">
                    <div className={`font-['Kumbh_Sans'] font-semibold text-[20px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                      My Payments
                    </div>
                    
                    {/* Tabs and Search Row */}
                    <div className="flex items-center justify-between -mb-[3px]">
                      <div className="flex items-center gap-8">
                        <button
                          onClick={() => setActiveTab('all')}
                          className={`font-['Kumbh_Sans'] font-semibold text-[14px] transition-colors duration-200 flex flex-col items-start ${
                            activeTab === 'all' ? (isDarkMode ? 'text-white' : 'text-[#1b212d]') : 'text-[#929eae]'
                          }`}
                        >
                          <span>All Payments</span>
                          <div
                            className={`mt-1 h-[3px] rounded-full w-full origin-left transform transition-transform duration-300 ${
                              activeTab === 'all' ? 'bg-[#29a073] scale-x-100' : 'bg-[#29a073] scale-x-0'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => setActiveTab('regular')}
                          className={`font-['Kumbh_Sans'] font-medium text-[14px] transition-colors duration-200 flex flex-col items-start ${
                            activeTab === 'regular' ? (isDarkMode ? 'text-white' : 'text-[#1b212d]') : 'text-[#929eae]'
                          }`}
                        >
                          <span>Regular Payments</span>
                          <div
                            className={`mt-1 h-[3px] rounded-full w-full origin-left transform transition-transform duration-300 ${
                              activeTab === 'regular' ? 'bg-[#29a073] scale-x-100' : 'bg-[#29a073] scale-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Search */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5">
                          <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                        </div>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                          Search
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-neutral-100"></div>

                    {/* Today's Payments */}
                    <div className="space-y-4">
                      <div className={`font-['Kumbh_Sans'] font-normal text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                        Today
                      </div>
                      
                      <div className="space-y-6">
                        {allPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-[15px]">
                              <div className="w-[43px] h-[43px] rounded-xl overflow-hidden">
                                <img alt={payment.name} className="w-full h-full object-cover" src={payment.logo} />
                              </div>
                              <div className="space-y-[7px]">
                                <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                  {payment.name}
                                </div>
                                <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                                  {payment.date}
                                </div>
                              </div>
                            </div>
                            <div className={`font-['Kumbh_Sans'] font-semibold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              {payment.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Payments */}
                  <div className="space-y-4">
                    <div className={`font-['Kumbh_Sans'] font-semibold text-[20px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                      Upcoming Payments
                    </div>
                    
                    <div className="space-y-4">
                      <div className={`font-['Kumbh_Sans'] font-normal text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                        Next month
                      </div>
                      
                      <div className="space-y-6">
                        {upcomingPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-[15px]">
                              <div className="w-[43px] h-[43px] rounded-xl overflow-hidden">
                                <img alt={payment.name} className="w-full h-full object-cover" src={payment.logo} />
                              </div>
                              <div className="space-y-[7px]">
                                <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                  {payment.name}
                                </div>
                                <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                                  {payment.date}
                                </div>
                              </div>
                            </div>
                            <div className={`font-['Kumbh_Sans'] font-semibold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              {payment.amount}
                            </div>
                          </div>
                        ))}
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

export default MyWallets
