import { useState, FormEvent } from 'react';
import { 
  Globe, 
  HelpCircle, 
  Lock, 
  LogOut, 
  Mail, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  User, 
  Wallet 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';

export function ProfileView() {
  const { currentUser, userLogout, setCurrentView, settings, showToast, linkUserReferral } = useApp();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [sponsorInput, setSponsorInput] = useState('');
  const [linking, setLinking] = useState(false);

  const isDirect =
    !currentUser?.referralBy ||
    currentUser.referralBy === 'Direct User' ||
    currentUser.referralBy === 'Direct Registration' ||
    currentUser.referralBy === 'Direct';

  const handleLinkSponsor = async (e: FormEvent) => {
    e.preventDefault();
    if (!sponsorInput.trim()) {
      showToast('Please enter sponsor username.', 'error');
      return;
    }
    setLinking(true);
    const success = await linkUserReferral(sponsorInput.trim());
    setLinking(false);
    if (success) {
      setShowLinkModal(false);
      setSponsorInput('');
    }
  };

  const handleOpenSupport = () => {
    const contact = settings?.adminWhatsApp;
    if (!contact) {
      showToast('Support WhatsApp number is not configured yet.', 'info');
      return;
    }
    if (contact.startsWith('http://') || contact.startsWith('https://')) {
      window.open(contact, '_blank', 'noopener,noreferrer');
    } else {
      const clean = contact.replace(/[^0-9]/g, '');
      if (clean) {
        window.open(`https://wa.me/${clean}`, '_blank', 'noopener,noreferrer');
      } else {
        showToast('Invalid WhatsApp support number.', 'error');
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F8F5] pb-24 text-[#0F2D1F] flex flex-col items-center">
      <Header title={settings?.siteName || 'Sikka Poultry Farm'} subtitle="My Profile" showBack />

      <main className="w-full max-w-xl px-4 space-y-4 mt-2">
        {/* User Card */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-center mb-3 shadow-xs">
            <span className="text-2xl font-bold text-[#D09009]">
              {currentUser?.firstName?.charAt(0) || currentUser?.username?.charAt(0) || 'U'}
            </span>
          </div>

          <h2 className="text-lg font-bold text-[#3C3024]">{currentUser?.firstName} {currentUser?.lastName}</h2>
          <p className="text-xs text-[#D09009] font-mono font-bold">@{currentUser?.username}</p>
          <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-[#FCF8F2] text-[#15803D] text-[10px] font-bold border border-[#EADCC9]">
            Verified Investor
          </span>

          <div className="w-full grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[#EADCC9] text-left">
            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
              <span className="text-[10px] text-[#8C7A6B] block font-bold">Available Balance</span>
              <span className="text-sm font-bold text-[#3C3024]">
                Rs{currentUser?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
              <span className="text-[10px] text-[#8C7A6B] block font-bold">Total Withdrawn</span>
              <span className="text-sm font-bold text-red-600">
                Rs{currentUser?.totalWithdraw?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details List */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm space-y-2.5">
          <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider mb-2">
            Account Information
          </h3>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs">
            <span className="text-[#8C7A6B] flex items-center gap-2 font-bold">
              <Mail className="w-4 h-4 text-[#D09009]" /> Email
            </span>
            <span className="font-bold text-[#3C3024]">{currentUser?.email}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs">
            <span className="text-[#8C7A6B] flex items-center gap-2 font-bold">
              <Phone className="w-4 h-4 text-[#D09009]" /> Phone
            </span>
            <span className="font-bold text-[#3C3024]">{currentUser?.mobile}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs">
            <span className="text-[#8C7A6B] flex items-center gap-2 font-bold">
              <Globe className="w-4 h-4 text-[#D09009]" /> Country
            </span>
            <span className="font-bold text-[#3C3024]">{currentUser?.country}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs">
            <span className="text-[#8C7A6B] flex items-center gap-2 font-bold">
              <User className="w-4 h-4 text-[#D09009]" /> Sponsor / Upliner
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#3C3024]">{currentUser?.referralBy || 'Direct'}</span>
              {isDirect && (
                <button
                  type="button"
                  onClick={() => setShowLinkModal(true)}
                  className="text-[10px] font-bold text-[#D09009] hover:underline px-2 py-0.5 rounded-md bg-white border border-[#EADCC9] cursor-pointer"
                >
                  Link Sponsor
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Account Security & Session Protection */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D09009]" /> Session Security Safeguard
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#FCF8F2] border border-[#EADCC9] text-[#15803D] text-[10px] font-bold">
              Protected
            </span>
          </div>

          <p className="text-xs text-[#8C7A6B] leading-relaxed">
            Your financial account is secured with auto-inactivity timeout protection. If inactive for 15 minutes, you will receive an alert giving you the option to extend your session or log out.
          </p>

          <button
            id="btn-test-session-warning"
            onClick={() => window.dispatchEvent(new CustomEvent('trigger-session-warning-test'))}
            className="w-full py-2.5 px-3 rounded-xl bg-[#FCF8F2] hover:bg-[#FCF8F2]/80 border border-[#EADCC9] text-xs font-bold text-[#D09009] flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-[#D09009]" />
            <span>Test Session Timeout Alert</span>
          </button>
        </div>

        {/* Quick Links & Actions */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-4 shadow-sm space-y-2">
          <button
            onClick={handleOpenSupport}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs text-[#3C3024] hover:border-[#D09009] transition"
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#15803D]" />
              <span className="font-bold">Official WhatsApp Support</span>
            </span>
            <span className="text-[10px] text-[#15803D] font-bold">24/7 Online</span>
          </button>

          <button
            onClick={userLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100 transition mt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </main>

      {/* Link Sponsor Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
                    Link Sponsor / Upliner
                  </h3>
                  <p className="text-[10px] text-[#8C7A6B]">
                    Connect your account to your inviter
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-[#8C7A6B] hover:text-[#3C3024] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLinkSponsor} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  SPONSOR USERNAME OR EMAIL
                </label>
                <input
                  type="text"
                  placeholder="e.g. adnansanghri41"
                  value={sponsorInput}
                  onChange={(e) => setSponsorInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs font-mono focus:outline-none focus:border-[#D09009]"
                  required
                />
                <p className="text-[10px] text-[#8C7A6B]">
                  Enter your inviter's registered username to connect to their affiliate team.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs text-[#8C7A6B] font-bold hover:bg-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={linking}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white text-xs font-bold shadow-xs hover:from-[#F7C63D] hover:to-[#B87D05] transition disabled:opacity-50 cursor-pointer"
                >
                  {linking ? 'Linking...' : 'Confirm Sponsor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
