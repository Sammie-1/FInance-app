import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import { useNotification } from '../contexts/NotificationContext'
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
import searchIcon from '../assets/icons/search.1 1.svg'
import notificationIcon from '../assets/icons/notification-bing.5 1.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import logoMain from '../assets/icons/logo-main.svg'
import avatarIcon from '../assets/icons/avatar.svg'
import { getNavigationWithActiveState } from '../config/navigation'
import calendarIcon from '../assets/icons/calendar.svg'
import eyeIcon from '../assets/icons/eye.svg'
import downloadIcon from '../assets/icons/ic-receipt-24px 1.svg'
import sajibPng from '../assets/icons/sajib.png'
import historyIcon from '../assets/icons/history.svg'
import dividerIcon from '../assets/icons/underline.svg'
import verifyIcon from '../assets/icons/Verify.svg'

import logoMainSmallWhite from '../assets/icons/logo-white.svg'
import maskGroup from '../assets/icons/Rectangle 456.svg'

const NewInvoice = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const { showWarning, showInfo } = useNotification()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [invoiceItems, setInvoiceItems] = useState([])
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [itemForm, setItemForm] = useState({
    description: '',
    qty: '',
    rate: '',
    amount: ''
  })

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

  const invoiceState = location?.state || {}
  const invoiceId = invoiceState.invoiceId || 'MGL524874'
  const clientName = invoiceState.clientName || 'Sajib Rahman'
  const clientEmail = invoiceState.clientEmail || 'rahmansajib@uihut.com'
  const companyName = invoiceState.companyName || 'UIHUT Agency LTD'
  const companyAddress = invoiceState.companyAddress || '3471 Rainy Day Drive Tulsa, USA'
  const invoiceDate = invoiceState.invoiceDate || '14 Apr 2022'
  const dueDate = invoiceState.dueDate || '20 Apr 2022'
  
  const { topSidebarItems, bottomSidebarItems } = getNavigationWithActiveState('/new-invoice')

  // Calculate totals
  const subtotal = invoiceItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
  const tax = 0 // 0% tax as shown in the original
  const total = subtotal + tax

  // Handle form changes
  const handleItemFormChange = (e) => {
    const { name, value } = e.target
    setItemForm(prev => {
      const updated = { ...prev, [name]: value }
      
      // Auto-calculate amount when qty or rate changes
      if (name === 'qty' || name === 'rate') {
        const qty = parseFloat(name === 'qty' ? value : updated.qty) || 0
        const rate = parseFloat(name === 'rate' ? value : updated.rate) || 0
        updated.amount = (qty * rate).toFixed(2)
      }
      
      return updated
    })
  }

  // Add new item
  const handleAddItem = () => {
    if (itemForm.description && itemForm.qty && itemForm.rate) {
      const newItem = {
        id: Date.now(),
        description: itemForm.description,
        qty: parseFloat(itemForm.qty),
        rate: parseFloat(itemForm.rate),
        amount: parseFloat(itemForm.amount)
      }
      
      setInvoiceItems(prev => [...prev, newItem])
      setItemForm({ description: '', qty: '', rate: '', amount: '' })
      setShowAddItemForm(false)
    }
  }

  // Remove item
  const handleRemoveItem = (itemId) => {
    setInvoiceItems(prev => prev.filter(item => item.id !== itemId))
  }

  // Toggle add item form
  const toggleAddItemForm = () => {
    setShowAddItemForm(!showAddItemForm)
    if (showAddItemForm) {
      setItemForm({ description: '', qty: '', rate: '', amount: '' })
    }
  }

  // Handle preview navigation with validation
  const handlePreview = () => {
    // Validate that items exist
    if (invoiceItems.length === 0) {
      showWarning(
        'Please add at least one item to your invoice before previewing. Click "Add Item" to get started.',
        'Invoice Items Required'
      )
      
      // Smooth scroll to invoice items section and highlight add button
      const itemsSection = document.querySelector('[data-section="invoice-items"]')
      if (itemsSection) {
        itemsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
        
        // Pulse effect on add item button
        setTimeout(() => {
          const addButton = document.querySelector('[data-action="add-item"]')
          if (addButton) {
            addButton.classList.add('animate-pulse')
            setTimeout(() => {
              addButton.classList.remove('animate-pulse')
            }, 2000)
          }
        }, 500)
      }
      return
    }

    // Proceed with preview if validation passes
    setIsNavigating(true)
    
    const invoiceData = {
      invoiceId,
      clientName,
      clientEmail,
      companyName,
      companyAddress,
      invoiceDate,
      dueDate,
      invoiceItems,
      subtotal,
      tax,
      total
    }
    
    setTimeout(() => {
      navigate('/invoice-preview', { state: invoiceData })
      setIsNavigating(false)
    }, 300)
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

        {/* Dark Mode Toggle */}
        <div className="fixed top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 z-50">
          <DarkModeToggle />
        </div>

        {/* Sidebar - Updated to match Figma design */}
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
            <div className="w-full max-w-[1110px] mx-auto">
              {/* Figma Top Bar Design */}
              <div className="box-border content-stretch flex items-center justify-between p-0 relative size-full">
                <div className={`font-['Kumbh_Sans'] font-semibold leading-[0] relative shrink-0 text-nowrap text-[25px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  <p className="block leading-[normal] whitespace-pre">New Invoices: {invoiceId}</p>
                </div>
                <div className="box-border content-stretch flex gap-4 md:gap-[45px] items-center justify-start p-0 relative shrink-0">
                  <div className="box-border content-stretch flex gap-4 md:gap-[45px] items-start justify-start p-0 relative shrink-0">
                    {/* Search Icon */}
                    <div className="relative shrink-0 size-6">
                      <img alt="Search" className="block max-w-none size-full" src={searchIcon} />
                    </div>
                    {/* Notification Icon */}
                    <div className="relative shrink-0 size-6">
                      <img alt="Notifications" className="block max-w-none size-full" src={notificationIcon} />
                    </div>
                  </div>
                  {/* User Profile */}
                  <div className={`${isDarkMode ? 'bg-[#201e34]' : 'bg-neutral-50'} box-border content-stretch flex items-center justify-between pl-[7px] pr-[15px] py-1.5 relative rounded-[100px] shrink-0 w-[200px] md:w-[215px] transition-colors duration-300`}>
                    <div className="box-border content-stretch flex gap-3 items-center justify-start p-0 relative shrink-0">
                      <div className="relative shrink-0 size-9">
                        <img alt="Profile" className="block max-w-none size-full" height="36" src={avatarIcon} width="36" />
                      </div>
                      <div className={`font-['Kumbh_Sans'] font-semibold leading-[0] relative shrink-0 text-nowrap text-[14px] ${
                        isDarkMode ? 'text-white' : 'text-[#1b212d]'
                      }`}>
                        <p className="block leading-[normal] whitespace-pre">Mahfuzul Nabil</p>
                      </div>
                    </div>
                    <div className="relative shrink-0 size-[17px]">
                      <img alt="Dropdown" className="block max-w-none size-full" src={dropdownIcon} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Two Column Layout */}
          <div className="px-4 md:px-6 lg:px-10 pb-6">
            <div className="w-full max-w-[1110px] mx-auto flex flex-col lg:flex-row gap-6">
              {/* Left Content - Invoice Details */}
              <div className="flex-1">
                {/* Company Header Card - From Figma */}
                <div className="relative w-full h-[100px] mb-6 rounded-[10px] overflow-hidden">
                  {/* Background image */}
                  <img
                    alt="Company header background"
                    className="absolute inset-0 w-full h-full object-cover"
                    src={maskGroup}
                  />
                  {/* Overlay for readability */}
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#282541]' : 'bg-[#1b212d]'}`} />
                  {/* Content */}
                  <div className="absolute top-5 bottom-5 left-6 right-6 flex items-center justify-between">
                    <div className="flex gap-[15px] items-center">
                      <div className="w-[40px] h-[40px]">
                        <img alt="Company Logo" className="block max-w-none size-full" src= {logoMainSmallWhite} />
                      </div>
                      <div className="flex flex-col gap-1 text-white">
                        <div className="font-['Gordita'] font-bold text-[20px]">Maglo.</div>
                        <div className="font-['Kumbh_Sans'] font-normal text-[14px]">sales@maglo.com</div>
                      </div>
                    </div>
                    <div className="flex flex-col font-['Kumbh_Sans'] font-medium gap-1 items-end text-white text-[14px] text-right">
                      <div>1333 Grey Fox Farm Road</div>
                      <div>Houston, TX 77060</div>
                      <div>Bloomfield Hills, Michigan(MI), 48301</div>
                    </div>
                  </div>
                </div>

                {/* Invoice Header Section - From Figma */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#f8f9fa] border-neutral-100'} rounded-[10px] border p-6 mb-6`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className={`font-['Kumbh_Sans'] font-semibold text-[16px] mb-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          Invoice Number
                        </h3>
                        <div className={`font-['Kumbh_Sans'] font-medium text-[16px] mb-1 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {invoiceId}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae] mb-1`}>
                          Issued Date: {invoiceDate}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae]`}>
                          Due Date: {dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <h3 className={`font-['Kumbh_Sans'] font-semibold text-[16px] mb-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          Billed to
                        </h3>
                        <div className={`font-['Kumbh_Sans'] font-medium text-[16px] mb-1 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          {clientName}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae] mb-1`}>
                          {companyAddress.split(',')[0]}
                        </div>
                        <div className={`font-['Kumbh_Sans'] font-normal text-[14px] text-[#929eae]`}>
                          {companyAddress.split(',').slice(1).join(',').trim()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Items Section - Enhanced UX */}
                <div 
                  data-section="invoice-items"
                  className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} rounded-[12px] border p-4 sm:p-6 mb-6 transition-all duration-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-['Kumbh_Sans'] font-semibold text-[18px] sm:text-[20px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        Invoice Items
                      </h3>
                      {invoiceItems.length > 0 && (
                        <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ${isDarkMode ? 'bg-[#c8ee44] text-[#1b212d]' : 'bg-[#c8ee44] text-[#1b212d]'}`}>
                          {invoiceItems.length}
                        </span>
                      )}
                    </div>
                    <button 
                      data-action="add-item"
                      onClick={toggleAddItemForm}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-[10px] font-['Kumbh_Sans'] font-semibold text-[14px] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        showAddItemForm 
                          ? isDarkMode 
                            ? 'bg-[#282541] text-white border border-[#201e34] hover:bg-[#343151]' 
                            : 'bg-gray-100 text-[#1b212d] border border-gray-200 hover:bg-gray-200'
                          : 'bg-[#c8ee44] hover:bg-[#b8de34] text-[#1b212d] shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {showAddItemForm ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Item
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Table Header - Hidden on mobile, visible on desktop */}
                  <div className="hidden lg:grid lg:grid-cols-12 gap-4 mb-6 pb-4 border-b-2 border-neutral-200">
                    <div className="col-span-5 pl-2">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[13px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Description
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[13px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Qty
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[13px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Rate
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[13px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Amount
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <span className={`font-['Kumbh_Sans'] font-semibold text-[13px] uppercase tracking-wide ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Action
                      </span>
                    </div>
                  </div>
                  
                  {/* Add Item Form - Mobile-First Responsive Design */}
                  {showAddItemForm && (
                    <div className={`${isDarkMode ? 'bg-[#282541] border-[#201e34]' : 'bg-[#f8f9fa] border-neutral-200'} rounded-[12px] border p-4 sm:p-6 mb-6 animate-fade-in-up`}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-[#c8ee44]' : 'bg-[#c8ee44]'} flex items-center justify-center`}>
                          <svg className="w-5 h-5 text-[#1b212d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h4 className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          Add New Item
                        </h4>
                      </div>
                      
                      {/* Mobile-First Form Layout */}
                      <div className="space-y-6">
                        {/* Description - Full width on mobile */}
                        <div className="w-full">
                          <label className={`font-['Kumbh_Sans'] text-[14px] font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Description
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="description"
                            value={itemForm.description}
                            onChange={handleItemFormChange}
                            placeholder="Describe the product or service..."
                            rows="3"
                            className={`w-full ${isDarkMode ? 'bg-[#1e1c30] border-[#201e34] text-white placeholder-[#78778b] focus:border-[#c8ee44]' : 'bg-white border-neutral-200 text-[#1b212d] placeholder-[#929eae] focus:border-[#c8ee44]'} rounded-[10px] px-4 py-3 border-2 outline-none resize-none font-['Kumbh_Sans'] text-[15px] transition-all duration-200 focus:shadow-lg`}
                          />
                        </div>

                        {/* Quantity, Rate, Amount - Responsive grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                          <div>
                            <label className={`font-['Kumbh_Sans'] text-[14px] font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              Quantity
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                name="qty"
                                value={itemForm.qty}
                                onChange={handleItemFormChange}
                                placeholder="1"
                                min="0"
                                step="1"
                                className={`w-full ${isDarkMode ? 'bg-[#1e1c30] border-[#201e34] text-white placeholder-[#78778b] focus:border-[#c8ee44]' : 'bg-white border-neutral-200 text-[#1b212d] placeholder-[#929eae] focus:border-[#c8ee44]'} rounded-[10px] px-4 py-3 border-2 outline-none font-['Kumbh_Sans'] text-[15px] text-center transition-all duration-200 focus:shadow-lg`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className={`font-['Kumbh_Sans'] text-[14px] font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              Rate ($)
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'} font-['Kumbh_Sans'] text-[15px]`}>$</span>
                              <input
                                type="number"
                                name="rate"
                                value={itemForm.rate}
                                onChange={handleItemFormChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className={`w-full ${isDarkMode ? 'bg-[#1e1c30] border-[#201e34] text-white placeholder-[#78778b] focus:border-[#c8ee44]' : 'bg-white border-neutral-200 text-[#1b212d] placeholder-[#929eae] focus:border-[#c8ee44]'} rounded-[10px] pl-8 pr-4 py-3 border-2 outline-none font-['Kumbh_Sans'] text-[15px] text-center transition-all duration-200 focus:shadow-lg`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className={`font-['Kumbh_Sans'] text-[14px] font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              Total Amount
                            </label>
                            <div className="relative">
                              <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'} font-['Kumbh_Sans'] text-[15px]`}>$</span>
                              <input
                                type="text"
                                name="amount"
                                value={itemForm.amount || '0.00'}
                                readOnly
                                className={`w-full ${isDarkMode ? 'bg-[#201e34] border-[#201e34] text-[#c8ee44]' : 'bg-gray-50 border-neutral-200 text-[#29a073]'} rounded-[10px] pl-8 pr-4 py-3 border-2 outline-none font-['Kumbh_Sans'] text-[15px] font-semibold text-center cursor-not-allowed`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <button
                            onClick={handleAddItem}
                            disabled={!itemForm.description || !itemForm.qty || !itemForm.rate}
                            className={`flex-1 sm:flex-none sm:px-8 py-3 rounded-[10px] font-['Kumbh_Sans'] font-semibold text-[15px] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                              itemForm.description && itemForm.qty && itemForm.rate
                                ? 'bg-[#c8ee44] hover:bg-[#b8de34] text-[#1b212d] shadow-lg hover:shadow-xl'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add to Invoice
                          </button>
                          <button
                            onClick={toggleAddItemForm}
                            className={`sm:px-6 py-3 rounded-[10px] font-['Kumbh_Sans'] font-medium text-[15px] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                              isDarkMode 
                                ? 'bg-[#1e1c30] text-[#929eae] border border-[#201e34] hover:bg-[#282541]' 
                                : 'bg-white text-[#78778b] border border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invoice Items List - Responsive Design */}
                  {invoiceItems.length === 0 ? (
                    <div className="text-center py-16">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${isDarkMode ? 'bg-[#282541]' : 'bg-gray-100'} flex items-center justify-center`}>
                        <svg className={`w-8 h-8 ${isDarkMode ? 'text-[#78778b]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className={`font-['Kumbh_Sans'] font-semibold text-[18px] mb-3 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        No items added yet
                      </div>
                      <div className={`font-['Kumbh_Sans'] font-normal text-[15px] mb-6 ${isDarkMode ? 'text-[#78778b]' : 'text-[#78778b]'}`}>
                        Start building your invoice by adding items and services
                      </div>
                      <div className="space-y-4">
                        <button 
                          onClick={toggleAddItemForm}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8ee44] hover:bg-[#b8de34] text-[#1b212d] rounded-[10px] font-['Kumbh_Sans'] font-semibold text-[14px] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Your First Item
                        </button>
                        <div className={`text-xs ${isDarkMode ? 'text-[#78778b]' : 'text-gray-400'} text-center max-w-xs mx-auto`}>
                          💡 <strong>Tip:</strong> You need at least one item to preview or send your invoice
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Mobile Card Layout */}
                      <div className="lg:hidden space-y-4">
                        {invoiceItems.map((item, index) => (
                          <div key={item.id} className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-gray-200'} border rounded-[12px] p-4 transition-all duration-200 hover:shadow-md`}>
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <h4 className={`font-['Kumbh_Sans'] font-semibold text-[16px] mb-2 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                  {item.description}
                                </h4>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className={`flex items-center gap-1 ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Qty: {item.qty}
                                  </span>
                                  <span className={`flex items-center gap-1 ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    ${item.rate.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className={`ml-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-100 text-red-500'}`}
                                title="Remove item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                              <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>
                                Total Amount
                              </span>
                              <span className={`font-['Kumbh_Sans'] font-bold text-[18px] ${isDarkMode ? 'text-[#c8ee44]' : 'text-[#29a073]'}`}>
                                ${item.amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop Table Layout */}
                      <div className="hidden lg:block space-y-1">
                        {invoiceItems.map((item, index) => (
                          <div key={item.id} className={`grid grid-cols-12 gap-4 items-center py-4 rounded-[10px] transition-all duration-200 ${isDarkMode ? 'hover:bg-[#282541]' : 'hover:bg-gray-50'} border-b border-neutral-100 last:border-b-0`}>
                            <div className="col-span-5 pl-2">
                              <div className={`font-['Kumbh_Sans'] font-medium text-[15px] leading-relaxed ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                {item.description}
                              </div>
                            </div>
                            <div className="col-span-2 flex justify-center">
                              <span className={`inline-flex items-center justify-center w-14 h-8 rounded-full text-[14px] font-semibold ${isDarkMode ? 'bg-[#282541] text-white' : 'bg-gray-100 text-[#1b212d]'}`}>
                                {item.qty}
                              </span>
                            </div>
                            <div className="col-span-2 flex justify-center">
                              <span className={`font-['Kumbh_Sans'] font-semibold text-[15px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                                ${item.rate.toFixed(2)}
                              </span>
                            </div>
                            <div className="col-span-2 flex justify-center">
                              <span className={`font-['Kumbh_Sans'] font-bold text-[16px] ${isDarkMode ? 'text-[#c8ee44]' : 'text-[#29a073]'}`}>
                                ${item.amount.toFixed(2)}
                              </span>
                            </div>
                            <div className="col-span-1 flex justify-center">
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 transform hover:scale-110 ${isDarkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-100 text-red-500'}`}
                                title="Remove item"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Invoice Summary */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} rounded-[10px] border p-6`}>
                  <div className="flex justify-end">
                    <div className="w-full max-w-[300px] space-y-4">
                      <div className="flex justify-between items-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                          Subtotal:
                        </span>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#929eae]'}`}>
                          Tax (0%):
                        </span>
                        <span className={`font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          ${tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-neutral-100 pt-4">
                        <div className="flex justify-between items-center">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-[16px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            Total:
                          </span>
                          <span className={`font-['Kumbh_Sans'] font-semibold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Sidebar - Client Details & Basic Info */}
              <div className="w-full lg:w-[400px] space-y-6">
                {/* Client Details Section */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#ffffff] border-neutral-100'} box-border content-stretch flex flex-col gap-[19px] items-start justify-start pb-[25px] pt-5 px-[25px] relative rounded-[10px] border w-full`}>
                  <div className="box-border content-stretch flex items-center justify-between p-0 relative shrink-0 w-full">
                    <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                      <p className="block leading-[normal] whitespace-pre">Client Details</p>
                  </div>
                  <div className="relative shrink-0 size-[26px]">
                    <img alt="History" className="block max-w-none size-full" src={historyIcon} />
                  </div>
                </div>
                
                <div className="box-border content-stretch flex gap-[15px] items-center justify-start p-0 relative shrink-0">
                  <div className="relative shrink-0 size-14">
                    <img alt="Client Avatar" className="block max-w-none size-full" height="56" src={sajibPng} width="56" />
                  </div>
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-nowrap">
                      <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold relative shrink-0 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        <p className="block leading-[normal] text-nowrap whitespace-pre">{clientName}</p>
                    </div>
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae]">
                        <p className="block leading-[normal] text-nowrap whitespace-pre">{clientEmail}</p>
                    </div>
                  </div>
                </div>
                
                  <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <img alt="Divider" className="block max-w-none size-full" src={dividerIcon} />
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0">
                  <div className="box-border content-stretch flex gap-[5px] items-center justify-start p-0 relative shrink-0">
                      <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[16px] text-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                        <p className="block leading-[normal] whitespace-pre">{companyName}</p>
                    </div>
                    <div className="relative shrink-0 size-4">
                      <img alt="Verified" className="block max-w-none size-full" src={verifyIcon} />
                    </div>
                  </div>
                  <div className="font-['Kumbh_Sans:Regular',_'Noto_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#929eae] text-[16px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">{companyAddress}</p>
                  </div>
                </div>
                
                  <div className="bg-[#eefef2] box-border content-stretch flex gap-2.5 items-center justify-center pb-4 pt-[15px] px-5 relative rounded-[10px] shrink-0 w-full cursor-pointer hover:bg-[#e0f7e6] transition-colors">
                  <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Add Customer</p>
              </div>
            </div>
          </div>

          {/* Basic Info Section - From Figma */}
                <div className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-[#ffffff] border-neutral-100'} box-border content-stretch flex flex-col gap-5 items-start justify-center p-[25px] relative rounded-[10px] border w-full`}>
                  <div className={`font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[18px] text-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  <p className="block leading-[normal] whitespace-pre">Basic Info</p>
                </div>
                <div className="box-border content-stretch flex flex-col gap-[30px] items-start justify-start p-0 relative shrink-0">
                  {/* Invoice Date */}
                  <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start leading-[0] p-0 relative shrink-0">
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae] text-[14px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Invoice Date</p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                        <div className={`[grid-area:1_/_1] ${isDarkMode ? 'bg-[#282541]' : 'bg-[#ffffff]'} h-12 ml-0 mt-0 relative rounded-xl w-full max-w-[325px]`}>
                          <div className={`absolute ${isDarkMode ? 'border-[#201e34]' : 'border-neutral-100'} border border-solid inset-0 pointer-events-none rounded-xl`} />
                      </div>
                        <div className={`[grid-area:1_/_1] font-['Kumbh_Sans:Medium',_sans-serif] font-medium leading-[0] ml-[21px] mt-[15px] relative text-[14px] w-[166.6px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          <p className="block leading-[normal]">{invoiceDate}</p>
                      </div>
                      <div className="[grid-area:1_/_1] ml-[281px] mt-3 relative size-6">
                        <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                      </div>
                    </div>
                  </div>
                  {/* Due Date */}
                  <div className="box-border content-stretch flex flex-col gap-[15px] items-start justify-start leading-[0] p-0 relative shrink-0">
                    <div className="font-['Kumbh_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[#929eae] text-[14px] text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Due Date</p>
                    </div>
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                        <div className={`[grid-area:1_/_1] ${isDarkMode ? 'bg-[#282541]' : 'bg-[#ffffff]'} h-12 ml-0 mt-0 relative rounded-xl w-full max-w-[325px]`}>
                          <div className={`absolute ${isDarkMode ? 'border-[#201e34]' : 'border-neutral-100'} border border-solid inset-0 pointer-events-none rounded-xl`} />
                      </div>
                        <div className={`[grid-area:1_/_1] font-['Kumbh_Sans:Medium',_sans-serif] font-medium leading-[0] ml-[21px] mt-[15px] relative text-[14px] w-[166.6px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                          <p className="block leading-[normal]">{dueDate}</p>
                      </div>
                      <div className="[grid-area:1_/_1] ml-[281px] mt-3 relative size-6">
                        <img alt="Calendar" className="block max-w-none size-full" src={calendarIcon} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0">
                    <div className="bg-[#c8ee44] box-border content-stretch flex gap-2.5 items-center justify-center px-5 py-3.5 relative rounded-[10px] shrink-0 w-full cursor-pointer">
                    <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#1b212d] text-[16px] text-center text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Send Invoice</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex gap-5 items-start justify-start p-0 relative shrink-0">
                    <button 
                      onClick={handlePreview}
                      className={`box-border content-stretch flex gap-2.5 h-12 items-center justify-center pl-[35px] pr-[34px] py-3.5 relative rounded-[10px] shrink-0 transition-all duration-200 transform ${
                        invoiceItems.length === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                          : 'bg-[#f8f8f8] hover:bg-[#e8e8e8] cursor-pointer hover:scale-105'
                      }`}
                      disabled={invoiceItems.length === 0}
                      title={invoiceItems.length === 0 ? 'Add items to preview invoice' : 'Preview invoice'}
                    >
                      <div className="relative shrink-0 size-5">
                        <img alt="Eye" className="block max-w-none size-full" src={eyeIcon} />
                      </div>
                      <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-center text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">Preview</p>
                      </div>
                    </button>
                    <div className="bg-[#f8f8f8] box-border content-stretch flex gap-2.5 h-12 items-center justify-center pl-[27px] pr-7 py-3.5 relative rounded-[10px] shrink-0 cursor-pointer">
                      <div className="relative shrink-0 size-5">
                        <img alt="Download" className="block max-w-none size-full" src={downloadIcon} />
                      </div>
                      <div className="font-['Kumbh_Sans:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#29a073] text-[14px] text-center text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">Download</p>
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
    </div>
  )
}

export default NewInvoice

