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


// Import Figma generated assets from centralized asset management
import {
  transactionIcons,
  userAvatars,
  kpiIcons,
  uiIcons
} from '../assets/figma-assets'
// import ellipseBackgroundIcon from '../assets/icons/Ellipse 2.svg'

// WalletCards Component
const WalletCards = () => {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 354 }}>
      {/* Top (dark) card */}
      <div className="relative z-30 rounded-2xl bg-gradient-to-br from-neutral-700 via-neutral-900 to-black border border-white/10 shadow-xl p-6 h-52 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Maglo.</span>
            <span className="text-xs opacity-60">Universal Bank</span>
          </div>
          <div className="w-7 h-7 bg-white/20 rounded-full"></div>
        </div>

        <div className="w-10 h-8 bg-white/20 rounded mt-6"></div>

        <div className="mt-4 text-lg tracking-widest font-semibold whitespace-nowrap overflow-hidden">
          5495 7381 3759 2321
        </div>
      </div>

      {/* Frosted mini overlay */}
      <div className="absolute z-40 left-2 right-2 top-[172px] h-20 rounded-xl backdrop-blur-md bg-white/30 border border-white/30 shadow-md px-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2 text-white">
          <span className="font-bold">Maglo.</span>
          <span className="text-xs opacity-75">Commercial Bank</span>
        </div>
        <div className="h-7 w-11 bg-white/60 rounded"></div>
      </div>

      {/* Bottom (light) card */}
      <div className="relative z-20 mt-[-40px] rounded-xl bg-gray-100 border border-gray-200 shadow-inner shadow-gray-300 p-5 h-40 text-gray-800">
        <div className="flex justify-between items-center">
          <div className="font-bold text-gray-600">••••••••</div>
          <div className="w-7 h-7 bg-white/40 rounded-full"></div>
        </div>

        <div className="w-10 h-8 bg-gray-300 rounded mt-6"></div>

        <div className="mt-3 text-lg tracking-widest font-semibold text-gray-800">
          85952548****
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="text-xs text-gray-500 tracking-wider">09/25</div>
          <div className="h-6 w-8 bg-blue-600 rounded"></div>
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

              {/* Chart Visualization */}
              <div className={`${isDarkMode ? 'bg-[#282541]' : 'bg-[#f2f6fc]'} rounded-xl h-[214px] relative overflow-hidden`}>
                {/* Chart Container - Mimicking Flutter structure */}
                <div className="absolute inset-0 p-6">
                  {/* Chart Data Lines Container - 588px width equivalent */}
                  <div className="w-full h-full flex items-end justify-between relative">
                    {/* 7 Chart Lines - Each representing a day with income/expense data */}
                    {[
                      { income: '60%', expense: '40%', date: 'Apr 14' },
                      { income: '75%', expense: '35%', date: 'Apr 15' },
                      { income: '45%', expense: '50%', date: 'Apr 16' },
                      { income: '85%', expense: '30%', date: 'Apr 17', isHighlighted: true },
                      { income: '55%', expense: '45%', date: 'Apr 18' },
                      { income: '70%', expense: '35%', date: 'Apr 19' },
                      { income: '50%', expense: '40%', date: 'Apr 20' }
                    ].map((dataPoint, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col items-center justify-end h-full"
                        style={{ 
                          width: '24px', // Equivalent to Flutter's 164px rotated to vertical
                          transform: dataPoint.isHighlighted ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {/* Income Line (Green) */}
                        <div
                          className="w-1 rounded-t-sm transition-all duration-500 ease-in-out"
                          style={{
                            height: dataPoint.income,
                            backgroundColor: '#29a073',
                            boxShadow: dataPoint.isHighlighted ? '0 0 8px #29a073' : 'none',
                            marginBottom: '2px'
                          }}
                        />
                        
                        {/* Expense Line (Red) */}
                        <div
                          className="w-1 rounded-b-sm transition-all duration-500 ease-in-out"
                          style={{
                            height: dataPoint.expense,
                            backgroundColor: '#e5363d',
                            opacity: 0.8
                          }}
                        />
                        
                        {/* Data Point Indicators */}
                        <div className="absolute -bottom-2 flex flex-col items-center gap-1">
                          {/* Income Indicator */}
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: '#29a073',
                              boxShadow: dataPoint.isHighlighted ? '0 0 4px #29a073' : 'none'
                            }}
                          />
                          {/* Expense Indicator */}
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#e5363d' }}
                          />
                  </div>
                   
                        {/* Value Tooltip for highlighted point */}
                        {dataPoint.isHighlighted && (
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#282541]' : 'bg-white border-gray-200'} px-3 py-2 rounded-lg shadow-lg border`}>
                              <div className="text-center">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-2 h-2 rounded-full bg-[#29a073]"></div>
                                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                    $5,500
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#e5363d]"></div>
                                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                    $2,100
                                  </span>
                                </div>
                              </div>
                              {/* Tooltip Arrow */}
                              <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${isDarkMode ? 'border-t-[#1e1c30]' : 'border-t-white'}`}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  </div>
                   
                  {/* Y-axis Labels */}
                <div className={`absolute left-2 top-6 bottom-12 flex flex-col justify-between text-[12px] font-['Kumbh_Sans'] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                    <span>10K</span>
                    <span>7K</span>
                    <span>5K</span>
                    <span>3K</span>
                    <span>0K</span>
                  </div>
                   
                  {/* X-axis Labels */}
                <div className={`absolute bottom-2 left-6 right-6 flex justify-between text-[12px] font-['Kumbh_Sans'] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                    <span>Apr 14</span>
                    <span>Apr 15</span>
                    <span>Apr 16</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>Apr 17</span>
                    <span>Apr 18</span>
                    <span>Apr 19</span>
                    <span>Apr 20</span>
                  </div>
                </div>
              </div>

            {/* Recent Transactions */}
            <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} border rounded-[10px] p-6 transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                    Recent Transaction
                  </h3>
                                <button className="flex items-center gap-1.5 text-[#29a073]">
                    <span className="font-['Kumbh_Sans'] font-semibold text-[14px]">View All</span>
                  <img alt="Arrow" className="w-[18px] h-[18px]" src={uiIcons.expandMore} />
                  </button>
                </div>
                
              {/* Transaction List */}
                <div className="space-y-4">
                  {[
                  { name: 'Iphone 13 Pro MAX', business: 'Apple. Inc', type: 'Mobile', amount: '$420.84', date: '14 Apr 2022', icon: transactionIcons.iphone },
                  { name: 'Netflix Subscription', business: 'Netflix', type: 'Entertainment', amount: '$100.00', date: '05 Apr 2022', icon: transactionIcons.netflix },
                  { name: 'Figma Subscription', business: 'Figma. Inc', type: 'Software', amount: '$244.20', date: '02 Apr 2022', icon: transactionIcons.figma }
                  ].map((transaction, index) => (
                  <div key={index} className={`flex items-center justify-between py-3 border-b ${isDarkMode ? 'border-[#282541]' : 'border-neutral-100'} last:border-b-0`}>
                          <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-[5px] ${isDarkMode ? 'bg-[#282541]' : 'bg-[#e4f1ff]'} flex items-center justify-center`}>
                        <img alt={transaction.business} className="w-8 h-8 object-cover rounded" src={transaction.icon} />
                            </div>
                            <div>
                              <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                {transaction.name}
                              </div>
                        <div className="font-['Kumbh_Sans'] text-[12px] text-[#929eae]">
                                {transaction.business}
                              </div>
                            </div>
                          </div>
                    <div className="text-center">
                      <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#929eae]">
                        {transaction.type}
                        </div>
                        </div>
                    <div className="text-center">
                      <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {transaction.amount}
                      </div>
                        </div>
                    <div className="text-center">
                      <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#929eae]">
                            {transaction.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Wallet and Scheduled Transfers */}
          <div className={`w-[354px] space-y-[30px] ${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-transparent'} ${isDarkMode ? 'p-6' : ''} rounded-lg`}>
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
            <div>
              <div className="flex items-center justify-between mb-6">
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
  )
}

export default Dashboard


