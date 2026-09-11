import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Sliders, 
  Package, 
  History, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Lock, 
  ShieldCheck, 
  ShieldAlert, 
  ExternalLink, 
  LogOut, 
  Search, 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CreditCard, 
  Image as ImageIcon,
  DollarSign,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  Palette,
  Apple,
  Command,
  Layers,
  Award,
  Disc,
  Coins,
  KeyRound,
  FileCheck2,
  FolderTree,
  Receipt,
  Building2,
  Bell,
  Clock,
  LayoutDashboard,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Smartphone,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InvestmentPlan, SystemSettings, User } from '../types';
import { PrimeInvestLogo } from '../components/PrimeInvestLogo';

// Sub-components for new features
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { DistributeProfitModal } from '../components/admin/DistributeProfitModal';
import { LoginAsUserModal } from '../components/admin/LoginAsUserModal';
import { AdminMembersTab } from '../components/admin/AdminMembersTab';
import { CurrencyAccountsTab } from '../components/admin/CurrencyAccountsTab';
import { PackageCategoriesTab } from '../components/admin/PackageCategoriesTab';
import { TaskRewardsTab } from '../components/admin/TaskRewardsTab';
import { WeeklySalaryTab } from '../components/admin/WeeklySalaryTab';
import { ExpensesTab } from '../components/admin/ExpensesTab';
import { WithdrawSlabsTab } from '../components/admin/WithdrawSlabsTab';
import { SecurityAuditTab } from '../components/admin/SecurityAuditTab';

export function AdminView() {
  const {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    deposits,
    withdrawals,
    users,
    plans,
    userPlans,
    transactions,
    settings,
    isDbConnected,
    adminApproveDeposit,
    adminRejectDeposit,
    adminApproveWithdraw,
    adminRejectWithdraw,
    adminUpdateUserBalance,
    adminToggleUserStatus,
    adminUpdateSettings,
    adminUpdatePlan,
    adminAddPlan,
    adminDeletePlan,
    adminDistributeProfit,
    adminLoginAsUser,
    adminSetUserReferral,
    adminFactoryReset,
    setCurrentView,
    showToast,
  } = useApp();

  const isLight = true;

  // Navigation & Layout State
  const [currentTab, setCurrentTab] = useState<AdminTab>('DASHBOARD');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDistributeModal, setShowDistributeModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [showLoginAsModal, setShowLoginAsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAllMetrics, setShowAllMetrics] = useState(false);
  const [editRefUser, setEditRefUser] = useState<User | null>(null);
  const [newRefInput, setNewRefInput] = useState('');
  const [savingRef, setSavingRef] = useState(false);
  const [selectedMetricModal, setSelectedMetricModal] = useState<{
    id: string;
    title: string;
    value: string;
    tabTarget: AdminTab;
    category: string;
    description: string;
    formula?: string;
    actionLabel: string;
    bg: string;
    border: string;
    textColor: string;
    labelColor: string;
  } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll smoothly to top whenever currentTab changes
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 240) {
      if (!showScrollTop) setShowScrollTop(true);
    } else {
      if (showScrollTop) setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login Form
  const [adminUsername, setAdminUsername] = useState('admin19@hsdhgabv');
  const [adminPassword, setAdminPassword] = useState('admin@75732');
  const [authKey, setAuthKey] = useState('');

  // Tables Search & Filters
  const [searchUser, setSearchUser] = useState('');
  const [searchTx, setSearchTx] = useState('');
  const [filterTxType, setFilterTxType] = useState<string>('ALL');

  // Modals state
  const [selectedProofImg, setSelectedProofImg] = useState<string | null>(null);
  const [rejectDepositId, setRejectDepositId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [balanceModalUser, setBalanceModalUser] = useState<User | null>(null);
  const [balanceAmount, setBalanceAmount] = useState('');
  const [balanceType, setBalanceType] = useState<'add' | 'deduct'>('add');
  const [balanceNote, setBalanceNote] = useState('');

  // Settings form state
  const [editSettings, setEditSettings] = useState<SystemSettings>(settings);

  useEffect(() => {
    setEditSettings(settings);
  }, [settings]);

  // Plan edit and add modal state
  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 1000,
    dailyEarning: 80,
    totalEarning: 4800,
    durationDays: 60,
    icon: 'TrendingUp',
    badge: 'NEW TIER',
    popular: false,
    color: 'from-blue-600 to-cyan-500',
    features: 'Daily Automated ROI, Instant Gateway Payouts, 24/7 Capital Security',
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Logo file must be under 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditSettings((prev) => ({ ...prev, logoUrl: reader.result as string }));
          showToast('Custom logo loaded! Click "Save System Settings" to apply.', 'info');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // If not authenticated, show secure admin login with the new route
  if (!isAdminAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 text-[#3C3024]">
        <div className="w-full max-w-md rounded-2xl bg-white border border-[#EADCC9] p-6 sm:p-8 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D09009] font-mono">
              /controlcentersarmayadmin5arm7a
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3C3024] mt-1">
              {settings?.siteName || 'Sikka Poultry Farm'} Staff Console
            </h2>
            <p className="text-xs text-[#8C7A6B] mt-1">
              Restricted administrative portal. Enter master access key to proceed.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Support password or key directly
              adminLogin(adminPassword || authKey || adminUsername);
            }}
            className="space-y-3 pt-2"
          >
            <div className="relative">
              <UserCheck className="absolute left-3.5 top-3 w-4 h-4 text-[#D09009]" />
              <input
                type="text"
                placeholder="Username / Staff ID"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs font-mono placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#D09009]"
                required
              />
            </div>

            <div className="relative">
              <ShieldCheck className="absolute left-3.5 top-3 w-4 h-4 text-[#D09009]" />
              <input
                type="password"
                placeholder="Enter Staff Password / Key"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs font-mono placeholder:text-[#8C7A6B] focus:outline-none focus:border-[#D09009]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:brightness-105 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition"
            >
              Sign In to ViserAdmin Console
            </button>
          </form>

          {/* Quick Click Credentials */}
          <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-left text-[11px] text-[#8C7A6B] space-y-2">
            <span className="font-semibold flex items-center gap-1 text-[#D09009]">
              <ShieldAlert className="w-3.5 h-3.5" /> Quick Access Credentials:
            </span>
            <div className="flex gap-1.5 flex-wrap font-mono text-[10px]">
              <button
                type="button"
                onClick={() => {
                  setAdminUsername('admin19@hsdhgabv');
                  setAdminPassword('admin@75732');
                  adminLogin('admin@75732');
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#D09009]/40 text-[#D09009] hover:bg-[#FEF8E8] transition font-bold"
              >
                1-Click Sign In (admin19@hsdhgabv / admin@75732)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdminUsername('admin');
                  setAdminPassword('admin123');
                  adminLogin('admin123');
                }}
                className="px-2 py-1 rounded-lg bg-white border border-[#EADCC9] text-[#D09009] hover:bg-[#FEF8E8] transition"
              >
                admin / admin123
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              className="text-xs text-[#8C7A6B] hover:text-[#3C3024]"
            >
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Real-time Live Metrics Calculations ---
  const pendingDeposits = deposits.filter((d) => d.status === 'pending');
  const approvedDeposits = deposits.filter((d) => d.status === 'approved');
  const rejectedDeposits = deposits.filter((d) => d.status === 'rejected');
  const actualDepositSum = approvedDeposits.reduce((s, d) => s + (d.amount || 0), 0);
  const pendingDepositSum = pendingDeposits.reduce((s, d) => s + (d.amount || 0), 0);
  const canceledDepositsSum = rejectedDeposits.reduce((s, d) => s + (d.amount || 0), 0);

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'pending');
  const approvedWithdrawals = withdrawals.filter((w) => w.status === 'approved');
  const rejectedWithdrawals = withdrawals.filter((w) => w.status === 'rejected');
  const actualWithdrawSum = approvedWithdrawals.reduce((s, w) => s + (w.amount || 0), 0);
  const pendingWithdrawSum = pendingWithdrawals.reduce((s, w) => s + (w.amount || 0), 0);
  const rejectedWithdrawSum = rejectedWithdrawals.reduce((s, w) => s + (w.amount || 0), 0);

  // Today time boundaries for day-specific calculations
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayTimestamp = todayStart.getTime();

  const isDateToday = (dateStr?: string) => {
    if (!dateStr) return false;
    const t = new Date(dateStr).getTime();
    return !isNaN(t) && t >= todayTimestamp;
  };

  const isReferredUser = (ref?: string) => {
    if (!ref) return false;
    const clean = ref.trim().toLowerCase();
    return (
      clean !== '' &&
      clean !== 'direct' &&
      clean !== 'direct user' &&
      clean !== 'direct registration' &&
      clean !== 'none' &&
      clean !== 'direct-user'
    );
  };

  // 1. Total Users
  const totalUsersCount = users.length;

  // 2. Total Invested across all user plan purchases
  const totalInvestSum = userPlans.reduce((s, p) => s + (p.price || 0), 0);

  // 3. Unique Investment Users
  const uniqueInvestmentUsersCount = new Set(userPlans.map((p) => p.userId)).size;

  // 4. Users joined today
  const todayJoinCount = users.filter((u) => isDateToday(u.createdAt)).length;

  // 5. Plans activated today
  const todayInvestCount = userPlans.filter((p) => isDateToday(p.startDate)).length;

  // 6. Capital invested today
  const todayInvestedAmount = userPlans
    .filter((p) => isDateToday(p.startDate))
    .reduce((s, p) => s + (p.price || 0), 0);

  // 7. Withdrawals disbursed today
  const todayWithdrawAmount = withdrawals
    .filter((w) => w.status === 'approved' && isDateToday(w.createdAt))
    .reduce((s, w) => s + (w.amount || 0), 0);

  // 8. Today profit: Today approved deposits - (today approved withdrawals + today ROI/commission distributed)
  const todayApprovedDepositAmount = deposits
    .filter((d) => d.status === 'approved' && isDateToday(d.createdAt))
    .reduce((s, d) => s + (d.amount || 0), 0);

  const todayDistributedYield = transactions
    .filter((tx) => (tx.type === 'profit' || tx.type === 'commission') && isDateToday(tx.createdAt))
    .reduce((s, tx) => s + (tx.amount || 0), 0);

  const todayProfit = todayApprovedDepositAmount - (todayWithdrawAmount + todayDistributedYield);

  // 9. Total active packages running
  const totalRunningPackages = userPlans.filter((p) => p.status === 'active').length;

  // 10. Referrals
  const totalReferralsCount = users.filter((u) => isReferredUser(u.referralBy)).length;

  // 11. Active referrals
  const activeReferralsCount = users.filter((u) => {
    if (!isReferredUser(u.referralBy)) return false;
    return (u.balance || 0) > 0 || (u.totalDeposit || 0) > 0 || userPlans.some((p) => p.userId === u.id);
  }).length;

  // 12. Total referral commissions paid
  const totalCommissionFromTx = transactions
    .filter((tx) => tx.type === 'commission')
    .reduce((s, tx) => s + (tx.amount || 0), 0);
  const totalCommissionFromUsers = users.reduce((s, u) => s + (u.teamCommission || 0), 0);
  const totalReferralCommission = Math.max(totalCommissionFromTx, totalCommissionFromUsers);

  // 13. Total deposits from referred users
  const referredUserIds = new Set(users.filter((u) => isReferredUser(u.referralBy)).map((u) => u.id));
  const referredUsernames = new Set(users.filter((u) => isReferredUser(u.referralBy)).map((u) => u.username.toLowerCase()));
  const totalReferralDeposits = deposits
    .filter((d) => d.status === 'approved' && (referredUserIds.has(d.userId) || (d.username && referredUsernames.has(d.username.toLowerCase()))))
    .reduce((s, d) => s + (d.amount || 0), 0);

  // 14. Active members
  const activeMembersCount = users.filter((u) => {
    return (u.balance || 0) > 0 || (u.totalDeposit || 0) > 0 || userPlans.some((p) => p.userId === u.id);
  }).length;

  // Live real metrics calculated directly from database records
  const statCards: Array<{
    id: string;
    title: string;
    value: string;
    tabTarget: AdminTab;
    category: string;
    icon: any;
    description: string;
    formula?: string;
    actionLabel: string;
    stripeColor: string;
    iconBg: string;
    iconColor: string;
  }> = [
    {
      id: 'c1',
      title: 'Total Users',
      value: totalUsersCount.toLocaleString(),
      tabTarget: 'USERS',
      category: 'Investor Base',
      icon: Users,
      description: 'Total registered user accounts across regular investors, VIPs, and affiliate partners.',
      formula: 'Live Registered Users count in database',
      actionLabel: 'Manage All Users',
      stripeColor: 'from-pink-500 to-purple-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c2',
      title: 'Deposit Request',
      value: `Rs${pendingDepositSum.toLocaleString()}`,
      tabTarget: 'DEPOSITS',
      category: 'Cash Inflow',
      icon: Receipt,
      description: 'Pending investor deposit slip proofs awaiting admin verification.',
      formula: 'Sum of Deposits with status = "pending"',
      actionLabel: 'Verify Deposits',
      stripeColor: 'from-pink-500 to-rose-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c3',
      title: 'Withdraw Request Count',
      value: pendingWithdrawals.length.toLocaleString(),
      tabTarget: 'WITHDRAWALS',
      category: 'Payout Queue',
      icon: ArrowUpRight,
      description: 'Total investor withdrawal payout requests in queue.',
      formula: 'Count of Withdrawals with status = "pending"',
      actionLabel: 'Process Withdrawals',
      stripeColor: 'from-pink-500 to-purple-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c4',
      title: 'Withdraw Request Amount',
      value: `Rs${pendingWithdrawSum.toLocaleString()}`,
      tabTarget: 'WITHDRAWALS',
      category: 'Payout Queue',
      icon: CreditCard,
      description: 'Total pending withdrawal balance requested by investors.',
      formula: 'Sum of Withdrawals with status = "pending"',
      actionLabel: 'Review Payouts',
      stripeColor: 'from-purple-500 to-indigo-500',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
    },
    {
      id: 'c5',
      title: 'Total Invest',
      value: `Rs${totalInvestSum.toLocaleString()}`,
      tabTarget: 'PACKAGES',
      category: 'Investment Capital',
      icon: DollarSign,
      description: 'Total cumulative capital invested into platform trading tiers.',
      formula: 'Sum of all active plan purchases in database',
      actionLabel: 'View Investments',
      stripeColor: 'from-purple-500 to-pink-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c6',
      title: 'Total Withdraw',
      value: `Rs${actualWithdrawSum.toLocaleString()}`,
      tabTarget: 'WITHDRAWALS',
      category: 'Payout Disbursals',
      icon: ArrowUpRight,
      description: 'Total lifetime withdrawal payouts dispatched to investors.',
      formula: 'Sum of all approved withdrawal transactions',
      actionLabel: 'Audit Payouts',
      stripeColor: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
    },
    {
      id: 'c7',
      title: 'Total Investment Users',
      value: uniqueInvestmentUsersCount.toLocaleString(),
      tabTarget: 'USERS',
      category: 'Investor Base',
      icon: UserCheck,
      description: 'Investors holding active plan contracts yielding ROI.',
      formula: 'Count of unique users with at least 1 investment plan',
      actionLabel: 'Filter Active Investors',
      stripeColor: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
    },
    {
      id: 'c8',
      title: 'Today Join User',
      value: todayJoinCount.toLocaleString(),
      tabTarget: 'USERS',
      category: 'Growth & Signups',
      icon: Users,
      description: 'New investor accounts registered today.',
      formula: 'Count of users created today',
      actionLabel: 'Inspect New Users',
      stripeColor: 'from-purple-500 to-pink-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c9',
      title: 'Today Invest Count',
      value: todayInvestCount.toLocaleString(),
      tabTarget: 'PACKAGES',
      category: 'Investment Plans',
      icon: Sparkles,
      description: 'New plan contracts activated today.',
      formula: 'Count of user plans activated today',
      actionLabel: 'View Active Plans',
      stripeColor: 'from-pink-500 to-purple-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c10',
      title: "Today's Invested",
      value: `Rs${todayInvestedAmount.toLocaleString()}`,
      tabTarget: 'PACKAGES',
      category: 'Investment Capital',
      icon: Coins,
      description: 'Capital invested in plans today.',
      formula: 'Sum of plan purchase prices today',
      actionLabel: 'Inspect Today Capital',
      stripeColor: 'from-purple-500 to-pink-500',
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-400',
    },
    {
      id: 'c11',
      title: "Today's Withdraw Amount",
      value: `Rs${todayWithdrawAmount.toLocaleString()}`,
      tabTarget: 'WITHDRAWALS',
      category: 'Payout Queue',
      icon: ArrowDownLeft,
      description: 'Withdrawals disbursed to investors today.',
      formula: 'Sum of approved withdrawals processed today',
      actionLabel: 'Audit Today Disbursals',
      stripeColor: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
    },
    {
      id: 'c12',
      title: 'Today Profit',
      value: `Rs ${todayProfit.toLocaleString()}`,
      tabTarget: 'TRANSACTIONS',
      category: 'Financial Yield',
      icon: TrendingUp,
      description: 'Calculated daily net trading return across all active investor pools.',
      formula: 'Approved Deposits Today - (Disbursed Withdrawals + Profit Yield Today)',
      actionLabel: 'View Ledger',
      stripeColor: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'c13',
      title: 'Total Running Packages',
      value: totalRunningPackages.toLocaleString(),
      tabTarget: 'PACKAGES',
      category: 'Investment Plans',
      icon: Package,
      description: 'Active financial contracts currently yielding daily ROI payouts.',
      formula: 'Count of active user package contracts',
      actionLabel: 'View Running Packages',
      stripeColor: 'from-sky-500 to-blue-500',
      iconBg: 'bg-sky-500/15',
      iconColor: 'text-sky-400',
    },
    {
      id: 'c14',
      title: 'Total Referrals',
      value: totalReferralsCount.toLocaleString(),
      tabTarget: 'USERS',
      category: 'Affiliate Network',
      icon: Users,
      description: 'Total investor invitations linked through multi-tier referral codes.',
      formula: 'Count of users with referred parent',
      actionLabel: 'View Referral Trees',
      stripeColor: 'from-sky-500 to-indigo-500',
      iconBg: 'bg-sky-500/15',
      iconColor: 'text-sky-400',
    },
    {
      id: 'c15',
      title: 'Active Referrals',
      value: activeReferralsCount.toLocaleString(),
      tabTarget: 'USERS',
      category: 'Affiliate Network',
      icon: UserCheck,
      description: 'Referred investors who have funded active wallets or invested in plans.',
      formula: 'Referred users with balance > 0 or active plans',
      actionLabel: 'Inspect Referrers',
      stripeColor: 'from-sky-500 to-indigo-500',
      iconBg: 'bg-sky-500/15',
      iconColor: 'text-sky-400',
    },
    {
      id: 'c16',
      title: 'Referral Commission',
      value: `Rs ${totalReferralCommission.toLocaleString()}`,
      tabTarget: 'TRANSACTIONS',
      category: 'Affiliate Network',
      icon: Award,
      description: 'Cumulative commission bonuses credited to affiliate sponsors.',
      formula: 'Sum of referral commissions paid',
      actionLabel: 'Commission Ledger',
      stripeColor: 'from-amber-500 to-yellow-500',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
    },
    {
      id: 'c17',
      title: 'Referral Deposits',
      value: `Rs ${totalReferralDeposits.toLocaleString()}`,
      tabTarget: 'TRANSACTIONS',
      category: 'Affiliate Network',
      icon: Receipt,
      description: 'Total deposit capital generated directly by affiliate referrals.',
      formula: 'Sum of deposits initiated by referred investors',
      actionLabel: 'Audit Referral Deposits',
      stripeColor: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
    },
    {
      id: 'c18',
      title: 'Canceled Deposits',
      value: `Rs ${canceledDepositsSum.toLocaleString()}`,
      tabTarget: 'DEPOSITS',
      category: 'Security & Audit',
      icon: XCircle,
      description: 'Total value of deposit requests rejected due to invalid slips.',
      formula: 'Sum of deposits with status = "rejected"',
      actionLabel: 'Audit Rejected Deposits',
      stripeColor: 'from-rose-500 to-red-600',
      iconBg: 'bg-rose-500/15',
      iconColor: 'text-rose-400',
    },
    {
      id: 'c19',
      title: 'Rejected Withdraw',
      value: `Rs ${rejectedWithdrawSum.toLocaleString()}`,
      tabTarget: 'WITHDRAWALS',
      category: 'Security & Audit',
      icon: AlertCircle,
      description: 'Total value of withdrawal requests rejected and refunded.',
      formula: 'Sum of withdrawals with status = "rejected"',
      actionLabel: 'Audit Rejected Payouts',
      stripeColor: 'from-rose-500 to-red-600',
      iconBg: 'bg-rose-500/15',
      iconColor: 'text-rose-400',
    },
    {
      id: 'c20',
      title: 'Active Members',
      value: activeMembersCount.toLocaleString(),
      tabTarget: 'USERS',
      category: 'Investor Base',
      icon: UserCheck,
      description: 'Investors currently holding non-zero wallet balances or active plans.',
      formula: 'Users where Balance > 0 OR ActivePlans > 0',
      actionLabel: 'Manage Active Members',
      stripeColor: 'from-amber-500 to-yellow-500',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
    },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminUpdateSettings(editSettings);
  };

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!balanceModalUser) return;
    const num = parseFloat(balanceAmount);
    if (isNaN(num) || num <= 0) {
      showToast('Enter a valid amount', 'error');
      return;
    }
    const delta = balanceType === 'add' ? num : -num;
    adminUpdateUserBalance(balanceModalUser.id, delta, balanceNote || 'Admin manual balance adjustment');
    setBalanceModalUser(null);
    setBalanceAmount('');
    setBalanceNote('');
  };

  const handleExecuteReset = async () => {
    if (resetConfirmText.trim().toUpperCase() !== 'RESET') {
      showToast('Please type RESET in the confirmation box to proceed.', 'error');
      return;
    }
    setIsResetting(true);
    try {
      const ok = await adminFactoryReset();
      if (ok) {
        setShowResetModal(false);
        setResetConfirmText('');
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="w-full h-screen h-[100dvh] max-h-[100dvh] flex flex-col font-sans transition-colors duration-200 overflow-hidden bg-[#FDFBF7] text-[#3C3024]">
      {/* Top Header Bar */}
      <AdminHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onOpenDistributeProfit={() => setShowDistributeModal(true)}
        onOpenSearch={() => setShowSearchModal(true)}
      />

      {/* Main Admin Body Area with Sidebar */}
      <div className="flex-1 min-h-0 flex overflow-hidden relative">
        <AdminSidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onOpenDistributeProfit={() => setShowDistributeModal(true)}
        />

        {/* Main Content Pane with Smooth 1-Finger Touch Scroll Container */}
        <main
          ref={scrollContainerRef}
          onScroll={handleContainerScroll}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden smooth-scroll touch-pan-y overscroll-y-contain p-3 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 pb-28 relative bg-[#FDFBF7] text-[#3C3024]"
        >
          {/* Mobile Horizontal Quick-Nav Strip */}
          <div className="lg:hidden w-full overflow-x-auto no-scrollbar touch-pan-x pb-1.5 -mx-1 px-1 flex items-center gap-2 sticky -top-3 sm:-top-5 backdrop-blur-md z-30 py-2 border-b bg-white/95 border-[#EADCC9]">
            {[
              { id: 'DASHBOARD' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
              { id: 'DEPOSITS' as AdminTab, label: 'Deposits', icon: ArrowDownLeft, badge: pendingDeposits.length },
              { id: 'WITHDRAWALS' as AdminTab, label: 'Withdrawals', icon: ArrowUpRight, badge: pendingWithdrawals.length },
              { id: 'USERS' as AdminTab, label: 'Investors', icon: Users },
              { id: 'TRANSACTIONS' as AdminTab, label: 'Ledger', icon: History },
              { id: 'CURRENCY_ACCOUNTS' as AdminTab, label: 'Banks', icon: CreditCard },
              { id: 'SETTINGS' as AdminTab, label: 'Settings', icon: Sliders },
              { id: 'PACKAGES' as AdminTab, label: 'Packages', icon: Package },
              { id: 'TASKS' as AdminTab, label: 'Tasks', icon: Award },
              { id: 'WITHDRAW_SLABS' as AdminTab, label: 'Slabs', icon: Layers },
              { id: 'EXPENSES' as AdminTab, label: 'Expenses', icon: DollarSign },
              { id: 'MEMBERS' as AdminTab, label: 'Staff', icon: ShieldCheck },
              { id: 'WEAK_PASSWORDS' as AdminTab, label: 'Security', icon: KeyRound },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition active:scale-95 ${
                    isActive
                      ? 'bg-[#D6B36A] text-[#0B0D10] shadow-md shadow-amber-950/40'
                      : 'bg-[#12161D] text-[#9EA7B4] border border-[#212730] hover:text-[#F4F1EA]'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isActive ? 'bg-[#0B0D10] text-[#D6B36A]' : 'bg-rose-500 text-white animate-pulse'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD VIEW                                                     */}
          {/* ========================================================================= */}
          {currentTab === 'DASHBOARD' && (
            <div className="space-y-5 sm:space-y-6">
              {/* Header Title & Breadcrumb matching screenshot */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-[#F4F1EA]'
                  }`}>
                    Dashboard
                  </h1>
                  <p className={`text-xs font-medium mt-0.5 ${
                    isLight ? 'text-slate-500' : 'text-[#7F8792]'
                  }`}>
                    Dashboard / Dashboard
                  </p>
                </div>
              </div>

              {/* Notification Action Banner matching screenshot with right-aligned chips */}
              <div className={`w-full rounded-2xl sm:rounded-3xl border p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm ${
                isLight ? 'bg-white border-slate-200/90' : 'bg-[#101622] border-[#212A3A]'
              }`}>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-800' : 'text-[#F4F1EA]'}`}>
                    Live Operational Stream
                  </span>
                  <span className={`text-[11px] hidden md:inline ${isLight ? 'text-slate-400' : 'text-[#7F8792]'}`}>
                    • Real-time investor queues
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end flex-wrap">
                  {/* Pending Deposits Notification Chip */}
                  <button
                    onClick={() => {
                      setCurrentTab('DEPOSITS');
                      showToast('Navigating to Pending Deposits Queue', 'info');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-rose-950/20 flex items-center gap-1.5 active:scale-95 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white/90" />
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Pending Deposits ({pendingDeposits.length})</span>
                  </button>

                  {/* Pending Withdraw Notification Chip */}
                  <button
                    onClick={() => {
                      setCurrentTab('WITHDRAWALS');
                      showToast('Navigating to Pending Withdrawals Queue', 'info');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs shadow-md shadow-amber-950/20 flex items-center gap-1.5 active:scale-95 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white/90" />
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Pending Withdraw ({pendingWithdrawals.length})</span>
                  </button>
                </div>
              </div>

              {/* 3-COLUMN METRICS GRID (Exact structure as screenshot) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {statCards.map((card) => {
                  const CardIcon = card.icon;
                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setCurrentTab(card.tabTarget);
                        showToast(`Opened ${card.title} (${card.tabTarget})`, 'info');
                      }}
                      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer p-5 flex items-center gap-4 active:scale-[0.98] ${
                        isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-sm hover:shadow-md'
                          : 'bg-[#101622] hover:bg-[#141C2B] border-[#212A3A] shadow-lg shadow-black/20 hover:border-[#D6B36A]/40'
                      }`}
                    >
                      {/* Left Accent Gradient Stripe */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${card.stripeColor}`} />

                      {/* Left Icon in Soft Pastel Container */}
                      <div className={`w-12 h-12 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner`}>
                        <CardIcon className="w-6 h-6" />
                      </div>

                      {/* Middle: Big Value & Subtitle */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-2xl sm:text-3xl font-black font-sans tracking-tight truncate ${
                          isLight ? 'text-slate-900' : 'text-[#F4F1EA]'
                        }`}>
                          {card.value}
                        </div>
                        <div className={`text-xs sm:text-sm font-semibold truncate mt-0.5 ${
                          isLight ? 'text-slate-500' : 'text-[#8A96A6]'
                        }`}>
                          {card.title}
                        </div>
                      </div>

                      {/* Hover Arrow Indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-1 text-[#D6B36A]">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Operational Shortcuts */}
              <div className="p-4 rounded-2xl bg-white border border-[#EADCC9] flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('WEAK_PASSWORDS');
                    showToast('Opening Security & Infrastructure Audit', 'info');
                  }}
                  className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer text-left"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-[#3C3024]">
                    Cloud Infrastructure Active ({users.length} Users Registered)
                  </span>
                  <span className="text-[10px] text-[#8C7A6B] underline">Audit Security</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setShowLoginAsModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#FEF8E8] border border-[#EADCC9] text-xs font-bold text-[#D09009] hover:bg-[#FDE8B3] transition flex items-center gap-1.5 active:scale-95 shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Login As User</span>
                  </button>
                  <button
                    onClick={() => setShowDistributeModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5 active:scale-95 shadow-xs"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Distribute Profit</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('DEPOSITS');
                      showToast('Opening Deposits Management', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-xs font-bold text-[#3C3024] hover:border-[#D09009] hover:bg-white transition active:scale-95"
                  >
                    Verify Deposits ({pendingDeposits.length})
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('WITHDRAWALS');
                      showToast('Opening Withdrawals Disbursals', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-xs font-bold text-[#3C3024] hover:border-[#D09009] hover:bg-white transition active:scale-95"
                  >
                    Review Withdrawals ({pendingWithdrawals.length})
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('CURRENCY_ACCOUNTS');
                      showToast('Opening Bank Accounts Settings', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-xs font-bold text-[#3C3024] hover:border-[#D09009] hover:bg-white transition active:scale-95"
                  >
                    Bank Accounts
                  </button>
                </div>
              </div>

              {/* Live Queues Preview: Pending Deposits & Pending Withdrawals */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Deposits Queue */}
                <div className="p-5 rounded-2xl bg-white border border-[#EADCC9] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-sm font-bold text-[#3C3024]">
                        Pending Deposits Verification ({pendingDeposits.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => setCurrentTab('DEPOSITS')}
                      className="text-xs text-[#D6B36A] font-bold hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  {pendingDeposits.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#636C78]">
                      All deposit proofs approved. No pending verifications in queue.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {pendingDeposits.slice(0, 4).map((dep) => (
                        <div
                          key={dep.id}
                          className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-[#3C3024] flex items-center gap-1.5">
                              <span>{dep.gateway}</span>
                              {dep.planId && (
                                <span className="px-1.5 py-0.5 rounded bg-[#FEF8E8] text-[#D09009] border border-[#EADCC9] text-[9px] font-bold">
                                  Plan: {plans.find((p) => p.id === dep.planId)?.name || 'Subscription'}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#8C7A6B] font-mono">
                              TxID: {dep.transactionId} ({dep.username || dep.userId})
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-[#15803D]">
                              Rs {dep.amount.toLocaleString()}
                            </span>
                            {dep.screenshotUrl && (
                              <button
                                onClick={() => setSelectedProofImg(dep.screenshotUrl || null)}
                                className="p-1 rounded bg-[#FEF8E8] text-[#D09009]"
                                title="View Receipt Screenshot"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => adminApproveDeposit(dep.id)}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setRejectDepositId(dep.id);
                                setRejectionReason('Invalid or duplicated receipt');
                              }}
                              className="px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold hover:bg-rose-100"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pending Withdrawals Queue */}
                <div className="p-5 rounded-2xl bg-white border border-[#EADCC9] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-5 h-5 text-rose-600" />
                      <h3 className="text-sm font-bold text-[#3C3024]">
                        Pending Withdrawals Disbursals ({pendingWithdrawals.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => setCurrentTab('WITHDRAWALS')}
                      className="text-xs text-[#D09009] font-bold hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  {pendingWithdrawals.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#8C7A6B]">
                      All withdrawal claims processed and disbursed.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {pendingWithdrawals.slice(0, 4).map((wd) => (
                        <div
                          key={wd.id}
                          className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-[#3C3024]">{wd.accountTitle}</div>
                            <span className="text-[10px] text-[#8C7A6B] font-mono">
                              {wd.gateway} • {wd.accountNumber}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-rose-700">
                              Rs {wd.amount.toLocaleString()}
                            </span>
                            <button
                              onClick={() => adminApproveWithdraw(wd.id)}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => adminRejectWithdraw(wd.id, 'Account details mismatch')}
                              className="px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold hover:bg-rose-100"
                            >
                              Reject & Refund
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: ADMIN MEMBERS                                                      */}
          {/* ========================================================================= */}
          {currentTab === 'MEMBERS' && <AdminMembersTab />}

          {/* ========================================================================= */}
          {/* TAB 3: PROJECT SETTING                                                    */}
          {/* ========================================================================= */}
          {currentTab === 'SETTINGS' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-[#EADCC9] shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center shadow-xs">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#3C3024]">Project Settings & Brand Controls</h2>
                  <p className="text-xs text-[#8C7A6B]">
                    Configure platform name, WhatsApp channels, withdrawal limits, notices, and features.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-[#EADCC9] space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-[#3C3024] border-b border-[#EADCC9] pb-2">
                    Brand & Communication
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Platform Brand Name</label>
                      <input
                        type="text"
                        value={editSettings.siteName}
                        onChange={(e) => setEditSettings({ ...editSettings, siteName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Brand Subtitle / Motto</label>
                      <input
                        type="text"
                        value={editSettings.siteSubtitle}
                        onChange={(e) => setEditSettings({ ...editSettings, siteSubtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Support WhatsApp</label>
                      <input
                        type="text"
                        value={editSettings.adminWhatsApp}
                        onChange={(e) => setEditSettings({ ...editSettings, adminWhatsApp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Community Telegram Channel</label>
                      <input
                        type="text"
                        value={editSettings.telegramSupport || ''}
                        onChange={(e) => setEditSettings({ ...editSettings, telegramSupport: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div>
                    <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Upload Brand Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="text-xs text-[#7F8792] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#1C232E] file:text-[#D6B36A] hover:file:bg-[#252E3D]"
                    />
                  </div>
                </div>

                {/* Platform Theme & Palette Manager */}
                <div className="p-6 rounded-2xl bg-white border border-[#EADCC9] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EADCC9] pb-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#3C3024] flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#D09009]" />
                        <span>Platform Theme & Visual Palette</span>
                      </h3>
                      <p className="text-[11px] text-[#8C7A6B]">
                        Active visual theme for investors and administrators (National Gold Warm Luxury Theme).
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-[#FEF8E8] text-[#D09009] border border-[#EADCC9] font-bold">
                      Active: NATIONAL GOLD
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] flex items-center justify-center text-white font-bold shadow-xs">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#3C3024]">National Gold Warm Luxury Palette</h4>
                        <p className="text-[11px] text-[#8C7A6B]">Ivory & cream background (#FDFBF7), rich gold gradients (#F5BE27 to #D09009), deep bronze typography (#3C3024).</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] text-xs font-bold font-mono">
                      Active System Theme
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#11151A] border border-[#252B33] space-y-4">
                  <h3 className="text-sm font-bold text-[#F4F1EA] border-b border-[#212730] pb-2">
                    Financial Boundaries & Toggles
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Min Deposit (PKR)</label>
                      <input
                        type="number"
                        value={editSettings.minDeposit}
                        onChange={(e) => setEditSettings({ ...editSettings, minDeposit: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Max Deposit (PKR)</label>
                      <input
                        type="number"
                        value={editSettings.maxDeposit}
                        onChange={(e) => setEditSettings({ ...editSettings, maxDeposit: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Min Withdraw (PKR)</label>
                      <input
                        type="number"
                        value={editSettings.minWithdraw}
                        onChange={(e) => setEditSettings({ ...editSettings, minWithdraw: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Withdraw Fee (%)</label>
                      <input
                        type="number"
                        value={editSettings.withdrawFeePercent}
                        onChange={(e) => setEditSettings({ ...editSettings, withdrawFeePercent: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Platform Global Notice Marquee</label>
                    <textarea
                      rows={2}
                      value={editSettings.noticeMarquee}
                      onChange={(e) => setEditSettings({ ...editSettings, noticeMarquee: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D6B36A]/20 transition"
                  >
                    Save System Settings
                  </button>
                </div>
              </form>

              {/* Danger Zone: Factory Reset & Complete Data Wipe */}
              <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                      <h3 className="text-sm font-bold text-rose-700 uppercase tracking-wider">
                        Danger Zone: Factory Reset & Database Wipe
                      </h3>
                    </div>
                    <p className="text-xs text-[#8C7A6B] max-w-2xl leading-relaxed">
                      Wipe all user profiles, deposits, withdrawals, transactions, active investment packages, and activity logs safely from both the live database and local storage. Package categories, pricing schemas, and admin settings remain intact.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setResetConfirmText('');
                      setShowResetModal(true);
                    }}
                    className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 transition flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    Factory Reset Database
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CURRENCY ACCOUNTS                                                  */}
          {/* ========================================================================= */}
          {currentTab === 'CURRENCY_ACCOUNTS' && <CurrencyAccountsTab />}

          {/* ========================================================================= */}
          {/* TAB 5: INVESTMENT PACKAGES                                                */}
          {/* ========================================================================= */}
          {currentTab === 'PACKAGES' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-5 rounded-2xl border border-[#252B33]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#F4F1EA]">Investment Plans ({plans.length})</h2>
                    <p className="text-xs text-[#7F8792]">
                      Manage pricing, daily yield rates, duration cycles, and tier visibility.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddPlanModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Plan</span>
                </button>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-2xl bg-[#11151A] border border-[#252B33] flex flex-col justify-between hover:border-[#353D4A] transition"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#1B222C] text-[#D6B36A] border border-[#303844]">
                          {plan.badge || 'ACTIVE TIER'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingPlan(plan)}
                            className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-[#D6B36A]"
                            title="Edit Plan"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => adminDeletePlan(plan.id)}
                            className="p-1.5 rounded-lg bg-[#181E27] text-[#9EA7B4] hover:text-rose-400"
                            title="Delete Plan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#F4F1EA] mb-1">{plan.name}</h3>
                      <div className="py-2 border-y border-[#212730] my-2">
                        <span className="text-[10px] text-[#7F8792] block">Capital Cost</span>
                        <div className="text-xl font-bold font-mono text-[#F4F1EA]">
                          Rs {plan.price.toLocaleString()}
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#9EA7B4] mb-4">
                        <div className="flex justify-between">
                          <span className="text-[#7F8792]">Daily Yield:</span>
                          <span className="font-mono font-bold text-emerald-400">
                            Rs {plan.dailyEarning.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#7F8792]">Total Return:</span>
                          <span className="font-mono font-bold text-[#F4F1EA]">
                            Rs {plan.totalEarning.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#7F8792]">Contract Duration:</span>
                          <span className="font-mono text-[#D6B36A]">{plan.durationDays} Days</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#212730] flex items-center justify-between text-[11px] text-[#636C78]">
                      <span>ID: {plan.id}</span>
                      <span className="text-emerald-400 font-semibold">● Active in Catalog</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: CATEGORIES                                                         */}
          {/* ========================================================================= */}
          {currentTab === 'CATEGORIES' && <PackageCategoriesTab />}

          {/* ========================================================================= */}
          {/* TAB 7: TASKS / REWARDS                                                    */}
          {/* ========================================================================= */}
          {currentTab === 'TASKS' && <TaskRewardsTab />}

          {/* ========================================================================= */}
          {/* TAB 8: WEEKLY SALARY                                                      */}
          {/* ========================================================================= */}
          {currentTab === 'WEEKLY_SALARY' && <WeeklySalaryTab initialSubTab="tiers" />}

          {/* ========================================================================= */}
          {/* TAB 9: SALARY CLAIMS                                                      */}
          {/* ========================================================================= */}
          {currentTab === 'SALARY_CLAIMS' && <WeeklySalaryTab initialSubTab="claims" />}

          {/* ========================================================================= */}
          {/* TAB 10: EXPENSES                                                          */}
          {/* ========================================================================= */}
          {currentTab === 'EXPENSES' && <ExpensesTab />}

          {/* ========================================================================= */}
          {/* TAB 11: WITHDRAW SLABS                                                    */}
          {/* ========================================================================= */}
          {currentTab === 'WITHDRAW_SLABS' && <WithdrawSlabsTab />}

          {/* ========================================================================= */}
          {/* TAB 14: WEAK PASSWORDS                                                    */}
          {/* ========================================================================= */}
          {currentTab === 'WEAK_PASSWORDS' && <SecurityAuditTab initialSection="weak_passwords" />}

          {/* ========================================================================= */}
          {/* TAB 15: BLOCKED DEVICES                                                   */}
          {/* ========================================================================= */}
          {currentTab === 'BLOCKED_DEVICES' && <SecurityAuditTab initialSection="blocked_devices" />}

          {/* ========================================================================= */}
          {/* TAB 16: DEPOSITS QUEUE                                                    */}
          {/* ========================================================================= */}
          {currentTab === 'DEPOSITS' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#11151A] p-4 sm:p-5 rounded-2xl border border-[#252B33]">
                <div className="flex items-center gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-emerald-400 flex items-center justify-center shadow-md flex-shrink-0">
                    <ArrowDownLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#F4F1EA]">Deposit Approvals Queue</h2>
                    <p className="text-xs text-[#7F8792]">
                      Manual verification of Easypaisa, JazzCash, and Bank transfer receipts.
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono font-bold text-emerald-400 self-start sm:self-auto">
                  {pendingDeposits.length} Pending Actions
                </div>
              </div>

              {/* Mobile Cards View (< md) */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {deposits.map((dep) => (
                  <div
                    key={dep.id}
                    className="p-4 rounded-xl bg-[#11151A] border border-[#252B33] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#F4F1EA] text-sm block">{dep.username || dep.userId}</span>
                        <span className="text-[10px] text-[#636C78] font-mono">{dep.id}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          dep.status === 'approved'
                            ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                            : dep.status === 'rejected'
                            ? 'bg-rose-950/70 text-rose-400 border border-rose-800/40'
                            : 'bg-amber-950/70 text-amber-400 border border-amber-800/40 animate-pulse'
                        }`}
                      >
                        {dep.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#161B22] p-2.5 rounded-lg border border-[#212730]">
                      <div>
                        <span className="text-[10px] text-[#7F8792] block">Amount</span>
                        <span className="font-mono font-bold text-emerald-400">Rs {dep.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7F8792] block">Gateway / TxID</span>
                        <span className="font-mono text-[11px] text-[#D6B36A] truncate block">{dep.gateway} • {dep.transactionId}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {dep.screenshotUrl ? (
                        <button
                          onClick={() => setSelectedProofImg(dep.screenshotUrl || null)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#181E27] hover:bg-[#222B38] text-[#D6B36A] border border-[#2A3442] flex items-center gap-1.5 text-xs font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Proof</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#636C78] italic">No receipt</span>
                      )}

                      {dep.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adminApproveDeposit(dep.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs shadow-sm active:scale-95"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setRejectDepositId(dep.id);
                              setRejectionReason('Invalid transaction ID or mismatched amount');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs active:scale-95"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#7F8792] font-mono">{dep.createdAt?.substring(0, 10)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (>= md) */}
              <div className="hidden md:block bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#9EA7B4]">
                    <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
                      <tr>
                        <th className="px-4 py-3">Investor</th>
                        <th className="px-4 py-3">Gateway & TxID</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Screenshot Proof</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Created</th>
                        <th className="px-4 py-3 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D232B]">
                      {deposits.map((dep) => (
                        <tr key={dep.id} className="hover:bg-[#151A21] transition">
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-[#F4F1EA] block">{dep.username || dep.userId}</span>
                            <span className="text-[10px] text-[#636C78] font-mono">{dep.id}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-semibold text-[#F4F1EA] block">{dep.gateway}</span>
                            <span className="text-[10px] text-[#D6B36A] font-mono">{dep.transactionId}</span>
                            {dep.planId && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                                Plan: {plans.find((p) => p.id === dep.planId)?.name || 'Subscription'}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 font-mono font-bold text-emerald-400 text-xs">
                            Rs {dep.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3.5">
                            {dep.screenshotUrl ? (
                              <button
                                onClick={() => setSelectedProofImg(dep.screenshotUrl || null)}
                                className="px-2.5 py-1 rounded-lg bg-[#181E27] hover:bg-[#222B38] text-[#D6B36A] border border-[#2A3442] flex items-center gap-1.5 transition"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Receipt</span>
                              </button>
                            ) : (
                              <span className="text-[10px] text-[#636C78] italic">No receipt</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                dep.status === 'approved'
                                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                                  : dep.status === 'rejected'
                                  ? 'bg-rose-950/70 text-rose-400 border border-rose-800/40'
                                  : 'bg-amber-950/70 text-amber-400 border border-amber-800/40 animate-pulse'
                              }`}
                            >
                              {dep.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-[#7F8792] font-mono text-[10px]">
                            {dep.createdAt?.substring(0, 10)}
                          </td>
                          <td className="px-4 py-3.5 text-right space-x-2">
                            {dep.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => adminApproveDeposit(dep.id)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs shadow-sm transition"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    setRejectDepositId(dep.id);
                                    setRejectionReason('Invalid transaction ID or mismatched amount');
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs transition"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-[#636C78]">Done</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 17: WITHDRAWALS QUEUE                                                 */}
          {/* ========================================================================= */}
          {currentTab === 'WITHDRAWALS' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#11151A] p-4 sm:p-5 rounded-2xl border border-[#252B33]">
                <div className="flex items-center gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-rose-400 flex items-center justify-center shadow-md flex-shrink-0">
                    <ArrowUpRight className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#F4F1EA]">Withdrawals Approvals Queue</h2>
                    <p className="text-xs text-[#7F8792]">
                      Direct payout transfers to investor Easypaisa, JazzCash, or bank accounts.
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono font-bold text-rose-400 self-start sm:self-auto">
                  {pendingWithdrawals.length} Pending Payouts
                </div>
              </div>

              {/* Mobile Cards View (< md) */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {withdrawals.map((wd) => (
                  <div
                    key={wd.id}
                    className="p-4 rounded-xl bg-[#11151A] border border-[#252B33] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#F4F1EA] text-sm block">{wd.username || wd.userId}</span>
                        <span className="text-[10px] text-[#636C78] font-mono">{wd.id}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          wd.status === 'approved'
                            ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                            : wd.status === 'rejected'
                            ? 'bg-rose-950/70 text-rose-400 border border-rose-800/40'
                            : 'bg-amber-950/70 text-amber-400 border border-amber-800/40 animate-pulse'
                        }`}
                      >
                        {wd.status}
                      </span>
                    </div>

                    <div className="bg-[#161B22] p-2.5 rounded-lg border border-[#212730] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#7F8792]">Beneficiary:</span>
                        <span className="font-semibold text-[#F4F1EA]">{wd.accountTitle}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7F8792]">Gateway & No:</span>
                        <span className="font-mono text-[#D6B36A]">{wd.gateway} • {wd.accountNumber}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-[#212730]">
                        <span className="text-[#7F8792]">Net Payout:</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          Rs {((wd.netAmount || wd.amount) || wd.amount).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {wd.status === 'pending' ? (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => adminApproveWithdraw(wd.id)}
                          className="flex-1 py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs shadow-sm active:scale-95 text-center"
                        >
                          Disburse
                        </button>
                        <button
                          onClick={() => adminRejectWithdraw(wd.id, 'Account detail mismatch')}
                          className="flex-1 py-2 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs active:scale-95 text-center"
                        >
                          Reject & Refund
                        </button>
                      </div>
                    ) : (
                      <div className="text-right text-[10px] text-[#7F8792] font-mono">
                        Settled on {wd.createdAt?.substring(0, 10)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Table View (>= md) */}
              <div className="hidden md:block bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#9EA7B4]">
                    <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
                      <tr>
                        <th className="px-4 py-3">Investor</th>
                        <th className="px-4 py-3">Receiving Account</th>
                        <th className="px-4 py-3">Gross Amount</th>
                        <th className="px-4 py-3">Net Payout</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Requested</th>
                        <th className="px-4 py-3 text-right">Approval Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D232B]">
                      {withdrawals.map((wd) => (
                        <tr key={wd.id} className="hover:bg-[#151A21] transition">
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-[#F4F1EA] block">{wd.username || wd.userId}</span>
                            <span className="text-[10px] text-[#636C78] font-mono">{wd.id}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-semibold text-[#F4F1EA] block">{wd.accountTitle}</span>
                            <span className="text-[10px] text-[#D6B36A] font-mono">
                              {wd.gateway} • {wd.accountNumber}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-mono font-bold text-rose-400 text-xs">
                            Rs {wd.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3.5 font-mono font-bold text-emerald-400 text-xs">
                            Rs {((wd.netAmount || wd.amount) || wd.amount).toLocaleString()}
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                wd.status === 'approved'
                                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/40'
                                  : wd.status === 'rejected'
                                  ? 'bg-rose-950/70 text-rose-400 border border-rose-800/40'
                                  : 'bg-amber-950/70 text-amber-400 border border-amber-800/40 animate-pulse'
                              }`}
                            >
                              {wd.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-[#7F8792] font-mono text-[10px]">
                            {wd.createdAt?.substring(0, 10)}
                          </td>
                          <td className="px-4 py-3.5 text-right space-x-2">
                            {wd.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => adminApproveWithdraw(wd.id)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-bold text-xs shadow-sm transition"
                                >
                                  Disburse
                                </button>
                                <button
                                  onClick={() => adminRejectWithdraw(wd.id, 'Account detail mismatch')}
                                  className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs transition"
                                >
                                  Reject & Refund
                                </button>
                              </>
                            ) : (
                              <span className="text-[10px] text-[#636C78]">Settled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 18: INVESTOR ACCOUNTS                                                 */}
          {/* ========================================================================= */}
          {currentTab === 'USERS' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-4 sm:p-5 rounded-2xl border border-[#252B33]">
                <div className="flex items-center gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md flex-shrink-0">
                    <Users className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#F4F1EA]">Investor Member Registry</h2>
                    <p className="text-xs text-[#7F8792]">
                      Audit user wallets, credit/debit balances, and manage account statuses.
                    </p>
                  </div>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#636C78] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by username/mobile..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] placeholder:text-[#636C78] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              {/* Mobile Cards View (< md) */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {users
                  .filter((u) =>
                    u.username.toLowerCase().includes(searchUser.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
                    (u.mobile && u.mobile.includes(searchUser))
                  )
                  .map((usr) => (
                    <div
                      key={usr.id}
                      className="p-4 rounded-xl bg-[#11151A] border border-[#252B33] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#F4F1EA] text-sm block">{usr.username}</span>
                          <span className="text-[10px] text-[#636C78] font-mono">{usr.id}</span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            usr.status === 'active'
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                              : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                          }`}
                        >
                          {usr.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-[#161B22] p-2.5 rounded-lg border border-[#212730]">
                        <div>
                          <span className="text-[10px] text-[#7F8792] block">Wallet Balance</span>
                          <span className="font-mono font-bold text-emerald-400">Rs {(usr.balance || 0).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#7F8792] block">Contact</span>
                          <span className="text-[#F4F1EA] truncate block">{usr.mobile || usr.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 gap-2">
                        <span className="text-[11px] text-[#D6B36A] font-mono">
                          Ref: {usr.referralBy || 'Direct'}
                        </span>

                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => adminLoginAsUser(usr.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#252014] hover:bg-[#342B1A] text-[#D6B36A] border border-[#D6B36A]/40 text-xs font-bold flex items-center gap-1 active:scale-95 transition"
                            title="Login as this investor"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Login As</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditRefUser(usr);
                              setNewRefInput(usr.referralBy || '');
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#181E27] hover:bg-[#222B38] text-[#D6B36A] border border-[#2D3644] text-xs font-bold active:scale-95"
                            title="Edit Referral Sponsor"
                          >
                            Edit Sponsor
                          </button>
                          <button
                            onClick={() => {
                              setBalanceModalUser(usr);
                              setBalanceAmount('');
                              setBalanceNote('');
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#181E27] hover:bg-[#222B38] text-[#D6B36A] border border-[#2D3644] text-xs font-bold active:scale-95"
                          >
                            ± Balance
                          </button>
                          <button
                            onClick={() => adminToggleUserStatus(usr.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border active:scale-95 transition ${
                              usr.status === 'active'
                                ? 'bg-rose-950/40 text-rose-400 border-rose-800/40 hover:bg-rose-900/60'
                                : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/60'
                            }`}
                          >
                            {usr.status === 'active' ? 'Block' : 'Unblock'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Desktop Table View (>= md) */}
              <div className="hidden md:block bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#9EA7B4]">
                    <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
                      <tr>
                        <th className="px-4 py-3">Member</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Wallet Balance</th>
                        <th className="px-4 py-3">Referral By</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D232B]">
                      {users
                        .filter((u) =>
                          u.username.toLowerCase().includes(searchUser.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
                          (u.mobile && u.mobile.includes(searchUser))
                        )
                        .map((usr) => (
                          <tr key={usr.id} className="hover:bg-[#151A21] transition">
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-[#F4F1EA] text-xs">{usr.username}</div>
                              <span className="text-[10px] text-[#636C78] font-mono">{usr.id}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-[#F4F1EA] block">{usr.email}</span>
                              <span className="text-[10px] text-[#7F8792] font-mono">{usr.mobile}</span>
                            </td>
                            <td className="px-4 py-3.5 font-mono font-bold text-emerald-400 text-xs">
                              Rs {(usr.balance || 0).toLocaleString()}
                            </td>
                            <td className="px-4 py-3.5 font-mono text-xs text-[#D6B36A]">
                              {usr.referralBy || 'Direct'}
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  usr.status === 'active'
                                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                                    : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                                }`}
                              >
                                {usr.status}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-right space-x-2">
                              <button
                                onClick={() => adminLoginAsUser(usr.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#252014] hover:bg-[#342B1A] text-[#D6B36A] border border-[#D6B36A]/40 text-xs font-bold transition inline-flex items-center gap-1 active:scale-95 shadow-sm"
                                title="Login as this investor"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Login As</span>
                              </button>
                              <button
                                onClick={() => {
                                  setEditRefUser(usr);
                                  setNewRefInput(usr.referralBy || '');
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-[#181E27] hover:bg-[#222B38] text-[#D6B36A] border border-[#2D3644] text-xs font-bold transition"
                                title="Edit Referral Sponsor"
                              >
                                Sponsor
                              </button>
                              <button
                                onClick={() => {
                                  setBalanceModalUser(usr);
                                  setBalanceAmount('');
                                  setBalanceNote('');
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-[#181E27] hover:bg-[#222B38] text-[#D6B36A] border border-[#2D3644] text-xs font-bold transition"
                              >
                                ± Balance
                              </button>
                              <button
                                onClick={() => adminToggleUserStatus(usr.id)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition ${
                                  usr.status === 'active'
                                    ? 'bg-rose-950/40 text-rose-400 border-rose-800/40 hover:bg-rose-900/60'
                                    : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/60'
                                }`}
                              >
                                {usr.status === 'active' ? 'Block' : 'Unblock'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 19: TRANSACTIONS LEDGER                                               */}
          {/* ========================================================================= */}
          {currentTab === 'TRANSACTIONS' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#11151A] p-4 sm:p-5 rounded-2xl border border-[#252B33]">
                <div className="flex items-center gap-3">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center shadow-md flex-shrink-0">
                    <History className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#F4F1EA]">Platform Audit Ledger</h2>
                    <p className="text-xs text-[#7F8792]">
                      Immutable financial logs covering all ROI distributions, deposits, and payouts.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTx}
                    onChange={(e) => setSearchTx(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] placeholder:text-[#636C78] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              {/* Mobile Cards View (< md) */}
              <div className="grid grid-cols-1 gap-2.5 md:hidden">
                {transactions
                  .filter((tx) =>
                    tx.id.toLowerCase().includes(searchTx.toLowerCase()) ||
                    tx.description.toLowerCase().includes(searchTx.toLowerCase()) ||
                    tx.type.toLowerCase().includes(searchTx.toLowerCase())
                  )
                  .slice(0, 30)
                  .map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-xl bg-[#11151A] border border-[#252B33] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#D6B36A]">{tx.id}</span>
                        <span className="font-mono text-[10px] uppercase text-sky-400 bg-sky-950/40 px-2 py-0.5 rounded border border-sky-800/30">
                          {tx.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#F4F1EA]">{tx.username || tx.userId}</span>
                        <span className="font-mono font-bold text-[#F4F1EA] text-xs">
                          Rs {tx.amount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9EA7B4] leading-relaxed">{tx.description}</p>
                      <div className="text-[10px] text-[#7F8792] font-mono text-right">
                        {tx.createdAt?.replace('T', ' ').substring(0, 16)}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Desktop Table View (>= md) */}
              <div className="hidden md:block bg-[#11151A] rounded-2xl border border-[#252B33] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#9EA7B4]">
                    <thead className="bg-[#171C22] text-[#7F8792] uppercase font-mono text-[10px] border-b border-[#252B33]">
                      <tr>
                        <th className="px-4 py-3">TxID</th>
                        <th className="px-4 py-3">Account</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D232B]">
                      {transactions
                        .filter((tx) =>
                          tx.id.toLowerCase().includes(searchTx.toLowerCase()) ||
                          tx.description.toLowerCase().includes(searchTx.toLowerCase()) ||
                          tx.type.toLowerCase().includes(searchTx.toLowerCase())
                        )
                        .slice(0, 50)
                        .map((tx) => (
                          <tr key={tx.id} className="hover:bg-[#151A21] transition">
                            <td className="px-4 py-3 font-mono text-[10px] text-[#D6B36A]">{tx.id}</td>
                            <td className="px-4 py-3 font-medium text-[#F4F1EA]">{tx.username || tx.userId}</td>
                            <td className="px-4 py-3 font-mono text-[10px] uppercase text-sky-400">{tx.type}</td>
                            <td className="px-4 py-3 text-xs text-[#9EA7B4]">{tx.description}</td>
                            <td className="px-4 py-3 font-mono font-bold text-[#F4F1EA]">
                              Rs {tx.amount.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-[#7F8792] font-mono text-[10px]">
                              {tx.createdAt?.replace('T', ' ').substring(0, 16)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Floating Back to Top Button */}
          {showScrollTop && (
            <button
              id="btn-admin-scroll-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#D6B36A] text-[#0B0D10] font-bold shadow-xl shadow-amber-950/40 hover:bg-[#E5C783] active:scale-95 transition-all duration-200 flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL MODALS                                                             */}
      {/* ========================================================================= */}

      {/* 1. Distribute Profit Modal */}
      <DistributeProfitModal
        isOpen={showDistributeModal}
        onClose={() => setShowDistributeModal(false)}
      />

      {/* 2. Receipt Screenshot Modal */}
      {selectedProofImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-w-lg w-full bg-[#11151A] rounded-2xl p-4 border border-[#252B33]">
            <button
              onClick={() => setSelectedProofImg(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#181E27] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-[#F4F1EA] mb-3">Deposit Payment Receipt</h3>
            <div className="rounded-xl overflow-hidden bg-black max-h-[70vh] flex items-center justify-center">
              <img
                src={selectedProofImg}
                alt="Deposit Proof"
                className="w-full object-contain max-h-[70vh]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Rejection Reason Modal */}
      {rejectDepositId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setRejectDepositId(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">Reject Deposit Request</h3>
            <p className="text-xs text-[#7F8792] mb-4">State the specific reason provided to the investor.</p>

            <div className="space-y-3">
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Transaction ID already claimed or payment screenshot unreadable..."
                className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectDepositId(null)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    adminRejectDeposit(rejectDepositId, rejectionReason);
                    setRejectDepositId(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 font-bold text-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Adjust User Balance Modal */}
      {balanceModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setBalanceModalUser(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-1">
              Adjust Balance: {balanceModalUser.username}
            </h3>
            <p className="text-xs text-[#7F8792] mb-4">
              Current Available Balance: <span className="font-mono text-emerald-400 font-bold">Rs {(balanceModalUser.balance || 0).toLocaleString()}</span>
            </p>

            <form onSubmit={handleAdjustBalance} className="space-y-3.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBalanceType('add')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                    balanceType === 'add'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                      : 'bg-[#161B22] text-[#7F8792] border-[#252B33]'
                  }`}
                >
                  + Credit (Add)
                </button>
                <button
                  type="button"
                  onClick={() => setBalanceType('deduct')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                    balanceType === 'deduct'
                      ? 'bg-rose-950 text-rose-300 border-rose-600'
                      : 'bg-[#161B22] text-[#7F8792] border-[#252B33]'
                  }`}
                >
                  - Debit (Deduct)
                </button>
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Amount (PKR)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5000"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Audit Log Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Leader referral incentive adjustment"
                  value={balanceNote}
                  onChange={(e) => setBalanceNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBalanceModalUser(null)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Apply Balance Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-3">Admin Master Search</h3>
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-[#636C78] absolute left-3 top-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search any user, transaction ID, bank account, or task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA] focus:outline-none focus:border-[#D6B36A]"
              />
            </div>

            <div className="text-[11px] text-[#7F8792] space-y-2">
              <span className="font-bold text-[#F4F1EA]">Quick Navigation:</span>
              <div className="flex flex-wrap gap-1.5">
                {(['DASHBOARD', 'MEMBERS', 'SETTINGS', 'CURRENCY_ACCOUNTS', 'PACKAGES', 'WEEKLY_SALARY', 'EXPENSES', 'SPINNER', 'WEAK_PASSWORDS'] as AdminTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setCurrentTab(tab);
                      setShowSearchModal(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#161B22] hover:bg-[#202732] border border-[#252B33] text-[#D6B36A]"
                  >
                    Go to {tab.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setEditingPlan(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-3">Edit Plan: {editingPlan.name}</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                adminUpdatePlan(editingPlan);
                setEditingPlan(null);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Daily ROI (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.dailyEarning}
                    onChange={(e) => setEditingPlan({ ...editingPlan, dailyEarning: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Total Target (PKR)</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.totalEarning}
                    onChange={(e) => setEditingPlan({ ...editingPlan, totalEarning: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={editingPlan.durationDays}
                    onChange={(e) => setEditingPlan({ ...editingPlan, durationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Add Plan Modal */}
      {showAddPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#0E1217] border border-[#252B33] p-6 text-[#F4F1EA] relative">
            <button
              onClick={() => setShowAddPlanModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#161B22] text-[#7F8792] hover:text-[#F4F1EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#F4F1EA] mb-3">Create New Investment Plan</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newPlan.name) return;
                adminAddPlan({
                  name: newPlan.name,
                  price: Number(newPlan.price),
                  dailyEarning: Number(newPlan.dailyEarning),
                  totalEarning: Number(newPlan.totalEarning),
                  durationDays: Number(newPlan.durationDays),
                  features: newPlan.features.split(',').map((s) => s.trim()),
                  badge: newPlan.badge,
                  popular: newPlan.popular,
                  color: newPlan.color,
                  icon: newPlan.icon,
                });
                setShowAddPlanModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Ultra Yield"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#F4F1EA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Daily Yield (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.dailyEarning}
                    onChange={(e) => setNewPlan({ ...newPlan, dailyEarning: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Total Target (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.totalEarning}
                    onChange={(e) => setNewPlan({ ...newPlan, totalEarning: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7F8792] font-semibold block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.durationDays}
                    onChange={(e) => setNewPlan({ ...newPlan, durationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161B22] border border-[#252B33] text-xs font-mono text-[#F4F1EA]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlanModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161B22] text-xs font-bold text-[#7F8792]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* METRIC DETAIL INSPECTOR MODAL */}
      {selectedMetricModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#11151A] border border-[#252B33] rounded-3xl p-6 space-y-5 shadow-2xl shadow-black relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#252B33] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#161B22] border border-[#2B3545] text-[#D6B36A] text-[10px] font-mono font-bold uppercase">
                  {selectedMetricModal.category}
                </span>
                <span className="text-xs text-[#7F8792] font-mono">
                  ID: {selectedMetricModal.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedMetricModal(null)}
                className="w-7 h-7 rounded-full bg-[#161B22] hover:bg-[#1E2530] text-[#9EA7B4] hover:text-[#F4F1EA] flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border ${selectedMetricModal.bg} ${selectedMetricModal.border} space-y-1`}>
              <div className="text-xs font-medium text-white/70">
                {selectedMetricModal.title}
              </div>
              <div className={`text-2xl sm:text-3xl font-bold font-mono ${selectedMetricModal.textColor}`}>
                {selectedMetricModal.value}
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#7F8792] block mb-1">
                  Operational Description
                </label>
                <p className="text-[#F4F1EA] leading-relaxed bg-[#161B22] p-3 rounded-xl border border-[#252B33]">
                  {selectedMetricModal.description}
                </p>
              </div>

              {selectedMetricModal.formula && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#7F8792] block mb-1">
                    Calculation Logic & Origin
                  </label>
                  <p className="text-[#D6B36A] font-mono text-[11px] bg-[#0E1116] p-2.5 rounded-xl border border-[#1F2630]">
                    {selectedMetricModal.formula}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setSelectedMetricModal(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#161B22] hover:bg-[#1E2530] text-xs font-bold text-[#7F8792] hover:text-[#F4F1EA] transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = selectedMetricModal.tabTarget;
                  setSelectedMetricModal(null);
                  setCurrentTab(target);
                  showToast(`Navigated to ${selectedMetricModal.actionLabel}`, 'info');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>{selectedMetricModal.actionLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login As User Quick Impersonation Selector Modal */}
      {showLoginAsModal && (
        <LoginAsUserModal onClose={() => setShowLoginAsModal(false)} />
      )}

      {/* Edit User Referral Sponsor Modal */}
      {editRefUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-[#11151A] border border-[#252B33] p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#171C22] border border-[#343B45] text-[#D6B36A] flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F4F1EA]">Assign / Edit Sponsor</h3>
                  <p className="text-xs text-[#7F8792]">Investor: @{editRefUser.username}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditRefUser(null)}
                className="text-[#7F8792] hover:text-[#F4F1EA] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#161B22] border border-[#252B33] text-xs space-y-1">
              <span className="text-[10px] text-[#7F8792] uppercase font-bold block">Current Sponsor Upliner</span>
              <span className="font-mono text-[#D6B36A] font-bold text-sm block">
                {editRefUser.referralBy || 'Direct User (No Sponsor)'}
              </span>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSavingRef(true);
                await adminSetUserReferral(editRefUser.id, newRefInput.trim());
                setSavingRef(false);
                setEditRefUser(null);
              }}
              className="space-y-3"
            >
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#7F8792] uppercase tracking-wider block">
                  New Sponsor Username or 'Direct User'
                </label>
                <input
                  type="text"
                  placeholder="e.g. adnansanghri41 or Direct User"
                  value={newRefInput}
                  onChange={(e) => setNewRefInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#252B33] text-[#F4F1EA] text-xs font-mono focus:outline-none focus:border-[#D6B36A]"
                  required
                />
                <p className="text-[10px] text-[#7F8792]">
                  Entering a valid username links this user under that sponsor, transferring or updating network volume and team counts.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditRefUser(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#161B22] border border-[#252B33] text-xs text-[#7F8792] hover:text-[#F4F1EA] font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingRef}
                  className="flex-1 py-2.5 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] text-xs font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {savingRef ? 'Saving...' : 'Update Sponsor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Factory Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-white border border-rose-200 p-6 text-[#3C3024] shadow-2xl relative space-y-4">
            <button
              onClick={() => !isResetting && setShowResetModal(false)}
              disabled={isResetting}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#8C7A6B] hover:text-[#3C3024] transition disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#3C3024]">Confirm Factory Reset & Data Wipe</h3>
              <p className="text-xs text-[#8C7A6B] mt-1">
                You are about to execute a complete data purge on the live database.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1.5">
              <span className="font-bold block">The following data will be permanently deleted:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-700">
                <li>All registered user & investor profiles</li>
                <li>All deposit records and transaction slips</li>
                <li>All withdrawal requests and financial history</li>
                <li>All active user investment plans</li>
                <li>All dummy logs, expenses, salary claims, and security audits</li>
              </ul>
              <span className="text-[10px] text-rose-600 italic block pt-1">
                Note: Plan definitions, categories, and site settings will be preserved.
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3C3024] block">
                Type <span className="font-mono font-bold text-rose-600">RESET</span> to confirm:
              </label>
              <input
                type="text"
                placeholder="RESET"
                value={resetConfirmText}
                disabled={isResetting}
                onChange={(e) => setResetConfirmText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs font-mono font-bold text-[#3C3024] focus:outline-none focus:border-rose-500 uppercase tracking-widest disabled:opacity-50"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="flex-1 py-2.5 rounded-xl bg-[#FCF8F2] hover:bg-[#F3EADF] border border-[#EADCC9] text-xs text-[#8C7A6B] hover:text-[#3C3024] font-bold transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                disabled={isResetting || resetConfirmText.trim().toUpperCase() !== 'RESET'}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Wiping Database...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Execute Wipe
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
