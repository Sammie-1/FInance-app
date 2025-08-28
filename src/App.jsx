import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import NotificationContainer from './components/ui/NotificationContainer'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Invoices from './pages/Invoices'
import CreateInvoice from './pages/CreateInvoice'
import NewInvoice from './pages/NewInvoice'
import InvoicePreview from './pages/InvoicePreview'
import Transactions from './pages/Transactions'
import MyWallets from './pages/MyWallets'
import Dashboard from './pages/Dashboard'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return currentUser ? children : <Navigate to="/signin" />
}

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth()
  return !currentUser ? children : <Navigate to="/dashboard" />
}

function App() {
  return (
    <DarkModeProvider>
      <NotificationProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/create-invoice" element={<ProtectedRoute><CreateInvoice /></ProtectedRoute>} />
              <Route path="/new-invoice" element={<ProtectedRoute><NewInvoice /></ProtectedRoute>} />
              <Route path="/invoice-preview" element={<ProtectedRoute><InvoicePreview /></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
              <Route path="/my-wallets" element={<ProtectedRoute><MyWallets /></ProtectedRoute>} />
            </Routes>
            <NotificationContainer />
          </AuthProvider>
        </Router>
      </NotificationProvider>
    </DarkModeProvider>
  )
}

export default App
