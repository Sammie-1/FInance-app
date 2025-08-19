import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import { getNavigationWithActiveState } from '../config/navigation'

// Import local logo asset
import logoMain from '../assets/icons/logo-main.svg'
// Import local view all icon
import viewAllIcon from '../assets/icons/view-all-icon.svg'
// Import local KPI icons
import kpiTotalBalanceIcon from '../assets/icons/wallet-2.6 1.svg'
import kpiTotalSpendingIcon from '../assets/icons/wallet-2.6 1.svg'
import kpiTotalSavedIcon from '../assets/icons/wallet-add.12 1.svg'
// Import Ellipse background icon
import ellipseBackgroundIcon from '../assets/icons/Ellipse 2.svg'

// Figma assets (Dev Mode) used elsewhere to keep consistency
const imgEllipse1 = "http://localhost:3845/assets/c78dae655605c90da12d809fdb9be067a20aecd0.png"
const imgNotificationBing51 = "http://localhost:3845/assets/5881a2a5cf37c2b0347b76ba1509c7b110717a06.svg"
const imgDropdown = "http://localhost:3845/assets/836669b9eb423b6909bde68e0fa3b875973bed00.svg"
const imgSearch11 = "http://localhost:3845/assets/82a4510e97cf794f31e8ddbb9f17d223d13e7927.svg"

// Additional Figma assets for Dashboard components
const imgIcon = "http://localhost:3845/assets/6bffe6399f0ebb560623c61d356f6d080626df00.svg"
const imgIcon1 = "http://localhost:3845/assets/80185a6c24efff9deff15dfd79fdab928f4af172.svg"
const imgIcon2 = "http://localhost:3845/assets/15f25a1ccc5d90d472cac437cfeaf4a7b4458140.svg"
const imgIcExpandMore24Px1 = "http://localhost:3845/assets/dd64a06c00881d7d506da3109a857dd1591ee59.svg"
const imgLine12 = "http://localhost:3845/assets/b0f5a94ce96739acde132f8af499dfe7428e0737.svg"
const imgImage8 = "http://localhost:3845/assets/e8f2f2325479f5b117fa73a0eecb5f7c8278f3b4.png"
const imgRectangle461 = "http://localhost:3845/assets/0a07ef549ecd7be85153e06c3f9ff61d0ebfd29e.png"
const imgRectangle462 = "http://localhost:3845/assets/d9d7d4b3c515e34f264e5ae759fc1138ae751e8b.png"
const img9 = "http://localhost:3845/assets/87492a0702f288622e7bf0658d4c314927f86ca7.svg"
const img10 = "http://localhost:3845/assets/fa832922320ab547a86f9f68d338fe37401edb7f.svg"
const img11 = "http://localhost:3845/assets/9ca0264f21ca393f2860972e660765f328a0974f.svg"
const img12 = "http://localhost:3845/assets/ea1bfbfe16d343b6b3b49a5e5932bc9949ac0ce1.svg"
const img13 = "http://localhost:3845/assets/b30e0fc7714e8297da36e61ff66eb63fb002c217.svg"
const img14 = "http://localhost:3845/assets/78ea88939ecee8d4e2a6ee5570e018c6dfafd6dd.svg"
const img15 = "http://localhost:3845/assets/aed11d0741677e69df2f9300ad9c383f089cfd47.svg"

const Dashboard = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState('/dashboard')

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
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

        {/* Sidebar */}
        <div className={`fixed md:relative z-40 w-[250px] h-screen transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isDarkMode ? 'bg-[#1e1c30]' : 'bg-[#fafafa]'} flex flex-col transition-colors duration-300`}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-[25px] pt-[30px] pb-10">
            <div className="w-[30px] h-[30px]">
              {/* Use local logo asset */}
              <img alt="Maglo Logo" className="block max-w-none size-full" src={logoMain} />
            </div>
            <div className={`font-['Gordita'] font-bold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
              Maglo.
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex flex-col h-full px-[25px]">
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
                    item.active ? 'font-semibold text-[#929eae]' : 'font-medium text-[#929eae]'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-col gap-0.5 mt-auto pb-8">
              {bottomSidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 pl-[15px] pr-[81px] py-3.5 rounded-lg cursor-pointer transition-colors w-[220px] ${
                    isDarkMode ? 'hover:bg-[#282541] text-[#929eae]' : 'hover:bg-gray-100 text-[#929eae]'
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
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className="flex-1 w-full md:ml-0">
          {/* Header */}
          <div className="px-4 md:px-6 lg:px-10 py-[30px]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full max-w-[1110px] mx-auto">
              <h1 className={`font-['Kumbh_Sans'] font-semibold text-[20px] sm:text-[22px] lg:text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} whitespace-nowrap`}>
                Dashboard
              </h1>
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-[45px]">
                {/* Search (Dashboard only) */}
                <div className="w-6 h-6">
                  <img alt="Search" className="block max-w-none size-full" src={imgSearch11} />
                </div>
                <div className="w-6 h-6">
                  <img alt="Notifications" className="block max-w-none size-full" src={imgNotificationBing51} />
                </div>
                <DarkModeToggle />
                <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} flex items-center justify-between pl-[7px] pr-[15px] py-1.5 rounded-[100px] w-full sm:w-[180px] lg:w-[215px] transition-colors duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9">
                      <img alt="Profile" className="block max-w-none size-full rounded-full" src={imgEllipse1} />
                    </div>
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] sm:text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'} hidden sm:block`}>
                      Mahfuzul Nabil
                    </span>
                  </div>
                  <div className="w-[17px] h-[17px]">
                    <img alt="Dropdown" className="block max-w-none size-full" src={imgDropdown} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 md:px-6 lg:px-10">
            <div className="w-full max-w-[1110px] mx-auto space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Total Balance', value: '$5,240.21', icon: kpiTotalBalanceIcon },
                  { title: 'Total spending', value: '$250.80', icon: kpiTotalSpendingIcon },
                  { title: 'Total saved', value: '$550.25', icon: kpiTotalSavedIcon }
                ].map((kpi, idx) => {
                  const isPrimary = idx === 0
                  const baseLight = isPrimary ? 'bg-[#363a3f]' : 'bg-[#f8f8f8] border-neutral-100'
                  const baseDark = 'bg-[#201e34] border-[#282541]'
                  return (
                    <div
                      key={idx}
                      className={`${isDarkMode ? baseDark : baseLight} ${isPrimary ? '' : 'border'} rounded-[10px] p-5 transition-colors duration-300`}
                    >
                                             <div className="flex items-center gap-[15px]">
                         <div className="relative w-[42px] h-[42px]">
                           {/* Ellipse background */}
                           <img alt="Background" className="absolute inset-0 w-full h-full" src={ellipseBackgroundIcon} />
                           {/* KPI icon on top */}
                           <img alt={kpi.title} className="relative z-10 w-6 h-6 mx-auto mt-2" src={kpi.icon} />
                         </div>
                        <div>
                          <div className={`font-['Kumbh_Sans'] text-[14px] ${isPrimary ? 'text-[#929eae]' : (isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]')}`}>
                            {kpi.title}
                          </div>
                          <div className={`font-['Kumbh_Sans'] font-bold text-[20px] mt-2 ${isPrimary ? 'text-white' : (isDarkMode ? 'text-white' : 'text-[#1b212d]')}`}>
                            {kpi.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Working Capital Chart */}
              <div className={`${isDarkMode ? 'bg-[#201e34] border-[#282541]' : 'bg-white border-neutral-100'} border rounded-[10px] p-6 transition-colors duration-300`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                    Working Capital
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
                      <img alt="Dropdown" className="w-[18px] h-[18px]" src={img15} />
                    </div>
                  </div>
                </div>
                
                {/* Chart Container */}
                <div className="relative h-[200px] w-full">
                  {/* Chart Background */}
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#282541]' : 'bg-[#f2f6fc]'} rounded-xl`}></div>
                   
                  {/* Chart Lines */}
                  <div className="absolute inset-0 p-6">
                    <img alt="Chart Lines" className="w-full h-full object-contain" src={img9} />
                  </div>
                   
                  {/* Chart Data */}
                  <div className="absolute inset-0 p-6">
                    <img alt="Chart Data" className="w-full h-full object-contain" src={img10} />
                  </div>
                   
                  {/* Y-axis Labels */}
                  <div className={`absolute left-6 top-6 bottom-6 flex flex-col justify-between text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                    <span>10K</span>
                    <span>7K</span>
                    <span>5K</span>
                    <span>3K</span>
                    <span>0K</span>
                  </div>
                   
                  {/* X-axis Labels */}
                  <div className={`absolute bottom-6 left-6 right-6 flex justify-between text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                    <span>Apr 14</span>
                    <span>Apr 15</span>
                    <span>Apr 16</span>
                    <span className="font-semibold text-[#1b212d]">Apr 17</span>
                    <span>Apr 18</span>
                    <span>Apr 19</span>
                    <span>Apr 20</span>
                  </div>
                   
                  {/* Chart Pointer */}
                  <div className="absolute right-1/4 top-1/4 flex items-center gap-2">
                    <div className="w-3 h-3">
                      <img alt="Pointer" className="w-full h-full" src={img12} />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9">
                        <img alt="Dollar" className="w-full h-full" src={img11} />
                      </div>
                      <span className={`font-['Kumbh_Sans'] font-medium text-[12px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>$5,500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transaction */}
              <div className={`${isDarkMode ? 'bg-[#201e34] border-[#282541]' : 'bg-white border-neutral-100'} border rounded-[10px] p-6 transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                    Recent Transaction
                  </h3>
                  <button className="flex items-center gap-1.5 text-[#29a073] hover:opacity-80 transition-opacity">
                    <span className="font-['Kumbh_Sans'] font-semibold text-[14px]">View All</span>
                    <img alt="Expand" className="w-[18px] h-[18px] rotate-270" src={viewAllIcon} />
                  </button>
                </div>
                
                {/* Table Header */}
                <div className="hidden lg:grid grid-cols-12 gap-4 mb-4 px-4">
                  <div className="col-span-4">
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>NAME/BUSINESS</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>TYPE</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>AMOUNT</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`font-['Kumbh_Sans'] font-semibold text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>DATE</span>
                  </div>
                  <div className="col-span-2"></div>
                </div>
                
                {/* Transaction Rows */}
                <div className="space-y-4">
                  {[
                    {
                      name: 'Iphone 13 Pro MAX',
                      business: 'Apple. Inc',
                      type: 'Mobile',
                      amount: '$420.84',
                      date: '14 Apr 2022',
                      icon: imgImage8,
                      iconBg: 'bg-[#e4f1ff]'
                    },
                    {
                      name: 'Netflix Subscription',
                      business: 'Netflix',
                      type: 'Entertainment',
                      amount: '$100.00',
                      date: '05 Apr 2022',
                      icon: imgRectangle461,
                      iconBg: 'bg-center bg-cover'
                    },
                    {
                      name: 'Figma Subscription',
                      business: 'Figma. Inc',
                      type: 'Software',
                      amount: '$244.20',
                      date: '02 Apr 2022',
                      icon: imgRectangle462,
                      iconBg: 'bg-center bg-cover'
                    }
                  ].map((transaction, index) => (
                    <div key={index} className="border-b border-neutral-100 last:border-b-0 pb-4 last:pb-0">
                      {/* Desktop Layout */}
                      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-[5px] ${transaction.iconBg}`}>
                              <img alt={transaction.business} className="w-full h-full object-cover" src={transaction.icon} />
                            </div>
                            <div>
                              <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                {transaction.name}
                              </div>
                              <div className={`font-['Kumbh_Sans'] text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                                {transaction.business}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                            {transaction.type}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {transaction.amount}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                            {transaction.date}
                          </span>
                        </div>
                        <div className="col-span-2"></div>
                      </div>
                       
                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-3">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-[5px] ${transaction.iconBg}`}>
                            <img alt={transaction.business} className="w-full h-full object-cover" src={transaction.icon} />
                          </div>
                          <div className="flex-1">
                            <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              {transaction.name}
                            </div>
                            <div className={`font-['Kumbh_Sans'] font-medium text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                              {transaction.business}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                            {transaction.type}
                          </span>
                          <span className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            {transaction.amount}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`font-['Kumbh_Sans'] font-medium text-[12px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                            {transaction.date}
                          </span>
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
    </div>
  )
}

export default Dashboard


