import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDarkMode } from '../hooks/useDarkMode'
import { useNotification } from '../contexts/NotificationContext'
import DarkModeToggle from '../components/DarkModeToggle'
import figmaSideImage from '../assets/figma-side-image.png'
import figmaGoogleIcon from '../assets/icons/figma-google.svg'
import figmaUnderlineIcon from '../assets/icons/figma-underline.svg'
import figmaLogoIcon from '../assets/icons/figma-logo.svg'

const SignIn = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const { showSuccess, showError } = useNotification()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      showSuccess('Welcome back! You have been successfully signed in.', 'Sign In Successful')
      navigate('/dashboard')
    } catch (error) {
      console.error('Sign in error:', error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      showError(errorMessage, 'Sign In Failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      showSuccess(`Welcome ${result.user.displayName}! You have been successfully signed in with Google.`, 'Google Sign In Successful')
      navigate('/dashboard')
    } catch (error) {
      console.error('Google sign in error:', error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      showError(errorMessage, 'Google Sign In Failed')
    }
  }

  // Helper function to provide user-friendly error messages
  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address. Please check your email or sign up for a new account.'
      case 'auth/wrong-password':
        return 'Incorrect password. Please check your password and try again.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support for assistance.'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment before trying again.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.'
      case 'auth/popup-closed-by-user':
        return 'Sign in was cancelled. Please try again.'
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.'
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} relative w-full min-h-screen overflow-hidden transition-colors duration-300`} data-name="Sign In" data-node-id="122:1782">
      {/* Dark Mode Toggle - Positioned at top-right corner */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <DarkModeToggle />
      </div>
      
      {/* Main Content Container */}
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 xl:px-[135px]">
          <div className="w-full max-w-md space-y-6 lg:space-y-[25px]">
            {/* Logo - Mobile Only */}
            <div className="flex lg:hidden items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px]">
                  <img alt="" className="block max-w-none size-full" src={figmaLogoIcon} />
                </div>
                <div className={`font-['Gordita'] font-bold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}>
                  Maglo.
                </div>
              </div>
            </div>

            <div
              className="flex flex-col gap-[25px] items-start justify-start w-full"
              data-name="Sign In"
              data-node-id="133:2355"
            >
              {/* Title Section */}
              <div
                className="flex flex-col gap-2 items-start justify-start text-center sm:text-left w-full"
                data-name="Titel"
                data-node-id="132:1842"
              >
                <div
                  className={`font-['Kumbh_Sans'] font-semibold text-[24px] sm:text-[30px] leading-normal ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                  data-node-id="128:1827"
                >
                  Welcome back
                </div>
                <div
                  className="font-['Kumbh_Sans'] font-normal text-[#78778b] text-[14px] sm:text-[16px] leading-normal"
                  data-node-id="128:1828"
                >
                  Welcome back! Please enter your details
                </div>
              </div>
              
              {/* Form */}
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-5 items-start justify-start w-full"
                data-name="Main" 
                data-node-id="132:1841"
              >
                <div
                  className="flex flex-col gap-[5px] items-start justify-start w-full"
                  data-node-id="128:1809"
                >
                  {/* Email Input */}
                  <div
                    className="flex flex-col items-start justify-center w-full"
                    data-name="Input"
                    data-node-id="128:1810"
                  >
                    <div
                      className="flex flex-row gap-2.5 items-start justify-start py-2.5 w-full"
                      data-node-id="128:1811"
                    >
                      <div
                        className={`font-['Kumbh_Sans'] font-medium text-[14px] text-left whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                        data-node-id="128:1812"
                      >
                        Email
                      </div>
                    </div>
                    <div
                      className={`flex flex-row gap-[25px] items-center justify-start pb-4 pl-5 pr-[25px] pt-[15px] rounded-[10px] w-full border ${isDarkMode ? 'border-[#282541]' : 'border-[#f2f2f2]'}`}
                      data-node-id="128:1813"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="font-['Kumbh_Sans'] font-medium text-[#78778b] text-[14px] text-left whitespace-nowrap bg-transparent border-0 outline-none w-full placeholder:text-[#78778b]"
                        data-node-id="128:1814"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div
                    className="flex flex-col items-start justify-center w-full"
                    data-name="Input"
                    data-node-id="128:1815"
                  >
                    <div
                      className="flex flex-row gap-2.5 items-start justify-start py-2.5 w-full"
                      data-node-id="128:1816"
                    >
                      <div
                        className={`font-['Kumbh_Sans'] font-medium text-[14px] text-left whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                        data-node-id="128:1817"
                      >
                        Password
                      </div>
                    </div>
                    <div
                      className={`flex flex-row gap-[25px] h-12 items-center justify-start pb-4 pl-5 pr-[25px] pt-[15px] rounded-[10px] w-full border ${isDarkMode ? 'border-[#282541]' : 'border-[#f2f2f2]'} relative`}
                      data-node-id="128:1818"
                    >
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={`bg-transparent border-0 outline-none w-full font-['Kumbh_Sans'] font-medium text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 w-full"
                  data-node-id="128:1829"
                >
                  <div
                    className="flex flex-row gap-[9px] items-center justify-start"
                    data-name="Remember"
                    data-node-id="128:1830"
                  >
                    <div className="relative rounded-[3px] w-4 h-4" data-node-id="128:1831">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`absolute inset-0 rounded-[3px] border ${rememberMe ? 'border-[#c8ee44] bg-[#c8ee44]' : 'border-[#929eae] bg-transparent'} cursor-pointer`}
                        onClick={() => setRememberMe(!rememberMe)}
                      >
                        {rememberMe && (
                          <svg className="w-full h-full text-[#1b212d] p-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div
                      className={`font-['Kumbh_Sans'] font-medium text-[14px] text-left whitespace-nowrap cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                      data-node-id="128:1832"
                      onClick={() => setRememberMe(!rememberMe)}
                    >
                      Remember for 30 Days
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`font-['Kumbh_Sans'] font-medium text-[14px] whitespace-nowrap text-right cursor-pointer bg-transparent border-0 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                    data-node-id="128:1833"
                  >
                    Forgot password
                  </button>
                </div>
              </form>

              {/* Buttons Section */}
              <div
                className="flex flex-col gap-[25px] items-center justify-start w-full"
                data-name="Bottom"
                data-node-id="133:2354"
              >
                <div
                  className="flex flex-col gap-[15px] items-start justify-start w-full"
                  data-name="Buttons"
                  data-node-id="132:2347"
                >
                  {/* Sign In Button */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#c8ee44] flex flex-row gap-2.5 items-center justify-center px-5 py-3.5 rounded-[10px] w-full border-0 cursor-pointer hover:bg-[#b8de34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-name="Button"
                    data-node-id="128:1839"
                  >
                    <div
                      className="font-['Kumbh_Sans'] font-semibold text-[#1b212d] text-[16px] text-center whitespace-nowrap"
                      data-node-id="128:1840"
                    >
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </div>
                  </button>

                  {/* Google Sign In Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className={`flex flex-row gap-2.5 items-center justify-center p-[13px] rounded-[10px] w-full cursor-pointer transition-colors border ${isDarkMode ? 'bg-transparent border-[#282541] hover:bg-gray-800' : 'bg-white border-neutral-100 hover:bg-gray-50'}`}
                    data-name="Button"
                    data-node-id="132:2333"
                  >
                    <div className="relative w-6 h-6" data-name="Icon/Google" data-node-id="132:2341">
                      <img alt="" className="block max-w-none size-full" src={figmaGoogleIcon} />
                    </div>
                    <div
                      className="font-['Kumbh_Sans'] font-semibold text-[#78778b] text-[16px] text-left whitespace-nowrap"
                      data-node-id="132:2335"
                    >
                      Sign in with google
                    </div>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div
                  className="flex flex-col gap-2.5 items-center justify-center"
                  data-node-id="133:2353"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-['Kumbh_Sans'] font-normal text-[#929eae] text-[14px] leading-normal">
                      Don't have an account?
                    </span>
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className={`font-['Kumbh_Sans'] font-medium cursor-pointer bg-transparent border-0 p-0 text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                      >
                        Sign up for free
                      </button>
                      <div className="absolute top-6 left-0 h-[10.975px] w-24" data-node-id="133:2351">
                        <img alt="" className="block max-w-none size-full" src={figmaUnderlineIcon} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Image - Hidden on mobile/tablet */}
        <div className="hidden lg:flex lg:flex-1 relative" data-name="Image" data-node-id="134:2367">
          <img 
            src={figmaSideImage} 
            alt="Background" 
            className="w-full h-full object-cover"
            data-name="Image"
            data-node-id="133:2356"
          />
          <div
            className="absolute inset-0 bg-[#1b212d] opacity-10"
            data-name="Overlay"
            data-node-id="134:2366"
          />
        </div>
      </div>

      {/* Logo - Desktop Only */}
      <div
        className="hidden lg:flex absolute flex-row gap-3 items-center justify-start left-[135px] top-10"
        data-name="Logo"
        data-node-id="134:2359"
      >
        <div className="relative w-[30px] h-[30px]" data-name="Exclude" data-node-id="134:2360">
          <img alt="" className="block max-w-none size-full" src={figmaLogoIcon} />
        </div>
        <div
          className={`font-['Gordita'] font-bold h-[23px] text-[18px] w-20 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
          data-node-id="134:2363"
        >
          Maglo.
        </div>
      </div>
    </div>
  )
}

export default SignIn