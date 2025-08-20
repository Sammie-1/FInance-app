import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Invoices from './pages/Invoices'
import CreateInvoice from './pages/CreateInvoice'
import NewInvoice from './pages/NewInvoice'
import Transactions from './pages/Transactions'
import MyWallets from './pages/MyWallets'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/new-invoice" element={<NewInvoice />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/my-wallets" element={<MyWallets />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        </Routes>
      </Router>
    </DarkModeProvider>
  )
}

export default App
