import React, { useState } from 'react';
import { 
  Layers, 
  Edit3, 
  Percent, 
  Clock, 
  ArrowUpRight, 
  X, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WithdrawSlab } from '../../types';

export const WithdrawSlabsTab: React.FC = () => {
  const { withdrawSlabs, adminUpdateWithdrawSlab } = useApp();
  const [editingSlab, setEditingSlab] = useState<WithdrawSlab | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlab) return;

    adminUpdateWithdrawSlab(editingSlab);
    setEditingSlab(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Withdrawal Slabs & Gateway Fees</h2>
            <p className="text-xs text-[#7F8792]">
              Configured payout thresholds, operational handling deductions, and batch speed windows.
            </p>
          </div>
        </div>
      </div>

      {/* Slabs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {withdrawSlabs.map((slab) => (
          <div
            key={slab.id}
            className="p-5 rounded-2xl bg-[#11151A] border border-[#252B33] flex flex-col justify-between hover:border-[#353D4A] transition"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#171C22] border border-[#343B45] flex items-center justify-center text-[#D6B36A]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#1A222D] text-sky-400 border border-sky-800/30">
                  {slab.processingSpeed}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#F4F1EA] mb-1">{slab.tierTitle}</h3>
              <p className="text-xs text-[#7F8792] mb-4">
                Range: <span className="text-[#F4F1EA] font-mono font-bold">Rs {slab.minAmount.toLocaleString()}</span> to{' '}
                <span className="text-[#F4F1EA] font-mono font-bold">Rs {slab.maxAmount.toLocaleString()}</span>
              </p>

              <div className="space-y-2 bg-[#161B22] p-3 rounded-xl border border-[#252B33] text-xs mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8792]">Platform Fee:</span>
                  <span className="font-mono font-bold text-amber-400">{slab.feePercent}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8792]">Daily Allowed Requests:</span>
                  <span className="font-mono font-bold text-[#F4F1EA]">{slab.maxRequestsPerDay} Per Day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8792]">Queue Priority:</span>
                  <span className="font-mono text-emerald-400 font-bold">{slab.processingSpeed}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#212730] flex items-center justify-between">
              <span className="text-[10px] text-[#636C78] font-mono">ID: {slab.id}</span>
              <button
                onClick={() => setEditingSlab({ ...slab })}
                className="px-3 py-1.5 rounded-lg bg-[#181E27] text-xs font-bold text-[#D6B36A] hover:bg-[#202732] flex items-center gap-1 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Slab Modal */}
      {editingSlab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setEditingSlab(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Configure {editingSlab.tierTitle}</h3>
            <p className="text-xs text-[#7F8792] mb-4">Update withdrawal boundaries and operational charge rates.</p>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Tier Name</label>
                <input
                  type="text"
                  required
                  value={editingSlab.tierTitle}
                  onChange={(e) => setEditingSlab({ ...editingSlab, tierTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Min Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingSlab.minAmount}
                    onChange={(e) => setEditingSlab({ ...editingSlab, minAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Max Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingSlab.maxAmount}
                    onChange={(e) => setEditingSlab({ ...editingSlab, maxAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Fee Percentage (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingSlab.feePercent}
                    onChange={(e) => setEditingSlab({ ...editingSlab, feePercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Max Requests / Day</label>
                  <input
                    type="number"
                    required
                    value={editingSlab.maxRequestsPerDay}
                    onChange={(e) => setEditingSlab({ ...editingSlab, maxRequestsPerDay: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Processing Window Speed</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Instant to 3 Hours"
                  value={editingSlab.processingSpeed}
                  onChange={(e) => setEditingSlab({ ...editingSlab, processingSpeed: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSlab(null)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Save Slab Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
