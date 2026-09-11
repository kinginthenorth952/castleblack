import React, { useState } from 'react';
import { 
  AlertCircle, 
  Check, 
  Copy, 
  Send, 
  UploadCloud, 
  Wallet, 
  X,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { QRCodeDisplay } from '../components/QRCodeDisplay';

export function ManualDepositView() {
  const { plans, selectedPlanForDeposit, setSelectedPlanForDeposit, settings, submitDeposit, setCurrentView, showToast } = useApp();
  
  // Deposit Purpose: 'plan' or 'wallet'
  const [depositPurpose, setDepositPurpose] = useState<'plan' | 'wallet'>(selectedPlanForDeposit ? 'plan' : 'plan');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    selectedPlanForDeposit ? selectedPlanForDeposit.id : (plans[0]?.id || '')
  );
  const [customAmount, setCustomAmount] = useState<number>(380);

  const activePlan = plans.find((p) => p.id === selectedPlanId) || selectedPlanForDeposit || plans[0];
  const payableAmount = depositPurpose === 'plan' ? (activePlan ? activePlan.price : 380) : customAmount;

  const [transactionCode] = useState(() => {
    // Generate an authentic transaction ID like B8M2QUDFECMO from screenshot
    return 'B' + Math.random().toString(36).substring(2, 11).toUpperCase();
  });
  
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const [userTrxId, setUserTrxId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText(settings.easypaisaAccount);
    setCopiedNumber(true);
    showToast('Account number copied!', 'success');
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleCopyName = () => {
    navigator.clipboard?.writeText(settings.easypaisaTitle);
    setCopiedName(true);
    showToast('Account name copied!', 'success');
    setTimeout(() => setCopiedName(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showToast('Image file size exceeds 4MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setScreenshotPreview(event.target?.result as string);
        showToast('Screenshot uploaded successfully.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTrxId.trim()) {
      showToast('Please enter the Sender Transaction ID (TRX ID).', 'error');
      return;
    }
    if (!screenshotPreview) {
      showToast('Please upload a screenshot of your payment receipt.', 'error');
      return;
    }

    if (depositPurpose === 'wallet' && payableAmount < (settings?.minDeposit || 200)) {
      showToast(`Minimum wallet deposit is Rs${settings?.minDeposit || 200}.`, 'error');
      return;
    }

    setIsSubmitting(true);
    const targetPlanId = depositPurpose === 'plan' && activePlan ? activePlan.id : undefined;
    const ok = await submitDeposit(
      'EASYPAISA',
      payableAmount,
      userTrxId.trim().toUpperCase(),
      screenshotPreview,
      targetPlanId
    );
    setIsSubmitting(false);

    if (ok) {
      setCurrentView('deposit-history');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F8F5] pb-24 text-[#0F2D1F] flex flex-col items-center">
      <Header title={settings?.siteName || 'Sikka Poultry Farm'} subtitle="Manual Payment" showBack rightAction="history" />

      <main className="w-full max-w-2xl px-4 space-y-4 mt-2">
        {/* Top Gateway Summary Card */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-center text-[#D09009]">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C7A6B] tracking-wider">
                  SELECTED GATEWAY
                </span>
                <h3 className="text-base font-bold text-[#3C3024]">EASYPAISA</h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-semibold text-[#8C7A6B] tracking-wider block">
                TOTAL PAYABLE
              </span>
              <span className="text-lg font-bold text-[#D09009]">
                Rs {payableAmount.toLocaleString()} PKR
              </span>
            </div>
          </div>

          {/* Deposit Purpose Selector */}
          <div className="mt-4 pt-4 border-t border-[#EADCC9] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-[#8C7A6B] uppercase font-bold tracking-wider block">
                DEPOSIT PURPOSE / TARGET
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDepositPurpose('plan')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    depositPurpose === 'plan'
                      ? 'bg-[#D09009] text-white shadow-xs'
                      : 'bg-[#FCF8F2] text-[#8C7A6B] border border-[#EADCC9]'
                  }`}
                >
                  Subscribe Plan
                </button>
                <button
                  type="button"
                  onClick={() => setDepositPurpose('wallet')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    depositPurpose === 'wallet'
                      ? 'bg-[#D09009] text-white shadow-xs'
                      : 'bg-[#FCF8F2] text-[#8C7A6B] border border-[#EADCC9]'
                  }`}
                >
                  Wallet Balance
                </button>
              </div>
            </div>

            {depositPurpose === 'plan' ? (
              <div>
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block mb-1">
                  SELECT PLAN TO SUBSCRIBE UPON APPROVAL
                </label>
                <select
                  value={selectedPlanId}
                  onChange={(e) => {
                    setSelectedPlanId(e.target.value);
                    const found = plans.find((p) => p.id === e.target.value);
                    if (found) setSelectedPlanForDeposit(found);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs font-bold text-[#3C3024] focus:outline-none focus:border-[#D09009]"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — Price: Rs {p.price.toLocaleString()} (Daily Yield: Rs {p.dailyEarning.toLocaleString()})
                    </option>
                  ))}
                </select>
                {activePlan && (
                  <div className="mt-2 p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between text-xs">
                    <span className="text-[#8C7A6B] font-medium">Selected Tier: <strong className="text-[#3C3024]">{activePlan.name}</strong></span>
                    <span className="text-[#15803D] font-bold">Daily Yield: Rs {activePlan.dailyEarning.toLocaleString()}</span>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block mb-1">
                  ENTER WALLET DEPOSIT AMOUNT (PKR)
                </label>
                <input
                  type="number"
                  min={settings?.minDeposit || 200}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  placeholder="Enter amount in PKR"
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs font-mono font-bold text-[#3C3024] focus:outline-none focus:border-[#D09009]"
                />
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Payment Details */}
          <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#3C3024]">Payment Details</h3>
                <span className="text-[10px] text-[#D09009] font-bold">Send payment here</span>
              </div>

              {/* Account Number */}
              <div className="space-y-1 mb-3">
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
                  ACCOUNT NUMBER
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                  <span className="font-mono font-bold text-sm text-[#3C3024]">
                    {settings.easypaisaAccount}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    className="p-1.5 rounded-lg bg-white border border-[#EADCC9] text-[#D09009] hover:text-[#3C3024] hover:bg-[#FCF8F2] transition"
                    title="Copy Account Number"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Account Name */}
              <div className="space-y-1 mb-4">
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
                  ACCOUNT NAME
                </label>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                  <span className="font-bold text-sm text-[#3C3024]">
                    {settings.easypaisaTitle}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyName}
                    className="p-1.5 rounded-lg bg-white border border-[#EADCC9] text-[#D09009] hover:text-[#3C3024] hover:bg-[#FCF8F2] transition"
                    title="Copy Account Name"
                  >
                    {copiedName ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="pt-1">
                <span className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block mb-2 text-center">
                  PAYMENT QR CODE
                </span>
                <QRCodeDisplay value={settings.easypaisaAccount} />
              </div>
            </div>
          </div>

          {/* Right Column: Submit Payment */}
          <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#3C3024]">Submit Proof</h3>
                <span className="text-[10px] text-[#8C7A6B]">Complete required fields</span>
              </div>

              {/* Screenshot Upload Dropzone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
                  PAYMENT SCREENSHOT
                </label>

                {screenshotPreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-[#EADCC9] bg-[#FCF8F2] p-2">
                    <img 
                      src={screenshotPreview} 
                      alt="Payment receipt preview" 
                      className="w-full max-h-48 object-contain rounded-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setScreenshotPreview(null)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="border border-dashed border-[#EADCC9] hover:border-[#D09009] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-[#FCF8F2] transition text-center group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EADCC9] text-[#D09009] flex items-center justify-center group-hover:scale-105 transition">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#3C3024] mt-2">Upload Payment Screenshot</p>
                    <p className="text-[10px] text-[#8C7A6B] mt-0.5">JPG, PNG or WEBP (Max 4MB)</p>
                    <span className="mt-3 px-3 py-1 rounded-lg bg-white border border-[#EADCC9] text-[#D09009] text-xs font-bold group-hover:bg-[#FCF8F2] transition">
                      Choose File
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Transaction ID / Sender number input */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
                  SENDER TRX ID / TID
                </label>
                <input
                  type="text"
                  placeholder="e.g. 84920491823"
                  value={userTrxId}
                  onChange={(e) => setUserTrxId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs font-mono placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#D09009]"
                  required
                />
              </div>

              {/* Notice Warning */}
              <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-start gap-2.5 text-[11px] text-[#3C3024]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#D09009]" />
                <p className="leading-relaxed">
                  Verify the recipient account and transaction ID carefully before submitting. Verification takes approximately 15 minutes.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#D09009]/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT DEPOSIT'}</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
