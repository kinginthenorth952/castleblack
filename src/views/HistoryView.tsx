import { useState } from 'react';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  Coins, 
  Copy, 
  FileText, 
  History, 
  Search, 
  XCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

export function HistoryView({ defaultTab = 'DEPOSITS' }: { defaultTab?: 'DEPOSITS' | 'WITHDRAWALS' | 'TRANSACTIONS' }) {
  const { deposits, withdrawals, transactions, currentUser, showToast, settings } = useApp();
  const [activeTab, setActiveTab] = useState<'DEPOSITS' | 'WITHDRAWALS' | 'TRANSACTIONS'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');

  const userDeposits = deposits.filter((d) => d.userId === currentUser?.id);
  const userWithdrawals = withdrawals.filter((w) => w.userId === currentUser?.id);
  const userTransactions = transactions.filter((t) => t.userId === currentUser?.id);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('ID copied to clipboard!', 'success');
  };

  const renderStatusBadge = (status: 'pending' | 'approved' | 'rejected' | 'completed') => {
    switch (status) {
      case 'approved':
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCF8F2] text-[#15803D] border border-[#EADCC9]">
            <CheckCircle className="w-3 h-3 text-[#15803D]" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FCF8F2] text-[#D09009] border border-[#EADCC9]">
            <Clock className="w-3 h-3 text-[#D09009]" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] pb-24 text-[#3C3024] flex flex-col items-center">
      <Header title={settings?.siteName || 'Prime Invest'} subtitle="History & Logs" showBack />

      <main className="w-full max-w-2xl px-4 space-y-4 mt-2">
        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-2">
          {(['DEPOSITS', 'WITHDRAWALS', 'TRANSACTIONS'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white shadow-xs'
                  : 'bg-white border border-[#EADCC9] text-[#8C7A6B] hover:border-[#D09009]/50 hover:text-[#3C3024]'
              }`}
            >
              {tab === 'DEPOSITS' ? `Deposits (${userDeposits.length})` : tab === 'WITHDRAWALS' ? `Withdraws (${userWithdrawals.length})` : `All Logs (${userTransactions.length})`}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#8C7A6B]" />
          <input
            type="text"
            placeholder="Search by transaction ID or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EADCC9] text-xs text-[#3C3024] placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#D09009]"
          />
        </div>

        {/* Content list */}
        {activeTab === 'DEPOSITS' && (
          <div className="space-y-2.5">
            {userDeposits.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-[#EADCC9] text-center text-[#8C7A6B] text-xs">
                No deposit records found.
              </div>
            ) : (
              userDeposits
                .filter((d) => (d.transactionId || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map((dep) => (
                  <div
                    key={dep.id}
                    className="p-4 rounded-2xl bg-white border border-[#EADCC9] shadow-sm flex flex-col space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                          <ArrowDownLeft className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#3C3024] block">
                            Manual Deposit ({dep.gateway})
                          </span>
                          <span className="text-[10px] text-[#8C7A6B]">
                            {new Date(dep.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#15803D] block">
                          +Rs{dep.amount.toLocaleString()}
                        </span>
                        {renderStatusBadge(dep.status)}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EADCC9] flex items-center justify-between text-[11px] text-[#8C7A6B] font-mono">
                      <span>TID: {dep.transactionId}</span>
                      <button
                        onClick={() => handleCopy(dep.transactionId)}
                        className="text-[#D09009] hover:underline flex items-center gap-1 font-sans text-xs font-bold"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    {dep.rejectionReason && (
                      <div className="text-[10px] text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
                        Reason: {dep.rejectionReason}
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === 'WITHDRAWALS' && (
          <div className="space-y-2.5">
            {userWithdrawals.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-[#EADCC9] text-center text-[#8C7A6B] text-xs">
                No withdrawal records found.
              </div>
            ) : (
              userWithdrawals
                .filter((w) => (w.accountNumber || '').includes(searchQuery) || (w.accountName || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map((wd) => (
                  <div
                    key={wd.id}
                    className="p-4 rounded-2xl bg-white border border-[#EADCC9] shadow-sm flex flex-col space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#3C3024] block">
                            Withdraw ({wd.gateway})
                          </span>
                          <span className="text-[10px] text-[#8C7A6B]">
                            {new Date(wd.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-red-600 block">
                          -Rs{wd.amount.toLocaleString()}
                        </span>
                        {renderStatusBadge(wd.status)}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EADCC9] flex items-center justify-between text-[11px] text-[#3C3024]">
                      <span>Recipient: {wd.accountName}</span>
                      <span className="font-mono text-[#8C7A6B]">{wd.accountNumber}</span>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === 'TRANSACTIONS' && (
          <div className="space-y-2.5">
            {userTransactions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-[#EADCC9] text-center text-[#8C7A6B] text-xs">
                No transaction logs yet.
              </div>
            ) : (
              userTransactions
                .filter((t) => (t.description || '').toLowerCase().includes(searchQuery.toLowerCase()))
                .map((tx) => {
                  const isCredit =
                    tx.type === 'deposit' ||
                    tx.type === 'task_earning' ||
                    tx.type === 'referral_bonus' ||
                    (tx.type === 'admin_adjustment' && (tx.description || '').includes('+'));

                  return (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex items-center justify-between shadow-xs"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#3C3024]">{tx.description}</p>
                        <span className="text-[10px] text-[#8C7A6B] block mt-0.5">
                          {new Date(tx.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold block ${
                            isCredit ? 'text-[#15803D]' : 'text-[#3C3024]'
                          }`}
                        >
                          {isCredit ? '+' : '-'}
                          Rs{tx.amount.toLocaleString()}
                        </span>
                        {renderStatusBadge(tx.status)}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        )}
      </main>
    </div>
  );
}
