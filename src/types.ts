export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  mobile: string;
  country: string;
  referralBy?: string;
  balance: number;
  pendingDeposit: number;
  totalDeposit: number;
  pendingWithdraw: number;
  totalWithdraw: number;
  teamCount: number;
  teamInvestment: number;
  teamCommission: number;
  status: 'active' | 'blocked';
  createdAt: string;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  price: number;
  dailyEarning: number;
  totalEarning: number;
  durationDays: number;
  gradient: string;
  iconType: 'leaf' | 'chart' | 'diamond' | 'crown' | 'rocket' | 'star' | 'shield' | 'zap';
  colorTag: string;
  isActive: boolean;
}

export interface UserActivePlan {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  price: number;
  dailyEarning: number;
  totalEarningTarget: number;
  earnedSoFar: number;
  durationDays: number;
  daysPassed: number;
  startDate: string;
  lastClaimDate?: string;
  status: 'active' | 'completed';
}

export interface DepositRecord {
  id: string;
  userId: string;
  username: string;
  gateway: string;
  amount: number;
  transactionId: string;
  screenshotUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  planId?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface WithdrawRecord {
  id: string;
  userId: string;
  username: string;
  gateway: string;
  amount: number;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface TransactionRecord {
  id: string;
  userId: string;
  username?: string;
  type: 'deposit' | 'withdraw' | 'plan_buy' | 'task_earning' | 'referral_bonus' | 'admin_adjustment';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  createdAt: string;
}

export type ThemeMode = 'apple-dark' | 'apple-light' | 'gold' | 'dark' | 'light';

export interface SystemSettings {
  siteName: string;
  siteSubtitle: string;
  logoUrl: string;
  defaultTheme?: ThemeMode;
  currencySymbol: string;
  heroHeadline: string;
  heroSubheadline: string;
  noticeBanner: string;
  showNoticeBanner: boolean;
  enableDeposits: boolean;
  enableWithdrawals: boolean;
  enableTasks: boolean;
  easypaisaAccount: string;
  easypaisaTitle: string;
  jazzcashAccount: string;
  jazzcashTitle: string;
  bankName: string;
  bankAccount: string;
  bankTitle: string;
  qrCodeUrl: string;
  adminWhatsApp: string;
  whatsappGroup: string;
  whatsappChannel: string;
  telegramSupport: string;
  supportHours: string;
  appDownloadUrl: string;
  minWithdraw: number;
  maxWithdraw: number;
  minDeposit: number;
  maxDeposit: number;
}

// Additional Admin Feature Types
export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Finance Lead' | 'Audit Manager' | 'Customer Support';
  status: 'active' | 'suspended';
  lastActive: string;
  phone: string;
}

export interface CurrencyAccount {
  id: string;
  gatewayType?: 'Easypaisa' | 'JazzCash' | 'Bank Transfer' | 'SadaPay' | 'NayaPay' | string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban?: string;
  instructions?: string;
  qrCodeUrl?: string;
  dailyLimit?: number;
  totalCollected?: number;
  status: 'active' | 'inactive';
}

export interface PackageCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  status: 'active' | 'inactive';
}

export interface TaskReward {
  id: string;
  title: string;
  rewardAmount: number;
  taskType: 'telegram' | 'youtube' | 'whatsapp' | 'survey' | 'daily_login';
  linkUrl: string;
  totalCompletions: number;
  status: 'active' | 'inactive';
}

export interface PlatformExpense {
  id: string;
  title: string;
  category: 'Server & Cloud' | 'Marketing & Promo' | 'SMS / OTP Gateway' | 'Staff Payroll' | 'WhatsApp API' | 'Operations';
  amount: number;
  date: string;
  notes: string;
  receiptId: string;
}

export interface WithdrawSlab {
  id: string;
  tierTitle: string;
  minAmount: number;
  maxAmount: number;
  feePercentage: number;
  processingSpeed: string;
  dailyWithdrawLimit: number;
  status: 'active' | 'inactive';
}

export interface WeakPasswordUser {
  id: string;
  username: string;
  mobile: string;
  detectedPasswordPattern: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  registeredAt: string;
  balance: number;
  forceResetRequired: boolean;
}

export interface BlockedDevice {
  id: string;
  ipAddress: string;
  deviceFingerprint: string;
  browser: string;
  userAgent?: string;
  associatedAccount?: string;
  associatedUsername?: string;
  reason: string;
  blockedAt: string;
  status: 'blocked' | 'whitelisted';
}

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

export interface SpinnerGameConfig {
  enabled: boolean;
  spinCost: number;
  dailyFreeSpins: number;
  winRate: number;
  maxPrize: number;
}

export interface CoinFlipConfig {
  enabled: boolean;
  minStake: number;
  maxStake: number;
  multiplier: number;
  houseEdge: number;
}

