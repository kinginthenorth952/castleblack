import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  X, 
  DollarSign, 
  TrendingDown, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlatformExpense } from '../../types';

export const ExpensesTab: React.FC = () => {
  const { platformExpenses, adminAddExpense, adminDeleteExpense } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PlatformExpense['category']>('Server Hosting');
  const [amount, setAmount] = useState(15000);
  const [paidTo, setPaidTo] = useState('');
  const [receiptRef, setReceiptRef] = useState('');
  const [notes, setNotes] = useState('');

  const totalExpense = platformExpenses.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = platformExpenses.filter((e) => {
    if (categoryFilter === 'ALL') return true;
    return e.category === categoryFilter;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    adminAddExpense({
      title,
      category,
      amount: Number(amount),
      paidTo: paidTo || 'Vendor Partner',
      date: new Date().toISOString().split('T')[0],
      receiptRef: receiptRef || `EXP-${Date.now().toString().slice(-5)}`,
      notes: notes || undefined,
    });

    setTitle('');
    setPaidTo('');
    setReceiptRef('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card with KPI */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Platform Operational Expenses</h2>
            <p className="text-xs text-[#7F8792]">
              Track cloud hosting, SMS OTP credits, marketing spend, and operational expenditures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-[#171C22] border border-[#2B3340] text-right">
            <span className="text-[10px] text-[#7F8792] uppercase font-bold block">Total Operational Outflow</span>
            <span className="text-base font-bold text-rose-400 font-mono">
              Rs {totalExpense.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'Server Hosting', 'SMS & OTP Service', 'Marketing & Ads', 'Staff Payroll', 'Office / Legal'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              categoryFilter === cat
                ? 'bg-[#D6B36A] text-[#0B0D10]'
                : 'bg-[#161B22] text-[#9EA7B4] hover:text-[#F4F1EA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expenses Table */}
      <div className="bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9EA7B4]">
            <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
              <tr>
                <th className="px-4 py-3">Expense Details</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Paid To</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Receipt / Ref</th>
                <th className="px-4 py-3">Cost (PKR)</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D232B]">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#151A21] transition">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-[#F4F1EA] text-xs">{exp.title}</div>
                    {exp.notes && <span className="text-[10px] text-[#7F8792]">{exp.notes}</span>}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1B222C] text-amber-300 border border-amber-800/30">
                      {exp.category}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 font-medium text-[#F4F1EA]">
                    {exp.paidTo}
                  </td>

                  <td className="px-4 py-3.5 text-[#7F8792] font-mono text-[11px]">
                    {exp.date}
                  </td>

                  <td className="px-4 py-3.5 font-mono text-[10px] text-[#D6B36A]">
                    {exp.receiptRef}
                  </td>

                  <td className="px-4 py-3.5 font-mono font-bold text-rose-400 text-xs">
                    -Rs {exp.amount.toLocaleString()}
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => adminDeleteExpense(exp.id)}
                      className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-rose-400 transition"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Log Operational Expense</h3>
            <p className="text-xs text-[#7F8792] mb-4">Record platform cost outflow in balance sheet.</p>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Expense Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS & Cloud Run Hosting Cluster"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PlatformExpense['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  >
                    <option value="Server Hosting">Server Hosting</option>
                    <option value="SMS & OTP Service">SMS & OTP Service</option>
                    <option value="Marketing & Ads">Marketing & Ads</option>
                    <option value="Staff Payroll">Staff Payroll</option>
                    <option value="Office / Legal">Office / Legal</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Vendor / Paid To</label>
                  <input
                    type="text"
                    placeholder="e.g. Google Cloud"
                    value={paidTo}
                    onChange={(e) => setPaidTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Receipt / Invoice Ref</label>
                  <input
                    type="text"
                    placeholder="e.g. INV-98213"
                    value={receiptRef}
                    onChange={(e) => setReceiptRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Additional context or approval reference..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
