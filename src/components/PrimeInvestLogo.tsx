export function PrimeInvestLogo({ 
  size = 'md', 
  className = '',
  customLogoUrl
}: { 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  className?: string;
  customLogoUrl?: string;
}) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  if (customLogoUrl) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
        <img 
          src={customLogoUrl} 
          alt="Site Logo" 
          className="w-full h-full object-contain rounded-2xl drop-shadow-md"
          onError={(e) => {
            // fallback if custom image fails to load
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Subtle metallic frame */}
      <div className="relative w-full h-full rounded-xl p-[1px] bg-gradient-to-b from-[#D6B36A]/40 via-[#252B33] to-[#1D232A] shadow-md shadow-black/40">
        <div className="w-full h-full rounded-[11px] bg-[#11151A] flex items-center justify-center overflow-hidden border border-[#252B33]">
          <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5C783" />
                <stop offset="50%" stopColor="#D6B36A" />
                <stop offset="100%" stopColor="#A88745" />
              </linearGradient>
            </defs>
            {/* Elegant Geometric Emblem */}
            <polygon points="50,10 85,28 85,72 50,90 15,72 15,28" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
            <polygon points="50,18 78,32 78,68 50,82 22,68 22,32" fill="#171C22" stroke="#252B33" strokeWidth="1" />
            
            {/* Geometric Growth Symbol */}
            <path d="M32,60 L42,46 L50,54 L58,46 L68,60 Z" fill="url(#goldGrad)" opacity="0.9" />
            <path d="M30,58 L45,43 L55,51 L70,36" fill="none" stroke="#E5C783" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="70,32 73,39 65,37" fill="#E5C783" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const TradeApexLogo = PrimeInvestLogo;
export const SarmayaXProfitLogo = PrimeInvestLogo;

export function EasypaisaLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`relative rounded-lg bg-[#10231A] border border-[#63B889]/30 p-1 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full text-[#63B889] fill-current">
        <circle cx="20" cy="20" r="16" fill="#10231A" stroke="#63B889" strokeWidth="1.5" />
        <path d="M12,20 C12,15.5 15.5,12 20,12 C24.5,12 28,15.5 28,20 C28,24.5 24.5,28 20,28 C16.5,28 13.5,25.8 12.4,22.7" fill="none" stroke="#63B889" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="#63B889" />
      </svg>
    </div>
  );
}

export function JazzcashLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`relative rounded-lg bg-[#291516] border border-[#D36B6B]/30 p-1 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle cx="20" cy="20" r="16" fill="#291516" stroke="#D36B6B" strokeWidth="1.5" />
        <text x="20" y="25" textAnchor="middle" fill="#D36B6B" fontWeight="800" fontSize="12" fontFamily="sans-serif">JC</text>
      </svg>
    </div>
  );
}
