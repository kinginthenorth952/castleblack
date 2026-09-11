import { useState } from 'react';
import { 
  ArrowDownCircle, 
  ArrowRightLeft, 
  ArrowUpCircle, 
  Calculator, 
  Check, 
  Coins, 
  Copy, 
  Download, 
  Flame, 
  Gift, 
  History, 
  Layers,
  MessageCircle, 
  PlayCircle, 
  Receipt, 
  Share2, 
  Sparkles, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Wallet,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';
import { ProfitCalculatorModal } from '../components/ProfitCalculatorModal';
import { CommissionTransferModal } from '../components/CommissionTransferModal';
import { PwaInstallModal } from '../components/PwaInstallModal';

export function DashboardView() {
  const { currentUser, users, settings, setCurrentView, showToast, userPlans } = useApp();
  const [copied, setCopied] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

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
    : `https://trade-apex.xyz?ref=${currentUser?.username || 'user'}`;

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

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] pb-24 text-[#3C3024] flex flex-col items-center">
      <Header />

      <main className="w-full max-w-md px-3 sm:px-4 space-y-3.5">
        {/* Active Announcement / Notice Banner */}
        {settings.showNoticeBanner && settings.noticeBanner && (
          <div className="relative overflow-hidden rounded-2xl bg-white border border-[#EADCC9] p-3.5 shadow-md shadow-[#3C3024]/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-4.5 h-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#D09009] uppercase tracking-widest block">
                Announcement
              </span>
              <p className="text-xs text-[#3C3024] font-medium leading-snug line-clamp-2">
                {settings.noticeBanner}
              </p>
            </div>
          </div>
        )}

        {/* User Account Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-[#EADCC9] p-4 sm:p-5 shadow-lg shadow-[#3C3024]/5">
          <div className="flex items-center gap-3.5">
            {/* User Avatar */}
            <div className="w-12 h-12 rounded-2xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-center shrink-0 shadow-xs">
              <span className="font-extrabold text-base text-[#D09009]">
                {currentUser?.firstName?.charAt(0) || currentUser?.username?.charAt(0) || 'U'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#3C3024] truncate">
                  {currentUser?.username || 'Investor'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 text-[9px] font-mono font-bold">
                  {currentUser?.role === 'admin' ? 'VIP Admin' : 'Verified'}
                </span>
              </div>
              <p className="text-[11px] text-[#8C7A6B] font-medium">
                Referred By: <span className="text-[#3C3024] font-semibold">{currentUser?.referralBy || 'No Upliner'}</span>
              </p>
              <div className="mt-1">
                <span className="text-[10px] text-[#8C7A6B] font-semibold uppercase tracking-wider">
                  Main Wallet Balance
                </span>
                <p className="text-2xl font-black font-mono text-[#3C3024] tracking-tight">
                  Rs {currentUser?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick 3 Action Buttons below balance */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-[#EADCC9]">
            <button
              onClick={() => setCurrentView('plans')}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] text-white transition font-bold group shadow-md shadow-[#D09009]/20 active:scale-95"
            >
              <Wallet className="w-4 h-4 text-white" />
              <span className="text-[11px] mt-1">Deposit</span>
            </button>

            <button
              onClick={() => setCurrentView('withdraw')}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] hover:bg-[#F7EEDD] transition font-semibold group shadow-xs active:scale-95"
            >
              <ArrowDownCircle className="w-4 h-4 text-[#15803D] group-hover:scale-105 transition" />
              <span className="text-[11px] mt-1">Withdraw</span>
            </button>

            <button
              onClick={() => setCurrentView('tasks')}
              className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] hover:bg-[#F7EEDD] transition font-semibold group shadow-xs active:scale-95 relative"
            >
              <PlayCircle className="w-4 h-4 text-[#D09009] group-hover:scale-105 transition" />
              <span className="text-[11px] mt-1">Daily Task</span>
              {activePlansCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#15803D] text-[9px] font-mono font-bold text-white flex items-center justify-center">
                  {activePlansCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Services Grid */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-4 shadow-lg shadow-[#3C3024]/5">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
              Quick Portals & Tools
            </span>
            <span className="text-[10px] text-[#8C7A6B] font-medium">Instant 1-Tap</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Investment Plans */}
            <button
              onClick={() => setCurrentView('plans')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                All Plans
              </span>
            </button>

            {/* ROI Calculator */}
            <button
              onClick={() => setShowCalcModal(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                ROI Calculator
              </span>
            </button>

            {/* Commission Transfer */}
            <button
              onClick={() => setShowTransferModal(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] flex items-center justify-center group-hover:scale-105 transition">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                Transfer Royalty
              </span>
            </button>

            {/* App Download / PWA Install */}
            <button
              onClick={() => setShowPwaModal(true)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                Install App
              </span>
            </button>

            {/* Official Support WhatsApp */}
            <button
              onClick={() => handleOpenWhatsApp(settings.adminWhatsApp)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#15803D] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] flex items-center justify-center group-hover:scale-105 transition">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                Helpdesk 24/7
              </span>
            </button>

            {/* WhatsApp Community */}
            <button
              onClick={() => handleOpenWhatsApp(settings.whatsappGroup)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#15803D] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] flex items-center justify-center group-hover:scale-105 transition">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                Community
              </span>
            </button>

            {/* My Active Plans */}
            <button
              onClick={() => setCurrentView('invest-logs')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                My Plans ({activePlansCount})
              </span>
            </button>

            {/* My Team */}
            <button
              onClick={() => setCurrentView('referrals')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                Affiliates (15%)
              </span>
            </button>

            {/* Deposit History */}
            <button
              onClick={() => setCurrentView('deposit-history')}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] hover:bg-[#F7EEDD] transition group text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF8E8] border border-[#F5BE27]/40 text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                <History className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-[#3C3024] mt-1.5 leading-tight">
                Ledger History
              </span>
            </button>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-4 shadow-lg shadow-[#3C3024]/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#3C3024] flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#D09009]" /> Referral Link
            </span>
            <span className="text-[10px] text-[#D09009] font-bold font-mono">15% Level 1 • 3% Level 2</span>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="w-full bg-transparent px-2.5 py-1 text-xs text-[#3C3024] font-mono focus:outline-none truncate"
            />
            <button
              onClick={handleCopyReferral}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] text-white text-xs font-bold shrink-0 transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-4 shadow-lg shadow-[#3C3024]/5">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
              Account Statistics
            </span>
            <span className="text-[10px] text-[#8C7A6B] font-medium">Live Values</span>
          </div>

          <div className="space-y-2">
            {/* Row 1: Pending Deposit & Pending Withdraw */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Pending Deposit</span>
                <span className="text-sm font-bold font-mono text-[#D09009]">
                  Rs {currentUser?.pendingDeposit?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Pending Withdraw</span>
                <span className="text-sm font-bold font-mono text-[#D09009]">
                  Rs {currentUser?.pendingWithdraw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
            </div>

            {/* Row 2: Total Deposit & Total Withdraw */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Total Deposit</span>
                <span className="text-sm font-bold font-mono text-[#15803D]">
                  Rs {currentUser?.totalDeposit?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Total Withdraw</span>
                <span className="text-sm font-bold font-mono text-[#B91C1C]">
                  Rs {currentUser?.totalWithdraw?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
            </div>

            {/* Row 3: Total Team & Team Investment */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Total Team</span>
                <span className="text-sm font-bold font-mono text-[#3C3024]">
                  {effectiveTeamCount} Members
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Team Investment</span>
                <span className="text-sm font-bold font-mono text-[#3C3024]">
                  Rs {effectiveTeamInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Row 4: Team Commission with 1-tap Transfer */}
            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#8C7A6B] block">Affiliate Commission Balance</span>
                <span className="text-sm font-bold font-mono text-[#15803D]">
                  Rs {currentUser?.teamCommission?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowTransferModal(true)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] text-white text-[10px] font-bold flex items-center gap-1 transition shadow-xs"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>Transfer</span>
              </button>
            </div>
          </div>
        </div>
      </main>

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
        siteName={settings?.siteTitle || 'SarmayaXProfit'}
        logoUrl={settings?.logoUrl}
      />
    </div>
  );
}
