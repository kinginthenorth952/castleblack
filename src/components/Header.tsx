import { useState } from 'react';
import { ArrowLeft, Bell, Clock, Menu, User as UserIcon, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from './PrimeInvestLogo';

export function Header({
  title,
  subtitle,
  showBack = false,
  rightAction,
}: {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: 'history' | 'profile' | 'add' | 'notifications';
}) {
  const { currentView, setCurrentView, currentUser, settings } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // If on dashboard, render standard dashboard header
  if (currentView === 'dashboard') {
    return (
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#FDFBF7]/90 border-b border-[#EADCC9] shadow-xs transition-colors duration-200">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
            <div>
              <span className="font-extrabold text-base tracking-tight text-[#3C3024] group-hover:text-[#D09009] transition">
                {settings?.siteName || 'Prime Invest'}
              </span>
              <span className="block text-[10px] text-[#8C7A6B] uppercase tracking-widest font-mono font-bold -mt-0.5">
                {settings?.siteSubtitle || 'Wealth & Growth Partner'}
              </span>
            </div>
          </div>

          {/* Right Controls: Notification Bell + Menu */}
          <div className="flex items-center gap-1.5">
            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl border border-[#EADCC9] bg-white/80 text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2] shadow-xs transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-[#D09009]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D09009]"></span>
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-xl border border-[#EADCC9] bg-white/80 text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2] shadow-xs transition"
              aria-label="Navigation Menu"
            >
              {showMenu ? <X className="w-4 h-4 text-[#3C3024]" /> : <Menu className="w-4 h-4 text-[#3C3024]" />}
            </button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-4 top-14 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-2xl border border-[#EADCC9] bg-white/95 backdrop-blur-2xl shadow-xl shadow-[#3C3024]/10 z-50 text-xs text-[#3C3024]">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EADCC9] mb-2.5">
              <span className="font-bold flex items-center gap-1.5 text-[#3C3024]">
                <Bell className="w-3.5 h-3.5 text-[#D09009]" /> Notifications & Alerts
              </span>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-[#8C7A6B] hover:text-[#3C3024] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <div className="p-3 rounded-xl border border-[#EADCC9] bg-[#FCF8F2]">
                <p className="font-bold text-[#D09009]">Official Notice</p>
                <p className="mt-1 leading-relaxed text-xs text-[#3C3024]">{settings.noticeBanner}</p>
                <span className="text-[10px] mt-1.5 block text-[#8C7A6B]">Live Update</span>
              </div>
              <div className="p-3 rounded-xl border border-[#EADCC9] bg-[#FCF8F2]">
                <p className="font-bold text-[#15803D]">Payment Gateway Active</p>
                <p className="mt-1 leading-relaxed text-xs text-[#3C3024]">
                  Easypaisa deposits to {settings.easypaisaTitle} ({settings.easypaisaAccount}) are processed automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hamburger Quick Menu */}
        {showMenu && (
          <div className="absolute right-4 top-14 w-64 p-3 rounded-2xl border border-[#EADCC9] bg-white/95 backdrop-blur-2xl shadow-xl shadow-[#3C3024]/10 z-50 text-[#3C3024]">
            <div className="px-3 py-2 border-b border-[#EADCC9] mb-1">
              <p className="text-xs font-bold text-[#3C3024]">{currentUser?.username || 'Guest'}</p>
              <p className="text-[11px] text-[#8C7A6B]">{currentUser?.email || 'Not logged in'}</p>
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => { setCurrentView('plans'); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs transition text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]"
              >
                Investment Plans
              </button>
              <button
                onClick={() => { setCurrentView('invest-logs'); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs transition text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]"
              >
                My Plans & Tasks
              </button>
              <button
                onClick={() => { setCurrentView('tasks'); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs transition text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]"
              >
                Daily ROI Tasks
              </button>
              <button
                onClick={() => { setCurrentView('referrals'); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs transition text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]"
              >
                Referral Network
              </button>
              <button
                onClick={() => { setCurrentView('deposit-history'); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs transition text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]"
              >
                Deposit History
              </button>
              <button
                onClick={() => { setCurrentView('withdraw-history'); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs transition text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]"
              >
                Withdraw History
              </button>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Inner Views Header
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#FDFBF7]/90 border-b border-[#EADCC9] shadow-xs transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Back Button */}
        {showBack ? (
          <button
            onClick={() => setCurrentView('dashboard')}
            className="w-10 h-10 rounded-xl border border-[#EADCC9] bg-white/90 text-[#3C3024] hover:bg-[#FCF8F2] flex items-center justify-center transition shadow-xs"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4 h-4 text-[#3C3024]" />
          </button>
        ) : (
          <div className="w-10" />
        )}

        {/* Center Pill Badge */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-xl border border-[#EADCC9] bg-white/90 backdrop-blur-md shadow-xs">
          <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
          <div className="text-left">
            <h1 className="text-xs sm:text-sm font-bold leading-tight text-[#3C3024]">
              {title || settings?.siteName || 'Prime Invest'}
            </h1>
            {subtitle && (
              <p className="text-[10px] font-semibold leading-none text-[#8C7A6B]">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Action: Action button */}
        <div className="flex items-center gap-1.5">
          {rightAction === 'history' && (
            <button
              onClick={() => setCurrentView('deposit-history')}
              className="w-10 h-10 rounded-xl border border-[#EADCC9] bg-white/90 text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2] flex items-center justify-center transition shadow-xs"
              title="Payment History"
            >
              <Clock className="w-4 h-4 text-[#D09009]" />
            </button>
          )}
          {rightAction === 'profile' && (
            <button
              onClick={() => setCurrentView('profile')}
              className="w-10 h-10 rounded-xl border border-[#EADCC9] bg-white/90 text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2] flex items-center justify-center transition shadow-xs"
              title="My Profile"
            >
              <UserIcon className="w-4 h-4 text-[#D09009]" />
            </button>
          )}
          {rightAction === 'add' && (
            <button
              onClick={() => setCurrentView('plans')}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] flex items-center justify-center text-white shadow-md shadow-[#D09009]/20 hover:scale-105 transition font-bold text-lg"
              title="Buy Plan"
            >
              +
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
