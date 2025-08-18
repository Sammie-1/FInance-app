import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import { getNavigationWithActiveState } from '../config/navigation'

// Figma assets from the selection
const imgEllipse1 = "http://localhost:3845/assets/c78dae655605c90da12d809fdb9be067a20aecd0.png";
const img1 = "http://localhost:3845/assets/100f1389bdede720bc020168a317c7f547872647.png";
const img3 = "http://localhost:3845/assets/8018ec7b46b16614a2a471647ae90f16158b558c.png";
const img4 = "http://localhost:3845/assets/3e2f88aa91732d592fe028344459e1e68c236c99.png";
const img5 = "http://localhost:3845/assets/e27df4a85ee2ab5d0cbbc14ae4c3c3983ee46401.png";
const img6 = "http://localhost:3845/assets/df84abce3e23b1a077d5e65ff3191ac7ca6b0a4c.png";
const img7 = "http://localhost:3845/assets/bebf21c0077e2d9cc773085171cd6874b8d1c52e.png";
const img8 = "http://localhost:3845/assets/bddc89851ba09e4c556fdcf5d106f6429692f8eb.png";
const img9 = "http://localhost:3845/assets/f99271c3b0cd52c8d5df5640cfc6262b2cdaf1b0.png";
const img = "http://localhost:3845/assets/18a8d1835cb9b2c91eef632e090931e96adbc134.svg";
const imgVector = "http://localhost:3845/assets/35ecd2b8de617bb6eba1bc6f2c5a25ddc59bc256.svg";
const imgSearch12 = "http://localhost:3845/assets/89e6673e1aa65635c41ce0180579467b9a2f43f2.svg";
const imgSearch11 = "http://localhost:3845/assets/71c395008f52335910f34ad464c773bed0211c67.svg";
const imgNotificationBing51 = "http://localhost:3845/assets/3031bad5cd06ca8f4e4b1d9de10443a56930ff98.svg";
const imgDropdown = "http://localhost:3845/assets/c8425b8991feb5a4076fb270b842e7bbbc905154.svg";
const imgLine13 = "http://localhost:3845/assets/149076b2ac65a5598845ec06255372cadd375c1e.svg";
const img2 = "http://localhost:3845/assets/2f87f440e86bdd00cbcbb077409789bf0d3bea35.svg";
const img10 = "http://localhost:3845/assets/8d0ad514fc31934f73181d91ba8a288dd0fece9d.svg";
const img11 = "http://localhost:3845/assets/e7027850564beb07c690b603334ed5418a7cf223.svg";

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
      avatar: img1,
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
      avatar: img3,
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
      avatar: img4,
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
      avatar: img5,
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
      avatar: img6,
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
      avatar: img7,
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
      avatar: img8,
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
      avatar: img9,
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
               <img alt="Maglo Logo" className="block max-w-none size-full" src={img10} />
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
                 Transactions
               </h1>
               
               {/* Top Bar */}
               <div className="flex items-center gap-4 sm:gap-6 lg:gap-[45px]">
                 {/* Search Icon */}
                 <div className="w-6 h-6">
                   <img alt="Search" className="block max-w-none size-full" src={imgSearch11} />
                 </div>
                 
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

                     {/* Search Bar - Dynamic Theme */}
           <div className="px-4 md:px-6 lg:px-10 mb-6">
             <div className="w-full max-w-[1110px] mx-auto">
               <div className={`${isDarkMode ? 'bg-[#282541] border-[#201e34]' : 'bg-[#f8f8f8] border-neutral-100'} rounded-[15px] border flex items-center gap-[15px] px-[15px] py-3 transition-colors duration-300`}>
                 <div className="w-6 h-6">
                   <img alt="Search" className="block max-w-none size-full" src={imgSearch12} />
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
                <div className={`hidden lg:flex font-['Kumbh_Sans'] font-semibold text-[#78778b] text-[12px] uppercase tracking-wide py-3 px-4 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#201e34]' : 'bg-gray-50'}`}>
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
                       <div className="w-[123px] text-center">
                         <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                           {transaction.type}
                         </div>
                       </div>

                       {/* Amount */}
                       <div className="w-[148px] text-center">
                         <div className={`font-['Kumbh_Sans'] font-semibold text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                           {transaction.isNegative ? `- ${transaction.amount}` : transaction.amount}
                         </div>
                       </div>

                       {/* Date */}
                       <div className="w-[148px] text-center">
                         <div className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                           {transaction.date}
                         </div>
                         <div className="font-['Kumbh_Sans'] font-normal text-[13px] text-[#78778b]">
                           {transaction.time}
                         </div>
                       </div>

                       {/* Invoice ID */}
                       <div className="w-[158px] text-center">
                         <div className="font-['Kumbh_Sans'] font-medium text-[14px] text-[#78778b]">
                           {transaction.id}
                         </div>
                       </div>

                       {/* Action */}
                       <div className="w-[100px] text-center">
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
