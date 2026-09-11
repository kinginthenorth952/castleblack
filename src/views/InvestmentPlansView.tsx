import { useState } from 'react';
import { 
  BarChart3, 
  Check, 
  Crown, 
  Diamond, 
  Gem, 
  Layers, 
  Leaf, 
  Lock, 
  Rocket, 
  ShieldCheck, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Wallet, 
  X, 
  Zap 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { EasypaisaLogo, JazzcashLogo } from '../components/PrimeInvestLogo';
import { InvestmentPlan } from '../types';

export function InvestmentPlansView() {
  const { plans, currentUser, settings, setSelectedPlanForDeposit, setCurrentView, buyPlanWithBalance, showToast } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<'EASYPAISA' | 'JAZZCASH' | 'BALANCE'>('EASYPAISA');

  const renderIcon = (type: string) => {
    switch (type) {
      case 'leaf': return <Leaf className="w-5 h-5" />;
      case 'chart': return <BarChart3 className="w-5 h-5" />;
      case 'diamond': return <Diamond className="w-5 h-5" />;
      case 'crown': return <Crown className="w-5 h-5" />;
      case 'rocket': return <Rocket className="w-5 h-5" />;
      case 'star': return <Star className="w-5 h-5" />;
      case 'shield': return <ShieldCheck className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleOpenGatewayModal = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setSelectedPlanForDeposit(plan);
  };

  const handleProceedDeposit = () => {
    if (!selectedPlan) return;

    if (selectedGateway === 'BALANCE') {
      if ((currentUser?.balance || 0) < selectedPlan.price) {
        showToast('Insufficient account balance. Please choose Easypaisa or Jazzcash.', 'error');
        return;
      }
      buyPlanWithBalance(selectedPlan.id);
      setSelectedPlan(null);
      setCurrentView('invest-logs');
      return;
    }

    // Manual deposit gateway
    setSelectedPlanForDeposit(selectedPlan);
    setSelectedPlan(null);
    setCurrentView('deposit-manual');
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F8F5] pb-24 text-[#0F2D1F] flex flex-col items-center">
      <Header title={settings?.siteName || 'Sikka Poultry Farm'} subtitle="Investment Plans" showBack rightAction="history" />

      <main className="w-full max-w-4xl px-4 space-y-6 mt-2">
        {/* Top Banner */}
        <div className="relative rounded-2xl bg-white border border-[#EADCC9] p-6 shadow-md shadow-[#3C3024]/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#D09009] tracking-widest uppercase">
                PORTFOLIO TIERS
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#3C3024] tracking-tight mt-0.5">
                Investment Plans
              </h1>
              <p className="text-xs sm:text-sm text-[#8C7A6B] mt-1 max-w-xl leading-relaxed">
                Select a portfolio tier, review daily yields, and activate with your preferred payment method.
              </p>
            </div>
            <div className="self-start sm:self-center">
              <span className="inline-flex items-center px-3 py-1 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] font-bold text-xs tracking-wide">
                {plans.length} Plans Available
              </span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative overflow-hidden rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm hover:shadow-md hover:border-[#D09009]/50 transition duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Plan Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl p-2.5 flex items-center justify-center bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] shadow-xs">
                    {renderIcon(plan.iconType)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#3C3024] tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] text-[#8C7A6B] uppercase tracking-wider font-semibold">
                      Fixed ROI Plan
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4 mb-3">
                  <span className="text-2xl font-extrabold text-[#3C3024] tracking-tight">
                    Rs{plan.price.toLocaleString()}
                  </span>
                </div>

                {/* Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                    <span className="text-[10px] text-[#8C7A6B] block font-semibold">Daily Earning</span>
                    <span className="text-xs font-bold text-[#15803D]">
                      Rs{plan.dailyEarning.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                    <span className="text-[10px] text-[#8C7A6B] block font-semibold">Total Earning</span>
                    <span className="text-xs font-bold text-[#D09009]">
                      Rs{plan.totalEarning.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                    <span className="text-[10px] text-[#8C7A6B] block font-semibold">Duration</span>
                    <span className="text-xs font-bold text-[#3C3024]">
                      {plan.durationDays} Days
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                    <span className="text-[10px] text-[#8C7A6B] block font-semibold">Plan Price</span>
                    <span className="text-xs font-bold text-[#3C3024]">
                      Rs{plan.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={() => handleOpenGatewayModal(plan)}
                className="w-full mt-5 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] shadow-md shadow-[#D09009]/20 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                <span>Buy Now</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Gateway Selection Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3C3024]/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-2xl shadow-[#3C3024]/20 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EADCC9]">
              <div>
                <span className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-widest">
                  Payment Methods
                </span>
                <h3 className="text-base font-bold text-[#3C3024]">
                  Select Investment Gateway
                </h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-8 h-8 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#8C7A6B] hover:text-[#3C3024] flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Plan Details Tag */}
            <div className="px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs font-medium text-[#8C7A6B] flex items-center justify-between">
              <span className="font-bold text-[#3C3024]">{selectedPlan.name}</span>
              <span className="text-[#D09009] font-mono font-bold">Rs{selectedPlan.price.toLocaleString()}</span>
            </div>

            {/* Gateways List */}
            <div className="space-y-2.5">
              {/* Easypaisa Gateway Card */}
              <div
                onClick={() => setSelectedGateway('EASYPAISA')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  selectedGateway === 'EASYPAISA'
                    ? 'bg-[#FCF8F2] border-[#D09009] shadow-xs'
                    : 'bg-white border-[#EADCC9] hover:border-[#D09009]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <EasypaisaLogo className="w-9 h-9" />
                  <div>
                    <h4 className="text-xs font-bold text-[#3C3024] tracking-wide">EASYPAISA</h4>
                    <p className="text-[10px] text-[#8C7A6B]">Rs380 - Rs196,780</p>
                  </div>
                </div>
                {selectedGateway === 'EASYPAISA' && (
                  <div className="w-5 h-5 rounded-full bg-[#D09009] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Jazzcash Gateway Card */}
              <div
                onClick={() => setSelectedGateway('JAZZCASH')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  selectedGateway === 'JAZZCASH'
                    ? 'bg-[#FCF8F2] border-[#D09009] shadow-xs'
                    : 'bg-white border-[#EADCC9] hover:border-[#D09009]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <JazzcashLogo className="w-9 h-9" />
                  <div>
                    <h4 className="text-xs font-bold text-[#3C3024] tracking-wide">JAZZCASH</h4>
                    <p className="text-[10px] text-[#8C7A6B]">Rs380 - Rs196,780</p>
                  </div>
                </div>
                {selectedGateway === 'JAZZCASH' && (
                  <div className="w-5 h-5 rounded-full bg-[#D09009] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Account Balance Option */}
              <div
                onClick={() => setSelectedGateway('BALANCE')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  selectedGateway === 'BALANCE'
                    ? 'bg-[#FCF8F2] border-[#D09009] shadow-xs'
                    : 'bg-white border-[#EADCC9] hover:border-[#D09009]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3C3024]">Account Balance</h4>
                    <p className="text-[10px] text-[#8C7A6B]">
                      Available: Rs{currentUser?.balance?.toLocaleString() || '0.00'}
                    </p>
                  </div>
                </div>
                {selectedGateway === 'BALANCE' && (
                  <div className="w-5 h-5 rounded-full bg-[#D09009] text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={handleProceedDeposit}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-[#D09009]/20 transition"
              >
                {selectedGateway === 'BALANCE' ? 'Activate with Balance' : 'Proceed to Deposit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
