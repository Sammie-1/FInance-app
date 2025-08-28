import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'
import { useNotification } from '../contexts/NotificationContext'
import DarkModeToggle from '../components/DarkModeToggle'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Import icons
import logoMain from '../assets/icons/logo-main.svg'
import logoMainSmallWhite from '../assets/icons/logo-white.svg'
import downloadIcon from '../assets/icons/ic-receipt-24px 1.svg'
import eyeIcon from '../assets/icons/eye.svg'

const InvoicePreview = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const location = useLocation()
  const { showSuccess, showError, showInfo } = useNotification()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Get invoice data from location state
  const invoiceData = location?.state || {}
  const {
    invoiceId = 'MGL524874',
    clientName = 'Sajib Rahman',
    clientEmail = 'rahmansajib@uihut.com',
    companyName = 'UIHUT Agency LTD',
    companyAddress = '3471 Rainy Day Drive Tulsa, USA',
    invoiceDate = '14 Apr 2022',
    dueDate = '20 Apr 2022',
    invoiceItems = [],
    subtotal = 0,
    tax = 0,
    total = 0
  } = invoiceData

  const handleBack = () => {
    setIsNavigating(true)
    setTimeout(() => {
      navigate('/new-invoice', { state: invoiceData })
      setIsNavigating(false)
    }, 300)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    if (isDownloading) return // Prevent multiple downloads
    
    setIsDownloading(true)
    showInfo('Generating PDF...', 'Download')
    
    try {
      const invoiceElement = document.getElementById('invoice-preview')
      if (!invoiceElement) {
        throw new Error('Invoice element not found')
      }

      // Create a temporary container with white background for PDF
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.top = '-9999px'
      tempContainer.style.left = '-9999px'
      tempContainer.style.width = '794px' // A4 width in pixels at 96 DPI
      tempContainer.style.backgroundColor = 'white'
      tempContainer.style.padding = '40px'
      tempContainer.innerHTML = invoiceElement.innerHTML
      document.body.appendChild(tempContainer)

      // Override dark mode styles for PDF
      const allElements = tempContainer.querySelectorAll('*')
      allElements.forEach(el => {
        // Force white background and dark text for PDF
        if (el.style) {
          el.style.backgroundColor = 'white'
          el.style.color = 'black'
          el.style.borderColor = '#e5e7eb'
        }
      })

      // Keep the header gradient
      const headerElement = tempContainer.querySelector('.print-header')
      if (headerElement) {
        headerElement.style.background = 'linear-gradient(to right, #1b212d, #2a3441)'
        headerElement.style.color = 'white'
        const headerChildren = headerElement.querySelectorAll('*')
        headerChildren.forEach(child => {
          if (child.style) {
            child.style.color = 'white'
          }
        })
      }

      // Generate canvas from HTML
      const canvas = await html2canvas(tempContainer, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'white',
        width: 794,
        height: tempContainer.offsetHeight,
        scrollX: 0,
        scrollY: 0
      })

      // Remove temporary container
      document.body.removeChild(tempContainer)

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, canvas.height] // A4 proportions
      })

      // Calculate dimensions to fit the page
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

      // Generate filename
      const filename = `Invoice_${invoiceId}_${new Date().toISOString().split('T')[0]}.pdf`
      
      // Save the PDF
      pdf.save(filename)
      
      showSuccess(`Invoice downloaded successfully as ${filename}`, 'Download Complete')
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      showError('Failed to generate PDF. Please try again or use the print option.', 'Download Error')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div 
      className={`min-h-screen transition-all duration-300 ${
        isNavigating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ 
        backgroundColor: isDarkMode ? '#1c1a2e' : '#f8f9fa'
      }}
    >
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .invoice-container { 
            box-shadow: none !important; 
            border: none !important;
            margin: 0 !important;
            max-width: none !important;
            background: white !important;
          }
          /* Force white background and dark text for print */
          * {
            background: white !important;
            color: black !important;
            border-color: #e5e7eb !important;
          }
          /* Keep invoice header gradient for branding */
          .print-header {
            background: linear-gradient(to right, #1b212d, #2a3441) !important;
            color: white !important;
          }
          .print-header * {
            color: white !important;
          }
          /* Preserve brand colors for key elements */
          .print-accent {
            color: #29a073 !important;
          }
          .print-highlight {
            color: #1b212d !important;
            font-weight: 600 !important;
          }
        }
        @page {
          margin: 0.5in;
          size: A4;
        }
      `}</style>

      {/* Header Controls - Hidden on print */}
      <div className={`no-print sticky top-0 z-50 backdrop-blur-md border-b py-3 px-4 sm:py-4 sm:px-6 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#1c1a2e]/90 border-[#282541]' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className={`flex items-center gap-2 px-3 py-2 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-[#929eae] hover:text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back</span>
              </button>
              <DarkModeToggle />
            </div>
            <h1 className={`font-['Kumbh_Sans'] font-semibold text-lg ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Invoice Preview
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border rounded-lg transition-colors duration-200 text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-[#282541] text-[#929eae] border-[#201e34] hover:bg-[#343151] hover:text-white' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                  isDownloading 
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                    : 'bg-[#c8ee44] text-[#1b212d] hover:bg-[#b8de34]'
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <img src={downloadIcon} alt="Download" className="w-4 h-4" />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className={`flex items-center gap-2 px-4 py-2 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-[#929eae] hover:text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Edit
              </button>
              <div className={`h-6 w-px ${isDarkMode ? 'bg-[#282541]' : 'bg-gray-300'}`} />
              <h1 className={`font-['Kumbh_Sans'] font-semibold text-xl ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Invoice Preview
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-[#282541] text-[#929eae] border-[#201e34] hover:bg-[#343151] hover:text-white' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isDownloading 
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                    : 'bg-[#c8ee44] text-[#1b212d] hover:bg-[#b8de34]'
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <img src={downloadIcon} alt="Download" className="w-4 h-4" />
                    Download PDF
                  </>
                )}
              </button>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Preview Container */}
      <div className="py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Invoice Document */}
          <div 
            id="invoice-preview"
            className={`invoice-container shadow-lg sm:shadow-xl lg:shadow-2xl rounded-lg overflow-hidden transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-[#1e1c30] ring-1 ring-[#282541]' 
                : 'bg-white ring-1 ring-gray-200'
            }`}
          >
            {/* Invoice Header */}
            <div className="print-header bg-gradient-to-r from-[#1b212d] to-[#2a3441] px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img src={logoMainSmallWhite} alt="Company Logo" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                  <div className="text-white">
                    <h1 className="font-['Gordita'] font-bold text-lg sm:text-xl lg:text-2xl">Maglo.</h1>
                    <p className="font-['Kumbh_Sans'] text-xs sm:text-sm opacity-90">sales@maglo.com</p>
                  </div>
                </div>
                <div className="text-left sm:text-right text-white">
                  <h2 className="font-['Kumbh_Sans'] font-bold text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2">INVOICE</h2>
                  <p className="font-['Kumbh_Sans'] text-sm sm:text-base lg:text-lg font-semibold">{invoiceId}</p>
                </div>
              </div>
            </div>

            {/* Invoice Body */}
            <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
              {/* Company & Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* From */}
                <div>
                  <h3 className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide mb-3 ${
                    isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                  }`}>
                    From
                  </h3>
                  <div className="font-['Kumbh_Sans']">
                    <p className={`font-semibold text-lg mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Maglo.</p>
                    <p className={`mb-1 ${
                      isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                    }`}>1333 Grey Fox Farm Road</p>
                    <p className={`mb-1 ${
                      isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                    }`}>Houston, TX 77060</p>
                    <p className={isDarkMode ? 'text-[#929eae]' : 'text-gray-600'}>
                      Bloomfield Hills, Michigan(MI), 48301
                    </p>
                  </div>
                </div>

                {/* To */}
                <div>
                  <h3 className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide mb-3 ${
                    isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                  }`}>
                    Bill To
                  </h3>
                  <div className="font-['Kumbh_Sans']">
                    <p className={`font-semibold text-lg mb-1 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{clientName}</p>
                    <p className={`mb-1 ${
                      isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                    }`}>{clientEmail}</p>
                    <p className={`font-medium mb-1 ${
                      isDarkMode ? 'text-[#c8ee44]' : 'text-gray-700'
                    }`}>{companyName}</p>
                    <p className={isDarkMode ? 'text-[#929eae]' : 'text-gray-600'}>{companyAddress}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-[#282541]' : 'bg-gray-50'
              }`}>
                <div>
                  <h4 className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide mb-2 ${
                    isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                  }`}>
                    Invoice Date
                  </h4>
                  <p className={`font-['Kumbh_Sans'] font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{invoiceDate}</p>
                </div>
                <div>
                  <h4 className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide mb-2 ${
                    isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                  }`}>
                    Due Date
                  </h4>
                  <p className={`font-['Kumbh_Sans'] font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{dueDate}</p>
                </div>
                <div>
                  <h4 className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide mb-2 ${
                    isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                  }`}>
                    Invoice Number
                  </h4>
                  <p className={`font-['Kumbh_Sans'] font-semibold ${
                    isDarkMode ? 'text-[#c8ee44]' : 'text-gray-900'
                  }`}>{invoiceId}</p>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="mb-8">
                <h3 className={`font-['Kumbh_Sans'] font-semibold text-lg mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Invoice Items
                </h3>
                
                {invoiceItems.length === 0 ? (
                  <div className={`text-center py-12 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#282541]' : 'bg-gray-50'
                  }`}>
                    <svg className={`w-16 h-16 mx-auto mb-4 ${
                      isDarkMode ? 'text-[#78778b]' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className={`font-['Kumbh_Sans'] text-lg ${
                      isDarkMode ? 'text-[#929eae]' : 'text-gray-500'
                    }`}>No items added to this invoice</p>
                  </div>
                ) : (
                  <>
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden space-y-4">
                      {invoiceItems.map((item, index) => (
                        <div key={item.id || index} className={`border rounded-lg p-4 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-[#282541] border-[#201e34]' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="space-y-3">
                            <div>
                              <h4 className={`font-['Kumbh_Sans'] font-semibold text-sm mb-1 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.description}
                              </h4>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <span className={`block font-semibold text-xs uppercase tracking-wide mb-1 ${
                                  isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                                }`}>Qty</span>
                                <span className={`font-medium ${
                                  isDarkMode ? 'text-[#929eae]' : 'text-gray-700'
                                }`}>
                                  {item.qty}
                                </span>
                              </div>
                              <div className="text-center">
                                <span className={`block font-semibold text-xs uppercase tracking-wide mb-1 ${
                                  isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                                }`}>Rate</span>
                                <span className={`font-medium ${
                                  isDarkMode ? 'text-[#929eae]' : 'text-gray-700'
                                }`}>
                                  ${item.rate ? item.rate.toFixed(2) : '0.00'}
                                </span>
                              </div>
                              <div className="text-center">
                                <span className={`block font-semibold text-xs uppercase tracking-wide mb-1 ${
                                  isDarkMode ? 'text-[#78778b]' : 'text-gray-500'
                                }`}>Amount</span>
                                <span className={`font-bold text-base ${
                                  isDarkMode ? 'text-[#c8ee44]' : 'text-gray-900'
                                }`}>
                                  ${item.amount ? item.amount.toFixed(2) : '0.00'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Table Layout */}
                    <div className={`hidden lg:block overflow-hidden border rounded-lg transition-colors duration-300 ${
                      isDarkMode ? 'border-[#282541]' : 'border-gray-200'
                    }`}>
                      {/* Table Header */}
                      <div className={`px-6 py-4 grid grid-cols-12 gap-4 border-b transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-[#282541] border-[#201e34]' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="col-span-6">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide ${
                            isDarkMode ? 'text-[#78778b]' : 'text-gray-700'
                          }`}>
                            Description
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide ${
                            isDarkMode ? 'text-[#78778b]' : 'text-gray-700'
                          }`}>
                            Qty
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide ${
                            isDarkMode ? 'text-[#78778b]' : 'text-gray-700'
                          }`}>
                            Rate
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className={`font-['Kumbh_Sans'] font-semibold text-sm uppercase tracking-wide ${
                            isDarkMode ? 'text-[#78778b]' : 'text-gray-700'
                          }`}>
                            Amount
                          </span>
                        </div>
                      </div>

                      {/* Table Body */}
                      <div className={`transition-colors duration-300 ${
                        isDarkMode ? 'bg-[#1e1c30]' : 'bg-white'
                      }`}>
                        {invoiceItems.map((item, index) => (
                          <div key={item.id || index} className={`px-6 py-4 grid grid-cols-12 gap-4 border-b last:border-b-0 transition-colors duration-300 ${
                            isDarkMode ? 'border-[#282541]' : 'border-gray-100'
                          }`}>
                            <div className="col-span-6">
                              <p className={`font-['Kumbh_Sans'] font-medium leading-relaxed ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                            <div className="col-span-2 text-center">
                              <span className={`font-['Kumbh_Sans'] font-medium ${
                                isDarkMode ? 'text-[#929eae]' : 'text-gray-700'
                              }`}>
                                {item.qty}
                              </span>
                            </div>
                            <div className="col-span-2 text-center">
                              <span className={`font-['Kumbh_Sans'] font-medium ${
                                isDarkMode ? 'text-[#929eae]' : 'text-gray-700'
                              }`}>
                                ${item.rate ? item.rate.toFixed(2) : '0.00'}
                              </span>
                            </div>
                            <div className="col-span-2 text-right">
                              <span className={`font-['Kumbh_Sans'] font-semibold ${
                                isDarkMode ? 'text-[#c8ee44]' : 'text-gray-900'
                              }`}>
                                ${item.amount ? item.amount.toFixed(2) : '0.00'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Invoice Summary */}
              <div className="flex justify-center sm:justify-end">
                <div className="w-full sm:max-w-sm">
                  <div className={`p-4 sm:p-6 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#282541]' : 'bg-gray-50'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`font-['Kumbh_Sans'] font-medium ${
                          isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                        }`}>Subtotal:</span>
                        <span className={`font-['Kumbh_Sans'] font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          ${subtotal ? subtotal.toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-['Kumbh_Sans'] font-medium ${
                          isDarkMode ? 'text-[#929eae]' : 'text-gray-600'
                        }`}>Tax (0%):</span>
                        <span className={`font-['Kumbh_Sans'] font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          ${tax ? tax.toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className={`border-t pt-3 ${
                        isDarkMode ? 'border-[#201e34]' : 'border-gray-300'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className={`font-['Kumbh_Sans'] font-bold text-lg ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>Total:</span>
                          <span className="font-['Kumbh_Sans'] font-bold text-xl text-[#29a073]">
                            ${total ? total.toFixed(2) : '0.00'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-[#282541]' : 'border-gray-200'
              }`}>
                <div className="text-center">
                  <p className={`font-['Kumbh_Sans'] text-sm mb-2 ${
                    isDarkMode ? 'text-[#929eae]' : 'text-gray-500'
                  }`}>
                    Thank you for your business!
                  </p>
                  <p className={`font-['Kumbh_Sans'] text-xs ${
                    isDarkMode ? 'text-[#78778b]' : 'text-gray-400'
                  }`}>
                    This invoice was generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview
