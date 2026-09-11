import {
  AdminMember,
  CurrencyAccount,
  PackageCategory,
  TaskReward,
  PlatformExpense,
  WithdrawSlab,
  WeakPasswordUser,
  BlockedDevice,
  WeeklySalaryTier,
  SalaryClaim,
  SpinnerGameConfig,
  CoinFlipConfig
} from '../types';


export const INITIAL_ADMIN_MEMBERS: AdminMember[] = [
  {
    id: 'adm-1',
    name: 'Muhammad Adnan (Head Admin)',
    email: 'adnansanghri41@gmail.com',
    role: 'Super Admin',
    status: 'active',
    lastActive: 'Active Now',
    phone: '+92 349 3169701'
  }
];

export const INITIAL_CURRENCY_ACCOUNTS: CurrencyAccount[] = [
  {
    id: 'acc-1',
    gatewayType: 'Easypaisa',
    bankName: 'Telenor Microfinance Bank (Easypaisa)',
    accountTitle: 'MUMTAZ MAI / SARMAYA OFFICIAL',
    accountNumber: '03493169701',
    instructions: 'Send exact PKR deposit amount via Easypaisa App. Upload screenshot proof with visible TRX ID.',
    dailyLimit: 2500000,
    totalCollected: 0,
    status: 'active'
  },
  {
    id: 'acc-2',
    gatewayType: 'JazzCash',
    bankName: 'Mobilink Microfinance Bank (JazzCash)',
    accountTitle: 'SARMAYA TRADING REVENUE',
    accountNumber: '0300 1234567',
    instructions: 'Direct transfer to JazzCash merchant/mobile wallet. Ensure TID receipt is attached.',
    dailyLimit: 2500000,
    totalCollected: 0,
    status: 'active'
  },
  {
    id: 'acc-3',
    gatewayType: 'Bank Transfer',
    bankName: 'Meezan Islamic Bank Limited',
    accountTitle: 'SARMAYA X PROFIT FINANCIAL SOLUTIONS',
    accountNumber: '02890104829102',
    iban: 'PK45MEZN0002890104829102',
    instructions: 'Interbank Fund Transfer (IBFT). Corporate settlement account with automated reconciliation.',
    dailyLimit: 15000000,
    totalCollected: 0,
    status: 'active'
  },
  {
    id: 'acc-4',
    gatewayType: 'SadaPay',
    bankName: 'SadaPay Business Portal',
    accountTitle: 'SARMAYA TREASURY',
    accountNumber: '0310 9988776',
    instructions: 'Fast 0% fee deposit via SadaPay handle or account number.',
    dailyLimit: 1000000,
    totalCollected: 0,
    status: 'active'
  }
];

export const INITIAL_PACKAGE_CATEGORIES: PackageCategory[] = [
  {
    id: 'cat-1',
    name: 'Starter Seed Tiers',
    slug: 'starter-tiers',
    description: 'Entry-level investment plans from Rs 380 to Rs 1,380 for new participants.',
    color: '#10B981',
    status: 'active'
  },
  {
    id: 'cat-2',
    name: 'Growth & Builder Tiers',
    slug: 'growth-builder',
    description: 'Medium yield plans from Rs 2,580 to Rs 11,380 with daily liquidity.',
    color: '#3B82F6',
    status: 'active'
  },
  {
    id: 'cat-3',
    name: 'Institutional VIP Tiers',
    slug: 'institutional-vip',
    description: 'High-volume capital allocations up to Rs 480,000 with prioritized manual settlement.',
    color: '#D6B36A',
    status: 'active'
  },
  {
    id: 'cat-4',
    name: 'Flash Promo Packages',
    slug: 'flash-promo',
    description: 'Special weekend and holiday bonus plans with accelerated payout speed.',
    color: '#F59E0B',
    status: 'active'
  }
];

export const INITIAL_TASKS_REWARDS: TaskReward[] = [
  {
    id: 'tsk-1',
    title: 'Join Official WhatsApp Broadcast Community',
    rewardAmount: 60,
    taskType: 'whatsapp',
    linkUrl: 'https://chat.whatsapp.com/sarmayaxprofit',
    totalCompletions: 0,
    status: 'active'
  },
  {
    id: 'tsk-2',
    title: 'Join Telegram Channel for Live Payment Slips',
    rewardAmount: 50,
    taskType: 'telegram',
    linkUrl: 'https://t.me/sarmayaxprofit_official',
    totalCompletions: 0,
    status: 'active'
  },
  {
    id: 'tsk-3',
    title: 'Subscribe YouTube Channel & Watch Daily Briefing',
    rewardAmount: 75,
    taskType: 'youtube',
    linkUrl: 'https://youtube.com/@sarmayaxprofit',
    totalCompletions: 0,
    status: 'active'
  },
  {
    id: 'tsk-4',
    title: 'Daily Platform Check-in Reward',
    rewardAmount: 40,
    taskType: 'daily_login',
    linkUrl: '#',
    totalCompletions: 0,
    status: 'active'
  }
];

export const INITIAL_EXPENSES: PlatformExpense[] = [];

export const INITIAL_WITHDRAW_SLABS: WithdrawSlab[] = [
  {
    id: 'slb-1',
    tierTitle: 'Standard Fast Payout',
    minAmount: 300,
    maxAmount: 5000,
    feePercentage: 0,
    processingSpeed: '10 - 20 Minutes',
    dailyWithdrawLimit: 2,
    status: 'active'
  },
  {
    id: 'slb-2',
    tierTitle: 'Growth Capital Tier',
    minAmount: 5001,
    maxAmount: 25000,
    feePercentage: 1.5,
    processingSpeed: '15 - 30 Minutes',
    dailyWithdrawLimit: 2,
    status: 'active'
  },
  {
    id: 'slb-3',
    tierTitle: 'High-Volume Executive',
    minAmount: 25001,
    maxAmount: 100000,
    feePercentage: 2.0,
    processingSpeed: '20 - 45 Minutes',
    dailyWithdrawLimit: 1,
    status: 'active'
  }
];

export const INITIAL_WEAK_PASSWORDS: WeakPasswordUser[] = [];

export const INITIAL_BLOCKED_DEVICES: BlockedDevice[] = [];

export const INITIAL_WEEKLY_SALARY_TIERS: WeeklySalaryTier[] = [
  {
    id: 's-tier-1',
    tierName: 'Junior Team Leader',
    requiredActiveMembers: 15,
    requiredTeamDeposit: 50000,
    weeklySalaryAmount: 3500,
    badge: 'BRONZE LEADER',
    status: 'active'
  },
  {
    id: 's-tier-2',
    tierName: 'Senior Team Leader',
    requiredActiveMembers: 35,
    requiredTeamDeposit: 150000,
    weeklySalaryAmount: 8500,
    badge: 'SILVER LEADER',
    status: 'active'
  },
  {
    id: 's-tier-3',
    tierName: 'Regional Supervisor',
    requiredActiveMembers: 80,
    requiredTeamDeposit: 400000,
    weeklySalaryAmount: 22000,
    badge: 'GOLD LEADER',
    status: 'active'
  },
  {
    id: 's-tier-4',
    tierName: 'National Director',
    requiredActiveMembers: 200,
    requiredTeamDeposit: 1200000,
    weeklySalaryAmount: 60000,
    badge: 'PLATINUM LEADER',
    status: 'active'
  },
  {
    id: 's-tier-5',
    tierName: 'Crown Ambassador',
    requiredActiveMembers: 500,
    requiredTeamDeposit: 3500000,
    weeklySalaryAmount: 180000,
    badge: 'CROWN VIP',
    status: 'active'
  }
];

export const INITIAL_SALARY_CLAIMS: SalaryClaim[] = [];

export const INITIAL_SPINNER_CONFIG: SpinnerGameConfig = {
  enabled: true,
  spinCost: 50,
  dailyFreeSpins: 1,
  winRate: 45,
  maxPrize: 500
};

export const INITIAL_COIN_FLIP_CONFIG: CoinFlipConfig = {
  enabled: true,
  minStake: 100,
  maxStake: 5000,
  multiplier: 1.95,
  houseEdge: 5
};

