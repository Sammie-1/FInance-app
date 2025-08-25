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


import {
  transactionIcons,
  userAvatars,
  kpiIcons,
  uiIcons
} from '../assets/figma-assets'
// import ellipseBackgroundIcon from '../assets/icons/Ellipse 2.svg'

// Import card icons
import mastercardIcon from '../assets/icons/mastercard.svg'
import groupIcon from '../assets/icons/Group.svg'
import visaIcon from '../assets/icons/visa.svg'
import vectorIcon from '../assets/icons/Vector.svg'

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
        <img alt="Total Balance Icon" className="block max-w-none size-full" src={kpiIcons.totalBalance} />
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
        <img alt="Total Spending Icon" className="block max-w-none size-full" src={kpiIcons.totalSpending} />
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
        <img alt="Total Saved Icon" className="block max-w-none size-full" src={kpiIcons.totalSaved} />
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
            <img alt="Maglo Logo" className="block max-w-none size-full" src={uiIcons.magloLogo} />
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
              <img alt="Search" className="block max-w-none size-full" src={uiIcons.search} />
                </div>
                <div className="w-6 h-6">
              <img alt="Notifications" className="block max-w-none size-full" src={uiIcons.notification} />
            </div>
                </div>
          <DarkModeToggle />
          <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-[215px] transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                <img alt="Profile" className="block max-w-none size-full" src={userAvatars.profile} />
                    </div>
              <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                      Mahfuzul Nabil
                    </span>
                  </div>
                  <div className="w-[17px] h-[17px]">
                <img alt="Dropdown" className="block max-w-none size-full" src={uiIcons.dropdown} />
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
            <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} border rounded-[10px] p-6 h-[305px] transition-colors duration-300 w-full`}>
              <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                    Working Capital
                  </h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#29a073]"></div>
                        <span className={`font-['Kumbh_Sans'] text-[12px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#e5363d]"></div>
                        <span className={`font-['Kumbh_Sans'] text-[12px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>Expenses</span>
                      </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-[#282541]' : 'bg-[#f8f8f8]'} px-2.5 py-1.5 rounded-[5px] flex items-center gap-2`}>
                      <span className={`font-['Kumbh_Sans'] text-[12px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>Last 7 days</span>
                    <img alt="Dropdown" className="w-[18px] h-[18px]" src={uiIcons.expandMore} />
                  </div>
                </div>
              </div>

              {/* Placeholder for existing layout's chart area */}
              <div className={`${isDarkMode ? 'bg-[#282541]' : 'bg-[#f2f6fc]'} rounded-xl h-[214px] relative overflow-hidden`}>
                {/* Keep existing visual container to preserve layout spacing */}
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
                  { name: 'Saleh Ahmed', date: 'April 28, 2022 at 11:00', amount: '- $435,00', avatar: userAvatars.salehAhmed },
                  { name: 'Delowar Hossain', date: 'April 25, 2022 at 11:00', amount: '- $132,00', avatar: userAvatars.delowarHossain },
                  { name: 'Moinul Hasan Nayem', date: 'April 25, 2022 at 11:00', amount: '- $826,00', avatar: userAvatars.moinulHasan },
                  { name: 'Dr. Jubed Ahmed', date: 'April 16, 2022 at 11:00', amount: '- $435,00', avatar: userAvatars.drJubedAhmed },
                  { name: 'AR. Jakir Alp', date: 'April 14, 2022 at 11:00', amount: '- $228,00', avatar: userAvatars.arJakirAlp }
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


