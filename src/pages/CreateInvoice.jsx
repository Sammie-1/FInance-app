import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'

const formatDateForDisplay = (value) => {
  if (!value) return ''
  const date = new Date(value)
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  // e.g. 14 Apr 2022
  return formatter.format(date).replace(/\./g, '')
}

const CreateInvoice = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()

  const [form, setForm] = useState({
    invoiceId: '',
    clientName: '',
    clientEmail: '',
    companyName: '',
    companyAddress: '',
    invoiceDate: '',
    dueDate: ''
  })

  const isValid = useMemo(() => {
    return (
      (form.clientName?.trim()?.length ?? 0) > 0 &&
      (form.clientEmail?.trim()?.length ?? 0) > 0 &&
      (form.companyName?.trim()?.length ?? 0) > 0 &&
      (form.companyAddress?.trim()?.length ?? 0) > 0 &&
      (form.invoiceDate?.length ?? 0) > 0 &&
      (form.dueDate?.length ?? 0) > 0
    )
  }, [form])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const invoiceId = form.invoiceId?.trim() || `MGL${Math.floor(100000 + Math.random() * 900000)}`
    const invoiceData = {
      invoiceId,
      clientName: form.clientName.trim(),
      clientEmail: form.clientEmail.trim(),
      companyName: form.companyName.trim(),
      companyAddress: form.companyAddress.trim(),
      invoiceDate: formatDateForDisplay(form.invoiceDate),
      dueDate: formatDateForDisplay(form.dueDate)
    }
    navigate('/new-invoice', { state: invoiceData })
  }

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} min-h-screen transition-colors duration-300`}> 
      <div className="flex justify-center items-start sm:items-center p-6">
        <form
          onSubmit={handleSubmit}
          className={`${isDarkMode ? 'bg-[#1e1c30] border-[#201e34]' : 'bg-white border-neutral-100'} w-full max-w-[640px] border rounded-[12px] p-6 sm:p-8 shadow-sm`}
        >
          <h2 className={`font-['Kumbh_Sans'] text-[20px] sm:text-[22px] font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
            Create Invoice
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="flex flex-col gap-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Invoice ID (optional)</label>
              <input
                name="invoiceId"
                value={form.invoiceId}
                onChange={handleChange}
                placeholder="e.g. MGL524874"
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white placeholder-[#78778b]' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d] placeholder-[#929eae]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Client Name</label>
              <input
                required
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="e.g. Sajib Rahman"
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white placeholder-[#78778b]' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d] placeholder-[#929eae]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Client Email</label>
              <input
                required
                type="email"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
                placeholder="e.g. rahmansajib@uihut.com"
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white placeholder-[#78778b]' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d] placeholder-[#929eae]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Company Name</label>
              <input
                required
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="e.g. UIHUT Agency LTD"
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white placeholder-[#78778b]' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d] placeholder-[#929eae]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Company Address</label>
              <input
                required
                name="companyAddress"
                value={form.companyAddress}
                onChange={handleChange}
                placeholder="e.g. 3471 Rainy Day Drive Tulsa, USA"
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white placeholder-[#78778b]' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d] placeholder-[#929eae]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Invoice Date</label>
              <input
                required
                type="date"
                name="invoiceDate"
                value={form.invoiceDate}
                onChange={handleChange}
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-['Kumbh_Sans'] text-[14px] ${isDarkMode ? 'text-[#929eae]' : 'text-[#78778b]'}`}>Due Date</label>
              <input
                required
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className={`${isDarkMode ? 'bg-[#282541] border-[#201e34] text-white' : 'bg-[#f8f8f8] border-neutral-100 text-[#1b212d]'} rounded-[10px] px-4 py-3 border outline-none`}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={!isValid}
              className={`px-5 py-3.5 rounded-[10px] font-['Kumbh_Sans'] font-semibold text-[14px] ${isValid ? 'bg-[#c8ee44] text-[#1b212d] hover:bg-[#b8de34] active:bg-[#a8ce24]' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => navigate('/invoices')}
              className={`${isDarkMode ? 'border-[#201e34] text-white hover:bg-[#282541]' : 'border-neutral-100 text-[#1b212d] hover:bg-gray-50'} border px-5 py-3.5 rounded-[10px] font-['Kumbh_Sans'] font-medium text-[14px]`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateInvoice