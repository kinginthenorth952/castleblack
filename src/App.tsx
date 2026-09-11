import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DashboardView } from './views/DashboardView';
import { InvestmentPlansView } from './views/InvestmentPlansView';
import { ManualDepositView } from './views/ManualDepositView';
import { InvestLogsView } from './views/InvestLogsView';
import { DailyTasksView } from './views/DailyTasksView';
import { WithdrawView } from './views/WithdrawView';
import { ReferralsView } from './views/ReferralsView';
import { HistoryView } from './views/HistoryView';
import { ProfileView } from './views/ProfileView';
import { AuthView } from './views/AuthView';
import { AdminView } from './views/AdminView';
import { LandingPageView } from './views/LandingPageView';
import { BottomNav } from './components/BottomNav';
import { SessionExpiryModal } from './components/SessionExpiryModal';
import { CheckCircle, Info, XCircle } from 'lucide-react';

function AppContent() {
  const { currentView, toasts, setCurrentView, currentUser } = useApp();

  // Listen for secure route /controlcentersarmayadmin5arm7a
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        path === '/controlcentersarmayadmin5arm7a' ||
        path.startsWith('/controlcentersarmayadmin5arm7a') ||
        hash === '#/controlcentersarmayadmin5arm7a' ||
        hash === '#controlcentersarmayadmin5arm7a' ||
        search.includes('controlcentersarmayadmin5arm7a') ||
        path === '/control-center-administrator' ||
        path.startsWith('/control-center-administrator') ||
        hash === '#/control-center-administrator' ||
        hash === '#control-center-administrator' ||
        search.includes('control-center-administrator')
      ) {
        setCurrentView('admin');
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, [setCurrentView]);

  // Listen for affiliate referral invitation link (?ref=..., ?invite=..., ?r=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      let refCode = searchParams.get('ref') || searchParams.get('invite') || searchParams.get('r');

      // Also support hash params if user opened a hash URL (e.g. #/?ref=username)
      if (!refCode && window.location.hash.includes('?')) {
        const hashQuery = window.location.hash.substring(window.location.hash.indexOf('?') + 1);
        const hashParams = new URLSearchParams(hashQuery);
        refCode = hashParams.get('ref') || hashParams.get('invite') || hashParams.get('r');
      }

      if (refCode) {
        const cleanRef = refCode.trim().toLowerCase();
        localStorage.setItem('trade_apex_ref', cleanRef);
        localStorage.setItem('prime_referral_code', cleanRef);
        // If not logged in, take the user directly to register with sponsor prefilled
        if (!currentUser) {
          setCurrentView('register');
        }
      }
    } catch (err) {
      // Ignore URL parsing errors
    }
  }, [currentUser, setCurrentView]);

  // Keep browser URL in sync when admin view is active or exited
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (currentView === 'admin') {
        if (window.location.pathname !== '/controlcentersarmayadmin5arm7a') {
          window.history.replaceState(null, '', '/controlcentersarmayadmin5arm7a');
        }
      } else {
        if (
          window.location.pathname === '/controlcentersarmayadmin5arm7a' ||
          window.location.pathname === '/control-center-administrator'
        ) {
          window.history.replaceState(null, '', '/');
        }
      }
    } catch (err) {
      // Ignore security errors in restricted iframe environments
    }
  }, [currentView]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPageView />;
      case 'dashboard':
        return currentUser ? <DashboardView /> : <LandingPageView />;
      case 'plans':
        return currentUser ? <InvestmentPlansView /> : <LandingPageView />;
      case 'deposit-manual':
        return currentUser ? <ManualDepositView /> : <AuthView initialMode="login" />;
      case 'invest-logs':
        return currentUser ? <InvestLogsView /> : <AuthView initialMode="login" />;
      case 'tasks':
        return currentUser ? <DailyTasksView /> : <AuthView initialMode="login" />;
      case 'withdraw':
        return currentUser ? <WithdrawView /> : <AuthView initialMode="login" />;
      case 'deposit-history':
        return currentUser ? <HistoryView defaultTab="DEPOSITS" /> : <AuthView initialMode="login" />;
      case 'withdraw-history':
        return currentUser ? <HistoryView defaultTab="WITHDRAWALS" /> : <AuthView initialMode="login" />;
      case 'referrals':
        return currentUser ? <ReferralsView /> : <AuthView initialMode="login" />;
      case 'profile':
        return currentUser ? <ProfileView /> : <AuthView initialMode="login" />;
      case 'login':
        return <AuthView initialMode="login" />;
      case 'register':
        return <AuthView initialMode="register" />;
      case 'admin':
        return <AdminView />;
      default:
        return currentUser ? <DashboardView /> : <LandingPageView />;
    }
  };

  const showBottomNav = currentUser && !['login', 'register', 'admin', 'landing'].includes(currentView);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3C3024] selection:bg-[#F5BE27] selection:text-[#3C3024] font-sans antialiased transition-colors duration-200">
      {/* Dynamic View */}
      {renderCurrentView()}

      {/* Persistent Bottom Navigation Dock (shown on authenticated investor screens) */}
      {showBottomNav && <BottomNav />}

      {/* Financial Session Expiry Safeguard Modal */}
      <SessionExpiryModal />

      {/* Global Toast Notification */}
      {toasts && toasts.length > 0 && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-2.5 rounded-xl border shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold max-w-sm pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-200 ${
                toast.type === 'success'
                  ? 'bg-[#1A281E] border-[#2D5A37] text-[#000000] shadow-emerald-950/20'
                  : toast.type === 'error'
                    ? 'bg-[#2E1818] border-[#5C2626] text-[#000000] shadow-rose-950/20'
                    : 'bg-[#2F2514] border-[#634C19] text-[#000000] shadow-amber-950/20'
              }`}
            >
              {toast.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0 text-[#15803D]" />}
              {toast.type === 'error' && <XCircle className="w-4 h-4 shrink-0 text-[#B91C1C]" />}
              {toast.type === 'info' && <Info className="w-4 h-4 shrink-0 text-[#D09009]" />}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
