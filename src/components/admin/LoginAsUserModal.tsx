import React, { useState } from 'react';
import { 
  Search, 
  X, 
  UserCheck, 
  Wallet, 
  Mail, 
  Phone, 
  ArrowRight, 
  Shield, 
  Users,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

interface LoginAsUserModalProps {
  onClose: () => void;
}

export const LoginAsUserModal: React.FC<LoginAsUserModalProps> = ({ onClose }) => {
  const { users = [], adminLoginAsUser, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'with_balance'>('all');

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.mobile && u.mobile.includes(q)) ||
      u.id.toLowerCase().includes(q) ||
      (u.referralBy && u.referralBy.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (filterType === 'active') return u.status === 'active';
    if (filterType === 'with_balance') return (u.balance || 0) > 0;
    return true;
  });

  const handleSelectUser = (user: User) => {
    adminLoginAsUser(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0E1217] border border-[#252B33] text-[#F4F1EA] shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#212730] flex items-center justify-between bg-[#11151A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#171C22] border border-[#D6B36A]/40 text-[#D6B36A] flex items-center justify-center shadow-md shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F4F1EA] flex items-center gap-2">
                <span>Login As Investor</span>
                <span className="px-2 py-0.5 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A] text-[10px] font-mono">
                  {users.length} Users
                </span>
              </h2>
              <p className="text-xs text-[#7F8792]">
                Instantly impersonate any investor account to view their dashboard, active plans, or balance.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-[#212730] bg-[#14181F] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7F8792] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by username, email, phone number, or ID (e.g. usr-1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0E1217] border border-[#252B33] text-xs sm:text-sm text-[#F4F1EA] placeholder:text-[#636C78] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#7F8792] font-semibold">Filter:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === 'all'
                  ? 'bg-[#D6B36A] text-[#0B0D10]'
                  : 'bg-[#0E1217] text-[#7F8792] hover:text-[#F4F1EA] border border-[#252B33]'
              }`}
            >
              All Investors ({users.length})
            </button>
            <button
              onClick={() => setFilterType('active')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === 'active'
                  ? 'bg-[#D6B36A] text-[#0B0D10]'
                  : 'bg-[#0E1217] text-[#7F8792] hover:text-[#F4F1EA] border border-[#252B33]'
              }`}
            >
              Active ({users.filter((u) => u.status === 'active').length})
            </button>
            <button
              onClick={() => setFilterType('with_balance')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === 'with_balance'
                  ? 'bg-[#D6B36A] text-[#0B0D10]'
                  : 'bg-[#0E1217] text-[#7F8792] hover:text-[#F4F1EA] border border-[#252B33]'
              }`}
            >
              With Balance ({users.filter((u) => (u.balance || 0) > 0).length})
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="overflow-y-auto p-4 space-y-2.5 divide-y divide-[#1D232B]/50 flex-1">
          {filteredUsers.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#7F8792] space-y-2">
              <Users className="w-8 h-8 mx-auto text-[#636C78] opacity-50" />
              <p>No investor accounts found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredUsers.map((u) => {
              const isCurrentSession = currentUser?.id === u.id;

              return (
                <div
                  key={u.id}
                  className={`pt-2.5 first:pt-0 p-3 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrentSession
                      ? 'bg-[#1D1A10] border border-[#D6B36A]/50'
                      : 'bg-[#11151A] hover:bg-[#161B22] border border-[#252B33]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#F4F1EA]">{u.username}</span>
                      <span className="text-[10px] text-[#636C78] font-mono">({u.id})</span>
                      <span
                        className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase ${
                          u.status === 'active'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                        }`}
                      >
                        {u.status}
                      </span>
                      {isCurrentSession && (
                        <span className="px-2 py-0.2 rounded-full bg-[#D6B36A] text-[#0B0D10] text-[9px] font-bold">
                          Active Session
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#7F8792] flex-wrap">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#636C78]" />
                        <span>{u.email}</span>
                      </span>
                      {u.mobile && (
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-[#636C78]" />
                          <span>{u.mobile}</span>
                        </span>
                      )}
                      {u.referralBy && (
                        <span className="text-[10px] text-[#D6B36A]">
                          Ref: {u.referralBy}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#212730]">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#7F8792] block">Wallet Balance</span>
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        Rs {(u.balance || 0).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelectUser(u)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-sm ${
                        isCurrentSession
                          ? 'bg-[#2B2313] border border-[#D6B36A]/50 text-[#D6B36A] hover:bg-[#382D16]'
                          : 'bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] shadow-[#D6B36A]/20'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{isCurrentSession ? 'Switch to View' : 'Login as User'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#11151A] border-t border-[#212730] flex items-center justify-between text-xs text-[#7F8792]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>Admin privileges remain intact while impersonating.</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#161B22] text-[#F4F1EA] text-xs font-semibold hover:bg-[#202732]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
