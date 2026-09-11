import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  Package,
  FolderTree,
  Award,
  Receipt,
  Layers,
  DollarSign,
  KeyRound,
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
  LogOut,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Gamepad2,
  Briefcase,
  UserCheck,
  Coins,
  Search,
  ExternalLink,
  HelpCircle,
  FileText,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrimeInvestLogo } from '../PrimeInvestLogo';

export type AdminTab =
  | 'DASHBOARD'
  | 'MEMBERS'
  | 'SETTINGS'
  | 'CURRENCY_ACCOUNTS'
  | 'PACKAGES'
  | 'CATEGORIES'
  | 'TASKS'
  | 'EXPENSES'
  | 'WITHDRAW_SLABS'
  | 'WEAK_PASSWORDS'
  | 'BLOCKED_DEVICES'
  | 'DEPOSITS'
  | 'WITHDRAWALS'
  | 'USERS'
  | 'TRANSACTIONS'
  | 'WEEKLY_SALARY'
  | 'GAMING_SETTINGS';

interface AdminSidebarProps {
  currentTab: AdminTab;
  setCurrentTab: (tab: AdminTab) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onOpenDistributeProfit: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  setCurrentTab,
  isOpen,
  setIsOpen,
  onOpenDistributeProfit,
}) => {
  const { deposits, withdrawals, adminLogout, settings } = useApp();

  const pendingDepositsCount = deposits.filter((d) => d.status === 'pending').length;
  const pendingWithdrawsCount = withdrawals.filter((w) => w.status === 'pending').length;

  // Collapsible sub-menus state
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'users': true,
    'invest': true,
    'finance': true,
    'report': false,
    'security': false,
    'settings': false
  });

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const menuSections = [
    {
      type: 'single',
      id: 'DASHBOARD' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-[#D6B36A]/20 text-[#D6B36A] border border-[#D6B36A]/30',
    },
    {
      type: 'single',
      id: 'PACKAGES' as AdminTab,
      label: 'Plans Activity',
      icon: TrendingUp,
      badge: null,
    },
    {
      type: 'single',
      id: 'TRANSACTIONS' as AdminTab,
      label: 'Finance & Profit',
      icon: DollarSign,
      badge: null,
    },
    {
      type: 'group',
      key: 'manage_plan',
      title: 'MANAGE PLAN',
      icon: Package,
      items: [
        {
          id: 'PACKAGES' as AdminTab,
          label: 'Plan List',
          icon: Package,
          badge: null,
        },
        {
          id: 'TASKS' as AdminTab,
          label: 'Team Rewards',
          icon: Award,
          badge: null,
        },
        {
          id: 'CATEGORIES' as AdminTab,
          label: 'Plan Categories',
          icon: FolderTree,
          badge: null,
        },
      ],
    },
    {
      type: 'group',
      key: 'manage_user',
      title: 'MANAGE USER',
      icon: Users,
      items: [
        {
          id: 'USERS' as AdminTab,
          label: 'All User',
          icon: Users,
          badge: null,
        },
        {
          id: 'MEMBERS' as AdminTab,
          label: 'Staff Members',
          icon: ShieldCheck,
          badge: null,
        },
      ],
    },
    {
      type: 'group',
      key: 'all_transaction',
      title: 'ALL TRANSACTION',
      icon: Receipt,
      items: [
        {
          id: 'TRANSACTIONS' as AdminTab,
          label: 'Transaction',
          icon: Receipt,
          badge: null,
        },
        {
          id: 'PACKAGES' as AdminTab,
          label: 'Investments',
          icon: Briefcase,
          badge: null,
        },
        {
          id: 'TASKS' as AdminTab,
          label: 'Commission',
          icon: Coins,
          badge: null,
        },
      ],
    },
    {
      type: 'group',
      key: 'deposits',
      title: 'MANAGE DEPOSITS',
      icon: ArrowDownLeft,
      items: [
        {
          id: 'DEPOSITS' as AdminTab,
          label: 'Pending Deposits',
          icon: ArrowDownLeft,
          badge: pendingDepositsCount > 0 ? pendingDepositsCount : null,
          badgeColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold animate-pulse',
        },
        {
          id: 'DEPOSITS' as AdminTab,
          label: 'Approved Deposits',
          icon: CheckCircle2,
          badge: null,
        },
      ],
    },
    {
      type: 'group',
      key: 'withdrawals',
      title: 'MANAGE WITHDRAWALS',
      icon: ArrowUpRight,
      items: [
        {
          id: 'WITHDRAWALS' as AdminTab,
          label: 'Pending Withdrawals',
          icon: ArrowUpRight,
          badge: pendingWithdrawsCount > 0 ? pendingWithdrawsCount : null,
          badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold animate-pulse',
        },
        {
          id: 'WITHDRAWALS' as AdminTab,
          label: 'Approved Withdrawals',
          icon: CheckCircle2,
          badge: null,
        },
        {
          id: 'WITHDRAW_SLABS' as AdminTab,
          label: 'Withdraw Slabs',
          icon: Layers,
          badge: null,
        },
      ],
    },
    {
      type: 'group',
      key: 'reports',
      title: 'REPORTS & LOGS',
      icon: FileText,
      items: [
        {
          id: 'EXPENSES' as AdminTab,
          label: 'Platform Expenses',
          icon: DollarSign,
          badge: null,
        },
        {
          id: 'WEEKLY_SALARY' as AdminTab,
          label: 'Weekly Salary',
          icon: Briefcase,
          badge: null,
        },
        {
          id: 'WEAK_PASSWORDS' as AdminTab,
          label: 'Security & Audit',
          icon: KeyRound,
          badge: 'Alert',
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        },
        {
          id: 'BLOCKED_DEVICES' as AdminTab,
          label: 'Blocked Devices',
          icon: ShieldAlert,
          badge: null,
        },
      ],
    },
    {
      type: 'group',
      key: 'settings',
      title: 'GENERAL SETTINGS',
      icon: Settings,
      items: [
        {
          id: 'SETTINGS' as AdminTab,
          label: 'System Settings',
          icon: Settings,
          badge: null,
        },
        {
          id: 'CURRENCY_ACCOUNTS' as AdminTab,
          label: 'Payment Gateways',
          icon: CreditCard,
          badge: null,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-[#EADCC9] text-[#3C3024] border-r flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#EADCC9] bg-[#FCF8F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrimeInvestLogo size="sm" customLogoUrl={settings?.logoUrl} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-[#3C3024]">
                  {settings?.siteName || 'Sikka Poultry Farm'}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white uppercase">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] font-mono text-[#8C7A6B]">
                ViserAdmin v5 Panel
              </p>
            </div>
          </div>
        </div>

        {/* Distribute Profit Action Button pinned at top of sidebar */}
        <div className="p-3 border-b border-[#EADCC9] bg-[#FCF8F2]">
          <button
            id="btn-sidebar-distribute-profit"
            onClick={() => {
              onOpenDistributeProfit();
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:brightness-105 active:scale-[0.98] text-white font-bold text-xs shadow-xs flex items-center justify-between transition"
          >
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-white" />
              <span>Distribute ROI Profit</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono font-bold text-white">
              Cron 24h
            </span>
          </button>
        </div>

        {/* Scrollable ViserAdmin Navigation List */}
        <div className="flex-1 min-h-0 overflow-y-auto smooth-scroll touch-pan-y px-3 py-3 space-y-2 scrollbar-thin">
          
          {menuSections.map((section, idx) => {
            if (section.type === 'single') {
              const Icon = section.icon;
              const isActive = currentTab === section.id;
              return (
                <button
                  key={idx}
                  id={`nav-item-${section.id.toLowerCase()}`}
                  onClick={() => {
                    setCurrentTab(section.id as AdminTab);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FEF8E8] text-[#D09009] shadow-xs border-l-4 border-[#D09009] font-bold'
                      : 'text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D09009]' : 'text-[#8C7A6B]'}`} />
                    <span>{section.label}</span>
                  </div>

                  {section.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${section.badgeColor}`}>
                      {section.badge}
                    </span>
                  )}
                </button>
              );
            }

            // Accordion Category Group
            const isExpanded = openGroups[section.key as string] ?? true;
            const GroupIcon = section.icon;
            const hasActiveChild = section.items?.some(it => it.id === currentTab);

            return (
              <div key={idx} className="space-y-1 pt-1">
                {/* Accordion Group Header */}
                <button
                  onClick={() => toggleGroup(section.key as string)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                    hasActiveChild 
                      ? 'text-[#D09009]' 
                      : 'text-[#8C7A6B] hover:text-[#3C3024]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-3.5 h-3.5 opacity-75" />
                    <span>{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                  )}
                </button>

                {/* Sub items */}
                {isExpanded && section.items && (
                  <div className="space-y-0.5 pl-2 border-l border-[#EADCC9] ml-3">
                    {section.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = currentTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          id={`nav-item-${subItem.id.toLowerCase()}`}
                          onClick={() => {
                            setCurrentTab(subItem.id as AdminTab);
                            if (window.innerWidth < 1024) setIsOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                            isSubActive
                              ? 'bg-[#FEF8E8] text-[#D09009] font-bold border-l-2 border-[#D09009]'
                              : 'text-[#8C7A6B] hover:bg-[#FCF8F2] hover:text-[#3C3024] font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-[#D09009]' : 'opacity-60'}`} />
                            <span className="truncate">{subItem.label}</span>
                          </div>

                          {subItem.badge && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                                subItem.badgeColor || 'bg-[#FEF8E8] text-[#D09009]'
                              }`}
                            >
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Pinned Admin Quick Bar */}
        <div className="p-3 border-t border-[#EADCC9] bg-[#FCF8F2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-[#8C7A6B]">
              System: Online
            </span>
          </div>

          <button
            onClick={adminLogout}
            className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
