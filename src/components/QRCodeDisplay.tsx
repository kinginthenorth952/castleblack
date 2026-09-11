export function QRCodeDisplay({ 
  value = '03493169701', 
  title = 'Scan this QR code to make payment.' 
}: { 
  value?: string; 
  title?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#11151A] rounded-2xl shadow-xl shadow-black/40 max-w-[240px] mx-auto border border-[#252B33]">
      <div className="relative w-44 h-44 bg-white p-2.5 rounded-xl flex items-center justify-center border border-[#343B45]">
        {/* Authentic SVG QR pattern */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
          {/* Top-Left Finder */}
          <rect x="5" y="5" width="28" height="28" fill="none" stroke="black" strokeWidth="4" rx="2" />
          <rect x="11" y="11" width="16" height="16" fill="black" rx="1" />

          {/* Top-Right Finder */}
          <rect x="67" y="5" width="28" height="28" fill="none" stroke="black" strokeWidth="4" rx="2" />
          <rect x="73" y="11" width="16" height="16" fill="black" rx="1" />

          {/* Bottom-Left Finder */}
          <rect x="5" y="67" width="28" height="28" fill="none" stroke="black" strokeWidth="4" rx="2" />
          <rect x="11" y="73" width="16" height="16" fill="black" rx="1" />

          {/* Timing Patterns */}
          <line x1="36" y1="18" x2="64" y2="18" stroke="black" strokeWidth="3" strokeDasharray="3 3" />
          <line x1="18" y1="36" x2="18" y2="64" stroke="black" strokeWidth="3" strokeDasharray="3 3" />

          {/* Simulated QR data modules grid */}
          <rect x="38" y="5" width="4" height="8" />
          <rect x="46" y="8" width="8" height="4" />
          <rect x="58" y="5" width="4" height="6" />

          <rect x="36" y="24" width="6" height="6" />
          <rect x="46" y="22" width="6" height="8" />
          <rect x="56" y="26" width="6" height="6" />

          <rect x="5" y="38" width="8" height="4" />
          <rect x="16" y="44" width="6" height="6" />
          <rect x="25" y="38" width="6" height="10" />

          <rect x="35" y="38" width="10" height="10" />
          <rect x="48" y="36" width="6" height="6" />
          <rect x="58" y="38" width="12" height="4" />
          <rect x="74" y="38" width="8" height="8" />
          <rect x="86" y="40" width="8" height="6" />

          <rect x="36" y="52" width="8" height="6" />
          <rect x="48" y="48" width="8" height="10" />
          <rect x="60" y="48" width="8" height="8" />
          <rect x="72" y="50" width="10" height="6" />
          <rect x="86" y="52" width="8" height="8" />

          <rect x="38" y="66" width="8" height="8" />
          <rect x="50" y="62" width="6" height="6" />
          <rect x="62" y="64" width="8" height="10" />
          <rect x="74" y="66" width="12" height="6" />

          <rect x="38" y="78" width="14" height="6" />
          <rect x="56" y="78" width="8" height="8" />
          <rect x="68" y="76" width="6" height="12" />
          <rect x="78" y="76" width="14" height="6" />

          <rect x="36" y="88" width="8" height="6" />
          <rect x="48" y="88" width="12" height="6" />
          <rect x="64" y="90" width="10" height="4" />
          <rect x="80" y="86" width="12" height="8" />

          {/* Center logo badge */}
          <rect x="42" y="42" width="16" height="16" rx="3" fill="#11151A" stroke="#D6B36A" strokeWidth="1" />
          <path d="M46 50 L50 46 L54 50 L50 54 Z" fill="#D6B36A" />
        </svg>
      </div>
      <p className="mt-3 text-xs font-medium text-[#F4F1EA] text-center tracking-tight">
        {title}
      </p>
      <span className="text-[11px] text-[#D6B36A] font-mono mt-0.5 font-medium">{value}</span>
    </div>
  );
}
