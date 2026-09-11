import React, { useState } from 'react';
import { 
  ArrowLeft,
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ShieldCheck, 
  User, 
  UserCheck, 
  UserPlus,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';
import { ThemeToggle } from '../components/ThemeToggle';

export function AuthView({ initialMode = 'login' }: { initialMode?: 'login' | 'register' }) {
  const { userLogin, userRegister, setCurrentView, showToast, settings } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Register Fields: strictly just mail address, username, and password
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Referral sponsor captured from invite link (?ref=... / ?invite=...) or local storage
  const [referralCode, setReferralCode] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const queryRef = searchParams.get('ref') || searchParams.get('invite') || searchParams.get('r');
      if (queryRef) return queryRef.trim();

      if (window.location.hash.includes('?')) {
        const hashQuery = window.location.hash.substring(window.location.hash.indexOf('?') + 1);
        const hashParams = new URLSearchParams(hashQuery);
        const hashRef = hashParams.get('ref') || hashParams.get('invite') || hashParams.get('r');
        if (hashRef) return hashRef.trim();
      }

      return localStorage.getItem('trade_apex_ref') || localStorage.getItem('prime_referral_code') || '';
    } catch {
      return '';
    }
  });

  // Login Fields: NEVER automatically filled - starts completely empty
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !username.trim() || !password.trim()) {
      showToast('Please provide your email address, username, and password.', 'error');
      return;
    }

    if (username.trim().length < 3) {
      showToast('Username must be at least 3 characters.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    const cleanRef = referralCode.trim().replace(/^@/, '');

    const success = userRegister({
      email: email.trim().toLowerCase(),
      username: username.trim().toLowerCase(),
      password: password,
      firstName: username.trim(),
      lastName: '',
      mobile: '',
      country: 'Pakistan',
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
    if (!loginIdentifier.trim()) {
      showToast('Please enter your email address or username.', 'error');
      return;
    }

    const success = userLogin(loginIdentifier.trim(), loginPass);
    if (success) {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] py-8 px-4 flex flex-col items-center justify-center text-[#3C3024]">
      <div className="w-full max-w-md space-y-4">
        {/* Back to Home navigation */}
        <div className="flex items-center justify-between">
          <button
            id="back-to-landing-btn"
            type="button"
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EADCC9] text-xs text-[#8C7A6B] hover:text-[#D09009] hover:border-[#D09009] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Brand Emblem on top */}
        <div className="flex flex-col items-center text-center">
          <PrimeInvestLogo size="lg" customLogoUrl={settings?.logoUrl} />
          <h1 className="mt-2 text-xl font-bold text-[#3C3024] tracking-tight">
            {settings?.siteName || 'Prime Invest'}
          </h1>
          <span className="text-xs text-[#D09009] font-mono tracking-wider uppercase font-bold">
            {settings?.siteSubtitle || 'Institutional Yield Platform'}
          </span>
        </div>

        {/* Card Container */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-6 shadow-sm">
          {mode === 'register' ? (
            /* Sign Up Mode: strictly Mail Address, Username, and Password */
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="text-center mb-4">
                <span className="text-[10px] font-bold text-[#D09009] tracking-wider uppercase">
                  CREATE YOUR ACCOUNT
                </span>
                <h2 className="text-lg font-bold text-[#3C3024] mt-0.5">
                  Join {settings?.siteName || 'Prime Invest'}
                </h2>
                <p className="text-xs text-[#8C7A6B] mt-1">
                  Enter your credentials to access automated high-yield portfolios.
                </p>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#8C7A6B]" />
                  <input
                    id="signup-email-input"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs focus:outline-none focus:border-[#D09009] placeholder:text-[#8C7A6B]"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  USERNAME
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#8C7A6B]" />
                  <input
                    id="signup-username-input"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs font-mono focus:outline-none focus:border-[#D09009] placeholder:text-[#8C7A6B]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#8C7A6B]" />
                  <input
                    id="signup-password-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min. 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs focus:outline-none focus:border-[#D09009] placeholder:text-[#8C7A6B]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#8C7A6B] hover:text-[#3C3024] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sponsor / Referral Code (Prefilled from invite link or optional) */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                    SPONSOR / INVITATION CODE {referralCode ? '(LINKED)' : '(OPTIONAL)'}
                  </label>
                  {referralCode ? (
                    <span className="text-[10px] font-bold text-[#15803D] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D09009]" />
                      Invite Linked
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#8C7A6B]">Optional</span>
                  )}
                </div>
                <div className="relative">
                  <UserCheck className={`absolute left-3.5 top-3 w-4 h-4 ${referralCode ? 'text-[#D09009]' : 'text-[#8C7A6B]'}`} />
                  <input
                    id="signup-referral-input"
                    type="text"
                    placeholder="e.g. sponsor_username"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    autoComplete="off"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none transition-colors ${
                      referralCode
                        ? 'bg-[#FCF8F2] border-[#D09009] text-[#3C3024] font-bold shadow-xs'
                        : 'bg-[#FCF8F2] border-[#EADCC9] text-[#3C3024] focus:border-[#D09009] placeholder:text-[#8C7A6B]'
                    }`}
                  />
                </div>
                {referralCode ? (
                  <p className="text-[10px] text-[#8C7A6B] flex items-center justify-between">
                    <span>You are joining the affiliate network of <strong className="text-[#D09009] font-mono">@{referralCode}</strong>.</span>
                    <button
                      type="button"
                      onClick={() => setReferralCode('')}
                      className="text-[10px] text-[#8C7A6B] hover:text-[#B91C1C] underline cursor-pointer ml-2 shrink-0"
                    >
                      Clear
                    </button>
                  </p>
                ) : (
                  <p className="text-[10px] text-[#8C7A6B]">
                    Enter sponsor's username if you were invited, or leave empty to register directly.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="create-account-submit-btn"
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-[#8C7A6B]">
                  Already have an account?{' '}
                  <button
                    id="switch-to-login-btn"
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#D09009] font-bold hover:underline ml-1"
                  >
                    Sign In
                  </button>
                </p>
                <p className="text-[10px] text-[#8C7A6B] mt-2 flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" /> 
                  Instant activation • Zero deposit fees • 256-bit SSL encrypted
                </p>
              </div>
            </form>
          ) : (
            /* Sign In Mode: Completely empty by default (no autofill) */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-4">
                <span className="text-[10px] font-bold text-[#D09009] tracking-wider uppercase">
                  WELCOME BACK
                </span>
                <h2 className="text-lg font-bold text-[#3C3024] mt-0.5">
                  Sign In to {settings?.siteName || 'Prime Invest'}
                </h2>
                <p className="text-xs text-[#8C7A6B] mt-1">
                  Access your portfolio, daily yields, and account balance.
                </p>
              </div>

              {/* Username or Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  EMAIL OR USERNAME
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#8C7A6B]" />
                  <input
                    id="login-identifier-input"
                    type="text"
                    placeholder="Enter your email or username"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    autoComplete="username"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs focus:outline-none focus:border-[#D09009] placeholder:text-[#8C7A6B]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#8C7A6B]" />
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    autoComplete="current-password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs focus:outline-none focus:border-[#D09009] placeholder:text-[#8C7A6B]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#8C7A6B] hover:text-[#3C3024] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="sign-in-submit-btn"
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-[#8C7A6B]">
                  Don't have an account yet?{' '}
                  <button
                    id="switch-to-register-btn"
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#D09009] font-bold hover:underline ml-1"
                  >
                    Register Now
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Quick Demo Login Option */}
        <div className="flex items-center justify-center px-2 text-xs">
          <button
            id="demo-user-quick-login-btn"
            type="button"
            onClick={() => {
              userLogin('yoop1328@gmail.com', 'password123');
              setCurrentView('dashboard');
            }}
            className="inline-flex items-center gap-1.5 text-[#8C7A6B] hover:text-[#D09009] transition py-1.5 px-3 rounded-xl bg-white border border-[#EADCC9] text-[11px] font-bold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D09009]" />
            <span>Explore with Demo Account (Investor)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
