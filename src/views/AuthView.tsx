import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  LogIn, 
  UserPlus, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Mail, 
  Phone, 
  UserCheck, 
  Gift 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';

export function AuthView() {
  const { currentView, setCurrentView, userLogin, userRegister, showToast, settings } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Registration states
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regReferral, setRegReferral] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Login states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const siteName = settings?.siteName || 'Sikka Poultry Farm';

  useEffect(() => {
    if (currentView === 'register') {
      setMode('register');
    } else {
      setMode('login');
    }
  }, [currentView]);

  // Check URL parameter or localStorage for referral code
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get('ref') || urlParams.get('invite');
      if (refParam) {
        setRegReferral(refParam);
      } else {
        const stored = localStorage.getItem('prime_referral_code') || localStorage.getItem('trade_apex_ref');
        if (stored) setRegReferral(stored);
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername.trim()) {
      showToast('Please enter a username.', 'error');
      return;
    }
    if (!regEmail.trim()) {
      showToast('Please enter an email address.', 'error');
      return;
    }
    if (regPassword.length < 6) {
      showToast('Password must be at least 6 characters long.', 'error');
      return;
    }

    const cleanUsername = regUsername.trim().toLowerCase().replace(/\s+/g, '');
    const cleanEmail = regEmail.trim().toLowerCase();
    const cleanRef = regReferral.trim();

    const success = userRegister({
      username: cleanUsername,
      fullName: regFullName.trim() || cleanUsername,
      email: cleanEmail,
      phone: regPhone.trim(),
      password: regPassword,
      referralBy: cleanRef || 'Direct User',
    });

    if (success) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('trade_apex_ref');
        localStorage.removeItem('prime_referral_code');
      }
      setCurrentView('dashboard');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername.trim()) {
      showToast('Please enter your username.', 'error');
      return;
    }
    if (!loginPassword) {
      showToast('Please enter your password.', 'error');
      return;
    }

    const success = userLogin(loginUsername.trim(), loginPassword);
    if (success) {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] text-[#4A3515] flex flex-col justify-between py-4 sm:py-8 px-4 sm:px-6 font-sans antialiased selection:bg-[#E59B12] selection:text-white">
      
      {/* Top Header Bar matching Screenshot (80) */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 sm:py-3 px-1 sm:px-2">
        <div className="flex items-center gap-3">
          <PrimeInvestLogo size="md" customLogoUrl={settings?.logoUrl} />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#5C4015] leading-tight">
              {siteName}
            </h1>
            <p className="text-xs sm:text-sm text-[#8C7A6B] font-medium leading-none mt-0.5">
              {mode === 'login' ? 'Secure Login' : 'Secure Registration'}
            </p>
          </div>
        </div>

        {/* Back to Home Button matching Screenshot (80) */}
        <button
          type="button"
          onClick={() => setCurrentView('landing')}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#EADBBD] bg-[#FAF5EA] hover:bg-white text-[#8C6320] text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#8C6320]" />
          <span>Home</span>
        </button>
      </header>

      {/* Center Authentication Card */}
      <main className="w-full max-w-lg mx-auto my-auto py-4">
        <div className="w-full bg-white rounded-3xl p-6 sm:p-10 border border-[#F0E4CE] shadow-sm text-center relative overflow-hidden">
          
          {/* Circular Center Logo Badge */}
          <div className="flex justify-center mb-3">
            <PrimeInvestLogo size="lg" customLogoUrl={settings?.logoUrl} />
          </div>

          {/* Heading and Subtitle matching Screenshot (80) */}
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#5C4015] tracking-tight leading-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7A6B] mt-1 leading-relaxed">
            {mode === 'login' 
              ? 'Enter your account details to continue.' 
              : 'Enter your details to register your account.'}
          </p>

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="mt-6 text-left space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4015] mb-1.5">
                  Username
                </label>
                <div className="relative flex items-center border border-[#E5BE7E] hover:border-[#D99A26] focus-within:border-[#D99A26] rounded-2xl bg-white p-1.5 transition-all shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                    className="w-full bg-transparent pl-3 pr-2 text-sm text-[#4A3515] placeholder-[#B5A593] outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4015] mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center border border-[#E5BE7E] hover:border-[#D99A26] focus-within:border-[#D99A26] rounded-2xl bg-white p-1.5 transition-all shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full bg-transparent pl-3 pr-2 text-sm text-[#4A3515] placeholder-[#B5A593] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="p-2 text-[#B5A593] hover:text-[#D09009] transition-colors"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Login Button */}
              <button
                type="submit"
                className="w-full mt-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E59B12] via-[#D38806] to-[#B87707] hover:brightness-105 active:scale-[0.99] text-white font-bold text-base shadow-md shadow-[#D38806]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Login</span>
              </button>

              {/* Don't have an account link */}
              <div className="text-center text-xs text-[#8C7A6B] pt-2">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#D09009] font-bold hover:underline cursor-pointer"
                >
                  Register
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="mt-6 text-left space-y-3.5">
              {/* Username Field */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4015] mb-1.5">
                  Username
                </label>
                <div className="relative flex items-center border border-[#E5BE7E] hover:border-[#D99A26] focus-within:border-[#D99A26] rounded-2xl bg-white p-1.5 transition-all shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="Choose username"
                    required
                    className="w-full bg-transparent pl-3 pr-2 text-sm text-[#4A3515] placeholder-[#B5A593] outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4015] mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center border border-[#E5BE7E] hover:border-[#D99A26] focus-within:border-[#D99A26] rounded-2xl bg-white p-1.5 transition-all shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-transparent pl-3 pr-2 text-sm text-[#4A3515] placeholder-[#B5A593] outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4015] mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center border border-[#E5BE7E] hover:border-[#D99A26] focus-within:border-[#D99A26] rounded-2xl bg-white p-1.5 transition-all shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full bg-transparent pl-3 pr-2 text-sm text-[#4A3515] placeholder-[#B5A593] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="p-2 text-[#B5A593] hover:text-[#D09009] transition-colors"
                  >
                    {showRegPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Register Button */}
              <button
                type="submit"
                className="w-full mt-6 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E59B12] via-[#D38806] to-[#B87707] hover:brightness-105 active:scale-[0.99] text-white font-bold text-base shadow-md shadow-[#D38806]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Registration</span>
              </button>

              {/* Already have an account link */}
              <div className="text-center text-xs text-[#8C7A6B] pt-2">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#D09009] font-bold hover:underline cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          )}

          {/* Bottom Security Badge Pill matching Screenshot (80) */}
          <div className="mt-6 py-2.5 px-4 rounded-xl sm:rounded-2xl bg-[#FDF8EE] border border-[#F3E6D0] flex items-center justify-center gap-1.5 text-xs text-[#8C7A6B]">
            <Shield className="w-3.5 h-3.5 text-[#D09009]" />
            <span>Secure access to your account</span>
          </div>

        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center pt-4 pb-2 text-[11px] text-[#8C7A6B]/80 flex flex-col items-center gap-1">
        <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
      </footer>

    </div>
  );
}
