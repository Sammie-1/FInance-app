import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import SessionStatusIndicator from '../components/ui/SessionStatusIndicator'
import SessionWarningModal from '../components/ui/SessionWarningModal'
import { getNavigationWithActiveState } from '../config/navigation'
import { Card } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"
 

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

// Sample Data for Working Capital Chart
const chartData = [
  { date: "Apr 14", income: 5000, expenses: 5200 },
  { date: "Apr 15", income: 7000, expenses: 4800 },
  { date: "Apr 16", income: 5500, expenses: 7200 },
  { date: "Apr 17", income: 5500, expenses: 7600 }, // Highlighted point
  { date: "Apr 18", income: 3000, expenses: 5000 },
  { date: "Apr 19", income: 4800, expenses: 4200 },
  { date: "Apr 20", income: 4200, expenses: 4600 },
];

// WorkingCapitalChart Component with Dark Mode Support
const WorkingCapitalChart = ({ isDarkMode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);

  // Custom tooltip for styled popup
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-lg border bg-white border-gray-200 text-gray-800 shadow-lg shadow-xl">
          <div className="font-bold mb-2 text-gray-800">
            {label}
          </div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get the data point for Apr 17 (index 3)
  const apr17Data = chartData[3];
  const apr17Income = apr17Data.income;
  const apr17Expenses = apr17Data.expenses;

  // Calculate positions for Apr 17 dots
  const chartWidth = 300;
  const chartHeight = 300;
  const margin = { top: 20, right: 30, left: 20, bottom: 40 };
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;
  
  // Apr 17 is at index 3, so x position is 3/6 * plotWidth + margin.left
  const apr17X = (3 / 6) * plotWidth + margin.left;
  const incomeY = margin.top + (1 - apr17Income / 8000) * plotHeight;
  const expensesY = margin.top + (1 - apr17Expenses / 8000) * plotHeight;

  return (
    <Card 
      elevation={0}
      sx={{
        backgroundColor: isDarkMode ? '#1e1c30' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#201e34' : '#e5e7eb'}`,
        borderRadius: '10px',
        padding: { xs: '16px', sm: '20px', lg: '24px' },
        width: '100%',
        height: { xs: '280px', sm: '320px', lg: '348px' },
        minHeight: { xs: '280px', sm: '320px', lg: '348px' }
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={chartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          onMouseMove={(data) => {
            if (data && data.activeTooltipIndex !== undefined) {
              setIsHovering(true);
              setHoveredData(data);
            }
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoveredData(null);
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke={isDarkMode ? '#201e34' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="date" 
            tick={{ 
              fill: isDarkMode ? '#929eae' : '#6b7280',
              fontSize: 12,
              fontFamily: 'Kumbh Sans'
            }}
            axisLine={{ stroke: isDarkMode ? '#201e34' : '#e5e7eb' }}
            position="bottom"
          />
          <YAxis 
            tickFormatter={(value) => `${value / 1000}K`}
            tick={{ 
              fill: isDarkMode ? '#929eae' : '#6b7280',
              fontSize: 12,
              fontFamily: 'Kumbh Sans'
            }}
            axisLine={{ stroke: isDarkMode ? '#201e34' : '#e5e7eb' }}
          />
          
                     {/* Interactive tooltip when hovering */}
           <Tooltip 
             content={<CustomTooltip />}
             active={isHovering}
           />

          {/* Reference line at Apr 17 */}
          <ReferenceLine
            x="Apr 17"
            stroke="#ccc"
            strokeDasharray="3 3"
          />

          {/* Income line */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#00b894"
            strokeWidth={3}
            name="Income"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#00b894",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
          />

          {/* Expenses line */}
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#fdcb6e"
            strokeWidth={3}
            name="Expenses"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#fdcb6e",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
          />

          {/* Custom active dots that stick at Apr 17 when not hovering */}
          {!isHovering && (
            <g>
              {/* Income dot at Apr 17 */}
              <circle
                cx={apr17X}
                cy={incomeY}
                r={6}
                fill="#00b894"
                stroke="#ffffff"
                strokeWidth={2}
              />
              
              {/* Expenses dot at Apr 17 */}
              <circle
                cx={apr17X}
                cy={expensesY}
                r={6}
                fill="#fdcb6e"
                stroke="#ffffff"
                strokeWidth={2}
              />
            </g>
          )}

          {/* Sticky tooltip at Apr 17 when not hovering */}
          {!isHovering && (
            <g>
              {/* Tooltip background */}
              <rect
                x={apr17X - 60}
                y={Math.min(incomeY, expensesY) - 80}
                width={120}
                height={60}
                fill="white"
                stroke="#e5e7eb"
                strokeWidth={1}
                rx={8}
                ry={8}
              />
              
              {/* Tooltip text */}
              <text
                x={apr17X}
                y={Math.min(incomeY, expensesY) - 65}
                textAnchor="middle"
                fill="#6b7280"
                fontSize="12"
                fontFamily="Kumbh Sans"
                fontWeight="bold"
              >
                Apr 17
              </text>
              
              <text
                x={apr17X}
                y={Math.min(incomeY, expensesY) - 50}
                textAnchor="middle"
                fill="#00b894"
                fontSize="11"
                fontFamily="Kumbh Sans"
              >
                Income: ${apr17Income.toLocaleString()}
              </text>
              
              <text
                x={apr17X}
                y={Math.min(incomeY, expensesY) - 35}
                textAnchor="middle"
                fill="#fdcb6e"
                fontSize="11"
                fontFamily="Kumbh Sans"
              >
                Expenses: ${apr17Expenses.toLocaleString()}
              </text>
            </g>
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

// Import card icons
import mastercardIcon from '../assets/icons/mastercard.svg'
import groupIcon from '../assets/icons/Group.svg'
import visaIcon from '../assets/icons/visa.svg'
import historyIcon from '../assets/icons/history.svg'

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
    <div className="relative mx-auto w-full max-w-[354px]">
      {/* Top (dark) card */}
      <div 
        className="relative z-[1] rounded-2xl border border-white/10 shadow-xl text-white overflow-hidden w-full"
        style={{
          background: 'linear-gradient(135deg, #4A4A49 0%, #20201F 100%)',
          borderRadius: '15px',
          height: '180px',
          minHeight: '180px'
        }}
      >
        {/* Bank label (top-left) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-bold text-sm sm:text-base lg:text-lg leading-none">Maglo.</span>
            <span className="text-xs opacity-60 leading-none hidden sm:inline"> | Universal Bank</span>
          </div>
        </div>

        {/* Chip icon */}
        <img
          src={groupIcon}
          alt="Card chip"
          className="absolute top-12 sm:top-14 left-4 sm:left-6 w-8 h-6 sm:w-10 sm:h-8"
        />

        {/* Visa Icon */}
        <img
          src={visaIcon}
          alt="Visa Icon"
          className="absolute top-12 sm:top-14 right-3 sm:right-5 w-12 h-6 sm:w-15 sm:h-8"
        />

        {/* Card number */}
        <div className="absolute left-4 sm:left-6 bottom-8 sm:bottom-10">
          <span className="text-sm sm:text-base lg:text-lg font-semibold tracking-widest">5495 7381 3759 2321</span>
        </div>
        
        {/* Network logo */}
        <div className="absolute right-4 sm:right-6 bottom-3 sm:bottom-4">
          <img src={mastercardIcon} alt="Mastercard" className="w-8 h-6 sm:w-10 sm:h-7 lg:w-12 lg:h-9" />
        </div>
      </div>
      
      {/* Transparent overlay card (second card) */}
      <div className="absolute z-[2] overflow-hidden top-[150px] sm:top-[100px] left-4 sm:left-5 right-4 sm:right-auto">
        <div className="w-full sm:w-80 h-36 sm:h-44 relative max-w-[320px] sm:max-w-none">
          <div className="w-full h-full left-0 top-0 absolute opacity-10 bg-gradient-to-b from-neutral-400 to-lime-900 rounded-2xl" />
          <div className="w-full h-full left-0 top-0 absolute bg-gradient-to-b from-white/40 to-white/10 rounded-2xl border-[0.50px] border-white/40 backdrop-blur-[5px]" />
          <img src={historyIcon} alt="Badge" className="absolute right-4 bottom-2 w-6 h-6 sm:w-8 sm:h-8" />
          <div className="left-4 sm:left-[20px] top-3 sm:top-[15px] absolute text-white text-sm sm:text-base font-bold font-['Gordita']">Maglo.</div>
          <div className="left-16 sm:left-[95px] top-3 sm:top-[18px] absolute text-neutral-100 text-xs font-medium font-['Gordita'] hidden sm:block">Commercial Bank</div>
          <div className="w-px h-4 sm:h-5 left-14 sm:left-[86px] top-3 sm:top-[17px] absolute bg-neutral-100 hidden sm:block" />
          <img src={groupIcon} alt="Chip" className="absolute left-4 sm:left-[20px] top-10 sm:top-[51px] w-8 h-6 sm:w-10 sm:h-8" />
          <img
            src={visaIcon}
            alt="Visa Icon"
            className="absolute top-10 sm:top-[55px] right-4 sm:right-[20px] w-12 h-6 sm:w-15 sm:h-8"
          />
          <div className="left-4 sm:left-[20px] bottom-8 sm:bottom-[63px] absolute text-gray-800 text-sm sm:text-base font-bold font-['Gordita'] tracking-wider">85952548****</div>
          <div className="left-4 sm:left-[20px] bottom-4 sm:bottom-[35px] absolute text-gray-400 text-xs font-medium font-['Gordita'] tracking-tight">09/25</div>
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
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(location.pathname)
  const [isNavigating, setIsNavigating] = useState(false)

  // Ensure the page background covers the entire viewport in both themes
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#1c1a2e' : '#ffffff'
    document.body.style.minHeight = '100vh'
    document.documentElement.style.backgroundColor = isDarkMode ? '#1c1a2e' : '#ffffff'
    document.documentElement.style.minHeight = '100vh'
    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.minHeight = ''
      document.documentElement.style.backgroundColor = ''
      document.documentElement.style.minHeight = ''
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

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/signin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div 
      className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} relative w-full min-h-screen ${
        isNavigating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ 
        backgroundColor: isDarkMode ? '#1c1a2e' : '#ffffff',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
      }}
    >
      {/* Session Management Components */}
      <SessionStatusIndicator />
      <SessionWarningModal />
      
      {/* Immediate background coverage - covers entire viewport and beyond */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ 
          backgroundColor: isDarkMode ? '#1c1a2e' : '#ffffff',
          minHeight: '100vh',
          height: '100%'
        }}
      ></div>
      
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1e1c30] rounded-2xl p-4 sm:p-8 shadow-2xl flex flex-col items-center gap-4 mx-4">
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-[#29a073]/20 border-t-[#29a073] rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-8 h-8 sm:w-12 sm:h-12 border-4 border-transparent border-r-[#c8ee44] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <span className="font-['Kumbh_Sans'] font-medium text-[#1b212d] dark:text-white text-sm sm:text-base">Navigating...</span>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg ${isDarkMode ? 'bg-[#29a073] hover:bg-[#24a06a]' : 'bg-[#29a073] hover:bg-[#24a06a]'} text-white transition-colors duration-200 shadow-lg`}
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed z-40 w-[280px] sm:w-[300px] lg:w-[250px] inset-y-0 left-0 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isDarkMode ? 'bg-[#1e1c30]' : 'bg-neutral-50'} flex flex-col transition-colors duration-300 overflow-y-auto shadow-xl lg:shadow-none`}>
                     {/* Logo */}
           <div className="flex items-center gap-3 px-[25px] pt-[30px] pb-10">
             <div className="w-[30px] h-[30px]">
             <img 
               alt="Maglo Logo" 
               className="block max-w-none size-full" 
               src={logoIcon} 
               style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }}
             />
             </div>
             <div className={`font-['Gordita'] font-bold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
               Maglo.
             </div>
           </div>

        {/* Navigation */}
          <div className="flex flex-col h-full px-4 sm:px-[25px]">
            <div className="flex flex-col gap-1 pt-0">
              {topSidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`group relative flex items-center gap-3 pl-3 sm:pl-[15px] pr-4 sm:pr-[81px] py-4 sm:py-3.5 rounded-lg cursor-pointer transition-all duration-300 ease-out w-full sm:w-[220px] touch-manipulation ${
                    item.active
                      ? 'bg-[#c8ee44] transform scale-[1.02] shadow-lg'
                      : isDarkMode
                        ? 'hover:bg-[#282541] active:bg-[#282541] hover:transform hover:scale-[1.02] hover:shadow-md'
                        : 'hover:bg-gray-100 active:bg-gray-200 hover:transform hover:scale-[1.02] hover:shadow-md'
                  }`}
                >
                  {/* Active indicator line */}
                  {item.active && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#1b212d] rounded-r-full animate-pulse" />
                  )}
                  
                  {/* Icon with enhanced animations */}
                  <div className={`relative w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 transition-all duration-300 ${
                    item.active ? 'transform rotate-12 scale-110' : 'group-hover:rotate-6 group-hover:scale-110'
                  }`}>
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  
                  {/* Text with enhanced animations */}
                  <span className={`font-['Kumbh_Sans'] text-sm sm:text-[14px] whitespace-nowrap transition-all duration-300 flex-1 ${
                    item.active 
                      ? 'font-semibold text-[#1b212d] transform translate-x-1' 
                      : 'font-medium text-[#929eae] group-hover:translate-x-1'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    item.active 
                      ? 'bg-gradient-to-r from-[#c8ee44]/20 to-transparent' 
                      : 'group-hover:bg-gradient-to-r group-hover:from-white/5 group-hover:to-transparent'
                  }`} />
                </div>
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-col gap-1 mt-auto pb-6 sm:pb-8">
              {bottomSidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => item.label === 'Logout' ? handleLogout() : handleNavigation(item.path)}
                  className={`group relative flex items-center gap-3 pl-3 sm:pl-[15px] pr-4 sm:pr-[81px] py-4 sm:py-3.5 rounded-lg cursor-pointer transition-all duration-300 ease-out w-full sm:w-[220px] touch-manipulation ${
                    isDarkMode ? 'hover:bg-[#282541] active:bg-[#282541] hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]' : 'hover:bg-gray-100 active:bg-gray-200 hover:transform hover:scale-[1.02] hover:shadow-md text-[#929eae]'
                  }`}
                >
                  {/* Icon with enhanced animations */}
                  <div className={`w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                    <img alt={item.label} className="block max-w-none size-full" src={item.icon} />
                  </div>
                  
                  {/* Text with enhanced animations */}
                  <span className="font-['Kumbh_Sans'] font-medium text-sm sm:text-[14px] whitespace-nowrap transition-all duration-300 group-hover:translate-x-1 flex-1">{item.label}</span>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white/5 group-hover:to-transparent`} />
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:pl-[290px] lg:pr-8 xl:pr-12 pt-4 sm:pt-6 lg:pt-[30px] pb-4">
        <div className="flex items-center">
          {/* Page Title */}
          <div className={`font-['Kumbh_Sans'] font-semibold text-lg sm:text-xl lg:text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} ml-16 lg:ml-0`}>
            Dashboard
          </div>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-[45px]">
          {/* Search and Notifications - Hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-[45px]">
            <button className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 hover:opacity-100 transition-opacity" aria-label="Search">
              <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
            </button>
            <button className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 hover:opacity-100 transition-opacity" aria-label="Notifications">
              <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
            </button>
          </div>
          
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
          
          {/* Profile Section */}
          <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} flex items-center justify-between pl-2 sm:pl-[7px] pr-3 sm:pr-[15px] py-1.5 rounded-full transition-colors duration-300 min-w-0`}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex-shrink-0">
                <img alt="Profile" className="block max-w-none size-full rounded-full" src={profileIcon} />
              </div>
              <span className={`font-['Kumbh_Sans'] font-semibold text-xs sm:text-sm lg:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} truncate hidden sm:block`}>
                {currentUser?.displayName || 'Mahfuzul Nabil'}
              </span>
            </div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-[17px] lg:h-[17px] flex-shrink-0 hidden sm:block">
              <img alt="Dropdown" className="block max-w-none size-full" src={dropdownIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`px-4 sm:px-6 lg:pl-[290px] lg:pr-8 xl:pr-12 pb-6 sm:pb-10 ${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-transparent'} animate-fade-in-up`}>
        {/* KPI Cards */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-[25px] mb-6 sm:mb-8 lg:mb-[30px] w-full max-w-[716px]">
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
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-[30px]">
          {/* Left Column - Chart and Recent Transactions */}
          <div className="flex-1 xl:basis-2/3 space-y-6 lg:space-y-[30px] min-w-0">
            {/* Working Capital Chart */}
            <div className="w-full">
              {/* Header Section with Legend and Time Range Selector */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-base sm:text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Working Capital
                </h3>
                
                {/* Right side with Legend Items and Time Range Selector */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  {/* Legend Items */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Income Legend */}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#00b894]"></div>
                      <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                      }`}>
                        Income
                      </span>
                    </div>
                    
                    {/* Expenses Legend */}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#fdcb6e]"></div>
                      <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                      }`}>
                        Expenses
                      </span>
                    </div>
                  </div>
                  
                  {/* Time Range Selector */}
                  <div className={`px-3 py-1.5 rounded-[5px] text-xs font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2 ${
                    isDarkMode ? 'bg-[#201e34] text-white hover:bg-[#282541]' : 'bg-stone-50 text-gray-800 hover:bg-gray-100'
                  }`}>
                    <span>Last 7 days</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Chart Container */}
              <WorkingCapitalChart isDarkMode={isDarkMode} />
            </div>

              {/* Recent Transactions */}
              <div className={`w-full ${isDarkMode ? 'bg-[#1e1c30]' : 'bg-white'} rounded-[10px] outline outline-1 outline-offset-[-1px] ${isDarkMode ? 'outline-[#201e34]' : 'outline-neutral-100'} p-4 sm:p-6`}>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className={`text-base sm:text-lg font-semibold font-['Kumbh_Sans'] transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>Recent Transaction</div>
                  <button className="flex items-center gap-1.5 text-teal-600 hover:text-teal-700 transition-colors">
                    <span className="text-xs sm:text-sm font-semibold font-['Kumbh_Sans']">View All</span>
                    <img src={viewAllIcon} alt="View All" className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                
                {/* Desktop Table Headers - Hidden on mobile */}
                <div className="hidden lg:flex items-center mb-4 px-4">
                  <div className={`w-[45%] text-xs font-semibold font-['Kumbh_Sans'] transition-colors duration-300 ${
                    isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                  }`}>NAME/BUSINESS</div>
                  <div className={`w-[18%] text-xs font-semibold font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                    isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                  }`}>TYPE</div>
                  <div className={`w-[18%] text-xs font-semibold font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                    isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                  }`}>AMOUNT</div>
                  <div className={`w-[19%] text-xs font-semibold font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                    isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                  }`}>DATE</div>
                </div>
                
                {/* Transaction List */}
                <div className="space-y-0">
                  {/* Transaction 1 */}
                  <div className={`border-b transition-colors duration-300 ${
                    isDarkMode ? 'border-[#201e34]' : 'border-gray-100'
                  }`}>
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center py-4 px-4">
                      <div className="w-[45%] flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors duration-300 ${
                          isDarkMode ? 'bg-[#201e34]' : 'bg-sky-100'
                        }`}>
                          <img className="w-10 h-10" src={iphoneIcon} alt="iPhone" />
                        </div>
                        <div>
                          <div className={`text-sm font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>Iphone 13 Pro MAX</div>
                          <div className={`text-xs font-normal font-['Kumbh_Sans'] transition-colors duration-300 ${
                            isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                          }`}>Apple. Inc</div>
                        </div>
                      </div>
                      <div className={`w-[18%] text-sm font-medium font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                      }`}>Mobile</div>
                      <div className={`w-[18%] text-sm font-semibold font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>$420.84</div>
                      <div className={`w-[19%] text-sm font-medium font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                      }`}>14 Apr 2022</div>
                    </div>
                    
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${
                          isDarkMode ? 'bg-[#201e34]' : 'bg-sky-100'
                        }`}>
                          <img className="w-10 h-10" src={iphoneIcon} alt="iPhone" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className={`text-sm font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                              }`}>Iphone 13 Pro MAX</div>
                              <div className={`text-xs font-normal font-['Kumbh_Sans'] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                              }`}>Apple. Inc</div>
                            </div>
                            <div className={`text-sm font-semibold font-['Kumbh_Sans'] transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>$420.84</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium font-['Kumbh_Sans'] px-2 py-1 rounded transition-colors duration-300 ${
                              isDarkMode ? 'bg-[#201e34] text-[#929eae]' : 'bg-gray-100 text-gray-600'
                            }`}>Mobile</span>
                            <span className={`text-xs font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                              isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                            }`}>14 Apr 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction 2 */}
                  <div className={`border-b transition-colors duration-300 ${
                    isDarkMode ? 'border-[#201e34]' : 'border-gray-100'
                  }`}>
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center py-4 px-4">
                      <div className="w-[45%] flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors duration-300 ${
                          isDarkMode ? 'bg-[#201e34]' : 'bg-gray-100'
                        }`}>
                          <img className="w-10 h-10" src={netflixIcon} alt="Netflix" />
                        </div>
                        <div>
                          <div className={`text-sm font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>Netflix Subscription</div>
                          <div className={`text-xs font-normal font-['Kumbh_Sans'] transition-colors duration-300 ${
                            isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                          }`}>Netflix</div>
                        </div>
                      </div>
                      <div className={`w-[18%] text-sm font-medium font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                      }`}>Entertainment</div>
                      <div className={`w-[18%] text-sm font-semibold font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>$100.00</div>
                      <div className={`w-[19%] text-sm font-medium font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                      }`}>05 Apr 2022</div>
                    </div>
                    
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${
                          isDarkMode ? 'bg-[#201e34]' : 'bg-gray-100'
                        }`}>
                          <img className="w-10 h-10" src={netflixIcon} alt="Netflix" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className={`text-sm font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                              }`}>Netflix Subscription</div>
                              <div className={`text-xs font-normal font-['Kumbh_Sans'] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                              }`}>Netflix</div>
                            </div>
                            <div className={`text-sm font-semibold font-['Kumbh_Sans'] transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>$100.00</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium font-['Kumbh_Sans'] px-2 py-1 rounded transition-colors duration-300 ${
                              isDarkMode ? 'bg-[#201e34] text-[#929eae]' : 'bg-gray-100 text-gray-600'
                            }`}>Entertainment</span>
                            <span className={`text-xs font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                              isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                            }`}>05 Apr 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction 3 */}
                  <div>
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center py-4 px-4">
                      <div className="w-[45%] flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors duration-300 ${
                          isDarkMode ? 'bg-[#201e34]' : 'bg-gray-100'
                        }`}>
                          <img className="w-10 h-10" src={figmaIcon} alt="Figma" />
                        </div>
                        <div>
                          <div className={`text-sm font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>Figma Subscription</div>
                          <div className={`text-xs font-normal font-['Kumbh_Sans'] transition-colors duration-300 ${
                            isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                          }`}>Figma. Inc</div>
                        </div>
                      </div>
                      <div className={`w-[18%] text-sm font-medium font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                      }`}>Software</div>
                      <div className={`w-[18%] text-sm font-semibold font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>$244.20</div>
                      <div className={`w-[19%] text-sm font-medium font-['Kumbh_Sans'] text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                      }`}>02 Apr 2022</div>
                    </div>
                    
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors duration-300 flex-shrink-0 ${
                          isDarkMode ? 'bg-[#201e34]' : 'bg-gray-100'
                        }`}>
                          <img className="w-10 h-10" src={figmaIcon} alt="Figma" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className={`text-sm font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                              }`}>Figma Subscription</div>
                              <div className={`text-xs font-normal font-['Kumbh_Sans'] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                              }`}>Figma. Inc</div>
                            </div>
                            <div className={`text-sm font-semibold font-['Kumbh_Sans'] transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>$244.20</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium font-['Kumbh_Sans'] px-2 py-1 rounded transition-colors duration-300 ${
                              isDarkMode ? 'bg-[#201e34] text-[#929eae]' : 'bg-gray-100 text-gray-600'
                            }`}>Software</span>
                            <span className={`text-xs font-medium font-['Kumbh_Sans'] transition-colors duration-300 ${
                              isDarkMode ? 'text-[#929eae]' : 'text-gray-400'
                            }`}>02 Apr 2022</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          
          {/* Right Column - Wallet and Scheduled Transfers */}
          <div><div className={`w-full xl:w-[354px] space-y-6 lg:space-y-[30px] xl:-mt-[120px] ${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-transparent'} ${isDarkMode ? 'p-4 sm:p-6' : ''} rounded-lg`}>
            {/* Wallet Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-base sm:text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  Wallet
                </h3>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#282541] rounded transition-colors" aria-label="History">
                  <img src={historyIcon} alt="history Icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              </div>
              {/* WalletCards Component */}
              <div className="flex justify-center xl:justify-start">
                <WalletCards />
              </div>
            </div>

            
           
            {/* Scheduled Transfers */}
            <div className="mt-20 xl:mt-24">
              <div className="flex items-center justify-between mb-4 sm:mb-6 xl:mt-[150px]">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-base sm:text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  Scheduled Transfers
                </h3>
                <button className="flex items-center gap-1.5 text-[#29a073] hover:text-[#24a06a] transition-colors">
                  <span className="font-['Kumbh_Sans'] font-semibold text-xs sm:text-[14px]">View All</span>
                </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: 'Saleh Ahmed', date: 'April 28, 2022 at 11:00', amount: '- $435,00', avatar: salehAhmedAvatar },
                  { name: 'Delowar Hossain', date: 'April 25, 2022 at 11:00', amount: '- $132,00', avatar: delowarHossainAvatar },
                  { name: 'Moinul Hasan Nayem', date: 'April 25, 2022 at 11:00', amount: '- $826,00', avatar: moinulHasanAvatar },
                  { name: 'Dr. Jubed Ahmed', date: 'April 16, 2022 at 11:00', amount: '- $435,00', avatar: drJubedAhmedAvatar },
                  { name: 'AR. Jakir Alp', date: 'April 14, 2022 at 11:00', amount: '- $228,00', avatar: arJakirAlpAvatar }
                ].map((transfer, index) => (
                  <div key={index} className={`flex items-center justify-between py-3 border-b ${isDarkMode ? 'border-[#282541]' : 'border-neutral-100'} last:border-b-0`}>
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <img alt={transfer.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0" src={transfer.avatar} />
                      <div className="min-w-0 flex-1">
                        <div className={`font-['Kumbh_Sans'] font-semibold text-xs sm:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} truncate`}>
                          {transfer.name}
                        </div>
                        <div className="font-['Kumbh_Sans'] font-medium text-[10px] sm:text-[12px] text-[#929eae] truncate">
                          {transfer.date}
                        </div>
                      </div>
                    </div>
                    <div className={`font-['Kumbh_Sans'] font-semibold text-sm sm:text-[16px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} flex-shrink-0 ml-2`}>
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