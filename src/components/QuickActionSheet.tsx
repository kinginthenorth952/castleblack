import { 
  Calculator, 
  Coins, 
  History, 
  Layers, 
  PlayCircle,
  Receipt, 
  Sparkles, 
  UserPlus, 
  Wallet, 
  X 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface QuickActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: () => void;
  onOpenTransfer: () => void;
}

export function QuickActionSheet({
  isOpen,
  onClose,
  onOpenCalculator,
  onOpenTransfer,
}: QuickActionSheetProps) {
  const { setCurrentView, currentUser } = useApp();

  if (!isOpen) return null;

  const handleNavigate = (view: any) => {
    setCurrentView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#11151A] border-t sm:border border-[#252B33] p-5 shadow-2xl shadow-black/90 text-[#F4F1EA] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull Indicator on Mobile */}
        <div className="w-12 h-1 bg-[#343B45] rounded-full mx-auto -mt-1 mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252B33]">
          <div>
            <h3 className="text-sm font-bold text-[#F4F1EA] uppercase tracking-wider">
              Quick Portals & Utilities
            </h3>
            <p className="text-[10px] text-[#7F8792]">Instant 1-tap mobile shortcuts</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#7F8792] hover:text-[#F4F1EA] transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Quick Grid Tiles */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {/* Deposit */}
          <button
            onClick={() => handleNavigate('plans')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#171C22] border border-[#252B33] hover:border-[#D6B36A] hover:bg-[#1D232B] transition group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#241D10] text-[#D6B36A] flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F4F1EA]">Deposit</span>
            <span className="text-[9px] text-[#7F8792]">Add Funds</span>
          </button>

          {/* Withdraw */}
          <button
            onClick={() => handleNavigate('withdraw')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#171C22] border border-[#252B33] hover:border-[#63B889] hover:bg-[#1D232B] transition group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#10231A] text-[#63B889] flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <Coins className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F4F1EA]">Withdraw</span>
            <span className="text-[9px] text-[#7F8792]">Instant Payout</span>
          </button>

          {/* Daily Tasks */}
          <button
            onClick={() => handleNavigate('tasks')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#171C22] border border-[#252B33] hover:border-[#3875F6] hover:bg-[#1D232B] transition group text-center relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0E1726] text-[#3875F6] flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <PlayCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F4F1EA]">Daily Tasks</span>
            <span className="text-[9px] text-[#7F8792]">Claim Daily ROI</span>
          </button>

          {/* ROI Calculator */}
          <button
            onClick={() => {
              onClose();
              onOpenCalculator();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#171C22] border border-[#252B33] hover:border-[#6D9FD6] hover:bg-[#1D232B] transition group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#111E2C] text-[#6D9FD6] flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F4F1EA]">Calculator</span>
            <span className="text-[9px] text-[#7F8792]">Simulate ROI</span>
          </button>

          {/* Transfer Commission */}
          <button
            onClick={() => {
              onClose();
              onOpenTransfer();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#171C22] border border-[#252B33] hover:border-emerald-400 hover:bg-[#1D232B] transition group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#10231A] text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F4F1EA]">Transfer</span>
            <span className="text-[9px] text-[#7F8792]">Claim Bounty</span>
          </button>

          {/* Invite Partners */}
          <button
            onClick={() => handleNavigate('referrals')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#171C22] border border-[#252B33] hover:border-[#D6B36A] hover:bg-[#1D232B] transition group text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#241D10] text-[#D6B36A] flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F4F1EA]">Affiliates</span>
            <span className="text-[9px] text-[#7F8792]">15% Bonus</span>
          </button>
        </div>

        {/* User Balance Strip */}
        <div className="mt-4 p-3 rounded-xl bg-[#171C22] border border-[#252B33] flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-[#7F8792] block">Current Wallet Capital</span>
            <span className="font-mono font-bold text-sm text-[#F4F1EA]">
              Rs {currentUser?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </span>
          </div>
          <button
            onClick={() => handleNavigate('invest-logs')}
            className="px-3 py-1.5 rounded-lg bg-[#252B33] hover:bg-[#343B45] text-[11px] font-bold text-[#D6B36A] transition flex items-center gap-1"
          >
            <History className="w-3.5 h-3.5" />
            <span>My Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
}
