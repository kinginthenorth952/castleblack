import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  UserPlus, 
  LogIn, 
  Sun, 
  Moon, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Star, 
  Sparkles, 
  BarChart3, 
  Globe, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Zap,
  ArrowUpRight,
  ChevronRight,
  Info,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';

type MarketPair = {
  symbol: string;
  name: string;
  category: 'Forex' | 'Crypto';
  tvSymbol: string;
  price: string;
  change: string;
  isPositive: boolean;
};

const MARKET_PAIRS: MarketPair[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'Forex', tvSymbol: 'FX:EURUSD', price: '1.0842', change: '+0.18%', isPositive: true },
  { symbol: 'GBP/USD', name: 'British Pound / USD', category: 'Forex', tvSymbol: 'FX:GBPUSD', price: '1.2915', change: '+0.24%', isPositive: true },
  { symbol: 'USD/JPY', name: 'US Dollar / Yen', category: 'Forex', tvSymbol: 'FX:USDJPY', price: '154.20', change: '-0.12%', isPositive: false },
  { symbol: 'BTC/USDT', name: 'Bitcoin / Tether', category: 'Crypto', tvSymbol: 'BINANCE:BTCUSDT', price: '68,450', change: '+2.85%', isPositive: true },
  { symbol: 'ETH/USDT', name: 'Ethereum / Tether', category: 'Crypto', tvSymbol: 'BINANCE:ETHUSDT', price: '3,480', change: '+1.94%', isPositive: true },
  { symbol: 'BNB/USDT', name: 'BNB / Tether', category: 'Crypto', tvSymbol: 'BINANCE:BNBUSDT', price: '584.2', change: '+0.75%', isPositive: true },
];

export function LandingPageView() {
  const { settings, plans, setCurrentView, theme: globalTheme, toggleTheme } = useApp();
  const isLightMode = true;
  
  // Active Market Pair
  const [selectedPair, setSelectedPair] = useState<MarketPair>(MARKET_PAIRS[0]);
  const [selectedInterval, setSelectedInterval] = useState<'1m' | '5m' | '30m' | '1h' | '1D'>('30m');
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // TradingView Interval Code Mapper
  const getTvInterval = (interval: string) => {
    switch (interval) {
      case '1m': return '1';
      case '5m': return '5';
      case '30m': return '30';
      case '1h': return '60';
      case '1D': return 'D';
      default: return '30';
    }
  };

  // Dynamic Theme Colors (Eye-Friendly Warm Cream/Parchment palette - Soft, low-glare, non-stark)
  const theme = {
    bgPage: 'bg-[#FDFBF7]',
    appFrame: 'bg-[#FCF8F2] border-[#EADCC9] shadow-2xl text-[#3C3024]',
    headerBg: 'bg-[#FCF8F2]/90 border-[#EADCC9] shadow-xs',
    cardBg: 'bg-[#FCF8F2] border-[#EADCC9]',
    subCardBg: 'bg-[#F6EFE6] border-[#EADCC9]',
    textMuted: 'text-[#8C7A6B]',
    textHeading: 'text-[#3C3024]',
    accentGold: '#D09009',
    accentBorder: 'border-[#D09009]/30',
    buttonOutline: 'bg-white border-[#EADCC9] text-[#3C3024] hover:bg-[#F6EFE6]',
  };

  return (
    <div className={`min-h-screen ${theme.bgPage} flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4 selection:bg-[#D6B36A] selection:text-[#0B0D10] transition-colors duration-300`}>
      
      {/* Centered Mobile App Frame (Matches Screenshot Layout) */}
      <div className={`w-full max-w-[440px] ${theme.appFrame} sm:rounded-[32px] border sm:border-[#1E2633] overflow-hidden flex flex-col min-h-screen sm:min-h-0 sm:my-auto transition-all`}>
        
        {/* Top App Header Bar */}
        <header className={`sticky top-0 z-40 px-4 py-3.5 flex items-center justify-between border-b ${theme.headerBg} backdrop-blur-md`}>
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-extrabold tracking-tight ${theme.textHeading} group-hover:text-[#D6B36A] transition-colors`}>
                {settings?.siteName || 'Prime Invest'}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-[#D6B36A]/15 text-[#D6B36A] border border-[#D6B36A]/40 uppercase">
                VIP
              </span>
            </div>
          </div>

          {/* Action Header Controls: Settings Icon */}
          <div className="flex items-center gap-2">
            {/* Settings & Info Button */}
            <button
              onClick={() => setShowSettingsModal(true)}
              title="Platform Settings & Info"
              className={`p-2 rounded-xl border transition-all ${theme.buttonOutline}`}
            >
              <Settings className="w-4 h-4 text-[#8A96A6] hover:text-[#D6B36A]" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* ========================================================= */}
          {/* CARD 1: WELCOME HERO CARD (Matches Screenshot)           */}
          {/* ========================================================= */}
          <div className={`rounded-2xl p-5 border ${theme.cardBg} relative overflow-hidden shadow-lg space-y-4 text-center`}>
            
            {/* Top Glow Accent */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#D6B36A]/10 blur-2xl rounded-full pointer-events-none"></div>

            {/* Smart Investment Platform Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[10px] font-bold text-[#D6B36A] tracking-wider uppercase mx-auto">
              <Sparkles className="w-3 h-3 text-[#D6B36A]" />
              <span>SMART INVESTMENT PLATFORM</span>
            </div>

            {/* Hero Title */}
            <div className="space-y-0.5">
              <h1 className={`text-xl font-bold ${isLightMode ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                Welcome to
              </h1>
              <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#D6B36A] via-[#E5C783] to-[#D6B36A] bg-clip-text text-transparent">
                {settings?.siteName || 'Prime Invest'}
              </h2>
            </div>

            {/* Subtitle Description */}
            <p className={`text-xs ${theme.textMuted} leading-relaxed max-w-[340px] mx-auto`}>
              {settings?.heroSubheadline || 
                'Explore active investment plans, follow live market charts, and manage your account from a secure mobile-friendly dashboard.'}
            </p>

            {/* Center Illuminated Shield Emblem */}
            <div className="py-2 flex justify-center items-center">
              <div className="relative">
                {/* Outer Ring Pulse */}
                <div className="absolute inset-0 rounded-full bg-[#D6B36A]/20 blur-md animate-pulse"></div>
                
                {/* Center Badge Frame */}
                <div className={`relative w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#D6B36A] via-[#E5C783] to-[#A88745] shadow-xl flex items-center justify-center`}>
                  <div className={`w-full h-full rounded-full ${isLightMode ? 'bg-[#FFFFFF]' : 'bg-[#0F141C]'} flex items-center justify-center`}>
                    <PrimeInvestLogo size="lg" customLogoUrl={settings?.logoUrl} />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Login & Register */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setCurrentView('login')}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isLightMode
                    ? 'bg-[#1E293B] text-[#FFFFFF] hover:bg-[#0F172A] border-transparent shadow-sm'
                    : 'bg-[#151B24] border-[#2A3444] text-[#F4F1EA] hover:border-[#D6B36A]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>Login</span>
              </button>

              <button
                onClick={() => setCurrentView('register')}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D6B36A] via-[#E5C783] to-[#D6B36A] hover:brightness-105 active:scale-[0.98] text-xs font-bold text-[#0B0D10] shadow-md shadow-[#D6B36A]/20 transition-all flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 2: LIVE TRADING MARKET WITH CHART (Matches Screenshot) */}
          {/* ========================================================= */}
          <div className={`rounded-2xl p-4 border ${theme.cardBg} space-y-3.5 shadow-lg`}>
            
            {/* Header: Title + Live Market Pulsing Badge */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-sm font-bold ${theme.textHeading} flex items-center gap-1.5`}>
                  <span>Live Trading Market</span>
                </h3>
                <p className={`text-[10px] ${theme.textMuted}`}>
                  Interactive candlestick charts
                </p>
              </div>

              {/* Status Chip */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#63B889]/15 border border-[#63B889]/40 text-[10px] font-bold text-[#63B889]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#63B889] animate-ping"></span>
                <span>LIVE MARKET</span>
              </div>
            </div>

            {/* Currency Pair Tabs (3x2 Grid) */}
            <div className="grid grid-cols-3 gap-1.5">
              {MARKET_PAIRS.map((pair) => {
                const isSelected = selectedPair.symbol === pair.symbol;
                return (
                  <button
                    key={pair.symbol}
                    onClick={() => setSelectedPair(pair)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-mono font-semibold transition-all border flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-[#D6B36A] text-[#0B0D10] border-[#D6B36A] shadow-sm font-bold'
                        : isLightMode
                          ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#475569] hover:text-[#0F172A]'
                          : 'bg-[#141A23] border-[#222B3A] text-[#8A96A6] hover:text-[#F4F1EA]'
                    }`}
                  >
                    <span>{pair.symbol}</span>
                  </button>
                );
              })}
            </div>

            {/* Candlestick Interactive Chart Container */}
            <div className={`rounded-xl border overflow-hidden ${isLightMode ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#080B0F] border-[#1C232E]'}`}>
              
              {/* Chart Header Bar with Timeframe Selectors */}
              <div className={`px-3 py-2 border-b flex items-center justify-between text-[11px] font-mono ${isLightMode ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0D1219] border-[#1C232E]'}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${theme.textHeading}`}>{selectedPair.symbol}</span>
                  <span className={`text-[10px] font-bold ${selectedPair.isPositive ? 'text-[#63B889]' : 'text-rose-500'}`}>
                    {selectedPair.change}
                  </span>
                </div>

                {/* Timeframe Chips */}
                <div className="flex items-center gap-1">
                  {(['1m', '5m', '30m', '1h', '1D'] as const).map((intv) => (
                    <button
                      key={intv}
                      onClick={() => setSelectedInterval(intv)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                        selectedInterval === intv
                          ? 'bg-[#D6B36A] text-[#0B0D10]'
                          : isLightMode
                            ? 'text-[#64748B] hover:text-[#0F172A]'
                            : 'text-[#8A96A6] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {intv}
                    </button>
                  ))}
                </div>
              </div>

              {/* TradingView Realtime Chart Embed */}
              <div className="relative w-full h-[240px] bg-black">
                <iframe
                  title={`TradingView Chart ${selectedPair.symbol}`}
                  src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${encodeURIComponent(selectedPair.tvSymbol)}&interval=${getTvInterval(selectedInterval)}&hidetoptoolbar=1&symboledit=0&saveimage=0&toolbarbg=${isLightMode ? 'f8fafc' : '080b0f'}&studies=[]&theme=${isLightMode ? 'light' : 'dark'}&style=1&timezone=Asia%2FKarachi&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en&utm_source=prime-invest.xyz`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Chart Disclaimer Note */}
              <div className={`p-2 border-t text-[9px] ${theme.textMuted} leading-tight text-center ${isLightMode ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0D1219] border-[#1C232E]'}`}>
                Market chart is provided by TradingView and requires an internet connection. Market information is for reference only.
              </div>
            </div>

            {/* Quick Market Tickers under Chart */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <div className={`p-2 rounded-lg border flex items-center justify-between ${theme.subCardBg}`}>
                <span className={theme.textMuted}>BTC/USDT</span>
                <span className="font-bold text-[#63B889]">LIVE</span>
              </div>
              <div className={`p-2 rounded-lg border flex items-center justify-between ${theme.subCardBg}`}>
                <span className={theme.textMuted}>ETH/USDT</span>
                <span className="font-bold text-[#63B889]">LIVE</span>
              </div>
              <div className={`p-2 rounded-lg border flex items-center justify-between ${theme.subCardBg}`}>
                <span className={theme.textMuted}>EUR/USD</span>
                <span className="font-bold text-[#D6B36A]">FOREX</span>
              </div>
              <div className={`p-2 rounded-lg border flex items-center justify-between ${theme.subCardBg}`}>
                <span className={theme.textMuted}>GBP/USD</span>
                <span className="font-bold text-[#D6B36A]">FOREX</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 3: TRUSTED REVIEWS SECTION (Matches Screenshot)       */}
          {/* ========================================================= */}
          <div className={`rounded-2xl p-4 border ${theme.cardBg} space-y-3.5 shadow-lg`}>
            
            {/* Header */}
            <div>
              <h3 className={`text-sm font-bold ${theme.textHeading}`}>
                Trusted Reviews
              </h3>
              <p className={`text-[10px] ${theme.textMuted}`}>
                What members appreciate about the platform
              </p>
            </div>

            {/* Review Cards (Stacked 3 items) */}
            <div className="space-y-2.5">
              
              {/* Review 1: AK */}
              <div className={`p-3 rounded-xl border ${theme.subCardBg} space-y-1.5 transition-all hover:border-[#D6B36A]/40`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-[11px] font-extrabold">
                    AK
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${theme.textHeading}`}>Simple Experience</h4>
                    <div className="flex items-center gap-0.5 text-[#D6B36A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-[11px] ${theme.textMuted} leading-relaxed pl-9`}>
                  The mobile layout is clear and the plan details are easy to understand.
                </p>
              </div>

              {/* Review 2: SM */}
              <div className={`p-3 rounded-xl border ${theme.subCardBg} space-y-1.5 transition-all hover:border-[#D6B36A]/40`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-[11px] font-extrabold">
                    SM
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${theme.textHeading}`}>Quick Navigation</h4>
                    <div className="flex items-center gap-0.5 text-[#D6B36A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-[11px] ${theme.textMuted} leading-relaxed pl-9`}>
                  Login, registration and investment plans are accessible without unnecessary steps.
                </p>
              </div>

              {/* Review 3: HR */}
              <div className={`p-3 rounded-xl border ${theme.subCardBg} space-y-1.5 transition-all hover:border-[#D6B36A]/40`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center text-[11px] font-extrabold">
                    HR
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${theme.textHeading}`}>Professional Design</h4>
                    <div className="flex items-center gap-0.5 text-[#D6B36A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-[11px] ${theme.textMuted} leading-relaxed pl-9`}>
                  The live chart and account links work smoothly on a mobile screen.
                </p>
              </div>

            </div>

            {/* Bottom 3-Metric Stats Footer Grid */}
            <div className={`grid grid-cols-3 gap-2 pt-2 text-center border-t ${isLightMode ? 'border-[#E2E8F0]' : 'border-[#1E2633]'}`}>
              <div className={`p-2.5 rounded-xl border ${theme.subCardBg}`}>
                <div className="text-sm font-extrabold font-mono text-[#D6B36A]">
                  {plans.length || '12'}
                </div>
                <div className={`text-[9px] ${theme.textMuted} uppercase font-semibold mt-0.5`}>
                  Active Plans
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border ${theme.subCardBg}`}>
                <div className="flex justify-center text-[#63B889]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className={`text-[9px] ${theme.textMuted} uppercase font-semibold mt-0.5`}>
                  Insulated Service
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border ${theme.subCardBg}`}>
                <div className="text-sm font-extrabold font-mono text-[#D6B36A]">
                  24/7
                </div>
                <div className={`text-[9px] ${theme.textMuted} uppercase font-semibold mt-0.5`}>
                  Online Access
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <footer className={`px-4 py-4 text-center border-t text-[10px] ${theme.textMuted} ${isLightMode ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#080B0F] border-[#1C232E]'}`}>
          <p>© {new Date().getFullYear()} {settings?.siteName || 'Prime Invest'}. All rights reserved.</p>
        </footer>

      </div>

      {/* Settings Modal (Light / Dark Theme & Quick Links) */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-sm rounded-2xl p-5 border ${theme.appFrame} space-y-4 shadow-2xl`}>
            <div className="flex items-center justify-between border-b pb-3 border-[#252E3E]">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#D6B36A]" />
                <h3 className={`text-sm font-bold ${theme.textHeading}`}>Platform Settings</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-xs font-bold text-[#8A96A6] hover:text-[#D6B36A]"
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
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between ${theme.buttonOutline}`}
              >
                <div className="flex items-center gap-2">
                  <LogIn className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Member Login</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8A96A6]" />
              </button>

              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setCurrentView('register');
                }}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between ${theme.buttonOutline}`}
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Register Free Account</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8A96A6]" />
              </button>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#D6B36A] text-xs font-bold text-[#0B0D10] hover:bg-[#E5C783] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
