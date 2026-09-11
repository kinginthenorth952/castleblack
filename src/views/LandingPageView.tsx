import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  Info, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  X, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  Share2, 
  FileText,
  Shield,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';

export function LandingPageView() {
  const { setCurrentView, settings, investmentPlans } = useApp();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);

  const siteName = settings?.siteName || 'Sikka Poultry Farm';
  const siteSubtitle = settings?.siteSubtitle || 'Secure Your Future, Grow Your Wealth';

  const whatsappGroupUrl = settings?.whatsappGroup || 'https://chat.whatsapp.com';
  const whatsappAdminUrl = settings?.adminWhatsApp 
    ? `https://wa.me/${settings.adminWhatsApp}` 
    : 'https://wa.me';
  const whatsappChannelUrl = settings?.whatsappChannel || 'https://whatsapp.com/channel';

  const handleOpenLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] text-[#4A3515] flex flex-col justify-between py-4 sm:py-8 px-4 sm:px-6 font-sans antialiased selection:bg-[#E59B12] selection:text-white">
      
      {/* Top Header Bar matching Screenshot (81) */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 sm:py-3 px-1 sm:px-2">
        <div className="flex items-center gap-3">
          <PrimeInvestLogo size="md" customLogoUrl={settings?.logoUrl} />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#5C4015] leading-tight">
              {siteName}
            </h1>
            <p className="text-xs sm:text-sm text-[#8C7A6B] font-medium leading-none mt-0.5">
              {siteSubtitle}
            </p>
          </div>
        </div>

        {/* Info button on the right matching Screenshot (81) */}
        <button
          type="button"
          onClick={() => setShowInfoModal(true)}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border border-[#EADBBD] bg-[#FAF5EA] hover:bg-white text-[#8C6320] flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
          aria-label="Platform Information"
          title="Platform Information"
        >
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6320]" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-5 my-auto py-2">
        
        {/* Section 1: Main Hero Card matching Screenshot (81) */}
        <section className="w-full bg-white rounded-3xl p-6 sm:p-12 border border-[#F0E4CE] shadow-sm text-center relative overflow-hidden">
          {/* Circular Center Logo Badge */}
          <div className="flex justify-center mb-4">
            <PrimeInvestLogo size="lg" customLogoUrl={settings?.logoUrl} />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#5C4015] tracking-tight leading-snug">
            {settings?.heroHeadline || 'Build Your Financial Future With Confidence'}
          </h2>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-sm text-[#8C7A6B] max-w-xl mx-auto mt-2 sm:mt-3 leading-relaxed font-normal">
            {settings?.heroSubheadline || 
              'Sikka Poultry Farm gives you a simple, modern and professional way to explore investment opportunities, access your account and stay connected with support.'}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mt-6 sm:mt-8 w-full">
            {/* Login Button */}
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="flex-1 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E59B12] via-[#D38806] to-[#B87707] hover:brightness-105 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-md shadow-[#D38806]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Login</span>
            </button>

            {/* Registration Button */}
            <button
              type="button"
              onClick={() => setCurrentView('register')}
              className="flex-1 py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl bg-white border border-[#EADBBD] hover:border-[#D09009] active:scale-[0.99] text-[#6B4E1E] font-bold text-sm sm:text-base shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C5D14]" />
              <span>Registration</span>
            </button>
          </div>
        </section>

        {/* Section 2: 4 Quick Action Cards matching Screenshot (81) */}
        <section className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: WhatsApp Group */}
          <button
            type="button"
            onClick={() => handleOpenLink(whatsappGroupUrl)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0E4CE] shadow-xs flex flex-col items-center justify-center gap-2.5 hover:border-[#D09009] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FEE5A5] via-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-[13px] font-semibold text-[#5C4015] group-hover:text-[#D09009] transition-colors">
              WhatsApp Group
            </span>
          </button>

          {/* Card 2: WhatsApp Admin */}
          <button
            type="button"
            onClick={() => handleOpenLink(whatsappAdminUrl)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0E4CE] shadow-xs flex flex-col items-center justify-center gap-2.5 hover:border-[#D09009] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FEE5A5] via-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-[13px] font-semibold text-[#5C4015] group-hover:text-[#D09009] transition-colors">
              WhatsApp Admin
            </span>
          </button>

          {/* Card 3: WhatsApp Channel */}
          <button
            type="button"
            onClick={() => handleOpenLink(whatsappChannelUrl)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0E4CE] shadow-xs flex flex-col items-center justify-center gap-2.5 hover:border-[#D09009] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FEE5A5] via-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-[13px] font-semibold text-[#5C4015] group-hover:text-[#D09009] transition-colors">
              WhatsApp Channel
            </span>
          </button>

          {/* Card 4: View Plans */}
          <button
            type="button"
            onClick={() => setShowPlansModal(true)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0E4CE] shadow-xs flex flex-col items-center justify-center gap-2.5 hover:border-[#D09009] transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FEE5A5] via-[#F5BE27] to-[#D09009] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xs sm:text-[13px] font-semibold text-[#5C4015] group-hover:text-[#D09009] transition-colors">
              View Plans
            </span>
          </button>
        </section>

        {/* Section 3: Why Choose Us Card matching Screenshot (81) */}
        <section className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E4CE] shadow-sm text-left">
          <h3 className="text-base sm:text-lg font-bold text-[#5C4015]">
            Why Choose Us
          </h3>
          <p className="text-xs text-[#8C7A6B] mt-0.5">
            Simple access, clear plan presentation and a clean professional experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5">
            
            {/* Feature 1: Secure Access */}
            <div className="bg-white border border-[#F0E4CE] rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#D09009] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EA] flex items-center justify-center mb-1">
                <ShieldCheck className="w-6 h-6 text-[#D09009]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5C4015]">
                Secure Access
              </h4>
              <p className="text-[11px] text-[#8C7A6B] leading-tight max-w-[210px]">
                Simple account login and structured payment flow.
              </p>
            </div>

            {/* Feature 2: Fast Process */}
            <div className="bg-white border border-[#F0E4CE] rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#D09009] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EA] flex items-center justify-center mb-1">
                <Zap className="w-6 h-6 text-[#D09009]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5C4015]">
                Fast Process
              </h4>
              <p className="text-[11px] text-[#8C7A6B] leading-tight max-w-[210px]">
                Quick navigation between plans and payment methods.
              </p>
            </div>

            {/* Feature 3: Live Support */}
            <div className="bg-white border border-[#F0E4CE] rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-1.5 hover:border-[#D09009] transition-all">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EA] flex items-center justify-center mb-1">
                <Headphones className="w-6 h-6 text-[#D09009]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#5C4015]">
                Live Support
              </h4>
              <p className="text-[11px] text-[#8C7A6B] leading-tight max-w-[210px]">
                Contact and support options are always easy to find.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Subtle Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center pt-4 pb-2 text-[11px] text-[#8C7A6B]/80 flex flex-col items-center gap-1">
        <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
      </footer>

      {/* View Plans Modal */}
      {showPlansModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#F0E4CE] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#F0E4CE] flex items-center justify-between bg-[#FCFAF5]">
              <div className="flex items-center gap-3">
                <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#5C4015]">
                    Investment Schemes & Certificates
                  </h3>
                  <p className="text-xs text-[#8C7A6B]">
                    Select a plan to start earning verified daily returns.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPlansModal(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#EADBBD] text-[#8C7A6B] hover:text-[#5C4015] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Plans List */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3">
              {investmentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-[#F0E4CE] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D09009] transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#5C4015]">
                        {plan.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5EA] text-[#B47304] border border-[#EADBBD]">
                        {plan.durationDays} Days
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#8C7A6B]">
                      <div>
                        Investment: <strong className="text-[#5C4015]">Rs {plan.price.toLocaleString()}</strong>
                      </div>
                      <div>
                        Daily Profit: <strong className="text-[#D09009]">Rs {plan.dailyEarning.toLocaleString()}</strong>
                      </div>
                      <div>
                        Total Return: <strong className="text-[#006A4E]">Rs {plan.totalEarning.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowPlansModal(false);
                      setCurrentView('register');
                    }}
                    className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#E59B12] to-[#B87707] text-white text-xs font-bold shadow-xs hover:brightness-105 active:scale-95 transition-all self-end sm:self-center"
                  >
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#F0E4CE] bg-[#FCFAF5] flex items-center justify-between">
              <span className="text-xs text-[#8C7A6B]">
                Need help choosing? Reach out on WhatsApp.
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowPlansModal(false);
                  setCurrentView('login');
                }}
                className="text-xs font-bold text-[#D09009] hover:underline"
              >
                Sign in to manage active plans →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#F0E4CE] shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
                <h3 className="text-base font-bold text-[#5C4015]">
                  About {siteName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="w-7 h-7 rounded-full bg-[#FAF5EA] text-[#8C7A6B] hover:text-[#5C4015] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#8C7A6B] leading-relaxed">
              {siteName} provides an institutional platform for disciplined savings schemes, automated daily yield allocations, and fast withdrawals.
            </p>

            <div className="space-y-2 bg-[#FCFAF5] p-3.5 rounded-2xl border border-[#F0E4CE] text-xs">
              <div className="flex items-center gap-2 text-[#5C4015]">
                <ShieldCheck className="w-4 h-4 text-[#D09009] shrink-0" />
                <span>Encrypted & Protected Transactions</span>
              </div>
              <div className="flex items-center gap-2 text-[#5C4015]">
                <Clock className="w-4 h-4 text-[#D09009] shrink-0" />
                <span>Automated Daily Payouts at 12:00 AM</span>
              </div>
              <div className="flex items-center gap-2 text-[#5C4015]">
                <Headphones className="w-4 h-4 text-[#D09009] shrink-0" />
                <span>24/7 Dedicated Investor Helpline</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E59B12] to-[#B87707] text-white font-bold text-xs shadow-xs hover:brightness-105 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
