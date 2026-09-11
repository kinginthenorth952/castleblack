import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  Mail, 
  Phone, 
  X,
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminMember } from '../../types';

export const AdminMembersTab: React.FC = () => {
  const { adminMembers, adminAddMember, adminRemoveMember, adminToggleMemberStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New member form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminMember['role']>('Operations Lead');
  const [phone, setPhone] = useState('');

  const filteredMembers = adminMembers.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    adminAddMember({
      name,
      email,
      role,
      phone: phone || '+92 300 0000000',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
    });

    setName('');
    setEmail('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Admin Members & Delegation</h2>
            <p className="text-xs text-[#7F8792]">
              Manage internal operators, finance officers, and executive role permissions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#636C78] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl bg-[#171C22] border border-[#252B33] text-xs text-[#F4F1EA] placeholder:text-[#636C78] focus:outline-none focus:border-[#D6B36A]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 shadow-md transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Members Grid / Table */}
      <div className="bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9EA7B4]">
            <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Role & Access</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D232B]">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#151A21] transition">
                  {/* Name & ID */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1B222C] border border-[#303844] flex items-center justify-center font-bold text-xs text-[#D6B36A]">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#F4F1EA] text-xs flex items-center gap-1.5">
                          <span>{member.name}</span>
                          {member.role === 'Super Admin' && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#D6B36A]/20 text-[#D6B36A] border border-[#D6B36A]/30">
                              ROOT
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#636C78] font-mono">{member.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1C2430] text-sky-400 border border-sky-800/40">
                      {member.role}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3.5 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] text-[#F4F1EA]">
                      <Mail className="w-3 h-3 text-[#7F8792]" />
                      <span>{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-1 text-[10px] text-[#7F8792] font-mono">
                        <Phone className="w-3 h-3 text-[#636C78]" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        member.status === 'active'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Last Active */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 text-[11px] text-[#7F8792]">
                      <Clock className="w-3 h-3 text-[#636C78]" />
                      <span>{member.lastActive || 'Today'}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => adminToggleMemberStatus(member.id)}
                      className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-[#D6B36A] transition"
                      title="Toggle Active / Suspended"
                    >
                      {member.status === 'active' ? (
                        <ToggleRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-rose-400" />
                      )}
                    </button>

                    {member.role !== 'Super Admin' && (
                      <button
                        onClick={() => adminRemoveMember(member.id)}
                        className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-rose-400 transition"
                        title="Delete Admin Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Add Admin Staff Member</h3>
            <p className="text-xs text-[#7F8792] mb-4">Grant delegated administration roles and permissions.</p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asim Qureshi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@sarmayaxprofit.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Official Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminMember['role'])}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                >
                  <option value="Finance Officer">Finance Officer (Deposits & Withdrawals)</option>
                  <option value="Operations Lead">Operations Lead (Packages & Categories)</option>
                  <option value="Compliance Auditor">Compliance Auditor (Security & Risk)</option>
                  <option value="Support Lead">Support Lead (User Assistance)</option>
                  <option value="Super Admin">Super Admin (Full Root Access)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Phone Number (Optional)</label>
                <input
                  type="text"
                  placeholder="+92 3XX XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
