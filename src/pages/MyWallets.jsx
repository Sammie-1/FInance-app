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
import payoneerPng from '../assets/icons/payoneer.png'
import remitlyPng from '../assets/icons/remitly.png'
import wisePng from '../assets/icons/wise.png'
import paypalPng from '../assets/icons/paypal.png'
import mastercardIcon from '../assets/icons/mastercard.svg'
import visaIcon from '../assets/icons/visa.svg'

// Import card icons for WalletCards component
import groupIcon from '../assets/icons/Group.svg'
import vectorIcon from '../assets/icons/Vector.svg'

// WalletCards Component - Imported from Dashboard
const WalletCards = () => {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 354 }}>
      {/* Top (dark) card */}
      <div 
        className="relative z-[1] rounded-2xl border border-white/10 shadow-xl text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4A4A49 0%, #20201F 100%)',
          borderRadius: '15px',
          width: '354px',
          height: '210px'
        }}
      >
        {/* Bank label (top-left) */}
        <div className="absolute" style={{ top: '16px', left: '16px' }}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg leading-none">Maglo.</span>
            <span className="text-xs opacity-60 leading-none"> | Universal Bank</span>
          </div>
        </div>

        {/* Chip icon */}
        <img
          src={groupIcon}
          alt="Card chip"
          className="absolute"
          style={{ top: '68px', left: '24px', width: '40px', height: '32px' }}
        />

        {/* Visa Icon */}
        <img
          src={visaIcon}
          alt="Visa Icon"
          className="absolute"
          style={{ top: '68px', right: '20px', width: '60px', height: '32px' }}
        />

        {/* Card number */}
        <div>
          <div className="absolute font-semibold tracking-widest whitespace-nowrap overflow-hidden" style={{ left: '24px', top: '124px' }}>
          <span className="text-lg">5495 7381 3759 2321</span>
        </div>
         {/* Network logo */}
         <div className="absolute" style={{ right: '24px', bottom: '16px' }}>
           <img src={mastercardIcon} alt="Mastercard" className="w-12 h-9" />
       </div>
        </div>
      </div>
       {/* Transparent overlay card (second card) */}
       <div className="absolute z-[2] overflow-hidden" style={{ top: '158px', left: '20px' }}>
         <div className="w-80 h-44 relative">
           <div className="w-80 h-44 left-0 top-0 absolute opacity-10 bg-gradient-to-b from-neutral-400 to-lime-900 rounded-2xl" />
           <div className="w-80 h-44 left-0 top-0 absolute bg-gradient-to-b from-white/40 to-white/10 rounded-2xl border-[0.50px] border-white/40 backdrop-blur-[5px]" />
           <img src={vectorIcon} alt="Badge" className="absolute" style={{ left: '272px', top: '126px', width: '32px', height: '32px' }} />
           <div className="left-[20px] top-[15px] absolute justify-start text-white text-base font-bold font-['Gordita']">Maglo.</div>
           <div className="left-[95px] top-[18px] absolute justify-start text-neutral-100 text-xs font-medium font-['Gordita']">Commercial Bank</div>
           <div className="w-px h-5 left-[86px] top-[17px] absolute bg-neutral-100" />
           <img src={groupIcon} alt="Chip" className="absolute" style={{ left: '20px', top: '51px', width: '40px', height: '32px' }} />
           <div>
             <img
               src={visaIcon}
               alt="Visa Icon"
               className="absolute"
               style={{ top: '55px', right: '20px', width: '60px', height: '32px' }}
             />
           </div>
           <div className="left-[20px] top-[107px] absolute justify-start text-gray-800 text-base font-bold font-['Gordita'] tracking-wider">85952548****</div>
           <div className="left-[20px] top-[135px] absolute justify-start text-gray-400 text-xs font-medium font-['Gordita'] tracking-tight">09/25</div>
       </div>
       </div>
   </div>
 );
};

const MyWallets = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [isNavigating, setIsNavigating] = useState(false)

  // Inject custom CSS animations
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = customStyles
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

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
      logo: payoneerPng, // Using available asset as placeholder
      date: '20 Apr 2022, 06:55 PM',
      amount: '$400.00',
      type: 'upcoming'
    },
    {
      id: 2,
      name: 'LinkedIn Ads',
      logo: remitlyPng, // Using available asset as placeholder
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
                  onClick={() => handleNavigation(item.path)}
                  className={`group relative flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out w-[220px] ${
                    item.active 
                      ? 'bg-[#c8ee44] transform scale-[1.02] shadow-lg' 
                      : isDarkMode 
                        ? 'hover:bg-[#282541] hover:transform hover:scale-[1.02] hover:shadow-md' 
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
                  </div>
                  
                  {/* Text with enhanced animations */}
                  <span className={`font-['Kumbh_Sans'] text-[14px] whitespace-nowrap transition-all duration-500 ${
                    item.active 
                      ? 'font-semibold text-[#929eae] transform translate-x-1' 
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
                  className={`group relative flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out w-[220px] ${
                    isDarkMode 
                      ? 'hover:bg-[#282541] hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]' 
                      : 'hover:bg-gray-100 hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]'
                  }`}
                >
                  {/* Icon with enhanced animations */}
                  <div className={`w-5 h-5 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  
                  {/* Text with enhanced animations */}
                  <span className="font-['Kumbh_Sans'] font-medium text-[14px] whitespace-nowrap transition-all duration-500 group-hover:translate-x-1">{item.label}</span>
                  
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
                
                                 {/* Left Column - Credit Cards and Balance Modal Container */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Main Container for Credit Cards and Balance Modal */}
                  <div className="space-y-6 max-w-[354px] mx-auto lg:mx-0">
                    
                    {/* Credit Cards Section - Independent Entity */}
                    <div className="space-y-4">
                      {/* WalletCards Component */}
                      <WalletCards />
                    </div>

                    {/* Balance Modal Section - Independent Entity */}
                    <div className="space-y-4">
                      {/* Balance Card */}
                      <div className={`${isDarkMode ? 'bg-[#201e34] border-[#282541]' : 'bg-neutral-50 border-neutral-100'} rounded-[10px] mt-[150px] border p-6 transition-colors duration-300 w-full max-w-[354px]`}>
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
                      
                      {/* Add New Card Button - Now positioned under the Balance Modal */}
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
