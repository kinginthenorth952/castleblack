import { useState } from 'react';
import { 
  ArrowDownCircle, 
  ArrowRightLeft, 
  ArrowUpCircle, 
  Calculator, 
  Check, 
  Copy, 
  Download, 
  History, 
  Layers,
  MessageCircle, 
  PlayCircle, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Wallet,
  Menu,
  Bell,
  X,
  Lock,
  ShieldCheck,
  CheckCircle,
  Home,
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';
import { ProfitCalculatorModal } from '../components/ProfitCalculatorModal';
import { CommissionTransferModal } from '../components/CommissionTransferModal';
import { PwaInstallModal } from '../components/PwaInstallModal';

export function DashboardView() {
  const { currentUser, users, settings, setCurrentView, showToast, userPlans, userLogout } = useApp();
  const [copied, setCopied] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Directly registered referral partners in Firestore
  const myReferrals = users.filter(
    (u) =>
      u.referralBy &&
      currentUser?.username &&
      u.referralBy.toLowerCase() === currentUser.username.toLowerCase() &&
      u.id !== currentUser.id
  );
  const effectiveTeamCount = Math.max(currentUser?.teamCount || 0, myReferrals.length);
  const computedTeamVolume = myReferrals.reduce((acc, u) => acc + (u.totalDeposit || 0), 0);
  const effectiveTeamInvestment = Math.max(currentUser?.teamInvestment || 0, computedTeamVolume);

  const referralUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=${currentUser?.username || 'user'}`
    : `https://sikkapoultryfarm.com?ref=${currentUser?.username || 'user'}`;

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(referralUrl);
    setCopied(true);
    showToast('Referral link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = (urlOrPhone?: string) => {
    if (!urlOrPhone) {
      showToast('Support channel contact is currently being updated.', 'info');
      return;
    }
    if (urlOrPhone.startsWith('http://') || urlOrPhone.startsWith('https://')) {
      window.open(urlOrPhone, '_blank', 'noopener,noreferrer');
    } else {
      const cleanPhone = urlOrPhone.replace(/[^0-9]/g, '');
      if (cleanPhone) {
        window.open(`https://wa.me/${cleanPhone}`, '_blank', 'noopener,noreferrer');
      } else {
        showToast('Invalid WhatsApp contact link.', 'error');
      }
    }
  };

  const activePlansCount = userPlans.filter(
    (p) => p.userId === currentUser?.id && p.status === 'active'
  ).length;

  const inactivePlansCount = userPlans.filter(
    (p) => p.userId === currentUser?.id && p.status === 'completed'
  ).length;

  return (
    <div className="w-full min-h-screen bg-[#FFFBEF] pb-24 text-[#4A3515] flex flex-col items-center select-none relative font-sans antialiased">
      
      {/* 1. Header Bar exactly like in Screenshot (82) */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-[#F5EAD4] px-4 py-3 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-xl bg-[#FFFDF5] border border-[#F5EAD4] text-[#8C6320] flex items-center justify-center transition active:scale-95"
            aria-label="Open Sidebar Menu"
          >
            <Menu className="w-5 h-5 text-[#8C6320]" />
          </button>

          <div className="flex items-center gap-2">
            <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
            <div className="text-left">
              <h1 className="text-sm font-black text-[#5C4015] leading-tight tracking-tight">
                {settings?.siteName || 'Sikka Poultry Farm'}
              </h1>
              <span className="block text-[8px] font-bold text-[#8C6320]/80 uppercase tracking-wider -mt-0.5 font-mono">
                {settings?.siteSubtitle || 'Secure Your Future, Grow Your Wealth'}
              </span>
            </div>
          </div>

          <button
            onClick={() => showToast('No new notifications', 'info')}
            className="relative w-10 h-10 rounded-xl bg-[#FFFDF5] border border-[#F5EAD4] text-[#8C6320] flex items-center justify-center transition active:scale-95"
          >
            <Bell className="w-5 h-5 text-[#8C6320]" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* 2. Drawer Sidebar Menu overlay exactly like in Screenshot (83) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop blur overlay */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[#3C3024]/40 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Menu sliding from left */}
          <div className="relative w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 z-50 border-r border-[#F5EAD4]">
            <div>
              {/* Header inside drawer menu */}
              <div className="p-4 border-b border-[#F5EAD4] flex items-center justify-between bg-[#FFFDF9]">
                <div className="flex items-center gap-2">
                  <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
                  <div>
                    <h2 className="text-sm font-black text-[#5C4015]">
                      {settings?.siteName || 'Sikka Poultry Farm'}
                    </h2>
                    <span className="block text-[8px] font-bold text-[#8C6320] uppercase tracking-wide">
                      Dashboard Menu
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FFFDF5] border border-[#F5EAD4] flex items-center justify-center text-[#8C7A6B] hover:text-[#5C4015]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User badge golden card inside sidebar */}
              <div className="p-4">
                <div className="w-full bg-gradient-to-r from-[#F5BE27] to-[#D09009] p-3 rounded-2xl text-white shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">
                    {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-amber-100 font-bold">
                      Signed in as
                    </span>
                    <h3 className="text-sm font-extrabold truncate max-w-[150px]">
                      {currentUser?.username || 'Guest'}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Sidebar Menu options list with icons */}
              <nav className="px-3 space-y-1">
                <button
                  onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <Home className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => { setCurrentView('deposit-history'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <History className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>Deposit History</span>
                </button>

                <button
                  onClick={() => { setCurrentView('withdraw-history'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <ArrowDownCircle className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>Withdraw History</span>
                </button>

                <button
                  onClick={() => { setCurrentView('deposit-history'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <ArrowRightLeft className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>Transactions</span>
                </button>

                <button
                  onClick={() => { setCurrentView('referrals'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <Users className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>My Team</span>
                </button>

                <button
                  onClick={() => { setCurrentView('profile'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <User className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>Profile Setting</span>
                </button>

                <button
                  onClick={() => { setCurrentView('profile'); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-[#5C4015] hover:bg-[#FFFDF5] border border-transparent hover:border-[#F5EAD4]"
                >
                  <Lock className="w-4.5 h-4.5 text-[#D09009]" />
                  <span>Password Change</span>
                </button>

                <button
                  onClick={() => { userLogout(); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-extrabold transition text-red-600 hover:bg-rose-50 border border-transparent hover:border-rose-100"
                >
                  <LogOut className="w-4.5 h-4.5 text-red-500" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            <div className="p-4 border-t border-[#F5EAD4] bg-[#FFFDF9] text-center text-[10px] text-[#8C7A6B]">
              © {new Date().getFullYear()} {settings?.siteName || 'Sikka Poultry Farm'}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-md px-3 sm:px-4 py-4 space-y-3.5 pb-20">

        {/* 3. "Welcome Back, Username" card with verify badge, visual graph line and Refer Link button */}
        <div className="relative overflow-hidden bg-white border border-[#E5BE7E]/40 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Circular Avatar on the left */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5BE27] to-[#D09009] p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-[#5C4015] text-base">
                  {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>

              <div>
                <span className="block text-[10px] text-[#8C7A6B] font-semibold leading-none">
                  Welcome Back,
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <h2 className="text-base font-extrabold text-[#5C4015] tracking-tight leading-none">
                    {currentUser?.username || 'kinginth'}
                  </h2>
                  <div className="w-4 h-4 rounded-full bg-[#D09009] flex items-center justify-center text-white" title="Verified Account">
                    <Check className="w-2.5 h-2.5 stroke-[4]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Refer Link Button on the right */}
            <button
              onClick={() => handleCopyReferral()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FFF9EB] hover:bg-[#FEF1D1] border border-[#E5BE7E]/55 text-[#D09009] text-[11px] font-bold tracking-tight transition active:scale-95 shadow-2xs"
            >
              <span>+ Refer Link</span>
            </button>
          </div>

          {/* Golden graphic timeline line underneath */}
          <div className="mt-4 relative pt-2">
            <div className="h-1.5 w-full bg-[#FFFDF5] border border-[#F5EAD4] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#F5BE27] to-[#D09009] rounded-full w-4/5 shadow-xs" />
            </div>
            <div className="flex justify-between items-center mt-1 text-[8px] text-[#8C7A6B] font-bold">
              <span>MEMBER PROGRESS</span>
              <span>80% LEVEL CAP</span>
            </div>
          </div>
        </div>

        {/* 4. "My Wallet" Card with wallet icon, user balance, and quick action white rounded cards */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#F5BE27] via-[#D09009] to-[#A16D04] rounded-3xl p-4 text-white shadow-md">
          {/* Top Section */}
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-amber-100 font-bold leading-none">
                My Wallet
              </span>
              <span className="block text-[10px] text-amber-200 mt-0.5">
                User Balance
              </span>
              <h3 className="text-2xl font-black font-mono tracking-tight mt-1 leading-none">
                Rs {currentUser?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
              </h3>
            </div>
          </div>

          {/* Quick Action Buttons Row matching Screenshot (82) */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              onClick={() => setCurrentView('plans')}
              className="flex flex-col items-center justify-center py-2.5 rounded-2xl bg-white hover:bg-[#FFFDF5] text-[#5C4015] border border-[#F5EAD4] transition active:scale-95 shadow-sm font-bold group"
            >
              <div className="w-7 h-7 rounded-full bg-[#FFFDF5] flex items-center justify-center text-[#D09009] border border-[#F5EAD4] mb-1">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px]">Deposit</span>
            </button>

            <button
              onClick={() => setCurrentView('withdraw')}
              className="flex flex-col items-center justify-center py-2.5 rounded-2xl bg-white hover:bg-[#FFFDF5] text-[#5C4015] border border-[#F5EAD4] transition active:scale-95 shadow-sm font-bold group"
            >
              <div className="w-7 h-7 rounded-full bg-[#FFFDF5] flex items-center justify-center text-emerald-600 border border-[#F5EAD4] mb-1">
                <ArrowDownCircle className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px]">Withdraw</span>
            </button>

            <button
              onClick={() => setCurrentView('invest-logs')}
              className="flex flex-col items-center justify-center py-2.5 rounded-2xl bg-white hover:bg-[#FFFDF5] text-[#5C4015] border border-[#F5EAD4] transition active:scale-95 shadow-sm font-bold group"
            >
              <div className="w-7 h-7 rounded-full bg-[#FFFDF5] flex items-center justify-center text-[#D09009] border border-[#F5EAD4] mb-1">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px]">My Plan</span>
            </button>
          </div>
        </div>

        {/* 5. Stunning Connected Node support desk graph exactly like in Screenshot (82) */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-[#F0E4CE] p-6 shadow-xs flex items-center justify-center min-h-[220px]">
          {/* The center avatar */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-b from-[#FEE5A5] via-[#F5BE27] to-[#D09009] flex items-center justify-center p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#5C4015]">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#D09009] font-black">
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#E5BE7E" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#E5BE7E" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#E5BE7E" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#E5BE7E" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>

          {/* Top-Left: WhatsApp Admin */}
          <button 
            onClick={() => handleOpenWhatsApp(settings?.adminWhatsApp)}
            className="absolute top-4 left-6 flex flex-col items-center group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F8F0] border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-105 transition-all">
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-white" />
            </div>
            <span className="text-[9px] font-extrabold text-[#5C4015] mt-1 text-center leading-none max-w-[65px]">WhatsApp Admin</span>
          </button>

          {/* Top-Right: Helpline Number */}
          <button 
            onClick={() => handleOpenWhatsApp(settings?.adminWhatsApp)}
            className="absolute top-4 right-6 flex flex-col items-center group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#FFF9EC] border border-[#F5BE27]/20 flex items-center justify-center text-[#D09009] shadow-xs group-hover:scale-105 transition-all">
              <Headphones className="w-5 h-5 text-[#D09009]" />
            </div>
            <span className="text-[9px] font-extrabold text-[#5C4015] mt-1 text-center leading-none max-w-[65px]">Helpline Number</span>
          </button>

          {/* Bottom-Left: WhatsApp Channel */}
          <button 
            onClick={() => handleOpenWhatsApp(settings?.whatsappChannel)}
            className="absolute bottom-4 left-6 flex flex-col items-center group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F8F0] border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-105 transition-all">
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-white" />
            </div>
            <span className="text-[9px] font-extrabold text-[#5C4015] mt-1 text-center leading-none max-w-[65px]">WhatsApp Channel</span>
          </button>

          {/* Bottom-Right: WhatsApp Group */}
          <button 
            onClick={() => handleOpenWhatsApp(settings?.whatsappGroup)}
            className="absolute bottom-4 right-6 flex flex-col items-center group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F8F0] border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-105 transition-all">
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-white" />
            </div>
            <span className="text-[9px] font-extrabold text-[#5C4015] mt-1 text-center leading-none max-w-[65px]">WhatsApp Group</span>
          </button>
        </div>

        {/* 6. "Refer & Earn More" Copy Box Card */}
        <div className="rounded-2xl bg-white border border-[#F5EAD4] p-4 shadow-2xs">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#FEF8E8] border border-[#F5BE27]/40 flex items-center justify-center text-[#D09009]">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black text-[#5C4015]">
              Refer & Earn More
            </span>
          </div>

          <div className="flex items-center gap-2 p-1 border border-[#F5EAD4] rounded-xl bg-[#FFFDF9]">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="w-full bg-transparent px-2 text-xs text-[#5C4015] font-mono focus:outline-none truncate"
            />
            <button
              onClick={handleCopyReferral}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:brightness-105 text-white text-xs font-black shrink-0 transition"
            >
              Copy
            </button>
          </div>
        </div>

        {/* 7. Grid of 8 Quick-Action Service Buttons exactly like in Screenshot (82) */}
        <div className="grid grid-cols-4 gap-2">
          
          {/* Card 1: Deposit History */}
          <button
            onClick={() => setCurrentView('deposit-history')}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <History className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">Deposit History</span>
          </button>

          {/* Card 2: Withdraw */}
          <button
            onClick={() => setCurrentView('withdraw')}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <ArrowDownCircle className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">Withdraw</span>
          </button>

          {/* Card 3: Transaction */}
          <button
            onClick={() => setCurrentView('deposit-history')}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">Transaction</span>
          </button>

          {/* Card 4: App Download */}
          <button
            onClick={() => setShowPwaModal(true)}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <Download className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">App Download</span>
          </button>

          {/* Card 5: My Team */}
          <button
            onClick={() => setCurrentView('referrals')}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">My Team</span>
          </button>

          {/* Card 6: Verified */}
          <button
            onClick={() => showToast('Your Account is fully Verified!', 'success')}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">Verified</span>
          </button>

          {/* Card 7: Password Change */}
          <button
            onClick={() => setCurrentView('profile')}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-[#D09009] transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF9EC] flex items-center justify-center text-[#D09009] mb-1.5">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">Password Change</span>
          </button>

          {/* Card 8: Logout */}
          <button
            onClick={() => userLogout()}
            className="bg-white rounded-xl py-3 px-1 border border-[#F5EAD4] shadow-2xs hover:border-red-500 transition flex flex-col items-center justify-center text-center active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-1.5">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-[#5C4015] leading-tight">Logout</span>
          </button>

        </div>

        {/* 8. Center STATS Divider Pill */}
        <div className="flex justify-center py-1">
          <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white text-[10px] font-black tracking-widest uppercase shadow-2xs">
            Stats
          </div>
        </div>

        {/* 9. Grid of 8 Account Statistics (2 rows of 4 items) exactly like in Screenshot (82) */}
        <div className="bg-white border border-[#F5EAD4] rounded-2xl p-3 shadow-2xs space-y-2">
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Safe Deposit</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                Rs {currentUser?.totalDeposit?.toLocaleString() || '0'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Pending Dep</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                Rs {currentUser?.pendingDeposit?.toLocaleString() || '0'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Total Withdr</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                Rs {currentUser?.totalWithdraw?.toLocaleString() || '0'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Team Support</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                {effectiveTeamCount}
              </span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Team Deposit</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                Rs {effectiveTeamInvestment?.toLocaleString() || '0'}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Team Withdr</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                Rs 0
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Active Plans</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                {activePlansCount}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-[#FFFDF9] border border-[#F5EAD4] text-center">
              <span className="text-[8px] font-bold text-[#8C7A6B] block uppercase tracking-tight">Inactive Plans</span>
              <span className="text-[10px] font-black font-mono text-[#D09009] block truncate mt-0.5">
                {inactivePlansCount}
              </span>
            </div>
          </div>
        </div>

      </main>

      {/* 10. Sticky elegant bottom navigation dock exactly like in Screenshot (82) */}
      <div className="fixed bottom-0 inset-x-0 z-40 max-w-md mx-auto px-3 pb-3">
        <div className="w-full h-16 rounded-2xl bg-white border border-[#F5EAD4] shadow-xl text-[#5C4015] flex items-center justify-around px-2">
          {/* Deposit Button */}
          <button
            onClick={() => setCurrentView('plans')}
            className="flex-1 flex flex-col items-center justify-center py-2 hover:bg-[#FFFDF5] rounded-xl transition duration-150 active:scale-95"
          >
            <Wallet className="w-5 h-5 text-[#D09009]" />
            <span className="text-[9px] font-bold mt-1">Deposit</span>
          </button>

          {/* My Plan Button */}
          <button
            onClick={() => setCurrentView('invest-logs')}
            className="flex-1 flex flex-col items-center justify-center py-2 hover:bg-[#FFFDF5] rounded-xl transition duration-150 active:scale-95"
          >
            <Layers className="w-5 h-5 text-[#D09009]" />
            <span className="text-[9px] font-bold mt-1">My Plan</span>
          </button>

          {/* Profile Setting Button */}
          <button
            onClick={() => setCurrentView('profile')}
            className="flex-1 flex flex-col items-center justify-center py-2 hover:bg-[#FFFDF5] rounded-xl transition duration-150 active:scale-95"
          >
            <User className="w-5 h-5 text-[#D09009]" />
            <span className="text-[9px] font-bold mt-1">Profile Setting</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={() => userLogout()}
            className="flex-1 flex flex-col items-center justify-center py-2 hover:bg-[#FFFDF5] rounded-xl transition duration-150 active:scale-95"
          >
            <LogOut className="w-5 h-5 text-[#D09009]" />
            <span className="text-[9px] font-bold mt-1">Logout</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <ProfitCalculatorModal
        isOpen={showCalcModal}
        onClose={() => setShowCalcModal(false)}
      />

      <CommissionTransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
      />

      <PwaInstallModal
        isOpen={showPwaModal}
        onClose={() => setShowPwaModal(false)}
        siteName={settings?.siteTitle || settings?.siteName || 'Sikka Poultry Farm'}
        logoUrl={settings?.logoUrl}
      />
    </div>
  );
}
