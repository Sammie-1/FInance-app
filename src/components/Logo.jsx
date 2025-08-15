const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-[30px] h-[30px] relative">
        <div className="w-full h-full bg-[#1b212d] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      </div>
      <span className="font-bold text-[18px] text-[#1b212d] leading-none">
        Maglo.
      </span>
    </div>
  )
}

export default Logo
