import React, { useState } from 'react';
import { 
  Award, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  X, 
  Clock, 
  Calendar, 
  ShieldCheck,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface WeeklySalaryTier {
  id: string;
  tierName: string;
  requiredActiveMembers: number;
  requiredTeamDeposit: number;
  weeklySalaryAmount: number;
  badge: string;
  status: 'active' | 'inactive';
}

export interface SalaryClaim {
  id: string;
  leaderUsername: string;
  tierName: string;
  activeMembers: number;
  teamDeposit: number;
  salaryAmount: number;
  walletAddress?: string;
  claimDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_SALARY_TIERS: WeeklySalaryTier[] = [
  {
    id: 's-tier-1',
    tierName: 'Junior Team Leader',
    requiredActiveMembers: 15,
    requiredTeamDeposit: 50000,
    weeklySalaryAmount: 3500,
    badge: 'BRONZE LEADER',
    status: 'active',
  },
  {
    id: 's-tier-2',
    tierName: 'Senior Team Leader',
    requiredActiveMembers: 35,
    requiredTeamDeposit: 150000,
    weeklySalaryAmount: 8500,
    badge: 'SILVER LEADER',
    status: 'active',
  },
  {
    id: 's-tier-3',
    tierName: 'Regional Supervisor',
    requiredActiveMembers: 80,
    requiredTeamDeposit: 400000,
    weeklySalaryAmount: 22000,
    badge: 'GOLD LEADER',
    status: 'active',
  },
  {
    id: 's-tier-4',
    tierName: 'National Director',
    requiredActiveMembers: 200,
    requiredTeamDeposit: 1200000,
    weeklySalaryAmount: 60000,
    badge: 'PLATINUM LEADER',
    status: 'active',
  },
  {
    id: 's-tier-5',
    tierName: 'Crown Ambassador',
    requiredActiveMembers: 500,
    requiredTeamDeposit: 3500000,
    weeklySalaryAmount: 180000,
    badge: 'CROWN VIP',
    status: 'active',
  },
];

const INITIAL_SALARY_CLAIMS: SalaryClaim[] = [];

export const WeeklySalaryTab: React.FC<{ initialSubTab?: 'tiers' | 'claims' }> = ({
  initialSubTab = 'tiers',
}) => {
  const { showToast } = useApp();
  const [subTab, setSubTab] = useState<'tiers' | 'claims'>(initialSubTab);
  const [tiers, setTiers] = useState<WeeklySalaryTier[]>(INITIAL_SALARY_TIERS);
  const [claims, setClaims] = useState<SalaryClaim[]>(INITIAL_SALARY_CLAIMS);

  // Modal States
  const [showAddTierModal, setShowAddTierModal] = useState(false);
  const [newTierName, setNewTierName] = useState('');
  const [newReqMembers, setNewReqMembers] = useState(20);
  const [newReqDeposit, setNewReqDeposit] = useState(75000);
  const [newSalary, setNewSalary] = useState(5000);
  const [newBadge, setNewBadge] = useState('PROMOTER');

  const [searchClaim, setSearchClaim] = useState('');

  const handleAddTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTierName) return;

    const newTier: WeeklySalaryTier = {
      id: `s-tier-${Date.now()}`,
      tierName: newTierName,
      requiredActiveMembers: Number(newReqMembers),
      requiredTeamDeposit: Number(newReqDeposit),
      weeklySalaryAmount: Number(newSalary),
      badge: newBadge.toUpperCase() || 'CUSTOM LEADER',
      status: 'active',
    };

    setTiers([...tiers, newTier]);
    setNewTierName('');
    setShowAddTierModal(false);
    showToast('Weekly salary tier added successfully!', 'success');
  };

  const handleDeleteTier = (id: string) => {
    setTiers(tiers.filter((t) => t.id !== id));
    showToast('Salary tier removed.', 'info');
  };

  const handleApproveClaim = (claimId: string) => {
    setClaims(
      claims.map((c) => (c.id === claimId ? { ...c, status: 'approved' } : c))
    );
    showToast('Salary claim approved and credited to leader balance!', 'success');
  };

  const handleRejectClaim = (claimId: string) => {
    setClaims(
      claims.map((c) => (c.id === claimId ? { ...c, status: 'rejected' } : c))
    );
    showToast('Salary claim rejected.', 'error');
  };

  const filteredClaims = claims.filter((c) =>
    c.leaderUsername.toLowerCase().includes(searchClaim.toLowerCase()) ||
    c.tierName.toLowerCase().includes(searchClaim.toLowerCase())
  );

  const totalWeeklyCommitted = tiers.reduce((sum, t) => sum + t.weeklySalaryAmount, 0);
  const pendingClaimsCount = claims.filter((c) => c.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Weekly Team Leader Salary Program</h2>
            <p className="text-xs text-[#7F8792]">
              Automatic weekly payouts to community leaders and team builders meeting qualification criteria.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('tiers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              subTab === 'tiers'
                ? 'bg-[#D6B36A] text-[#0B0D10] shadow-md'
                : 'bg-[#161B22] border border-[#252B33] text-[#F4F1EA] hover:border-[#D6B36A]'
            }`}
          >
            Salary Tiers ({tiers.length})
          </button>
          <button
            onClick={() => setSubTab('claims')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition relative ${
              subTab === 'claims'
                ? 'bg-[#D6B36A] text-[#0B0D10] shadow-md'
                : 'bg-[#161B22] border border-[#252B33] text-[#F4F1EA] hover:border-[#D6B36A]'
            }`}
          >
            Salary Claims ({claims.length})
            {pendingClaimsCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-mono">
                {pendingClaimsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SUBTAB 1: SALARY TIERS */}
      {subTab === 'tiers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F8792]">
              Configured Leader Salary Ranks
            </span>
            <button
              onClick={() => setShowAddTierModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] text-xs font-bold flex items-center gap-1.5 shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Salary Tier</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="p-5 rounded-2xl bg-[#11151A] border border-[#252B33] flex flex-col justify-between hover:border-[#343B45] transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#1C232E] text-[#D6B36A] border border-[#303844]">
                      {tier.badge}
                    </span>
                    <button
                      onClick={() => handleDeleteTier(tier.id)}
                      className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-rose-400 transition"
                      title="Delete Tier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-[#F4F1EA] mb-1">{tier.tierName}</h3>
                  <div className="py-2.5 border-y border-[#212730] my-2">
                    <span className="text-[10px] text-[#7F8792] block">Weekly Fixed Salary</span>
                    <div className="text-xl font-bold font-mono text-emerald-400">
                      Rs {tier.weeklySalaryAmount.toLocaleString()}{' '}
                      <span className="text-xs text-[#7F8792] font-normal">/ week</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#9EA7B4]">
                    <div className="flex justify-between">
                      <span className="text-[#7F8792]">Active Referrals:</span>
                      <span className="font-mono font-bold text-[#F4F1EA]">
                        {tier.requiredActiveMembers} Members
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7F8792]">Team Deposit:</span>
                      <span className="font-mono font-bold text-[#D6B36A]">
                        Rs {tier.requiredTeamDeposit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#212730] flex items-center justify-between text-[11px]">
                  <span className="text-[#636C78]">Auto-Disbursed Every Monday</span>
                  <span className="text-emerald-400 font-semibold">● Active Rank</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: SALARY CLAIMS */}
      {subTab === 'claims' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#11151A] border border-[#252B33] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#636C78]" />
              <input
                type="text"
                placeholder="Search leader username or rank..."
                value={searchClaim}
                onChange={(e) => setSearchClaim(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
              />
            </div>
            <div className="text-xs text-[#7F8792] font-mono">
              Pending Claims: <span className="text-amber-300 font-bold">{pendingClaimsCount}</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-[#11151A] border border-[#252B33]">
            <table className="w-full text-left text-xs text-[#9EA7B4]">
              <thead className="bg-[#161B22] text-[#7F8792] uppercase font-bold text-[10px] border-b border-[#252B33]">
                <tr>
                  <th className="px-4 py-3">Leader Username</th>
                  <th className="px-4 py-3">Rank / Tier</th>
                  <th className="px-4 py-3">Active Team</th>
                  <th className="px-4 py-3">Weekly Turnover</th>
                  <th className="px-4 py-3">Salary Claim</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212730]">
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-[#141920] transition">
                    <td className="px-4 py-3 font-semibold text-[#F4F1EA]">
                      @{claim.leaderUsername}
                      <span className="block text-[10px] text-[#636C78] font-mono">
                        {claim.claimDate}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-[#1C232E] text-[#D6B36A] font-bold text-[10px]">
                        {claim.tierName}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[#F4F1EA]">
                      {claim.activeMembers} active
                    </td>
                    <td className="px-4 py-3 font-mono text-[#D6B36A]">
                      Rs {claim.teamDeposit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-400">
                      Rs {claim.salaryAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {claim.status === 'approved' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          Approved
                        </span>
                      )}
                      {claim.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold animate-pulse">
                          Pending Review
                        </span>
                      )}
                      {claim.status === 'rejected' && (
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {claim.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleApproveClaim(claim.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 font-bold text-[11px] transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectClaim(claim.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 font-bold text-[11px] transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#636C78]">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Tier Modal */}
      {showAddTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#11151A] border border-[#252B33] p-6 shadow-2xl text-[#F4F1EA] space-y-4">
            <div className="flex items-center justify-between border-b border-[#212730] pb-3">
              <h3 className="font-bold text-sm text-[#F4F1EA]">Add New Weekly Salary Tier</h3>
              <button
                onClick={() => setShowAddTierModal(false)}
                className="p-1 rounded-lg text-[#7F8792] hover:text-[#F4F1EA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTier} className="space-y-3">
              <div>
                <label className="text-[11px] text-[#7F8792] block mb-1">Tier Name</label>
                <input
                  type="text"
                  placeholder="e.g. Diamond Regional Director"
                  value={newTierName}
                  onChange={(e) => setNewTierName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] block mb-1">Required Active Team</label>
                  <input
                    type="number"
                    value={newReqMembers}
                    onChange={(e) => setNewReqMembers(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] block mb-1">Weekly Salary (PKR)</label>
                  <input
                    type="number"
                    value={newSalary}
                    onChange={(e) => setNewSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-emerald-400 focus:outline-none focus:border-[#D6B36A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] block mb-1">Required Team Deposit (PKR)</label>
                <input
                  type="number"
                  value={newReqDeposit}
                  onChange={(e) => setNewReqDeposit(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] block mb-1">Badge Title</label>
                <input
                  type="text"
                  placeholder="e.g. VIP LEADER"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTierModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md transition"
                >
                  Create Salary Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
