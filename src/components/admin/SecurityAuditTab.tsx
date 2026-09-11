import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldAlert, 
  AlertTriangle, 
  RotateCcw, 
  Plus, 
  Trash2, 
  X, 
  CheckCircle2, 
  Laptop, 
  Smartphone,
  Globe,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BlockedDevice } from '../../types';

export const SecurityAuditTab: React.FC<{ initialSection?: 'weak_passwords' | 'blocked_devices' }> = ({
  initialSection = 'weak_passwords',
}) => {
  const { 
    weakPasswords, 
    blockedDevices, 
    adminForceResetPassword, 
    adminBlockDevice, 
    adminUnblockDevice,
    adminLoginAsUser
  } = useApp();

  const [activeSection, setActiveSection] = useState<'weak_passwords' | 'blocked_devices'>(initialSection);
  const [showBlockModal, setShowBlockModal] = useState(false);

  // New Block Device Form
  const [ipAddress, setIpAddress] = useState('');
  const [deviceFingerprint, setDeviceFingerprint] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [reason, setReason] = useState('');
  const [associatedUsername, setAssociatedUsername] = useState('');

  const handleBlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipAddress || !reason) return;

    adminBlockDevice({
      ipAddress,
      deviceFingerprint: deviceFingerprint || `fp_${Date.now().toString(36)}`,
      userAgent: userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      reason,
      associatedUsername: associatedUsername || undefined,
    });

    setIpAddress('');
    setDeviceFingerprint('');
    setUserAgent('');
    setReason('');
    setAssociatedUsername('');
    setShowBlockModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
            {activeSection === 'weak_passwords' ? (
              <KeyRound className="w-6 h-6" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F4F1EA]">Platform Security & Fraud Prevention</h2>
            <p className="text-xs text-[#7F8792]">
              Audit vulnerable account credentials and enforce hardware fingerprint IP blocks.
            </p>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#161B22] border border-[#252B33]">
          <button
            onClick={() => setActiveSection('weak_passwords')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'weak_passwords'
                ? 'bg-[#D6B36A] text-[#0B0D10] shadow-sm'
                : 'text-[#9EA7B4] hover:text-[#F4F1EA]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Weak Passwords ({weakPasswords.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('blocked_devices')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeSection === 'blocked_devices'
                ? 'bg-[#D6B36A] text-[#0B0D10]'
                : 'text-[#9EA7B4] hover:text-[#F4F1EA]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Blocked Devices ({blockedDevices.length})</span>
          </button>
        </div>
      </div>

      {/* Session Security Safeguard Card */}
      <div className="bg-[#11151A] border border-[#252B33] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#F4F1EA]">Session Expiry & Inactivity Timeout Guard</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono font-bold">
                15m Limit / 2m Early Alert
              </span>
            </div>
            <p className="text-xs text-[#9EA7B4] mt-0.5">
              Protects unattended investor and admin sessions from unauthorized asset manipulation.
            </p>
          </div>
        </div>

        <button
          id="btn-admin-test-session-warning"
          onClick={() => window.dispatchEvent(new CustomEvent('trigger-session-warning-test'))}
          className="px-3.5 py-2 rounded-xl bg-[#171C22] hover:bg-[#1E2530] border border-[#2B3545] text-xs font-semibold text-[#D6B36A] flex items-center justify-center gap-1.5 transition active:scale-95 shrink-0"
        >
          <span>Test Session Modal</span>
        </button>
      </div>

      {activeSection === 'weak_passwords' ? (
        /* Weak Passwords Audit Table */
        <div className="space-y-4">
          <div className="bg-amber-950/20 border border-amber-800/30 p-4 rounded-xl flex items-start gap-3 text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              The automated credential heuristic scanner flags users who registered with common dictionary passwords, sequential numbers (123456), or repetitive characters. You can trigger forced resets before approving large withdrawals.
            </p>
          </div>

          <div className="bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#9EA7B4]">
                <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
                  <tr>
                    <th className="px-4 py-3">Investor Profile</th>
                    <th className="px-4 py-3">Risk Assessment</th>
                    <th className="px-4 py-3">Detected Vulnerability</th>
                    <th className="px-4 py-3">Wallet Capital</th>
                    <th className="px-4 py-3">Account Status</th>
                    <th className="px-4 py-3 text-right">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D232B]">
                  {weakPasswords.map((wp) => (
                    <tr key={wp.id} className="hover:bg-[#151A21] transition">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-[#F4F1EA] text-xs">{wp.username}</div>
                        <span className="text-[10px] text-[#7F8792] font-mono block">{wp.mobile}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            wp.riskLevel === 'CRITICAL'
                              ? 'bg-rose-950/70 text-rose-400 border border-rose-800/40'
                              : 'bg-amber-950/70 text-amber-400 border border-amber-800/40'
                          }`}
                        >
                          {wp.riskLevel}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs text-rose-300 bg-rose-950/30 px-2 py-0.5 rounded border border-rose-900/40">
                          {wp.weakReason}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 font-mono font-bold text-emerald-400 text-xs">
                        Rs {wp.balance.toLocaleString()}
                      </td>

                      <td className="px-4 py-3.5">
                        {wp.forceResetRequired ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-800/40">
                            Reset Mandated
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400">
                            Active Session
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-right space-x-2">
                        <button
                          onClick={() => adminLoginAsUser(wp.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#252014] hover:bg-[#342B1A] text-[#D6B36A] border border-[#D6B36A]/40 text-xs font-bold transition inline-flex items-center gap-1 active:scale-95 shadow-sm"
                          title="Login as this investor to inspect credentials & activity"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Login As</span>
                        </button>
                        <button
                          onClick={() => adminForceResetPassword(wp.id)}
                          disabled={wp.forceResetRequired}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition ${
                            wp.forceResetRequired
                              ? 'bg-[#181E27] text-[#636C78] cursor-not-allowed'
                              : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50 shadow-sm'
                          }`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{wp.forceResetRequired ? 'Reset Enforced' : 'Force Reset'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Blocked Devices / IP Blacklist */
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowBlockModal(true)}
              className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/50 text-rose-300 font-bold text-xs flex items-center gap-1.5 shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Blacklist New Device / IP</span>
            </button>
          </div>

          <div className="bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#9EA7B4]">
                <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
                  <tr>
                    <th className="px-4 py-3">IP Address / Fingerprint</th>
                    <th className="px-4 py-3">Reason for Blacklist</th>
                    <th className="px-4 py-3">Associated Account</th>
                    <th className="px-4 py-3">Device Client</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D232B]">
                  {blockedDevices.map((dev) => (
                    <tr key={dev.id} className="hover:bg-[#151A21] transition">
                      <td className="px-4 py-3.5">
                        <div className="font-mono font-bold text-[#F4F1EA] text-xs flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-rose-400" />
                          <span>{dev.ipAddress}</span>
                        </div>
                        <span className="text-[10px] text-[#7F8792] font-mono block truncate max-w-[180px]">
                          {dev.deviceFingerprint}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="text-rose-300 font-medium">{dev.reason}</span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs text-[#D6B36A]">
                          {dev.associatedUsername || 'Guest / Multiple'}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-[11px] text-[#7F8792] max-w-xs truncate">
                        {dev.userAgent}
                      </td>

                      <td className="px-4 py-3.5 text-[11px] text-[#7F8792] font-mono">
                        {dev.blockedAt}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => adminUnblockDevice(dev.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#181E27] text-xs font-bold text-emerald-400 hover:bg-[#202732] transition"
                        >
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Device Blacklist Modal */}
          {showBlockModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
              <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
                <button
                  onClick={() => setShowBlockModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Blacklist Device or IP</h3>
                <p className="text-xs text-[#7F8792] mb-4">Block incoming connections and account creation.</p>

                <form onSubmit={handleBlockSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">IP Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 182.185.22.91"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Blacklist Reason</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sybil referral farming / Fake deposit receipts"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Associated Username (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. multi_bot_user"
                      value={associatedUsername}
                      onChange={(e) => setAssociatedUsername(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBlockModal(false)}
                      className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-rose-950/90 hover:bg-rose-900 border border-rose-800/60 text-rose-200 font-bold text-xs shadow-md"
                    >
                      Blacklist Device
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
