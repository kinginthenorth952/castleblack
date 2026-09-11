import React, { useState } from 'react';
import { 
  Calculator, 
  ChevronRight, 
  Coins, 
  DollarSign, 
  Percent, 
  Sparkles, 
  TrendingUp, 
  Wallet, 
  X, 
  Zap 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ProfitCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
}

const PRESET_AMOUNTS = [1000, 3000, 5000, 10000, 25000, 50000];

export function ProfitCalculatorModal({
  isOpen,
  onClose,
  initialAmount = 5000,
}: ProfitCalculatorModalProps) {
  const { plans, setCurrentView, setSelectedPlanForDeposit } = useApp();
  const [amount, setAmount] = useState<number>(initialAmount);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.id || '');

  if (!isOpen) return null;

  // Selected plan calculation or nearest plan
  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  // Calculate rate based on active plan or proportional estimate
  const dailyRatePercent = activePlan
    ? (activePlan.dailyEarning / activePlan.price) * 100
    : 5.5;

  const durationDays = activePlan ? activePlan.durationDays : 45;
  const dailyEarning = (amount * dailyRatePercent) / 100;
  const weeklyEarning = dailyEarning * 7;
  const totalEarning = dailyEarning * durationDays;
  const netProfit = totalEarning - amount;
  const roiPercentage = ((totalEarning - amount) / amount) * 100;

  const handleSelectPlanToInvest = () => {
    if (activePlan) {
      setSelectedPlanForDeposit(activePlan);
      setCurrentView('deposit-manual');
    } else {
      setCurrentView('plans');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#11151A] border border-[#252B33] p-5 sm:p-6 shadow-2xl shadow-black/80 text-[#F4F1EA] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252B33]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F4F1EA] flex items-center gap-1.5">
                <span>ROI Profit Estimator</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D6B36A]/10 text-[#D6B36A] border border-[#D6B36A]/30">
                  Live Rates
                </span>
              </h3>
              <p className="text-[11px] text-[#7F8792]">
                Simulate daily, weekly & total compound returns
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7F8792] hover:text-[#F4F1EA] hover:bg-[#171C22] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4 mt-4">
          {/* Investment Amount Input */}
          <div>
            <label className="text-[10px] font-bold text-[#7F8792] uppercase tracking-wider block mb-1.5">
              Investment Capital (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-[#D6B36A] font-mono">
                Rs
              </span>
              <input
                type="number"
                min="500"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl bg-[#171C22] border border-[#252B33] focus:border-[#D6B36A] px-10 py-2.5 text-sm font-bold font-mono text-[#F4F1EA] focus:outline-none transition"
              />
            </div>

            {/* Preset Amount Chips */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 no-scrollbar">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition shrink-0 ${
                    amount === amt
                      ? 'bg-[#D6B36A] text-[#0B0D10]'
                      : 'bg-[#171C22] border border-[#252B33] text-[#B8BDC5] hover:border-[#343B45]'
                  }`}
                >
                  Rs {amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Selector */}
          <div>
            <label className="text-[10px] font-bold text-[#7F8792] uppercase tracking-wider block mb-1.5">
              Choose Package Contract Tier
            </label>
            <div className="grid grid-cols-2 gap-2">
              {plans.slice(0, 6).map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                const rate = ((plan.dailyEarning / plan.price) * 100).toFixed(1);
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      setAmount(plan.price);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-[#171C22] border-[#D6B36A] shadow-md shadow-[#D6B36A]/5'
                        : 'bg-[#11151A] border-[#252B33] hover:border-[#343B45]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-[#F4F1EA] truncate">{plan.name}</span>
                      <span className="text-[9px] font-bold font-mono text-[#63B889]">{rate}%/d</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#7F8792] flex items-center justify-between">
                      <span>Rs {plan.price.toLocaleString()}</span>
                      <span>{plan.durationDays} Days</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="rounded-2xl bg-[#171C22] border border-[#252B33] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7F8792]">Daily Estimated ROI</span>
              <span className="font-mono font-bold text-[#63B889] text-sm">
                +Rs {Math.round(dailyEarning).toLocaleString()} / day
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7F8792]">Weekly Yield (7 Days)</span>
              <span className="font-mono font-bold text-[#F4F1EA]">
                Rs {Math.round(weeklyEarning).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7F8792]">Contract Duration</span>
              <span className="font-mono font-bold text-[#D6B36A]">
                {durationDays} Days Active
              </span>
            </div>

            <div className="pt-2 border-t border-[#252B33] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7F8792] block">
                  Total Maturity Payout
                </span>
                <span className="text-lg font-mono font-bold text-[#D6B36A]">
                  Rs {Math.round(totalEarning).toLocaleString()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#63B889] block">
                  Net Pure Profit
                </span>
                <span className="text-sm font-mono font-bold text-[#63B889]">
                  +Rs {Math.round(netProfit).toLocaleString()} ({roiPercentage.toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>

          {/* CTA Action Button */}
          <button
            onClick={handleSelectPlanToInvest}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#B89647] via-[#D6B36A] to-[#F0D597] text-[#0B0D10] font-bold text-xs shadow-lg shadow-[#D6B36A]/20 hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Proceed to Invest Rs {amount.toLocaleString()}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
