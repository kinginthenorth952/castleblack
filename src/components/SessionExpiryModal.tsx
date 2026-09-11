import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ShieldAlert, Clock, RefreshCw, LogOut, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Total Inactivity Limit: 15 minutes (in milliseconds)
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000;
// Warning Threshold: Show modal when 2 minutes (120 seconds) remain
const WARNING_THRESHOLD_MS = 2 * 60 * 1000;

export function SessionExpiryModal() {
  const { currentUser, isAdminAuthenticated, userLogout, adminLogout, showToast } = useApp();
  
  const [showModal, setShowModal] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const lastActivityRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthenticated = Boolean(currentUser || isAdminAuthenticated);

  // Extend the session / reset inactivity timer
  const extendSession = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowModal(false);
    setSecondsRemaining(Math.floor(WARNING_THRESHOLD_MS / 1000));
    showToast('Session extended successfully. Your account is secure.', 'success');
  }, [showToast]);

  // Handle explicit or automated logout
  const handleLogout = useCallback((isAutoTimeout = false) => {
    setShowModal(false);
    if (isAdminAuthenticated) {
      adminLogout();
    }
    if (currentUser) {
      userLogout();
    }
    if (isAutoTimeout) {
      showToast('Your session has expired due to inactivity for security protection. Please log in again.', 'info');
    }
  }, [isAdminAuthenticated, currentUser, adminLogout, userLogout, showToast]);

  // Register user activity listeners (only when not in the active warning modal)
  useEffect(() => {
    if (!isAuthenticated) {
      setShowModal(false);
      return;
    }

    const resetActivity = () => {
      // If modal is not shown, update activity timestamp on interaction
      if (!showModal) {
        lastActivityRef.current = Date.now();
      }
    };

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetActivity, { passive: true });
    });

    // Main heartbeat interval to monitor inactivity
    const interval = setInterval(() => {
      if (!isAuthenticated) return;

      const elapsed = Date.now() - lastActivityRef.current;
      const timeLeft = INACTIVITY_TIMEOUT_MS - elapsed;

      if (timeLeft <= 0) {
        // Time fully expired
        handleLogout(true);
      } else if (timeLeft <= WARNING_THRESHOLD_MS) {
        // Inside warning window
        setSecondsRemaining(Math.max(1, Math.ceil(timeLeft / 1000)));
        setShowModal(true);
      } else {
        if (showModal) {
          setShowModal(false);
        }
      }
    }, 1000);

    timerRef.current = interval;

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetActivity);
      });
      clearInterval(interval);
    };
  }, [isAuthenticated, showModal, handleLogout]);

  // Listen for custom trigger event (e.g. from security settings to test the modal preview)
  useEffect(() => {
    const handleTestTrigger = () => {
      if (isAuthenticated) {
        setSecondsRemaining(60);
        setShowModal(true);
      } else {
        showToast('Please sign in first to preview the session security warning.', 'info');
      }
    };

    window.addEventListener('trigger-session-warning-test', handleTestTrigger);
    return () => {
      window.removeEventListener('trigger-session-warning-test', handleTestTrigger);
    };
  }, [isAuthenticated, showToast]);

  if (!isAuthenticated || !showModal) {
    return null;
  }

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.min(100, Math.max(0, (secondsRemaining / (WARNING_THRESHOLD_MS / 1000)) * 100));

  const usernameDisplay = currentUser?.username || (isAdminAuthenticated ? 'Administrator' : 'Investor');

  return (
    <div
      id="session-expiry-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-warning-title"
    >
      <div
        id="session-expiry-modal-card"
        className="w-full max-w-md rounded-2xl bg-[#12161D] border border-[#343F50] p-6 shadow-2xl shadow-black/90 relative overflow-hidden"
      >
        {/* Subtle Luxury Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header Icon & Security Badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#D6B36A] flex items-center justify-center shadow-inner shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181F2A] border border-[#2B3545] text-[11px] font-mono font-semibold text-[#D6B36A]">
            <Lock className="w-3 h-3 text-[#D6B36A]" />
            <span>FINANCIAL SECURITY TIMEOUT</span>
          </div>
        </div>

        {/* Modal Title & Description */}
        <div className="mt-4">
          <h3
            id="session-warning-title"
            className="text-lg font-bold text-[#F4F1EA] tracking-tight"
          >
            Your Session is About to Expire
          </h3>
          <p className="text-xs text-[#9EA7B4] mt-1.5 leading-relaxed">
            Hi <span className="font-semibold text-[#F4F1EA]">{usernameDisplay}</span>, you have been inactive for a while. For your account security and protection of your funds, you will be automatically signed out soon.
          </p>
        </div>

        {/* Live Dynamic Countdown Box */}
        <div className="mt-5 p-4 rounded-xl bg-[#161B23] border border-[#252E3B] flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#7F8792] font-medium">
            <Clock className="w-4 h-4 text-[#D6B36A] animate-spin" style={{ animationDuration: '3s' }} />
            <span>Time remaining to stay logged in:</span>
          </div>
          
          <div className="text-3xl font-extrabold font-mono text-[#D6B36A] tracking-wider py-1">
            {formattedTime}
          </div>

          {/* Animated Countdown Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-[#0D1015] overflow-hidden mt-1 border border-[#232B37]">
            <div
              className={`h-full transition-all duration-1000 rounded-full ${
                secondsRemaining <= 30
                  ? 'bg-rose-500 shadow-sm shadow-rose-500/50'
                  : 'bg-gradient-to-r from-amber-500 to-[#D6B36A]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between w-full text-[10px] text-[#636C78] font-mono px-0.5 pt-0.5">
            <span>Auto-logout safeguard</span>
            <span>{secondsRemaining}s left</span>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0E1217] border border-[#1E2530] text-[11px] text-[#7F8792]">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Active investments, daily profit returns, and balances remain unaffected.</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            id="btn-stay-logged-in"
            onClick={extendSession}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] active:scale-95 text-[#0B0D10] font-bold text-xs tracking-wide shadow-lg shadow-amber-950/40 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Stay Logged In</span>
          </button>

          <button
            id="btn-session-logout-now"
            onClick={() => handleLogout(false)}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#1B212B] hover:bg-[#252E3B] active:scale-95 border border-[#2B3545] text-[#D36B6B] hover:text-[#F4F1EA] font-semibold text-xs transition flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
