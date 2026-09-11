import React, { useState } from 'react';
import { ArrowRightLeft, Check, Sparkles, Wallet, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CommissionTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommissionTransferModal({ isOpen, onClose }: CommissionTransferModalProps) {
  const { currentUser, transferCommissionToBalance, showToast } = useApp();
  const [amount, setAmount] = useState<number>(currentUser?.teamCommission || 0);

  if (!isOpen) return null;

  const commissionBalance = currentUser?.teamCommission || 0;

  const handleTransfer = () => {
    if (amount <= 0) {
      showToast('Please enter a valid amount.', 'error');
      return;
    }
    if (amount > commissionBalance) {
      showToast('Amount exceeds available commission balance.', 'error');
      return;
    }

    const success = transferCommissionToBalance(amount);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-2xl bg-[#11151A] border border-[#252B33] p-5 shadow-2xl shadow-black/80 text-[#F4F1EA]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#252B33]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#171C22] border border-[#343B45] text-[#63B889] flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#F4F1EA] uppercase tracking-wider">
              Commission Transfer
            </h3>
          </div>
          <button onClick={onClose} className="text-[#7F8792] hover:text-[#F4F1EA] transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 mt-4">
          <div className="p-3 rounded-xl bg-[#171C22] border border-[#252B33] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#7F8792] block">Available Commission</span>
              <span className="font-mono font-bold text-sm text-[#63B889]">
                Rs {commissionBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAmount(commissionBalance)}
              className="px-2 py-1 rounded bg-[#252B33] hover:bg-[#303844] text-[10px] font-bold text-[#D6B36A] transition"
            >
              Transfer Max
            </button>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#7F8792] uppercase tracking-wider block mb-1">
              Transfer Amount (PKR)
            </label>
            <input
              type="number"
              min="1"
              max={commissionBalance}
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter PKR amount"
              className="w-full rounded-xl bg-[#171C22] border border-[#252B33] focus:border-[#D6B36A] px-3.5 py-2.5 text-xs font-mono font-bold text-[#F4F1EA] focus:outline-none"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-[#0E1217] border border-[#212730] text-[11px] text-[#8F96A1] space-y-1">
            <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>Instant 0% Fee Wallet Conversion</span>
            </p>
            <p>Funds become instantly withdrawable or eligible to buy plans.</p>
          </div>

          <button
            onClick={handleTransfer}
            disabled={commissionBalance <= 0 || amount <= 0}
            className="w-full py-2.5 rounded-xl bg-[#63B889] hover:bg-[#72C898] disabled:opacity-50 text-[#0B0D10] font-bold text-xs shadow-md transition"
          >
            Confirm Transfer to Balance
          </button>
        </div>
      </div>
    </div>
  );
}
