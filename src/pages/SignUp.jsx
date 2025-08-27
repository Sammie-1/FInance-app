import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDarkMode } from '../hooks/useDarkMode'
import { useNotification } from '../contexts/NotificationContext'
import DarkModeToggle from '../components/DarkModeToggle'
import LoadingButton from '../components/ui/LoadingButton'
import AuthLoadingOverlay from '../components/ui/AuthLoadingOverlay'
import figmaSideImage from '../assets/figma-side-image.png'
import figmaGoogleIcon from '../assets/icons/figma-google.svg'
import figmaUnderlineIcon from '../assets/icons/figma-underline.svg'
import figmaLogoIcon from '../assets/icons/figma-logo.svg'

const SignUp = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const { showSuccess, showError } = useNotification()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingProgress(0)
    
    try {
      // Simulate progress for better UX
      setLoadingProgress(15)
      
      // Add small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300))
      setLoadingProgress(40)
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setLoadingProgress(70)
      
      await updateProfile(userCredential.user, {
        displayName: fullName
      })
      setLoadingProgress(90)
      
      showSuccess(`Welcome ${fullName}! Your account has been created successfully.`, 'Account Created')
      setLoadingProgress(100)
      
      // Small delay before navigation for smooth transition
      await new Promise(resolve => setTimeout(resolve, 200))
      navigate('/dashboard')
    } catch (error) {
      console.error('Sign up error:', error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      showError(errorMessage, 'Sign Up Failed')
    } finally {
      setIsLoading(false)
      setLoadingProgress(0)
    }
  }

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider()
    setIsGoogleLoading(true)
    
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const result = await signInWithPopup(auth, provider)
      showSuccess(`Welcome ${result.user.displayName}! Your account has been created successfully with Google.`, 'Account Created')
      
      // Small delay before navigation
      await new Promise(resolve => setTimeout(resolve, 300))
      navigate('/dashboard')
    } catch (error) {
      console.error('Google sign up error:', error)
      const errorMessage = getFirebaseErrorMessage(error.code)
      showError(errorMessage, 'Google Sign Up Failed')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  // Helper function to provide user-friendly error messages
  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead or use a different email address.'
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password with at least 6 characters.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/operation-not-allowed':
        return 'Account creation is currently disabled. Please contact support for assistance.'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment before trying again.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.'
      case 'auth/popup-closed-by-user':
        return 'Sign up was cancelled. Please try again.'
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.'
      case 'auth/account-exists-with-different-credential':
        return 'An account with this email already exists using a different sign-in method. Please sign in with your original method.'
      default:
        return 'An unexpected error occurred during account creation. Please try again.'
    }
  }

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} relative w-full min-h-screen overflow-hidden transition-colors duration-300`} data-name="Sign Up" data-node-id="134:2419">
      {/* Loading Overlay */}
      <AuthLoadingOverlay 
        isVisible={isLoading && loadingProgress > 0}
        title="Creating your account..."
        subtitle="Please wait while we set up your profile"
        progress={loadingProgress}
      />
      
      {/* Dark Mode Toggle - Positioned at top-right corner */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
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
              data-node-id="134:2420"
            >
              {/* Title Section */}
              <div
                className="flex flex-col gap-2 items-start justify-start text-center sm:text-left w-full"
                data-name="Titel"
                data-node-id="134:2421"
              >
                <div
                  className={`font-['Kumbh_Sans'] font-semibold text-[24px] sm:text-[30px] leading-normal ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                  data-node-id="134:2422"
                >
                  Create new account
                </div>
                <div
                  className="font-['Kumbh_Sans'] font-normal text-[#78778b] text-[14px] sm:text-[16px] leading-normal"
                  data-node-id="134:2423"
                >
                  Give us some of your information to get free access to fieldly.
                </div>
              </div>
              
              {/* Form */}
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-5 items-start justify-start w-full"
                data-name="Main" 
                data-node-id="134:2424"
              >
                <div
                  className="flex flex-col gap-[5px] items-start justify-start w-full"
                  data-node-id="134:2425"
                >
                  {/* Full Name Input */}
                  <div
                    className="flex flex-col items-start justify-center w-full"
                    data-name="Input"
                    data-node-id="134:2426"
                  >
                    <div
                      className="flex flex-row gap-2.5 items-start justify-start py-2.5 w-full"
                      data-node-id="134:2427"
                    >
                      <div
                        className={`font-['Kumbh_Sans'] font-medium text-[14px] text-left whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                        data-node-id="134:2428"
                      >
                        Full Name
                      </div>
                    </div>
                    <div
                      className={`flex flex-row gap-[25px] items-center justify-start pb-4 pl-5 pr-[25px] pt-[15px] rounded-[10px] w-full border ${isDarkMode ? 'border-[#282541]' : 'border-[#f2f2f2]'}`}
                      data-node-id="134:2429"
                    >
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Mahfuzul Nabil"
                        className="font-['Kumbh_Sans'] font-medium text-[#78778b] text-[14px] text-left whitespace-nowrap bg-transparent border-0 outline-none w-full placeholder:text-[#78778b]"
                        data-node-id="134:2430"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div
                    className="flex flex-col items-start justify-center w-full"
                    data-name="Input"
                    data-node-id="134:2553"
                  >
                    <div
                      className="flex flex-row gap-2.5 items-start justify-start py-2.5 w-full"
                      data-node-id="134:2554"
                    >
                      <div
                        className={`font-['Kumbh_Sans'] font-medium text-[14px] text-left whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                        data-node-id="134:2555"
                      >
                        Email
                      </div>
                    </div>
                    <div
                      className={`flex flex-row gap-[25px] items-center justify-start pb-4 pl-5 pr-[25px] pt-[15px] rounded-[10px] w-full border ${isDarkMode ? 'border-[#282541]' : 'border-[#f2f2f2]'}`}
                      data-node-id="134:2556"
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="font-['Kumbh_Sans'] font-medium text-[#78778b] text-[14px] text-left whitespace-nowrap bg-transparent border-0 outline-none w-full placeholder:text-[#78778b]"
                        data-node-id="134:2557"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div
                    className="flex flex-col items-start justify-center w-full"
                    data-name="Input"
                    data-node-id="134:2541"
                  >
                    <div
                      className="flex flex-row gap-2.5 items-start justify-start py-2.5 w-full"
                      data-node-id="134:2542"
                    >
                      <div
                        className={`font-['Kumbh_Sans'] font-medium text-[14px] text-left whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                        data-node-id="134:2543"
                      >
                        Password
                      </div>
                    </div>
                    <div
                      className={`flex flex-row gap-[25px] h-12 items-center justify-start pb-4 pl-5 pr-[25px] pt-[15px] rounded-[10px] w-full border ${isDarkMode ? 'border-[#282541]' : 'border-[#f2f2f2]'} relative`}
                      data-node-id="134:2544"
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
              </form>

              {/* Buttons Section */}
              <div
                className="flex flex-col gap-[25px] items-center justify-start w-full"
                data-name="Bottom"
                data-node-id="134:2448"
              >
                <div
                  className="flex flex-col gap-[15px] items-start justify-start w-full"
                  data-name="Buttons"
                  data-node-id="134:2449"
                >
                  {/* Create Account Button */}
                  <LoadingButton
                    type="submit"
                    onClick={handleSubmit}
                    loading={isLoading}
                    loadingText="Creating Account..."
                    variant="primary"
                    size="md"
                    className="w-full"
                    data-name="Button"
                    data-node-id="134:2450"
                  >
                    Create Account
                  </LoadingButton>

                  {/* Google Sign Up Button */}
                  <LoadingButton
                    type="button"
                    onClick={handleGoogleSignUp}
                    loading={isGoogleLoading}
                    loadingText="Connecting with Google..."
                    variant="secondary"
                    size="md"
                    className="w-full"
                    data-name="Button"
                    data-node-id="134:2452"
                  >
                    <div className="relative w-6 h-6" data-name="Icon/Google" data-node-id="134:2453">
                      <img alt="" className="block max-w-none size-full" src={figmaGoogleIcon} />
                    </div>
                    Sign up with Google
                  </LoadingButton>
                </div>

                {/* Sign In Link */}
                <div
                  className="flex flex-col gap-2.5 items-center justify-center"
                  data-node-id="134:2459"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-['Kumbh_Sans'] font-normal text-[#929eae] text-[14px] leading-normal">
                      Already have an account?
                    </span>
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => navigate('/signin')}
                        className={`font-['Kumbh_Sans'] font-medium cursor-pointer bg-transparent border-0 p-0 text-[14px] ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
                      >
                        Sign in
                      </button>
                      <div className="absolute -bottom-1 left-0 h-[5px] w-[43px]" data-node-id="134:2461">
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
        <div className="hidden lg:flex lg:flex-1 relative" data-name="Image" data-node-id="134:2462">
          <img 
            src={figmaSideImage} 
            alt="Background" 
            className="w-full h-full object-cover"
            data-name="Image"
            data-node-id="134:2463"
          />
          <div
            className="absolute inset-0 bg-[#1b212d] opacity-10"
            data-name="Overlay"
            data-node-id="134:2464"
          />
        </div>
      </div>

      {/* Logo - Desktop Only */}
      <div
        className="hidden lg:flex absolute flex-row gap-3 items-center justify-start left-[135px] top-10"
        data-name="Logo"
        data-node-id="134:2465"
      >
        <div className="relative w-[30px] h-[30px]" data-name="Exclude" data-node-id="134:2466">
          <img alt="" className="block max-w-none size-full" src={figmaLogoIcon} />
        </div>
        <div
          className={`font-['Gordita'] font-bold h-[23px] text-[18px] w-20 ${isDarkMode ? 'text-white' : 'text-[#1b212d]'}`}
          data-node-id="134:2469"
        >
          Maglo.
        </div>
      </div>
    </div>
  )
}

export default SignUp
