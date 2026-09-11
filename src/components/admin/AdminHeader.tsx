import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  LogOut, 
  ExternalLink,
  Coins,
  UserCheck,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  Settings,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LoginAsUserModal } from './LoginAsUserModal';
import { ThemeToggle } from '../ThemeToggle';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenDistributeProfit: () => void;
  onOpenSearch: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onOpenDistributeProfit,
  onOpenSearch,
}) => {
  const { adminLogout, settings, setCurrentView, deposits, withdrawals, users } = useApp();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLoginAsModal, setShowLoginAsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const pendingDepositsCount = deposits.filter((d) => d.status === 'pending').length;
  const pendingWithdrawsCount = withdrawals.filter((w) => w.status === 'pending').length;
  const totalNotifications = pendingDepositsCount + pendingWithdrawsCount;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-[#EADCC9] px-4 flex items-center justify-between bg-white/90 text-[#3C3024] shadow-xs backdrop-blur-xl transition-colors duration-200">
      {/* Left section: Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          id="btn-admin-sidebar-toggle"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-xl border border-[#EADCC9] bg-[#FCF8F2] text-[#8C7A6B] hover:text-[#3C3024] hover:bg-white transition"
          title="Toggle Navigation Sidebar"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">
            ViserAdmin Panel
          </span>
          <span className="text-[#EADCC9]">/</span>
          <span className="text-xs font-extrabold text-[#D09009]">
            Control Center
          </span>
        </div>
      </div>

      {/* Center / Search Quick Launcher */}
      <div className="flex items-center flex-1 max-w-sm sm:max-w-md mx-2 sm:mx-4">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#EADCC9] bg-[#FCF8F2] text-xs text-[#8C7A6B] hover:bg-white hover:border-[#D09009] transition"
        >
          <span className="text-xs text-[#8C7A6B]">Search</span>
          <Search className="w-4 h-4 text-[#D09009]" />
        </button>
      </div>

      {/* Right section: Action Tools & Profile Badge */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Login as User Quick Launcher */}
        <button
          id="btn-header-login-as-user"
          onClick={() => setShowLoginAsModal(true)}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#FEF8E8] border border-[#EADCC9] text-[#D09009] hover:bg-[#FDE8B3] text-xs font-bold hidden md:flex items-center gap-1.5 transition active:scale-95 shadow-xs"
          title="Login as any investor to manage their account"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Login As User</span>
        </button>

        {/* Distribute Profit Quick Action */}
        <button
          id="btn-header-distribute-profit"
          onClick={onOpenDistributeProfit}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white hover:brightness-105 text-xs font-bold hidden sm:flex items-center gap-1.5 transition shadow-xs"
          title="Distribute 24h Daily ROI Yield"
        >
          <Coins className="w-3.5 h-3.5 text-white" />
          <span>ROI Cron</span>
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl border border-[#EADCC9] bg-[#FCF8F2] text-[#8C7A6B] hover:text-[#3C3024] hover:bg-white transition"
            title="System Alerts & Notifications"
          >
            <Bell className="w-4 h-4" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-black">
                {totalNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-2xl border border-[#EADCC9] bg-white text-[#3C3024] shadow-lg z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EADCC9] mb-3">
                <span className="font-bold flex items-center gap-1.5 text-sm">
                  <Bell className="w-4 h-4 text-[#D09009]" /> Pending Queues ({totalNotifications})
                </span>
                <span className="text-[10px] text-[#15803D] font-mono font-bold">Live Sync</span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className={`p-2.5 rounded-xl border ${pendingDepositsCount > 0 ? 'bg-[#F0FDF4] border-[#15803D]/30' : 'bg-[#FCF8F2] border-[#EADCC9]'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#15803D]">Pending Deposits</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] font-mono font-bold">
                      {pendingDepositsCount} pending
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7A6B] mt-1">
                    {pendingDepositsCount > 0 
                      ? 'Investors have submitted deposit slips waiting for verification.' 
                      : 'All deposit receipts are verified and up to date.'}
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl border ${pendingWithdrawsCount > 0 ? 'bg-[#FEF2F2] border-rose-300' : 'bg-[#FCF8F2] border-[#EADCC9]'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-700">Pending Withdrawals</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-mono font-bold">
                      {pendingWithdrawsCount} pending
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7A6B] mt-1">
                    {pendingWithdrawsCount > 0 
                      ? 'Payout requests waiting for bank/Easypaisa dispatch.' 
                      : 'All investor withdrawal requests have been dispatched.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Client Website Preview Link */}
        <button
          id="btn-admin-view-site"
          onClick={() => setCurrentView('landing')}
          className="px-2.5 py-1.5 rounded-xl border border-[#EADCC9] bg-[#FCF8F2] text-[#8C7A6B] hover:text-[#D09009] hover:bg-white text-xs transition hidden xl:flex items-center gap-1.5 font-bold"
          title="Preview Investor Website"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Site</span>
        </button>

        {/* Admin Profile Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EADCC9] bg-[#FCF8F2] hover:bg-white text-[#3C3024] transition shadow-xs"
          >
            <div className="w-6 h-6 rounded-full bg-[#D09009] text-white flex items-center justify-center font-black text-[10px] shadow-xs">
              <UserCheck className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold font-mono">
              admin19@hsdhgabv
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D09009] opacity-80" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 top-12 w-56 p-2 rounded-2xl border border-[#EADCC9] bg-white text-[#3C3024] shadow-lg z-50 text-xs">
              <div className="p-2 border-b border-[#EADCC9] mb-1">
                <p className="font-bold">Staff Console: admin19@hsdhgabv</p>
                <p className="text-[10px] text-[#D09009] font-mono font-bold">Role: Master Administrator</p>
              </div>

              <button
                onClick={() => { setShowLoginAsModal(true); setShowUserDropdown(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FCF8F2] flex items-center gap-2 transition font-medium"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D09009]" />
                <span>Impersonate Investor</span>
              </button>

              <button
                onClick={() => { onOpenDistributeProfit(); setShowUserDropdown(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FCF8F2] flex items-center gap-2 transition font-medium"
              >
                <Coins className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Trigger ROI Yield</span>
              </button>

              <button
                onClick={() => { adminLogout(); setShowUserDropdown(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition mt-1 border-t border-[#EADCC9] pt-2 font-bold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showLoginAsModal && (
        <LoginAsUserModal onClose={() => setShowLoginAsModal(false)} />
      )}
    </header>
  );
};
