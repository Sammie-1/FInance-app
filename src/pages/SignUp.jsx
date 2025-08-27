import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import { useDarkMode } from '../hooks/useDarkMode'
import DarkModeToggle from '../components/DarkModeToggle'
import figmaSideImage from '../assets/figma-side-image.png'
import figmaGoogleIcon from '../assets/icons/figma-google.svg'
import figmaUnderlineIcon from '../assets/icons/figma-underline.svg'
import figmaLogoIcon from '../assets/icons/figma-logo.svg'

const SignUp = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: fullName
      })
      console.log('Sign up successful:', userCredential.user)
      navigate('/dashboard')
    } catch (error) {
      console.error('Sign up error:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log('Google sign up successful:', result.user)
      navigate('/dashboard')
    } catch (error) {
      console.error('Google sign up error:', error)
      alert(error.message)
    }
  }

  return (
    <div className={`${isDarkMode ? 'bg-[#1c1a2e]' : 'bg-white'} relative w-full min-h-screen overflow-hidden transition-colors duration-300`} data-name="Sign Up" data-node-id="134:2419">
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
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#c8ee44] flex flex-row gap-2.5 items-center justify-center px-5 py-3.5 rounded-[10px] w-full border-0 cursor-pointer hover:bg-[#b8de34] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-name="Button"
                    data-node-id="134:2450"
                  >
                    <div
                      className="font-['Kumbh_Sans'] font-semibold text-[#1b212d] text-[16px] text-center whitespace-nowrap"
                      data-node-id="134:2451"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </div>
                  </button>

                  {/* Google Sign Up Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className={`flex flex-row gap-2.5 items-center justify-center p-[13px] rounded-[10px] w-full cursor-pointer transition-colors border ${isDarkMode ? 'bg-transparent border-[#282541] hover:bg-gray-800' : 'bg-white border-neutral-100 hover:bg-gray-50'}`}
                    data-name="Button"
                    data-node-id="134:2452"
                  >
                    <div className="relative w-6 h-6" data-name="Icon/Google" data-node-id="134:2453">
                      <img alt="" className="block max-w-none size-full" src={figmaGoogleIcon} />
                    </div>
                    <div
                      className="font-['Kumbh_Sans'] font-semibold text-[#78778b] text-[16px] text-left whitespace-nowrap"
                      data-node-id="134:2458"
                    >
                      Sign up with google
                    </div>
                  </button>
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
