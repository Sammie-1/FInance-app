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

// Figma assets from the selection
const imgEllipse7 = "http://localhost:3845/assets/fe3dd55ee90b77a6c75dedcae50485a119a92a55.png";
const imgEllipse1 = "http://localhost:3845/assets/c78dae655605c90da12d809fdb9be067a20aecd0.png";
const img5 = "http://localhost:3845/assets/ecf3758290cbe4ca202994a5296d2b2d4151bda2.png";
const img6 = "http://localhost:3845/assets/8f507498428cefa57183549263a256118b7cdc04.png";
const img7 = "http://localhost:3845/assets/6e906019981f1afd62a7d4eda6f6c773557b7b11.png";
const img8 = "http://localhost:3845/assets/9916738ca69b7a934d9114d34c14b93a94e63b76.png";
const img9 = "http://localhost:3845/assets/1128d914f22bcb5c7f1fb39a8d3388413e7242a4.png";
const img10 = "http://localhost:3845/assets/b9df34b9b5038c914374b86ce900325ecedd0778.png";
const img11 = "http://localhost:3845/assets/af429319eb90ae02d7756377e9e24530bd4ddf69.png";
const img = "http://localhost:3845/assets/18a8d1835cb9b2c91eef632e090931e96adbc134.svg";
const img1 = "http://localhost:3845/assets/ec33677e0778073cb1c54cc509cd1523b3587e30.svg";
const imgVector = "http://localhost:3845/assets/dbcddb0a9749c022f5b5b6b4d55b15ddb10880f7.svg";
const imgMore = "http://localhost:3845/assets/528abc8326b2709b6929a45f7b5be23b6e990b07.svg";
const imgLine12 = "http://localhost:3845/assets/ec31a9736252713d3fc57ca5eff3908103db1a44.svg";
const imgSearch11 = "http://localhost:3845/assets/71c395008f52335910f34ad464c773bed0211c67.svg";
const imgNotificationBing51 = "http://localhost:3845/assets/3031bad5cd06ca8f4e4b1d9de10443a56930ff98.svg";
const imgDropdown = "http://localhost:3845/assets/4a0a667fe4fe17e5d7d2d849212adc2e8b941567.svg";
const img2 = "http://localhost:3845/assets/25a74f47851e782b4595be981a7e935fcce1e508.svg";
const img3 = "http://localhost:3845/assets/43083cd58daf3fc7981f7d08497f2cd8af366c9e.svg";
const img4 = "http://localhost:3845/assets/90819c50a1e6873ada80aeb8d6ac19830d972512.svg";
const imgIcReceipt24Px1 = "http://localhost:3845/assets/25e6581d0cb04dd7a5860feb13885ba32c776b2.svg";
const imgBxFilter1 = "http://localhost:3845/assets/fd30155c47f908103e158d25fb58da2798db067c.svg";

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
    console.log('Create Invoice clicked')
    // Add your create invoice logic here
    // For example: navigate to create invoice form, open modal, etc.
  }

  // Get navigation items with proper active state
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState(location.pathname)

  const invoices = [
    {
      id: 'MGL524874',
      client: 'Gadget Gallery LTD',
      avatar: imgEllipse7,
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
      avatar: img5,
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
      avatar: img6,
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
      avatar: img7,
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
      avatar: img8,
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
      avatar: img9,
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
      avatar: img10,
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
      avatar: img11,
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
