import React from 'react';

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
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  if (customLogoUrl) {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
        <img 
          src={customLogoUrl} 
          alt="Sikka Poultry Farm Logo" 
          className="w-full h-full object-contain rounded-full drop-shadow-md"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Sikka Poultry Farm Circular Shield Emblem from Screenshot */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="nsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="30%" stopColor="#F5BE27" />
            <stop offset="70%" stopColor="#D09009" />
            <stop offset="100%" stopColor="#B47304" />
          </linearGradient>
          <linearGradient id="nsShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A241D" />
            <stop offset="100%" stopColor="#14110E" />
          </linearGradient>
          <radialGradient id="nsCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFDF9" />
            <stop offset="100%" stopColor="#F7EEDD" />
          </radialGradient>
        </defs>

        {/* Outer Circular Badge */}
        <circle cx="50" cy="50" r="48" fill="url(#nsCenterGlow)" stroke="url(#nsGoldGrad)" strokeWidth="3" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="#ECCB8D" strokeWidth="0.8" opacity="0.6" />

        {/* Dark Heraldic Shield */}
        <path 
          d="M50,17 L69,25 L69,45 C69,57 59,67 50,71 C41,67 31,57 31,45 L31,25 Z" 
          fill="url(#nsShieldGrad)" 
          stroke="url(#nsGoldGrad)" 
          strokeWidth="2.2" 
        />

        {/* Inner Shield Rim Accent */}
        <path 
          d="M50,21 L65,28 L65,44 C65,54 57,63 50,66 C43,63 35,54 35,44 L35,28 Z" 
          fill="none" 
          stroke="#524332" 
          strokeWidth="0.8" 
        />

        {/* Golden Chart Bars */}
        <rect x="38" y="44" width="3.5" height="10" rx="0.8" fill="url(#nsGoldGrad)" />
        <rect x="44" y="38" width="3.5" height="16" rx="0.8" fill="url(#nsGoldGrad)" />
        <rect x="50" y="32" width="3.5" height="22" rx="0.8" fill="url(#nsGoldGrad)" />
        <rect x="56" y="27" width="3.5" height="27" rx="0.8" fill="url(#nsGoldGrad)" />

        {/* Diagonal Growth Line and Arrow */}
        <path 
          d="M36,46 L47,35 L53,40 L63,25" 
          fill="none" 
          stroke="#FFF6D8" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <polygon points="63,25 57,25 63,31" fill="#FFF6D8" />

        {/* Text: SIKKA */}
        <text 
          x="50" 
          y="80.5" 
          textAnchor="middle" 
          fontSize="7.5" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="0.8" 
          fill="#5C4015"
        >
          SIKKA
        </text>

        {/* Horizontal Dividers and POULTRY FARM */}
        <line x1="24" y1="86" x2="31" y2="86" stroke="#D09009" strokeWidth="1" strokeLinecap="round" />
        <text 
          x="50" 
          y="88.5" 
          textAnchor="middle" 
          fontSize="4.8" 
          fontWeight="700" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          letterSpacing="0.6" 
          fill="#8C5D14"
        >
          POULTRY FARM
        </text>
        <line x1="69" y1="86" x2="76" y2="86" stroke="#D09009" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export const SikkaPoultryFarmLogo = PrimeInvestLogo;
export const SarmayaXProfitLogo = PrimeInvestLogo;
export const NationalSavingsLogo = PrimeInvestLogo;

export function EasypaisaLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-[#00A859] text-white font-bold text-[10px] ${className}`}>
      EP
    </div>
  );
}

export function JazzcashLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-[#E4002B] text-white font-bold text-[10px] ${className}`}>
      JC
    </div>
  );
}
