import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import { getNavigationWithActiveState } from '../config/navigation'

// Figma assets from the selection
const imgEllipse1 = "http://localhost:3845/assets/c78dae655605c90da12d809fdb9be067a20aecd0.png";
const imgRectangle479 = "http://localhost:3845/assets/ac1ff982039ea8095c38b23d7ae8dcd4936e1a6a.png";
const imgRectangle480 = "http://localhost:3845/assets/c9516983bdd17427a967fb70db7cf1e6da3a73d9.png";
const imgRectangle481 = "http://localhost:3845/assets/808d84fd53e3f2888629da756f3ef07ad3b0ff49.png";
const imgRectangle482 = "http://localhost:3845/assets/083f0ab6d63a937d4420a54622ca0a7bc826cd02.png";
const imgRectangle483 = "http://localhost:3845/assets/a04e4dc3bcdf3d162b6c4a906691d9ea3b8ab34a.png";
const imgRectangle484 = "http://localhost:3845/assets/09713e05329a4c32f1f487682e60247866ce5e09.png";
const img = "http://localhost:3845/assets/18a8d1835cb9b2c91eef632e090931e96adbc134.svg";
const img1 = "http://localhost:3845/assets/ec33677e0778073cb1c54cc509cd1523b3587e30.svg";
const imgVector = "http://localhost:3845/assets/dbcddb0a9749c022f5b5b6b4d55b15ddb10880f7.svg";
const img2 = "http://localhost:3845/assets/92008d11711393949765aa06fb274c0fb13b9367.svg";
const imgVector1 = "http://localhost:3845/assets/307c6d09c72a1b801939945bb1771a37f1a7ff7a.svg";
const imgUp = "http://localhost:3845/assets/6a184d4aa13a7ef1600a43a3f61580545647272c.svg";
const imgDown = "http://localhost:3845/assets/085af04180bd22e118ee4d14474585b6b5ffd8b3.svg";
const imgLine16 = "http://localhost:3845/assets/a3290d1764afd720015f1ebc100a097be27ba214.svg";
const img3 = "http://localhost:3845/assets/25a74f47851e782b4595be981a7e935fcce1e508.svg";
const img4 = "http://localhost:3845/assets/465c6392976767b3e63731e564457450d19ef7e7.svg";
const img5 = "http://localhost:3845/assets/2efe4a983a6f8cbff2894a0700744c471f4fbdd1.svg";
const imgNotificationBing51 = "http://localhost:3845/assets/5881a2a5cf37c2b0347b76ba1509c7b110717a06.svg";
const imgDropdown = "http://localhost:3845/assets/836669b9eb423b6909bde68e0fa3b875973bed00.svg";
const imgVector2 = "http://localhost:3845/assets/6276f29b6d80bc9d94b8e0eadd534d0a2d6dd3ec.svg";
const imgGroup = "http://localhost:3845/assets/751a2280ff47a80fae1a1d0e1b82a810b107ff29.svg";
const imgGroup1 = "http://localhost:3845/assets/794f576d0d31f78bf639d87f635321f44b9b04a5.svg";
const imgGroup2 = "http://localhost:3845/assets/ade60c1acc9188a981f433f3dd07d76222d9b329.svg";
const imgGroup3 = "http://localhost:3845/assets/719446745ea0febf81691ad444dd4feccf8f1e6c.svg";
const imgGroup4 = "http://localhost:3845/assets/3b18337ca8bc0124567bfe8e70daf948dda0df7c.svg";
const imgGroup5 = "http://localhost:3845/assets/374c28a051d4f4051032be58f59eceeedb5dbe82.svg";
const imgWifi31 = "http://localhost:3845/assets/12c7ab680c4f207f59b99550203cb1a61c839dbe.svg";
const imgInternational = "http://localhost:3845/assets/c15698ed838d695a9ddb12bda61fa159ebd5ca6b.svg";
const imgVector3 = "http://localhost:3845/assets/74afcba9934a7c2adb1b9c522c86c3d619f03a4e.svg";
const imgVector4 = "http://localhost:3845/assets/c6d805523d17daa84b13401407724d83514d0db4.svg";
const imgGroup6 = "http://localhost:3845/assets/22384d66d4ce0a24548dcbad58365f6ea1e829ab.svg";
const imgGroup7 = "http://localhost:3845/assets/1a25bb27496d68a5a2885677092151b21f1c16de.svg";
const imgGroup8 = "http://localhost:3845/assets/00f21dcf3609d5f27cadad80a91e9f8c9ad082fc.svg";
const imgGroup9 = "http://localhost:3845/assets/1cdc921bdf692cca5babeba245b2ac706178f161.svg";
const imgGroup10 = "http://localhost:3845/assets/af40418228af62c48a62bb2d247e1d70fb25e876.svg";
const imgGroup11 = "http://localhost:3845/assets/a157b913722b4f7a5e38bd417550602d54286b75.svg";
const imgPlus1 = "http://localhost:3845/assets/d5eb407e9c33478cda8ffd47732f322e3a83ba41.svg";
const imgSearch11 = "http://localhost:3845/assets/9fdf7b46a11707506af2be2432e2db8198cbfdc6.svg";
const imgGroup48 = "http://localhost:3845/assets/b4411f505e6e17d4aac9335856e964ba45d7c505.svg";

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
      logo: imgRectangle479,
      date: '20 Apr 2022, 06:55 PM',
      amount: '+ $4800.24',
      type: 'credit'
    },
    {
      id: 2,
      name: 'Remitly',
      logo: imgRectangle480,
      date: '18 Apr 2022, 08:58 PM',
      amount: '- $1800.24',
      type: 'debit'
    },
    {
      id: 3,
      name: 'Wise',
      logo: imgRectangle481,
      date: '15 Apr 2022, 02:55 AM',
      amount: '- $24.32',
      type: 'debit'
    },
    {
      id: 4,
      name: 'Paypal',
      logo: imgRectangle482,
      date: '14 Apr 2022, 07:40 PM',
      amount: '- $400.32',
      type: 'debit'
    }
  ]

  const upcomingPayments = [
    {
      id: 1,
      name: 'Facebook Ads',
      logo: imgRectangle483,
      date: '20 Apr 2022, 06:55 PM',
      amount: '$400.00',
      type: 'upcoming'
    },
    {
      id: 2,
      name: 'LinkedIn Ads',
      logo: imgRectangle484,
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
              <img alt="Maglo Logo" className="block max-w-none size-full" src={img3} />
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
                  <img alt="Notifications" className="block max-w-none size-full" src={imgNotificationBing51} />
                </div>
                
                {/* Dark Mode Toggle */}
                <DarkModeToggle />
                
                {/* User Profile */}
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

          {/* Content Grid */}
          <div className="px-4 md:px-6 lg:px-10">
            <div className="w-full max-w-[1110px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                                 {/* Left Column - Credit Cards */}
                 <div className="lg:col-span-5 space-y-6">
                   {/* Credit Cards */}
                   <div className="space-y-4 max-w-[354px] mx-auto lg:mx-0">
                                         {/* Card 1 - Primary */}
                     <div className="relative h-[210px] w-full max-w-[354px] rounded-[15px] overflow-hidden">
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
                             <img alt="Card Chip" className="block max-w-none size-full" src={imgVector2} />
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
                             <img alt="International" className="block max-w-none size-full" src={imgInternational} />
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Card 2 - Secondary */}
                     <div className="relative h-[172px] w-full max-w-[324px] rounded-[15px] overflow-hidden">
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
                           <div className="w-8 h-8">
                             <img alt="Card Chip" className="block max-w-none size-full" src={imgVector3} />
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
                                   <img alt="Up" className="block max-w-none size-full" src={imgUp} />
                                 </div>
                                 <div className="font-['Kumbh_Sans'] font-medium text-[#19d076] text-[14px]">
                                   23.65%
                                 </div>
                               </div>
                               {/* Down Arrow */}
                               <div className="flex items-center gap-1">
                                 <div className="w-4 h-4 rotate-180">
                                   <img alt="Down" className="block max-w-none size-full" src={imgDown} />
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
                        <img alt="Plus" className="block max-w-none size-full" src={imgPlus1} />
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <button
                          onClick={() => setActiveTab('all')}
                          className={`font-['Kumbh_Sans'] font-semibold text-[14px] transition-colors duration-200 ${
                            activeTab === 'all' 
                              ? (isDarkMode ? 'text-white' : 'text-[#1b212d]')
                              : 'text-[#929eae]'
                          }`}
                        >
                          All Payments
                        </button>
                        <button
                          onClick={() => setActiveTab('regular')}
                          className={`font-['Kumbh_Sans'] font-medium text-[14px] transition-colors duration-200 ${
                            activeTab === 'regular' 
                              ? (isDarkMode ? 'text-white' : 'text-[#1b212d]')
                              : 'text-[#929eae]'
                          }`}
                        >
                          Regular Payments
                        </button>
                      </div>

                      {/* Search */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5">
                          <img alt="Search" className="block max-w-none size-full" src={imgSearch11} />
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
                            <div className={`font-['Kumbh_Sans'] font-semibold text-[16px] ${
                              payment.type === 'credit' 
                                ? 'text-[#19d076]' 
                                : payment.type === 'debit' 
                                  ? 'text-[#e5363d]' 
                                  : (isDarkMode ? 'text-white' : 'text-[#1b212d]')
                            }`}>
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
