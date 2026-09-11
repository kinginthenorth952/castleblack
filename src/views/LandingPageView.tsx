import React, { useState, useMemo } from 'react';
import { 
  Lock, 
  UserPlus, 
  LogIn, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ArrowUpRight, 
  ChevronRight, 
  Calculator, 
  Award, 
  CircleDollarSign,
  PhoneCall,
  Flame,
  Wheat,
  Feather
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';

type PoultryCommodity = {
  id: string;
  symbol: string;
  name: string;
  unit: string;
  price: string;
  priceNum: number;
  change: string;
  isPositive: boolean;
  category: 'Live Bird' | 'Farm Eggs' | 'Hatchery' | 'Agro Feed' | 'National Rate';
  high: string;
  low: string;
  volume: string;
  chartPoints: number[];
};

const POULTRY_COMMODITIES: PoultryCommodity[] = [
  { 
    id: 'broiler',
    symbol: 'SIKKA-BROILER', 
    name: 'Sikka Live Broiler Chicken', 
    unit: 'Per Kg', 
    price: 'Rs 435', 
    priceNum: 435, 
    change: '+2.4%', 
    isPositive: true, 
    category: 'Live Bird',
    high: 'Rs 442',
    low: 'Rs 420',
    volume: '142,000 Kg',
    chartPoints: [415, 418, 422, 420, 428, 431, 429, 435]
  },
  { 
    id: 'eggs',
    symbol: 'SIKKA-EGGS', 
    name: 'Farm Fresh Commercial Layer Eggs', 
    unit: 'Per Crate (30)', 
    price: 'Rs 298', 
    priceNum: 298, 
    change: '+1.7%', 
    isPositive: true, 
    category: 'Farm Eggs',
    high: 'Rs 305',
    low: 'Rs 290',
    volume: '85,000 Crates',
    chartPoints: [285, 288, 290, 292, 290, 295, 294, 298]
  },
  { 
    id: 'chicks',
    symbol: 'DAY-OLD-CHICKS', 
    name: 'Vaccinated Day-Old Hatchery Chicks', 
    unit: 'Per Chick', 
    price: 'Rs 69', 
    priceNum: 69, 
    change: '+3.1%', 
    isPositive: true, 
    category: 'Hatchery',
    high: 'Rs 72',
    low: 'Rs 65',
    volume: '320,000 Units',
    chartPoints: [62, 64, 63, 66, 67, 68, 67, 69]
  },
  { 
    id: 'feed',
    symbol: 'POULTRY-FEED-4', 
    name: 'High Protein Broiler Finisher Feed', 
    unit: '50 Kg Bag', 
    price: 'Rs 7,850', 
    priceNum: 7850, 
    change: '+0.5%', 
    isPositive: true, 
    category: 'Agro Feed',
    high: 'Rs 7,900',
    low: 'Rs 7,780',
    volume: '42,000 Bags',
    chartPoints: [7750, 7780, 7800, 7810, 7820, 7830, 7840, 7850]
  },
  { 
    id: 'gold',
    symbol: 'PKR-GOLD-TOLA', 
    name: 'National Savings Gold Rate Benchmark', 
    unit: 'Per Tola (24K)', 
    price: 'Rs 284,500', 
    priceNum: 284500, 
    change: '+0.8%', 
    isPositive: true, 
    category: 'National Rate',
    high: 'Rs 286,000',
    low: 'Rs 283,000',
    volume: 'National Index',
    chartPoints: [281000, 282500, 282000, 283400, 283900, 284200, 284100, 284500]
  },
  { 
    id: 'yield',
    symbol: 'SIKKA-INDEX', 
    name: 'Sikka Farm Livestock Yield Index', 
    unit: 'Points', 
    price: '1,492.5', 
    priceNum: 1492.5, 
    change: '+2.8%', 
    isPositive: true, 
    category: 'Live Bird',
    high: '1,505.0',
    low: '1,450.0',
    volume: 'Composite',
    chartPoints: [1420, 1435, 1448, 1460, 1455, 1475, 1482, 1492]
  }
];

export function LandingPageView() {
  const { settings, plans, setCurrentView } = useApp();
  
  // Selected Commodity for Live Yield Chart
  const [selectedCommodity, setSelectedCommodity] = useState<PoultryCommodity>(POULTRY_COMMODITIES[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Profit Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(2580);

  // Computed Calculator Returns (based on ~25% daily return 60-day cycle standard in platform)
  const calcResults = useMemo(() => {
    const daily = Math.round(calcAmount * 0.25);
    const weekly = daily * 7;
    const monthly = daily * 30;
    const totalReturn = daily * 60;
    const netProfit = totalReturn - calcAmount;
    return { daily, weekly, monthly, totalReturn, netProfit };
  }, [calcAmount]);

  const siteTitle = settings?.siteName || 'Sikka Poultry Farm';

  return (
    <div className="min-h-screen bg-[#F4F8F5] flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4 selection:bg-[#006A4E] selection:text-white transition-colors duration-300">
      
      {/* Centered Mobile/Desktop Container */}
      <div className="w-full max-w-[480px] bg-white sm:rounded-[32px] border border-[#D1E7DD] shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-0 sm:my-auto transition-all">
        
        {/* National Savings Official Top Ticker */}
        <div className="bg-[#006A4E] text-white px-3.5 py-1.5 flex items-center justify-between text-[11px] font-semibold tracking-wide">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
            <span className="truncate">
              📢 <strong>Sikka Poultry Farm</strong> • Daily Profits Disbursed at 12:00 AM • Automated IBFT / Easypaisa
            </span>
          </div>
          <span className="shrink-0 text-[10px] uppercase font-bold text-[#FDE68A] bg-[#044E29] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
            OFFICIAL
          </span>
        </div>

        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b border-[#D1E7DD] bg-white/95 backdrop-blur-md">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <PrimeInvestLogo size="md" customLogoUrl={settings?.logoUrl} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-[#0F2D1F] group-hover:text-[#006A4E] transition-colors">
                  {siteTitle}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-[#ECFDF5] text-[#006A4E] border border-[#006A4E]/30 uppercase">
                  VERIFIED
                </span>
              </div>
              <span className="block text-[10px] font-bold text-[#5E7E6F] uppercase tracking-wider font-mono">
                Sikka Poultry Farm & Savings
              </span>
            </div>
          </div>

          {/* Settings / Info Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettingsModal(true)}
              title="Platform Settings & Info"
              className="p-2 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] text-[#0F2D1F] hover:bg-[#E1EFE8] transition-all shadow-xs"
            >
              <Settings className="w-4 h-4 text-[#006A4E]" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* ========================================================= */}
          {/* HERO CARD: NATIONAL SAVINGS & SIKKA POULTRY FARM           */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-5 border border-[#D1E7DD] bg-gradient-to-b from-[#F0FDF4] via-white to-[#F4F8F5] relative overflow-hidden shadow-lg space-y-4 text-center">
            
            {/* Top Emerald/Gold Glow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-28 bg-[#006A4E]/10 blur-3xl rounded-full pointer-events-none" />

            {/* National Agro-Savings Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006A4E]/10 border border-[#006A4E]/30 text-[10px] font-extrabold text-[#006A4E] tracking-wider uppercase mx-auto">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>NATIONAL SAVINGS & POULTRY SCHEMES</span>
            </div>

            {/* Hero Heading */}
            <div className="space-y-1">
              <h1 className="text-sm font-bold text-[#5E7E6F] uppercase tracking-wider">
                Official Agro-Livestock Savings Portal
              </h1>
              <h2 className="text-2xl font-black tracking-tight text-[#0F2D1F]">
                Welcome to{' '}
                <span className="text-[#006A4E] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                  {siteTitle}
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs text-[#5E7E6F] leading-relaxed max-w-[360px] mx-auto font-medium">
              Invest directly in commercial broiler sheds, egg layer units, and automated hatcheries. 
              Enjoy daily profit credits to your mobile wallet with instant withdrawals.
            </p>

            {/* Center Illuminated National Emblem */}
            <div className="py-2 flex justify-center items-center">
              <div className="relative">
                {/* Outer Ring Pulse */}
                <div className="absolute inset-0 rounded-full bg-[#006A4E]/20 blur-md animate-pulse" />
                
                {/* Center Badge Frame */}
                <div className="relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#D4AF37] via-[#006A4E] to-[#044E29] shadow-xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <PrimeInvestLogo size="lg" customLogoUrl={settings?.logoUrl} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-white border border-[#D1E7DD] text-center shadow-xs">
              <div>
                <div className="text-sm font-black text-[#006A4E]">18,400+</div>
                <div className="text-[9px] font-bold text-[#5E7E6F] uppercase">Active Savers</div>
              </div>
              <div className="border-x border-[#D1E7DD]">
                <div className="text-sm font-black text-[#B45309]">Rs 68.2M+</div>
                <div className="text-[9px] font-bold text-[#5E7E6F] uppercase">Profit Disbursed</div>
              </div>
              <div>
                <div className="text-sm font-black text-[#006A4E]">32 Sheds</div>
                <div className="text-[9px] font-bold text-[#5E7E6F] uppercase">Operational</div>
              </div>
            </div>

            {/* Action Buttons: Member Login & Open Account (Register) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setCurrentView('login')}
                className="py-3 px-4 rounded-xl border border-[#006A4E] bg-[#006A4E] hover:bg-[#008260] active:scale-[0.98] text-xs font-extrabold text-white shadow-md shadow-[#006A4E]/20 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#FDE68A]" />
                <span>Member Login</span>
              </button>

              <button
                onClick={() => setCurrentView('register')}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-105 active:scale-[0.98] text-xs font-black text-[#0F2D1F] shadow-md shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-[#0F2D1F]" />
                <span>Open Account</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: LIVE POULTRY LIVESTOCK & COMMODITY MARKET RATES */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-4 border border-[#D1E7DD] bg-white space-y-3.5 shadow-md">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F2D1F] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#006A4E]" />
                  <span>Live Poultry Market & Rates</span>
                </h3>
                <p className="text-[10px] text-[#5E7E6F]">
                  Real-time poultry farm commodities & yield benchmarks
                </p>
              </div>

              {/* Status Chip */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#006A4E]/30 text-[10px] font-bold text-[#006A4E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006A4E] animate-ping" />
                <span>MARKET LIVE</span>
              </div>
            </div>

            {/* Commodity Selectors (6 Grid Chips) */}
            <div className="grid grid-cols-3 gap-1.5">
              {POULTRY_COMMODITIES.map((comm) => {
                const isSelected = selectedCommodity.id === comm.id;
                return (
                  <button
                    key={comm.id}
                    onClick={() => setSelectedCommodity(comm)}
                    className={`py-2 px-2 rounded-xl text-[10px] font-semibold transition-all border flex flex-col items-center justify-center gap-0.5 text-center ${
                      isSelected
                        ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-sm font-bold'
                        : 'bg-[#F4F8F5] border-[#D1E7DD] text-[#224936] hover:bg-[#E1EFE8]'
                    }`}
                  >
                    <span className="truncate w-full font-bold">{comm.symbol}</span>
                    <span className={`text-[9px] font-mono ${isSelected ? 'text-[#FDE68A]' : 'text-[#006A4E]'}`}>
                      {comm.price}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Candlestick / Yield Rate Chart Container */}
            <div className="rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] overflow-hidden">
              
              {/* Chart Details Bar */}
              <div className="px-3 py-2 border-b border-[#D1E7DD] flex items-center justify-between bg-white text-[11px]">
                <div>
                  <div className="font-bold text-[#0F2D1F] flex items-center gap-1.5">
                    <span>{selectedCommodity.name}</span>
                    <span className="text-[10px] text-[#006A4E] font-bold">
                      {selectedCommodity.change}
                    </span>
                  </div>
                  <div className="text-[9px] text-[#5E7E6F]">
                    Category: {selectedCommodity.category} • Unit: {selectedCommodity.unit}
                  </div>
                </div>

                {/* Timeframe Chips */}
                <div className="flex items-center gap-1">
                  {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                        selectedTimeframe === tf
                          ? 'bg-[#006A4E] text-white'
                          : 'text-[#5E7E6F] hover:text-[#0F2D1F]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphical Yield Visualizer */}
              <div className="p-4 bg-gradient-to-b from-[#EBF5F0]/60 to-white flex flex-col justify-between h-[160px] relative">
                {/* Top Metrics Row */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5E7E6F]">High: <strong>{selectedCommodity.high}</strong></span>
                  <span className="text-xl font-extrabold text-[#006A4E]">{selectedCommodity.price}</span>
                  <span className="text-[#5E7E6F]">Low: <strong>{selectedCommodity.low}</strong></span>
                </div>

                {/* SVG Visual Candlestick / Area Curve */}
                <div className="relative w-full h-[80px] my-auto">
                  <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#006A4E" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#006A4E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M 0,80 L 50,70 L 100,55 L 150,65 L 200,40 L 250,30 L 300,35 L 350,15 L 400,10 L 400,100 L 0,100 Z"
                      fill="url(#curveGrad)"
                    />

                    {/* Stroke line */}
                    <path
                      d="M 0,80 L 50,70 L 100,55 L 150,65 L 200,40 L 250,30 L 300,35 L 350,15 L 400,10"
                      fill="none"
                      stroke="#006A4E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Active pulse marker */}
                    <circle cx="400" cy="10" r="5" fill="#D4AF37" stroke="#006A4E" strokeWidth="2" />
                  </svg>
                </div>

                {/* Bottom Volume Info */}
                <div className="flex items-center justify-between text-[10px] text-[#5E7E6F]">
                  <span>Market Volume: <strong>{selectedCommodity.volume}</strong></span>
                  <span className="text-[#006A4E] font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Sikka Yield Guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Market Tickers Under Chart */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-center justify-between">
                <span className="text-[#5E7E6F]">BROILER / KG</span>
                <span className="font-extrabold text-[#006A4E]">Rs 435 (+2.4%)</span>
              </div>
              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-center justify-between">
                <span className="text-[#5E7E6F]">LAYER EGGS / CRATE</span>
                <span className="font-extrabold text-[#006A4E]">Rs 298 (+1.7%)</span>
              </div>
              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-center justify-between">
                <span className="text-[#5E7E6F]">DAY-OLD CHICK</span>
                <span className="font-extrabold text-[#B45309]">Rs 69 (+3.1%)</span>
              </div>
              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-center justify-between">
                <span className="text-[#5E7E6F]">FEED BAG (50KG)</span>
                <span className="font-extrabold text-[#006A4E]">Rs 7,850</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: NATIONAL SAVINGS SCHEMES SHOWCASE                 */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-4 border border-[#D1E7DD] bg-white space-y-3.5 shadow-md">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F2D1F] flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#006A4E]" />
                  <span>Popular Savings Schemes</span>
                </h3>
                <p className="text-[10px] text-[#5E7E6F]">
                  Choose from 12 certified Sikka Poultry Farm livestock schemes
                </p>
              </div>

              <button 
                onClick={() => setCurrentView('plans')}
                className="text-[11px] font-bold text-[#006A4E] hover:underline flex items-center gap-0.5"
              >
                <span>View All (12)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Schemes Grid (Top 4 Featured) */}
            <div className="grid grid-cols-2 gap-2.5">
              {(plans && plans.length > 0 ? plans.slice(0, 4) : [
                { id: '1', name: 'SIKKA BROILER 1', price: 380, dailyEarning: 95, totalEarning: 5700, durationDays: 60 },
                { id: '2', name: 'SIKKA BROILER 2', price: 780, dailyEarning: 195, totalEarning: 11700, durationDays: 60 },
                { id: '3', name: 'LAYER EGG SCHEME 3', price: 1380, dailyEarning: 345, totalEarning: 20700, durationDays: 60 },
                { id: '4', name: 'LAYER EGG SCHEME 4', price: 2580, dailyEarning: 645, totalEarning: 38700, durationDays: 60 },
              ]).map((plan) => (
                <div 
                  key={plan.id}
                  className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] hover:border-[#006A4E] transition-all space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-[#006A4E] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#006A4E]/20">
                        60 Days Cycle
                      </span>
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    </div>
                    
                    <h4 className="text-xs font-bold text-[#0F2D1F] mt-1.5 leading-tight">
                      {plan.name}
                    </h4>

                    <div className="text-base font-black text-[#006A4E] font-mono mt-1">
                      Rs {plan.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-[#D1E7DD]/60 text-[10px]">
                    <div className="flex items-center justify-between text-[#5E7E6F]">
                      <span>Daily Profit:</span>
                      <strong className="text-[#006A4E]">Rs {plan.dailyEarning.toLocaleString()}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#5E7E6F]">
                      <span>Total Profit:</span>
                      <strong className="text-[#B45309]">Rs {plan.totalEarning.toLocaleString()}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('register')}
                    className="w-full py-1.5 rounded-lg bg-[#006A4E] hover:bg-[#008260] text-white text-[11px] font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>Invest Now</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Full Plans Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#ECFDF5] to-[#E1EFE8] border border-[#006A4E]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Wheat className="w-5 h-5 text-[#006A4E]" />
                <div>
                  <div className="font-bold text-[#0F2D1F]">Need Higher Yield Certificates?</div>
                  <div className="text-[10px] text-[#5E7E6F]">Shed syndicates up to Rs 200,000 with Rs 50,000 daily return.</div>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('plans')}
                className="px-3 py-1.5 rounded-lg bg-[#006A4E] text-white font-bold text-[10px] shrink-0"
              >
                Browse All
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: INTERACTIVE NATIONAL SAVINGS PROFIT CALCULATOR   */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-4 border border-[#D1E7DD] bg-white space-y-3.5 shadow-md">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F2D1F] flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#006A4E]" />
                  <span>National Savings Profit Calculator</span>
                </h3>
                <p className="text-[10px] text-[#5E7E6F]">
                  Estimate your daily, weekly, and 60-day livestock returns
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#006A4E] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#006A4E]/30">
                Mudarabah Model
              </span>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-1.5">
              {[380, 1380, 2580, 5780, 11380, 22500, 45000, 75000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setCalcAmount(amt)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold transition border ${
                    calcAmount === amt
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : 'bg-[#F4F8F5] border-[#D1E7DD] text-[#224936] hover:bg-[#E1EFE8]'
                  }`}
                >
                  Rs {amt >= 1000 ? `${amt / 1000}k` : amt}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#5E7E6F] uppercase">
                Investment Amount (PKR):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#006A4E]">
                  Rs
                </span>
                <input
                  type="number"
                  min="380"
                  step="100"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] text-[#0F2D1F] font-bold text-sm focus:outline-none focus:border-[#006A4E] focus:bg-white"
                />
              </div>
            </div>

            {/* Calculation Output Cards */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5]">
                <span className="text-[9px] font-bold uppercase text-[#5E7E6F]">Daily Profit</span>
                <div className="text-base font-black text-[#006A4E] font-mono mt-0.5">
                  Rs {calcResults.daily.toLocaleString()}
                </div>
                <span className="text-[9px] text-[#006A4E]">Credited every 24h</span>
              </div>

              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5]">
                <span className="text-[9px] font-bold uppercase text-[#5E7E6F]">Weekly Profit</span>
                <div className="text-base font-black text-[#006A4E] font-mono mt-0.5">
                  Rs {calcResults.weekly.toLocaleString()}
                </div>
                <span className="text-[9px] text-[#5E7E6F]">7 Days Payout</span>
              </div>

              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5]">
                <span className="text-[9px] font-bold uppercase text-[#5E7E6F]">Monthly Earning</span>
                <div className="text-base font-black text-[#006A4E] font-mono mt-0.5">
                  Rs {calcResults.monthly.toLocaleString()}
                </div>
                <span className="text-[9px] text-[#5E7E6F]">30 Days</span>
              </div>

              <div className="p-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-b from-[#FEFCE8] to-[#FFFBEB]">
                <span className="text-[9px] font-bold uppercase text-[#B45309]">Total 60-Day Return</span>
                <div className="text-base font-black text-[#B45309] font-mono mt-0.5">
                  Rs {calcResults.totalReturn.toLocaleString()}
                </div>
                <span className="text-[9px] font-bold text-[#006A4E]">+{(calcResults.netProfit / (calcAmount || 1) * 100).toFixed(0)}% Net ROI</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('register')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#006A4E] to-[#087A5B] hover:brightness-105 text-white font-bold text-xs shadow-md shadow-[#006A4E]/20 transition flex items-center justify-center gap-1.5"
            >
              <span>Lock in This Return With Sikka Poultry Farm</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* ========================================================= */}
          {/* SECTION: 3-STEP EASY INVESTMENT PROCESS                   */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-4 border border-[#D1E7DD] bg-white space-y-3.5 shadow-md">
            <div>
              <h3 className="text-sm font-bold text-[#0F2D1F]">
                How Sikka Poultry Farm Works
              </h3>
              <p className="text-[10px] text-[#5E7E6F]">
                Simple 3-step process to start earning daily livestock returns
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F2D1F]">Register Account in 30 Seconds</h4>
                  <p className="text-[11px] text-[#5E7E6F] leading-relaxed mt-0.5">
                    Sign up with your mobile number and password. No paperwork or tedious delays.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F2D1F]">Deposit & Select Poultry Certificate</h4>
                  <p className="text-[11px] text-[#5E7E6F] leading-relaxed mt-0.5">
                    Deposit via Easypaisa, JazzCash, or Meezan Bank. Choose a broiler, layer, or hatchery certificate.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F2D1F]">Daily Profit & Instant Withdrawals</h4>
                  <p className="text-[11px] text-[#5E7E6F] leading-relaxed mt-0.5">
                    Profit is credited automatically every 24 hours. Withdraw directly to your local account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: SECURITY & ASSET-BACKED GUARANTEES               */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-4 border border-[#D1E7DD] bg-white space-y-3 shadow-md">
            <div>
              <h3 className="text-sm font-bold text-[#0F2D1F] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                <span>Our Security & Asset Backing</span>
              </h3>
              <p className="text-[10px] text-[#5E7E6F]">
                Real poultry assets with transparent physical operations
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1">
                <div className="font-bold text-[#006A4E] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Real Flocks
                </div>
                <p className="text-[10px] text-[#5E7E6F] leading-tight">
                  Investments back physical broiler sheds and layer egg flocks.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1">
                <div className="font-bold text-[#006A4E] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Shariah Compliant
                </div>
                <p className="text-[10px] text-[#5E7E6F] leading-tight">
                  Operating under halal partnership (Mudarabah) livestock models.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1">
                <div className="font-bold text-[#006A4E] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Automated Accounting
                </div>
                <p className="text-[10px] text-[#5E7E6F] leading-tight">
                  Transparent earnings tracking with zero concealed charges.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1">
                <div className="font-bold text-[#006A4E] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 24/7 Fast Payouts
                </div>
                <p className="text-[10px] text-[#5E7E6F] leading-tight">
                  Withdrawal requests processed promptly into your mobile account.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SECTION: VERIFIED SAVER REVIEWS & TESTIMONIALS            */}
          {/* ========================================================= */}
          <div className="rounded-2xl p-4 border border-[#D1E7DD] bg-white space-y-3.5 shadow-md">
            <div>
              <h3 className="text-sm font-bold text-[#0F2D1F]">
                Verified Member Reviews
              </h3>
              <p className="text-[10px] text-[#5E7E6F]">
                What our agricultural savers say about Sikka Poultry Farm
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Review 1 */}
              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#006A4E] text-white flex items-center justify-center text-[11px] font-bold">
                      MA
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F2D1F]">Muhammad Aslam</h4>
                      <p className="text-[9px] text-[#5E7E6F]">Rawalpindi • Active Investor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#5E7E6F] leading-relaxed pl-9">
                  &ldquo;I started with the Sikka Broiler Scheme 1 (Rs 380) and received daily Rs 95 right on time. Now I hold Scheme 4.&rdquo;
                </p>
              </div>

              {/* Review 2 */}
              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#044E29] text-white flex items-center justify-center text-[11px] font-bold">
                      TM
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F2D1F]">Tariq Mehmood</h4>
                      <p className="text-[9px] text-[#5E7E6F]">Faisalabad • Layer Certificate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#5E7E6F] leading-relaxed pl-9">
                  &ldquo;Withdrawal to JazzCash took less than 20 minutes. Very impressed with the national savings style transparency.&rdquo;
                </p>
              </div>

              {/* Review 3 */}
              <div className="p-3 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#008260] text-white flex items-center justify-center text-[11px] font-bold">
                      CF
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F2D1F]">Chaudhry Farhan</h4>
                      <p className="text-[9px] text-[#5E7E6F]">Gujranwala • VIP Member</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#5E7E6F] leading-relaxed pl-9">
                  &ldquo;The poultry rates and livestock shed updates give high confidence. Best passive income application for Pakistanis.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Floating Join Call-To-Action Banner */}
          <div className="rounded-2xl p-4 bg-gradient-to-r from-[#006A4E] via-[#044E29] to-[#006A4E] text-white text-center space-y-3 shadow-xl">
            <h3 className="text-base font-black">
              Ready to Start Earning with Sikka Poultry Farm?
            </h3>
            <p className="text-xs text-[#E1EFE8] leading-relaxed max-w-[340px] mx-auto">
              Join thousands of Pakistani savers investing in real livestock certificates today.
            </p>
            <button
              onClick={() => setCurrentView('register')}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0F2D1F] font-black text-xs hover:brightness-105 shadow-md shadow-black/20 transition mx-auto inline-flex items-center gap-1.5"
            >
              <span>Create Free Account Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Official National Savings Footer */}
        <footer className="px-4 py-4 text-center border-t border-[#D1E7DD] text-[10px] text-[#5E7E6F] bg-[#F4F8F5] space-y-2">
          <div className="flex items-center justify-center gap-3 font-semibold text-[#006A4E]">
            <button onClick={() => setCurrentView('login')} className="hover:underline">Login</button>
            <span>•</span>
            <button onClick={() => setCurrentView('register')} className="hover:underline">Register</button>
            <span>•</span>
            <button onClick={() => setCurrentView('plans')} className="hover:underline">Schemes</button>
            <span>•</span>
            <a href="https://chat.whatsapp.com/invite/sikkapoultryfarmofficial" target="_blank" rel="noreferrer" className="hover:underline">
              WhatsApp Support
            </a>
          </div>
          <p>© {new Date().getFullYear()} <strong>{siteTitle}</strong>. All rights reserved.</p>
          <p className="text-[9px] text-[#5E7E6F]/80">
            Certified Agro-Livestock Savings Schemes & Daily Profit System.
          </p>
        </footer>

      </div>

      {/* Settings Modal (Platform Information & Quick Links) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl p-5 bg-white border border-[#D1E7DD] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-[#D1E7DD]">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#006A4E]" />
                <h3 className="text-sm font-bold text-[#0F2D1F]">Platform Settings & Info</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-xs font-bold text-[#5E7E6F] hover:text-[#006A4E]"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setCurrentView('login');
                }}
                className="w-full p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] text-left flex items-center justify-between hover:bg-[#E1EFE8] text-[#0F2D1F]"
              >
                <div className="flex items-center gap-2">
                  <LogIn className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>Member Login</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5E7E6F]" />
              </button>

              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setCurrentView('register');
                }}
                className="w-full p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] text-left flex items-center justify-between hover:bg-[#E1EFE8] text-[#0F2D1F]"
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>Register Free Account</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5E7E6F]" />
              </button>

              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setCurrentView('plans');
                }}
                className="w-full p-2.5 rounded-xl border border-[#D1E7DD] bg-[#F4F8F5] text-left flex items-center justify-between hover:bg-[#E1EFE8] text-[#0F2D1F]"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>View All 12 Savings Schemes</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5E7E6F]" />
              </button>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#006A4E] text-xs font-bold text-white hover:bg-[#008260] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
