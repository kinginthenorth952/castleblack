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
          alt="Sikka Poultry Farm Logo" 
          className="w-full h-full object-contain rounded-2xl drop-shadow-md"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* National Savings Emerald Green & Sovereign Gold Emblem */}
      <div className="relative w-full h-full rounded-xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#006A4E] to-[#044E29] shadow-md shadow-[#006A4E]/25">
        <div className="w-full h-full rounded-[10px] bg-[#044E29] flex items-center justify-center overflow-hidden border border-[#087A5B]">
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
            <defs>
              <linearGradient id="sikkaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="80%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#044E29" />
              </linearGradient>
            </defs>

            {/* Shield Frame */}
            <path 
              d="M50,8 L84,22 L84,54 C84,72 68,88 50,94 C32,88 16,72 16,54 L16,22 Z" 
              fill="url(#emeraldGrad)" 
              stroke="url(#sikkaGoldGrad)" 
              strokeWidth="2.5" 
            />

            {/* Inner Shield Accent */}
            <path 
              d="M50,15 L78,26 L78,52 C78,67 65,81 50,86 C35,81 22,67 22,52 L22,26 Z" 
              fill="#064E3B" 
              opacity="0.85" 
            />

            {/* Golden Star at Apex */}
            <polygon 
              points="50,18 52,24 58,24 53,28 55,34 50,30 45,34 47,28 42,24 48,24" 
              fill="url(#sikkaGoldGrad)" 
            />

            {/* Stylized Poultry Rooster & Agro Growth Silhouette */}
            {/* Rooster Comb */}
            <path 
              d="M48,34 C48,32 50,31 52,32 C54,30 57,32 57,34 C59,33 61,35 60,37 L48,37 Z" 
              fill="url(#sikkaGoldGrad)" 
            />
            {/* Rooster Head & Beak */}
            <path 
              d="M47,37 Q55,37 57,41 Q62,41 64,43 Q60,45 57,46 Q56,53 49,55 Q43,53 43,45 Q43,39 47,37 Z" 
              fill="url(#sikkaGoldGrad)" 
            />
            {/* Eye */}
            <circle cx="52" cy="41" r="1.5" fill="#044E29" />
            {/* Wattle */}
            <path d="M54,46 C55,49 53,51 51,50 Z" fill="#EF4444" />

            {/* Twin Golden Wheat Ears (National Savings Symbolism) */}
            {/* Left Wheat */}
            <path d="M30,52 Q32,58 35,62 M28,55 Q34,56 36,60 M27,61 Q34,62 38,65 M38,65 Q45,74 50,78" fill="none" stroke="url(#sikkaGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Right Wheat */}
            <path d="M70,52 Q68,58 65,62 M72,55 Q66,56 64,60 M73,61 Q66,62 62,65 M62,65 Q55,74 50,78" fill="none" stroke="url(#sikkaGoldGrad)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Center Growth Ribbons */}
            <path d="M42,67 L50,60 L58,67 L50,73 Z" fill="url(#sikkaGoldGrad)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export const SikkaPoultryFarmLogo = PrimeInvestLogo;
export const SarmayaXProfitLogo = PrimeInvestLogo;
export const TradeApexLogo = PrimeInvestLogo;

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
