interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 40, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Солнце */}
        <circle cx="130" cy="55" r="18" fill="#FFD600"/>
        <line x1="130" y1="28" x2="130" y2="20" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="130" y1="82" x2="130" y2="90" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="103" y1="55" x2="95" y2="55" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="157" y1="55" x2="165" y2="55" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="111" y1="36" x2="105" y2="30" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="149" y1="74" x2="155" y2="80" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="149" y1="36" x2="155" y2="30" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        <line x1="111" y1="74" x2="105" y2="80" stroke="#FFD600" strokeWidth="4" strokeLinecap="round"/>
        {/* Волны */}
        <path d="M 30 110 Q 45 98 60 110 Q 75 122 90 110" stroke="#1E90FF" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M 30 128 Q 45 116 60 128 Q 75 140 90 128" stroke="#1E90FF" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Чайка */}
        <path d="M 55 88 Q 65 78 75 83 Q 85 78 95 88" stroke="#00B09B" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Стрелка */}
        <path d="M 120 95 L 165 120 L 120 145" stroke="#E8251A" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {showText && (
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-widest text-black leading-none">ТАГАНРОГ</p>
          <p className="text-xs font-bold tracking-widest text-red-600 leading-none">TRAVEL MIX</p>
        </div>
      )}
    </div>
  );
}
