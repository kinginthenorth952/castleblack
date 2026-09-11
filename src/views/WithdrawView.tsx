import React, { useState } from 'react';
import { 
  AlertCircle, 
  ArrowDownCircle, 
  Building, 
  Check, 
  Clock, 
  HelpCircle, 
  Send, 
  Wallet 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { EasypaisaLogo, JazzcashLogo } from '../components/PrimeInvestLogo';

export function WithdrawView() {
  const { currentUser, settings, submitWithdraw, setCurrentView, showToast } = useApp();
  const [gateway, setGateway] = useState<'EASYPAISA' | 'JAZZCASH' | 'BANK'>('EASYPAISA');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableBalance = currentUser?.balance || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('Please enter a valid withdrawal amount.', 'error');
      return;
    }

    if (numAmount < settings.minWithdraw) {
      showToast(`Minimum withdrawal is Rs${settings.minWithdraw}.`, 'error');
      return;
    }

    if (numAmount > availableBalance) {
      showToast('Requested amount exceeds available balance.', 'error');
      return;
    }

    if (!accountNumber.trim() || !accountName.trim()) {
      showToast('Please fill in both account number and account title.', 'error');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitWithdraw(gateway, numAmount, accountNumber.trim(), accountName.trim());
    setIsSubmitting(false);

    if (ok) {
      setCurrentView('withdraw-history');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] pb-24 text-[#3C3024] flex flex-col items-center">
      <Header title={settings?.siteName || 'Prime Invest'} subtitle="Withdraw Funds" showBack rightAction="history" />

      <main className="w-full max-w-xl px-4 space-y-4 mt-2">
        {/* Available Balance Card */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#8C7A6B] tracking-wider block">
              AVAILABLE BALANCE
            </span>
            <span className="text-2xl font-bold text-[#3C3024]">
              Rs{availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-[11px] text-[#15803D] mt-0.5 font-bold">Ready for immediate withdrawal</p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
            <ArrowDownCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Gateway Selection */}
            <div>
              <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block mb-2">
                SELECT WITHDRAWAL GATEWAY
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGateway('EASYPAISA')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    gateway === 'EASYPAISA'
                      ? 'bg-[#FCF8F2] border-[#D09009] text-[#3C3024] shadow-xs'
                      : 'bg-white border-[#EADCC9] text-[#8C7A6B] hover:border-[#D09009]/50'
                  }`}
                >
                  <EasypaisaLogo className="w-7 h-7" />
                  <span className="text-xs font-bold">Easypaisa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway('JAZZCASH')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    gateway === 'JAZZCASH'
                      ? 'bg-[#FCF8F2] border-[#D09009] text-[#3C3024] shadow-xs'
                      : 'bg-white border-[#EADCC9] text-[#8C7A6B] hover:border-[#D09009]/50'
                  }`}
                >
                  <JazzcashLogo className="w-7 h-7" />
                  <span className="text-xs font-bold">JazzCash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGateway('BANK')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                    gateway === 'BANK'
                      ? 'bg-[#FCF8F2] border-[#D09009] text-[#3C3024] shadow-xs'
                      : 'bg-white border-[#EADCC9] text-[#8C7A6B] hover:border-[#D09009]/50'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">Bank</span>
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider">
                  WITHDRAW AMOUNT (PKR)
                </label>
                <button
                  type="button"
                  onClick={() => setAmount(availableBalance.toString())}
                  className="text-[10px] text-[#D09009] font-bold hover:underline"
                >
                  MAX AMOUNT
                </button>
              </div>
              <input
                type="number"
                placeholder={`Min Rs${settings.minWithdraw}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] font-mono text-sm focus:outline-none focus:border-[#D09009]"
                required
              />
            </div>

            {/* Account Number */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
                {gateway === 'BANK' ? 'BANK ACCOUNT NUMBER / IBAN' : 'MOBILE ACCOUNT NUMBER'}
              </label>
              <input
                type="text"
                placeholder={gateway === 'BANK' ? 'e.g. PK00MEZN000123456789' : 'e.g. 03493169701'}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] font-mono text-sm focus:outline-none focus:border-[#D09009]"
                required
              />
            </div>

            {/* Account Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
                ACCOUNT HOLDER NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Muhammad Ali"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-sm focus:outline-none focus:border-[#D09009]"
                required
              />
            </div>

            {/* Notice */}
            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-start gap-2.5 text-xs text-[#3C3024]">
              <AlertCircle className="w-4 h-4 text-[#D09009] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Withdrawals are audited and released 24/7. Settlement is completed within 30-60 minutes.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || availableBalance < settings.minWithdraw}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#D09009]/20 transition flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'PROCESSING...' : 'CONFIRM WITHDRAWAL'}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
