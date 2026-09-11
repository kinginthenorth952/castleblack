import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Building2, 
  Trash2, 
  Edit3, 
  ToggleLeft, 
  ToggleRight, 
  X,
  Copy,
  CheckCircle2,
  QrCode,
  Search,
  ShieldCheck,
  Smartphone,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CurrencyAccount } from '../../types';

export const CurrencyAccountsTab: React.FC = () => {
  const { 
    currencyAccounts = [], 
    adminAddCurrencyAccount, 
    adminUpdateCurrencyAccount,
    adminToggleCurrencyAccount, 
    adminDeleteCurrencyAccount,
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGateway, setFilterGateway] = useState<string>('ALL');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<CurrencyAccount | null>(null);
  const [viewingQrAccount, setViewingQrAccount] = useState<CurrencyAccount | null>(null);

  // New account form state
  const [bankName, setBankName] = useState('');
  const [gatewayType, setGatewayType] = useState('Easypaisa');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [iban, setIban] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dailyLimit, setDailyLimit] = useState(2500000);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Edit form state
  const [editBankName, setEditBankName] = useState('');
  const [editGatewayType, setEditGatewayType] = useState('Easypaisa');
  const [editAccountTitle, setEditAccountTitle] = useState('');
  const [editAccountNumber, setEditAccountNumber] = useState('');
  const [editIban, setEditIban] = useState('');
  const [editInstructions, setEditInstructions] = useState('');
  const [editDailyLimit, setEditDailyLimit] = useState(2500000);
  const [editQrCodeUrl, setEditQrCodeUrl] = useState('');

  const openEditModal = (acc: CurrencyAccount) => {
    setEditingAccount(acc);
    setEditBankName(acc.bankName || '');
    setEditGatewayType(acc.gatewayType || 'Easypaisa');
    setEditAccountTitle(acc.accountTitle || '');
    setEditAccountNumber(acc.accountNumber || '');
    setEditIban(acc.iban || '');
    setEditInstructions(acc.instructions || '');
    setEditDailyLimit(acc.dailyLimit || 2500000);
    setEditQrCodeUrl(acc.qrCodeUrl || '');
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName.trim() || !accountTitle.trim() || !accountNumber.trim()) {
      showToast('Please fill all required account fields.', 'error');
      return;
    }

    adminAddCurrencyAccount({
      bankName: bankName.trim(),
      gatewayType: gatewayType.trim(),
      accountTitle: accountTitle.trim(),
      accountNumber: accountNumber.trim(),
      iban: iban.trim() || undefined,
      instructions: instructions.trim() || 'Send funds to the account above and upload transaction receipt screenshot.',
      status: 'active',
      dailyLimit: Number(dailyLimit) || 2500000,
      totalCollected: 0,
      qrCodeUrl: qrCodeUrl.trim() || undefined,
    });

    setBankName('');
    setAccountTitle('');
    setAccountNumber('');
    setIban('');
    setInstructions('');
    setQrCodeUrl('');
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccount) return;
    if (!editBankName.trim() || !editAccountTitle.trim() || !editAccountNumber.trim()) {
      showToast('Please fill all required account fields.', 'error');
      return;
    }

    adminUpdateCurrencyAccount({
      ...editingAccount,
      bankName: editBankName.trim(),
      gatewayType: editGatewayType.trim(),
      accountTitle: editAccountTitle.trim(),
      accountNumber: editAccountNumber.trim(),
      iban: editIban.trim() || undefined,
      instructions: editInstructions.trim() || undefined,
      dailyLimit: Number(editDailyLimit) || 2500000,
      qrCodeUrl: editQrCodeUrl.trim() || undefined,
    });

    setEditingAccount(null);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  const safeAccountsList = Array.isArray(currencyAccounts) ? currencyAccounts : [];

  const filteredAccounts = safeAccountsList.filter((acc) => {
    if (!acc) return false;
    const nameMatch = (acc.bankName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const titleMatch = (acc.accountTitle || '').toLowerCase().includes(searchTerm.toLowerCase());
    const numMatch = (acc.accountNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || titleMatch || numMatch;

    if (filterGateway === 'ALL') return matchesSearch;
    return matchesSearch && (acc.gatewayType === filterGateway || acc.bankName?.toLowerCase().includes(filterGateway.toLowerCase()));
  });

  const totalCollectedSum = safeAccountsList.reduce((sum, a) => sum + (Number(a.totalCollected) || 0), 0);
  const activeAccountsCount = safeAccountsList.filter((a) => a.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Top Header Card with Real-time KPI Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Payment Currency & Bank Accounts</h2>
            <p className="text-xs text-[#7F8792]">
              Receiving deposit collection gateways for Easypaisa, JazzCash, SadaPay, NayaPay, and Commercial Banks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono">
            <span className="text-[#7F8792]">Active Gateways: </span>
            <span className="text-emerald-400 font-bold">{activeAccountsCount} / {safeAccountsList.length}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono">
            <span className="text-[#7F8792]">Total Volume: </span>
            <span className="text-[#D6B36A] font-bold">Rs {totalCollectedSum.toLocaleString()}</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#D6B36A]/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Currency Account</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#11151A] p-3.5 rounded-xl border border-[#252B33]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-[#7F8792] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by bank, title, or account number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] placeholder:text-[#636C78] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA] text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'Easypaisa', 'JazzCash', 'Bank Transfer', 'SadaPay'].map((gw) => (
            <button
              key={gw}
              onClick={() => setFilterGateway(gw)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterGateway === gw
                  ? 'bg-[#D6B36A] text-[#0B0D10]'
                  : 'bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA] hover:bg-[#1E2530]'
              }`}
            >
              {gw}
            </button>
          ))}
        </div>
      </div>

      {/* Accounts Cards Grid */}
      {filteredAccounts.length === 0 ? (
        <div className="p-12 text-center bg-[#11151A] rounded-2xl border border-[#252B33] space-y-3">
          <CreditCard className="w-12 h-12 text-[#636C78] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#F4F1EA]">No Currency Accounts Found</h3>
          <p className="text-xs text-[#7F8792] max-w-sm mx-auto">
            {searchTerm ? 'No accounts matched your search criteria.' : 'Add your first receiving bank or mobile wallet gateway to start accepting investor deposits.'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#D6B36A] text-[#0B0D10] font-bold text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Account Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAccounts.map((acc) => {
            const isActive = acc.status === 'active';
            const dailyCap = Number(acc.dailyLimit) || 0;
            const collected = Number(acc.totalCollected) || 0;
            const capPercentage = dailyCap > 0 ? Math.min(100, Math.round((collected / dailyCap) * 100)) : 0;

            return (
              <div
                key={acc.id}
                className={`p-5 rounded-2xl bg-[#11151A] border transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-black/40 ${
                  isActive ? 'border-[#2D3542] hover:border-[#3E495B]' : 'border-[#20252D] opacity-70'
                }`}
              >
                <div>
                  {/* Account Top Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                        acc.bankName?.toLowerCase().includes('easypaisa')
                          ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-400'
                          : acc.bankName?.toLowerCase().includes('jazzcash')
                          ? 'bg-rose-950/60 border-rose-700/50 text-rose-400'
                          : acc.bankName?.toLowerCase().includes('sadapay')
                          ? 'bg-teal-950/60 border-teal-700/50 text-teal-400'
                          : 'bg-[#171C22] border-[#343B45] text-[#D6B36A]'
                      }`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#F4F1EA] line-clamp-1">{acc.bankName || 'Receiving Account'}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-[#7F8792] font-mono">{acc.id}</span>
                          {acc.gatewayType && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-[#D6B36A] font-semibold border border-white/10">
                              {acc.gatewayType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                          : 'bg-[#181E27] text-[#636C78] border border-[#28303C]'
                      }`}
                    >
                      {acc.status || 'active'}
                    </span>
                  </div>

                  {/* Account Details Box */}
                  <div className="p-3.5 rounded-xl bg-[#161B22] border border-[#252B33] space-y-2.5 mb-3">
                    <div>
                      <span className="text-[10px] text-[#7F8792] font-medium block">Account Title (Beneficiary)</span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F4F1EA] truncate">{acc.accountTitle || 'N/A'}</span>
                        <button
                          onClick={() => copyToClipboard(acc.accountTitle, 'Account title')}
                          className="p-1 text-[#7F8792] hover:text-[#D6B36A] transition shrink-0"
                          title="Copy Account Title"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#7F8792] font-medium block">Account / Mobile Number</span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#D6B36A] tracking-wider truncate">
                          {acc.accountNumber || 'N/A'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(acc.accountNumber, 'Account number')}
                          className="p-1 text-[#7F8792] hover:text-[#D6B36A] transition shrink-0"
                          title="Copy Account Number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {acc.iban && (
                      <div>
                        <span className="text-[10px] text-[#7F8792] font-medium block">IBAN Number</span>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-[#9EA7B4] truncate">
                            {acc.iban}
                          </span>
                          <button
                            onClick={() => copyToClipboard(acc.iban || '', 'IBAN')}
                            className="p-1 text-[#7F8792] hover:text-[#D6B36A] transition shrink-0"
                            title="Copy IBAN"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Limits & Stats Bar */}
                  <div className="space-y-1.5 mb-3">
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded-lg bg-[#14181F] border border-[#212730]">
                        <span className="text-[9px] text-[#7F8792] uppercase block">Daily Cap</span>
                        <span className="font-mono font-bold text-[#F4F1EA]">
                          Rs {dailyCap.toLocaleString()}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#14181F] border border-[#212730]">
                        <span className="text-[9px] text-[#7F8792] uppercase block">Collected</span>
                        <span className="font-mono font-bold text-emerald-400">
                          Rs {collected.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {dailyCap > 0 && (
                      <div className="space-y-1 px-0.5">
                        <div className="flex justify-between text-[10px] text-[#7F8792]">
                          <span>Quota Utilized</span>
                          <span className="font-mono font-semibold">{capPercentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#171C22] rounded-full overflow-hidden border border-[#252B33]">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              capPercentage > 85 ? 'bg-rose-500' : capPercentage > 50 ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${capPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {acc.instructions && (
                    <div className="p-2 rounded-lg bg-[#14181F] border border-[#20252E] text-[10px] text-[#7F8792] italic line-clamp-2">
                      <span className="font-semibold text-[#9EA7B4] not-italic">Note: </span>
                      {acc.instructions}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-[#212730] flex items-center justify-between mt-3">
                  <button
                    onClick={() => adminToggleCurrencyAccount(acc.id)}
                    className="flex items-center gap-1.5 text-xs text-[#9EA7B4] hover:text-[#F4F1EA] transition"
                  >
                    {isActive ? (
                      <>
                        <ToggleRight className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold text-xs">Active</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-4 h-4 text-[#636C78]" />
                        <span className="text-[#636C78] text-xs">Disabled</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    {acc.qrCodeUrl && (
                      <button
                        onClick={() => setViewingQrAccount(acc)}
                        className="p-1.5 rounded-lg bg-[#181E27] hover:bg-[#232B38] text-[#D6B36A] border border-[#2A3442] transition"
                        title="View Deposit QR Code"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => openEditModal(acc)}
                      className="p-1.5 rounded-lg bg-[#181E27] hover:bg-[#232B38] text-[#9EA7B4] hover:text-[#D6B36A] border border-[#2A3442] transition"
                      title="Edit Account Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${acc.bankName}?`)) {
                          adminDeleteCurrencyAccount(acc.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-[#181E27] hover:bg-rose-950/60 text-[#9EA7B4] hover:text-rose-400 border border-[#2A3442] transition"
                      title="Delete Account"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative shadow-2xl shadow-black max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Add New Currency Account</h3>
            <p className="text-xs text-[#7F8792] mb-4">Configure account details where users send deposit payments.</p>

            <form onSubmit={handleAddAccount} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Gateway Category</label>
                  <select
                    value={gatewayType}
                    onChange={(e) => setGatewayType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  >
                    <option value="Easypaisa">Easypaisa</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="SadaPay">SadaPay</option>
                    <option value="NayaPay">NayaPay</option>
                    <option value="Crypto USDT">Crypto USDT</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Daily Cap (PKR)</label>
                  <input
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Bank / Wallet Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Telenor Microfinance Bank (Easypaisa) / Meezan Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Account Title (Beneficiary Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SARMAYA X PROFIT OFFICIAL"
                  value={accountTitle}
                  onChange={(e) => setAccountTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Account / Mobile Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0340 1234567 or 010203040506"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">IBAN (Optional for Commercial Banks)</label>
                <input
                  type="text"
                  placeholder="e.g. PK45MEZN00010203040506"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Deposit Instructions Note</label>
                <textarea
                  rows={2}
                  placeholder="Enter custom deposit instructions shown on checkout..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">QR Code Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={qrCodeUrl}
                  onChange={(e) => setQrCodeUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Save Gateway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Account Modal */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative shadow-2xl shadow-black max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingAccount(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Edit Currency Account</h3>
            <p className="text-xs text-[#7F8792] mb-4">Modify receiving credentials and daily volume allocation.</p>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Gateway Category</label>
                  <select
                    value={editGatewayType}
                    onChange={(e) => setEditGatewayType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  >
                    <option value="Easypaisa">Easypaisa</option>
                    <option value="JazzCash">JazzCash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="SadaPay">SadaPay</option>
                    <option value="NayaPay">NayaPay</option>
                    <option value="Crypto USDT">Crypto USDT</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Daily Cap (PKR)</label>
                  <input
                    type="number"
                    value={editDailyLimit}
                    onChange={(e) => setEditDailyLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Bank / Gateway Name *</label>
                <input
                  type="text"
                  required
                  value={editBankName}
                  onChange={(e) => setEditBankName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Account Title *</label>
                <input
                  type="text"
                  required
                  value={editAccountTitle}
                  onChange={(e) => setEditAccountTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Account / Mobile Number *</label>
                <input
                  type="text"
                  required
                  value={editAccountNumber}
                  onChange={(e) => setEditAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">IBAN Number (Optional)</label>
                <input
                  type="text"
                  value={editIban}
                  onChange={(e) => setEditIban(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Deposit Instructions Note</label>
                <textarea
                  rows={2}
                  value={editInstructions}
                  onChange={(e) => setEditInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">QR Code Image URL (Optional)</label>
                <input
                  type="text"
                  value={editQrCodeUrl}
                  onChange={(e) => setEditQrCodeUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Viewer Modal */}
      {viewingQrAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#252B33] pb-3">
              <h3 className="text-sm font-bold text-[#F4F1EA]">{viewingQrAccount.bankName} QR Code</h3>
              <button
                onClick={() => setViewingQrAccount(null)}
                className="p-1 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white flex items-center justify-center mx-auto max-w-[200px]">
              {viewingQrAccount.qrCodeUrl ? (
                <img 
                  src={viewingQrAccount.qrCodeUrl} 
                  alt="Account QR Code" 
                  className="w-full h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <QrCode className="w-32 h-32 text-black" />
              )}
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-[#F4F1EA]">{viewingQrAccount.accountTitle}</div>
              <div className="font-mono text-[#D6B36A]">{viewingQrAccount.accountNumber}</div>
            </div>

            <button
              onClick={() => setViewingQrAccount(null)}
              className="w-full py-2 rounded-xl bg-[#161B22] hover:bg-[#1E2530] text-xs font-bold text-[#F4F1EA]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
