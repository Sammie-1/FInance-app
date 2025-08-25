import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import { getNavigationWithActiveState } from '../config/navigation'
 

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



// import ellipseBackgroundIcon from '../assets/icons/Ellipse 2.svg'

// Import card icons
import mastercardIcon from '../assets/icons/mastercard.svg'
import groupIcon from '../assets/icons/Group.svg'
import visaIcon from '../assets/icons/visa.svg'
import vectorIcon from '../assets/icons/Vector.svg'

// Import transaction and business icons
import netflixIcon from '../assets/icons/netflix.png'
import figmaIcon from '../assets/icons/figma.png'
import appleIcon from '../assets/icons/UIHUT.png'
import iphoneIcon from '../assets/e8f2f2325479f5b117fa73a0eecb5f7c8278f3b4.png'
import viewAllIcon from '../assets/icons/view-all-icon.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import searchIcon from '../assets/icons/search.1 1.svg'
import notificationIcon from '../assets/icons/notification.svg'
import profileIcon from '../assets/icons/avatar.svg'
import walletIcon from '../assets/icons/wallet-2.6 1.svg'
import transactionsIcon from '../assets/icons/transactions.svg'
import dashboardIcon from '../assets/icons/dashboard.svg'
import settingsIcon from '../assets/icons/settings.svg'
import helpIcon from '../assets/icons/Help.svg'
import logoIcon from '../assets/icons/logo-main.svg'

// Import KPI icons
import totalBalanceIcon from '../assets/6bffe6399f0ebb560623c61d356f6d080626df00.svg'
import totalSpendingIcon from '../assets/80185a6c24efff9deff15dfd79fdab928f4af172.svg'
import totalSavedIcon from '../assets/15f25a1ccc5d90d472cac437cfeaf4a7b4458140.svg'

// Import user avatars
import salehAhmedAvatar from '../assets/ae42a90e9776d7779e15e4c9cf8efa677998d1cb.png'
import delowarHossainAvatar from '../assets/9d4b98bc2a8cab0e6e6ed99680cd142e76eceab6.png'
import moinulHasanAvatar from '../assets/e20e7c0b7a97f82f634e6dafa92d88d8451b165e.png'
import drJubedAhmedAvatar from '../assets/2318919120a07052f0bddcb4d888b9297f49f35f.png'
import arJakirAlpAvatar from '../assets/4dddccf21648a45dfa4b70cc53a5f5269e5f0b9e.png'

// WalletCards Component
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

// KPI Card Components with Dark Theme Support
const TotalBalanceCard = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#363a3f]'} box-border flex gap-[15px] items-center justify-start px-5 py-6 rounded-[10px] border transition-colors duration-300 w-full h-[90px]`}>
      <div className="relative shrink-0 size-[42px]">
        <img alt="Total Balance Icon" className="block max-w-none size-full" src={totalBalanceIcon} />
      </div>
      <div className="flex flex-col gap-2.5 items-start justify-center flex-1">
        <div className="font-['Kumbh_Sans'] font-normal text-[#929eae] text-[14px]">
          <p className="leading-[normal] whitespace-nowrap">Total balance</p>
        </div>
        <div className={`font-['Kumbh_Sans'] font-bold ${isDarkMode ? 'text-white' : 'text-white'} text-[24px]`}>
          <p className="leading-[normal] whitespace-nowrap">$5240.21</p>
        </div>
      </div>
    </div>
  )
}

const TotalSpendingCard = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#f8f8f8] border-neutral-100'} box-border flex gap-[15px] items-center justify-start px-5 py-6 rounded-[10px] border transition-colors duration-300 w-full h-[90px]`}>
      <div className="relative shrink-0 size-[42px]">
        <img alt="Total Spending Icon" className="block max-w-none size-full" src={totalSpendingIcon} />
      </div>
      <div className="flex flex-col gap-2.5 items-start justify-center flex-1">
        <div className="font-['Kumbh_Sans'] font-normal text-[#929eae] text-[14px]">
          <p className="leading-[normal] whitespace-nowrap">Total spending</p>
        </div>
        <div className={`font-['Kumbh_Sans'] font-bold ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} text-[24px]`}>
          <p className="leading-[normal] whitespace-nowrap">$250.80</p>
        </div>
      </div>
    </div>
  )
}

const TotalSavedCard = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#f8f8f8] border-neutral-100'} box-border flex gap-[15px] items-center justify-start px-5 py-6 rounded-[10px] border transition-colors duration-300 w-full h-[90px]`}>
      <div className="relative shrink-0 size-[42px]">
        <img alt="Total Saved Icon" className="block max-w-none size-full" src={totalSavedIcon} />
      </div>
      <div className="flex flex-col gap-2.5 items-start justify-center flex-1">
        <div className="font-['Kumbh_Sans'] font-normal text-[#929eae] text-[14px]">
          <p className="leading-[normal] whitespace-nowrap">Total saved</p>
        </div>
        <div className={`font-['Kumbh_Sans'] font-bold ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} text-[24px]`}>
          <p className="leading-[normal] whitespace-nowrap">$550.25</p>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(location.pathname)
  const [isNavigating, setIsNavigating] = useState(false)

  // Ensure the page background covers the entire viewport in both themes
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#1c1a2e' : '#ffffff'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [isDarkMode])

  // Inject custom CSS animations
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = customStyles
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState('/dashboard')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNavigation = (path) => {
    if (path && path !== activeTab) {
      setIsNavigating(true)
      setActiveTab(path)
      
      // Add a small delay for smooth animation
      setTimeout(() => {
        navigate(path)
        setIsSidebarOpen(false)
        setIsNavigating(false)
      }, 300)
    }
  }

  return (
    <div 
      className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-[#ffffff]'} relative min-h-screen w-full transition-all duration-800 ease-in-out ${
        isNavigating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dark mode overlay for complete coverage */}
      {isDarkMode && (
        <div className="fixed inset-0 bg-[#1c1a2e] pointer-events-none z-0"></div>
      )}
      
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1e1c30] rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-[#29a073]/20 border-t-[#29a073] rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-[#c8ee44] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <span className="font-['Kumbh_Sans'] font-medium text-[#1b212d] dark:text-white">Navigating...</span>
          </div>
        </div>
      )}
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg ${isDarkMode ? 'bg-[#29a073] hover:bg-[#24a06a]' : 'bg-[#29a073] hover:bg-[#24a06a]'} text-white transition-colors duration-200`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      {/* Dark Mode Toggle moved into top bar for alignment with other pages */}

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
      )}

        {/* Sidebar */}
      <div className={`fixed z-40 w-[250px] h-screen transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isDarkMode ? 'bg-[#1e1c30]' : 'bg-neutral-50'} flex flex-col transition-colors duration-300`}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-[25px] pt-[30px] pb-10">
            <div className="w-[30px] h-[30px]">
            <img alt="Maglo Logo" className="block max-w-none size-full" src={logoIcon} />
            </div>
            <div className={`font-['Gordita'] font-bold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
              Maglo.
            </div>
          </div>

        {/* Navigation */}
          <div className="flex flex-col h-full px-[25px]">
            <div className="flex flex-col gap-0.5 pt-0">
                                                           {topSidebarItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className={`group relative flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out w-[200px] ${
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
                        ? 'font-semibold text-[#1b212d] transform translate-x-1' 
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

            {/* Bottom Navigation */}
            <div className="flex flex-col gap-0.5 mt-auto pb-8">
              {bottomSidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                className={`group relative flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-all duration-500 ease-out w-[200px] ${
                    isDarkMode ? 'hover:bg-[#282541] hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]' : 'hover:bg-gray-100 hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]'
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

      {/* Top Bar */}
      <div className="absolute flex items-center justify-between left-[290px] top-[30px] w-[1110px]">
        <div className={`font-['Kumbh_Sans'] font-semibold text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                Dashboard
        </div>
                <div className="flex items-center gap-[45px]">
          <div className="flex items-center gap-[45px]">
                                 <div className="w-6 h-6">
               <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                 </div>
                 <div className="w-6 h-6">
               <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
             </div>
                </div>
          <DarkModeToggle />
          <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-[215px] transition-colors duration-300`}>
                                     <div className="flex items-center gap-3">
                     <div className="w-9 h-9">
                 <img alt="Profile" className="block max-w-none size-full" src={profileIcon} />
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

            {/* Main Content */}
      <div className={`absolute left-[290px] top-[108px] right-4 ${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-transparent'} ${isDarkMode ? 'p-6' : ''} rounded-lg animate-fade-in-up`}>
        {/* KPI Cards */}
        <div className="flex flex-col sm:flex-row gap-[25px] mb-[30px] w-full max-w-[716px]">
          <div className="flex-1 min-w-0">
            <TotalBalanceCard isDarkMode={isDarkMode} />
          </div>
          <div className="flex-1 min-w-0">
            <TotalSpendingCard isDarkMode={isDarkMode} />
          </div>
          <div className="flex-1 min-w-0">
            <TotalSavedCard isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Chart and Transaction Section */}
        <div className="flex gap-[30px]">
          {/* Left Column - Chart and Recent Transactions */}
          <div className="basis-2/3 space-y-[30px] min-w-0">
              {/* Working Capital Chart */}
              <div data-theme="Off" className="w-[716px] h-72 relative">
                <div className="w-[716px] h-72 left-0 top-0 absolute bg-white rounded-[10px] border border-neutral-100" />
                <div className="w-12 h-40 left-[355px] top-[77px] absolute bg-gradient-to-b from-slate-50/0 to-slate-100 rounded-xl" />
                <div className="left-[71px] top-[77px] absolute inline-flex flex-col justify-center items-center gap-3.5">
                    <div className="w-[588px] inline-flex justify-between items-start">
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                        <div className="w-40 h-0 origin-top-left -rotate-90 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-50"></div>
                    </div>
                    <div className="w-[621px] inline-flex justify-between items-start">
                        <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apr 14</div>
                        <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apr 15</div>
                        <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apr 16</div>
                        <div className="justify-start text-gray-800 text-xs font-semibold font-['Kumbh_Sans']">Apr 17</div>
                        <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apr 18</div>
                        <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apr 19</div>
                        <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apr 20</div>
                    </div>
                </div>
                <div className="w-[617.24px] h-28 left-[71px] top-[103.89px] absolute outline outline-2 outline-offset-[-1px] outline-lime-300" />
                <div className="w-[617.83px] h-28 left-[72.17px] top-[119.38px] absolute outline outline-2 outline-offset-[-1px] outline-teal-600" />
                <div className="left-[351px] top-[77px] absolute inline-flex flex-col justify-center items-center gap-5">
                    <div className="w-14 h-9 bg-slate-100" />
                    <div className="justify-start text-gray-800 text-xs font-medium font-['Kumbh_Sans']">$5,500</div>
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0px_4px_8px_0px_rgba(104,104,104,0.25)]" />
                    <div className="w-2 h-2 bg-indigo-800 rounded-full" />
                </div>
                <div className="left-[25px] top-[70px] absolute inline-flex flex-col justify-start items-start gap-6">
                    <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">10K</div>
                    <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">7K</div>
                    <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">5K</div>
                    <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">3K</div>
                    <div className="justify-start text-gray-400 text-xs font-normal font-['Kumbh_Sans']">0K</div>
                </div>
                <div className="left-[25px] top-[15px] absolute inline-flex justify-start items-center gap-48">
                    <div className="justify-start text-gray-800 text-lg font-semibold font-['Kumbh_Sans']">Working Capital</div>
                    <div className="w-80 flex justify-between items-center">
                        <div className="w-40 flex justify-between items-center">
                            <div className="w-2 h-2 bg-teal-600 rounded-full" />
                            <div className="justify-start text-gray-800 text-xs font-normal font-['Kumbh_Sans']">Income</div>
                            <div className="w-2 h-2 bg-lime-300 rounded-full" />
                            <div className="justify-start text-gray-800 text-xs font-normal font-['Kumbh_Sans']">Expenses</div>
                        </div>
                                                 <div className="w-28 pl-2.5 pr-2 py-1.5 bg-stone-50 rounded-[5px] flex justify-between items-center">
                             <div className="justify-start text-gray-800 text-xs font-normal font-['Kumbh_Sans']">Last 7 days</div>
                             <img src={dropdownIcon} alt="Dropdown" className="w-4 h-4" />
                         </div>
                    </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className={`w-full ${isDarkMode ? 'bg-[#1e1c30]' : 'bg-white'} rounded-[10px] outline outline-1 outline-offset-[-1px] ${isDarkMode ? 'outline-[#201e34]' : 'outline-neutral-100'} p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-800 text-lg font-semibold font-['Kumbh_Sans']">Recent Transaction</div>
                                     <div className="flex items-center gap-1.5">
                     <div className="text-teal-600 text-sm font-semibold font-['Kumbh_Sans']">View All</div>
                     <img src={viewAllIcon} alt="View All" className="w-4 h-4" />
                   </div>
                </div>
                
                                 {/* Table Headers */}
                 <div className="flex items-center mb-4 px-4">
                   <div className="w-[45%] text-gray-400 text-xs font-semibold font-['Kumbh_Sans']">NAME/BUSINESS</div>
                   <div className="w-[18%] text-gray-400 text-xs font-semibold font-['Kumbh_Sans'] text-center">TYPE</div>
                   <div className="w-[18%] text-gray-400 text-xs font-semibold font-['Kumbh_Sans'] text-center">AMOUNT</div>
                   <div className="w-[19%] text-gray-400 text-xs font-semibold font-['Kumbh_Sans'] text-center">DATE</div>
                 </div>
                 
                 {/* Table Rows */}
                 <div className="space-y-0">
                   {/* Transaction 1 */}
                   <div className="flex items-center py-4 px-4 border-b border-gray-100">
                     <div className="w-[45%] flex items-center gap-3">
                       <div className="w-10 h-10 bg-sky-100 rounded-[5px] flex items-center justify-center">
                         <img className="w-10 h-10" src={iphoneIcon} alt="iPhone" />
                       </div>
                       <div>
                         <div className="text-gray-800 text-sm font-medium font-['Kumbh_Sans']">Iphone 13 Pro MAX</div>
                         <div className="text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Apple. Inc</div>
                       </div>
                     </div>
                     <div className="w-[18%] text-gray-400 text-sm font-medium font-['Kumbh_Sans'] text-center">Mobile</div>
                     <div className="w-[18%] text-gray-800 text-sm font-semibold font-['Kumbh_Sans'] text-center">$420.84</div>
                     <div className="w-[19%] text-gray-400 text-sm font-medium font-['Kumbh_Sans'] text-center">14 Apr 2022</div>
                   </div>
                   
                   {/* Transaction 2 */}
                   <div className="flex items-center py-4 px-4 border-b border-gray-100">
                     <div className="w-[45%] flex items-center gap-3">
                       <div className="w-10 h-10 rounded-[5px] flex items-center justify-center">
                         <img className="w-10 h-10" src={netflixIcon} alt="Netflix" />
                       </div>
                       <div>
                         <div className="text-gray-800 text-sm font-medium font-['Kumbh_Sans']">Netflix Subscription</div>
                         <div className="text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Netflix</div>
                       </div>
                     </div>
                     <div className="w-[18%] text-gray-400 text-sm font-medium font-['Kumbh_Sans'] text-center">Entertainment</div>
                     <div className="w-[18%] text-gray-800 text-sm font-semibold font-['Kumbh_Sans'] text-center">$100.00</div>
                     <div className="w-[19%] text-gray-400 text-sm font-medium font-['Kumbh_Sans'] text-center">05 Apr 2022</div>
                   </div>
                   
                   {/* Transaction 3 */}
                   <div className="flex items-center py-4 px-4">
                     <div className="w-[45%] flex items-center gap-3">
                       <div className="w-10 h-10 rounded-[5px] flex items-center justify-center">
                         <img className="w-10 h-10" src={figmaIcon} alt="Figma" />
                       </div>
                       <div>
                         <div className="text-gray-800 text-sm font-medium font-['Kumbh_Sans']">Figma Subscription</div>
                         <div className="text-gray-400 text-xs font-normal font-['Kumbh_Sans']">Figma. Inc</div>
                       </div>
                     </div>
                     <div className="w-[18%] text-gray-400 text-sm font-medium font-['Kumbh_Sans'] text-center">Software</div>
                     <div className="w-[18%] text-gray-800 text-sm font-semibold font-['Kumbh_Sans'] text-center">$244.20</div>
                     <div className="w-[19%] text-gray-400 text-sm font-medium font-['Kumbh_Sans'] text-center">02 Apr 2022</div>
                   </div>
                 </div>
              </div>
          </div>
          
          {/* Right Column - Wallet and Scheduled Transfers */}
          <div className={`w-[354px] space-y-[30px] -mt-[120px] ${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-transparent'} ${isDarkMode ? 'p-6' : ''} rounded-lg`}>
                         {/* Wallet Cards */}
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                   Wallet
                 </h3>
               </div>
               
               {/* WalletCards Component */}
               <WalletCards />
             </div>                      

            {/* Scheduled Transfers */}
            <div className="mt-24">
              <div className="flex items-center justify-between mb-6 mt-[150px]">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  Scheduled Transfers
                </h3>
                <button className="flex items-center gap-1.5 text-[#29a073]">
                  <span className="font-['Kumbh_Sans'] font-semibold text-[14px]">View All</span>
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Saleh Ahmed', date: 'April 28, 2022 at 11:00', amount: '- $435,00', avatar: salehAhmedAvatar },
                  { name: 'Delowar Hossain', date: 'April 25, 2022 at 11:00', amount: '- $132,00', avatar: delowarHossainAvatar },
                  { name: 'Moinul Hasan Nayem', date: 'April 25, 2022 at 11:00', amount: '- $826,00', avatar: moinulHasanAvatar },
                  { name: 'Dr. Jubed Ahmed', date: 'April 16, 2022 at 11:00', amount: '- $435,00', avatar: drJubedAhmedAvatar },
                  { name: 'AR. Jakir Alp', date: 'April 14, 2022 at 11:00', amount: '- $228,00', avatar: arJakirAlpAvatar }
                ].map((transfer, index) => (
                  <div key={index} className={`flex items-center justify-between py-3 border-b ${isDarkMode ? 'border-[#282541]' : 'border-neutral-100'} last:border-b-0`}>
                    <div className="flex items-center gap-3">
                      <img alt={transfer.name} className="w-8 h-8 rounded-full" src={transfer.avatar} />
                      <div>
                        <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {transfer.name}
                        </div>
                        <div className="font-['Kumbh_Sans'] font-medium text-[12px] text-[#929eae]">
                          {transfer.date}
                        </div>
                      </div>
                    </div>
                    <div className={`font-['Kumbh_Sans'] font-semibold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                      {transfer.amount}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default Dashboard


