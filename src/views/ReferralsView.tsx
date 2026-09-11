import { useState, FormEvent } from 'react';
import { 
  Award, 
  Check, 
  CheckCircle2,
  ChevronRight,
  Copy, 
  DollarSign, 
  Gift, 
  Lock,
  Network, 
  Share2, 
  Sparkles,
  Star,
  Target,
  Trophy,
  UserCheck, 
  UserMinus, 
  UserPlus, 
  Users,
  Zap 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

interface BonusTier {
  id: string;
  name: string;
  requiredReferrals: number;
  bonusAmount: number;
  badge: string;
  perk: string;
}

const BONUS_TIERS: BonusTier[] = [
  {
    id: 'tier-1',
    name: 'Starter Ambassador',
    requiredReferrals: 5,
    bonusAmount: 500,
    badge: 'STARTER',
    perk: 'Instant Wallet Bounty',
  },
  {
    id: 'tier-2',
    name: 'Bronze Leader',
    requiredReferrals: 15,
    bonusAmount: 2000,
    badge: 'BRONZE',
    perk: '+0.5% Commission Boost',
  },
  {
    id: 'tier-3',
    name: 'Silver Director',
    requiredReferrals: 35,
    bonusAmount: 6000,
    badge: 'SILVER',
    perk: 'Weekly Leader Allowance',
  },
  {
    id: 'tier-4',
    name: 'Gold Executive',
    requiredReferrals: 75,
    bonusAmount: 18000,
    badge: 'GOLD',
    perk: '+1.0% Commission Boost',
  },
  {
    id: 'tier-5',
    name: 'Platinum VIP',
    requiredReferrals: 150,
    bonusAmount: 50000,
    badge: 'PLATINUM',
    perk: 'Priority Fast Withdrawals',
  },
  {
    id: 'tier-6',
    name: 'Crown Apex',
    requiredReferrals: 300,
    bonusAmount: 120000,
    badge: 'CROWN',
    perk: 'Lifetime VIP Royalty Share',
  },
];

export function ReferralsView() {
  const { currentUser, users, linkUserReferral, showToast, settings } = useApp();
  const [copied, setCopied] = useState(false);
  const [showAllTiers, setShowAllTiers] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [sponsorInput, setSponsorInput] = useState('');
  const [linking, setLinking] = useState(false);

  // Directly registered referral partners in Firestore
  const myReferrals = users.filter(
    (u) =>
      u.referralBy &&
      currentUser?.username &&
      u.referralBy.toLowerCase() === currentUser.username.toLowerCase() &&
      u.id !== currentUser.id
  );

  const currentReferrals = Math.max(currentUser?.teamCount || 0, myReferrals.length);

  const isDirect =
    !currentUser?.referralBy ||
    currentUser.referralBy === 'Direct User' ||
    currentUser.referralBy === 'Direct Registration' ||
    currentUser.referralBy === 'Direct';

  const handleLinkSponsorSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!sponsorInput.trim()) {
      showToast('Please enter your sponsor\'s username.', 'error');
      return;
    }
    setLinking(true);
    const success = await linkUserReferral(sponsorInput.trim());
    setLinking(false);
    if (success) {
      setShowLinkModal(false);
      setSponsorInput('');
    }
  };

  // Calculate current tier & next tier
  let currentTierIndex = -1;
  for (let i = 0; i < BONUS_TIERS.length; i++) {
    if (currentReferrals >= BONUS_TIERS[i].requiredReferrals) {
      currentTierIndex = i;
    }
  }

  const currentTier = currentTierIndex >= 0 ? BONUS_TIERS[currentTierIndex] : null;
  const nextTier = currentTierIndex + 1 < BONUS_TIERS.length ? BONUS_TIERS[currentTierIndex + 1] : null;

  const prevThreshold = currentTier ? currentTier.requiredReferrals : 0;
  const nextThreshold = nextTier ? nextTier.requiredReferrals : BONUS_TIERS[BONUS_TIERS.length - 1].requiredReferrals;
  const referralsNeeded = nextTier ? Math.max(0, nextTier.requiredReferrals - currentReferrals) : 0;

  const progressPercent = nextTier
    ? Math.min(100, Math.max(0, ((currentReferrals - prevThreshold) / (nextThreshold - prevThreshold)) * 100))
    : 100;

  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?ref=${currentUser?.username || 'user'}`
    : `https://trade-apex.xyz?ref=${currentUser?.username || 'user'}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralUrl);
    setCopied(true);
    showToast('Referral invitation URL copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const siteTitle = settings?.siteName || 'SarmayaXProfit';
    if (navigator.share) {
      navigator.share({
        title: `Join ${siteTitle}`,
        text: `Join ${siteTitle} to earn daily returns on automated investment plans!`,
        url: referralUrl,
      }).catch(() => handleCopy());
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Join ${siteTitle} using my invitation link: ${referralUrl}`)}`, '_blank');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] pb-24 text-[#3C3024] flex flex-col items-center">
      <Header title={settings?.siteName || 'Prime Invest'} subtitle="Member Network" showBack rightAction="profile" />

      <main className="w-full max-w-2xl px-4 space-y-4 mt-2">
        {/* Referral Network Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-center text-[#D09009] shadow-xs">
              <Network className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#D09009] tracking-wider block">
                AFFILIATE PROTOCOL
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#3C3024] truncate">
                {currentUser?.username || 'investor'}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-[#8C7A6B]">
                  Referred by <span className="font-bold text-[#D09009]">{currentUser?.referralBy || 'Direct Registration'}</span>
                </p>
                {isDirect && (
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(true)}
                    className="text-[10px] font-bold text-[#D09009] hover:underline px-2 py-0.5 rounded-md bg-[#FCF8F2] border border-[#EADCC9] cursor-pointer"
                  >
                    Link Sponsor
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EADCC9] flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FCF8F2] text-[#D09009] text-xs font-bold border border-[#EADCC9]">
              <Users className="w-3.5 h-3.5" />
              <span>{currentReferrals} Network Partners</span>
            </span>
            <span className="text-[10px] text-[#8C7A6B]">15% Direct Commission</span>
          </div>
        </div>

        {/* BONUS TIER PROGRESS CARD */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider flex items-center gap-1.5">
                  <span>Bonus Tier Progress</span>
                  {nextTier && (
                    <span className="px-1.5 py-0.5 rounded bg-[#FCF8F2] text-[#D09009] border border-[#EADCC9] text-[9px] font-mono normal-case">
                      Tier {currentTierIndex + 2} Next
                    </span>
                  )}
                </h3>
                <p className="text-[10px] text-[#8C7A6B]">
                  {nextTier 
                    ? `Reach ${nextTier.requiredReferrals} referrals to unlock Rs ${nextTier.bonusAmount.toLocaleString()} bonus`
                    : 'Maximum referral royalty tier achieved!'}
                </p>
              </div>
            </div>

            {nextTier ? (
              <span className="px-2.5 py-1 rounded-lg bg-[#FCF8F2] text-[#15803D] border border-[#EADCC9] text-xs font-mono font-bold">
                +Rs {nextTier.bonusAmount.toLocaleString()}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-[#FCF8F2] text-[#15803D] border border-[#EADCC9] text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#15803D]" />
                <span>Apex Crown</span>
              </span>
            )}
          </div>

          {/* Current vs Next Tier Header */}
          <div className="p-3.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[#8C7A6B] block font-semibold">Current Rank</span>
                <span className="font-bold text-[#3C3024] flex items-center gap-1">
                  {currentTier ? (
                    <>
                      <span className="text-[#D09009]">●</span>
                      {currentTier.name}
                    </>
                  ) : (
                    <>
                      <span className="text-[#8C7A6B]">●</span>
                      Novice Affiliate
                    </>
                  )}
                </span>
              </div>

              {nextTier ? (
                <div className="text-right">
                  <span className="text-[10px] text-[#8C7A6B] block font-semibold">Target Rank</span>
                  <span className="font-bold text-[#D09009] flex items-center justify-end gap-1">
                    {nextTier.name}
                    <Target className="w-3.5 h-3.5 text-[#D09009]" />
                  </span>
                </div>
              ) : (
                <div className="text-right">
                  <span className="text-[10px] text-[#8C7A6B] block font-semibold">Rank Status</span>
                  <span className="font-bold text-[#15803D]">All Tiers Completed</span>
                </div>
              )}
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-[#8C7A6B]">
                  {currentReferrals} {currentReferrals === 1 ? 'Referral' : 'Referrals'}
                </span>
                <span className="text-[#D09009] font-bold">
                  {nextTier ? `${currentReferrals} / ${nextTier.requiredReferrals} (${Math.round(progressPercent)}%)` : '100%'}
                </span>
              </div>

              <div className="relative w-full h-3.5 bg-white rounded-full overflow-hidden border border-[#EADCC9] p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F5BE27] to-[#D09009] shadow-xs transition-all duration-700 relative"
                  style={{ width: `${Math.max(4, Math.min(100, progressPercent))}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                </div>
              </div>
            </div>

            {/* Callout Notice */}
            {nextTier ? (
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[#3C3024] flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-[#D09009]" />
                  <span>
                    Need <span className="font-bold text-[#D09009] font-mono">{referralsNeeded}</span> more {referralsNeeded === 1 ? 'referral' : 'referrals'} for next bonus
                  </span>
                </span>
                <span className="text-[#15803D] font-mono font-bold">
                  Rs {nextTier.bonusAmount.toLocaleString()} Reward
                </span>
              </div>
            ) : (
              <div className="pt-1 text-[11px] text-[#15803D] flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Congratulations! You have unlocked all milestone bonus rewards.</span>
              </div>
            )}
          </div>

          {/* Tier Milestones Toggle & List */}
          <div className="pt-1">
            <button
              onClick={() => setShowAllTiers(!showAllTiers)}
              className="w-full py-2 px-3 rounded-xl bg-[#FCF8F2] hover:bg-[#FCF8F2]/80 border border-[#EADCC9] text-xs font-bold text-[#3C3024] flex items-center justify-between transition"
            >
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#D09009]" />
                <span>View All 6 Bonus Milestone Tiers</span>
              </span>
              <ChevronRight className={`w-3.5 h-3.5 text-[#8C7A6B] transition-transform duration-200 ${showAllTiers ? 'rotate-90' : ''}`} />
            </button>

            {showAllTiers && (
              <div className="mt-3 space-y-2">
                {BONUS_TIERS.map((tier) => {
                  const isUnlocked = currentReferrals >= tier.requiredReferrals;
                  const isNext = nextTier?.id === tier.id;

                  return (
                    <div
                      key={tier.id}
                      className={`p-3 rounded-xl border transition flex items-center justify-between ${
                        isUnlocked
                          ? 'bg-[#FCF8F2] border-[#EADCC9] text-[#3C3024]'
                          : isNext
                          ? 'bg-white border-[#D09009] shadow-xs'
                          : 'bg-white border-[#EADCC9] opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isUnlocked
                              ? 'bg-[#FCF8F2] text-[#15803D] border border-[#EADCC9]'
                              : isNext
                              ? 'bg-[#FCF8F2] text-[#D09009] border border-[#D09009]'
                              : 'bg-white text-[#8C7A6B] border border-[#EADCC9]'
                          }`}
                        >
                          {isUnlocked ? <Check className="w-4 h-4" /> : isNext ? <Sparkles className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#3C3024]">{tier.name}</span>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#FCF8F2] text-[#D09009] border border-[#EADCC9]">
                              {tier.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#8C7A6B]">
                            Requires {tier.requiredReferrals} Referrals • {tier.perk}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-[#15803D] block">
                          Rs {tier.bonusAmount.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-mono">
                          {isUnlocked ? (
                            <span className="text-[#15803D] font-bold">Unlocked</span>
                          ) : isNext ? (
                            <span className="text-[#D09009] font-bold">
                              {tier.requiredReferrals - currentReferrals} left
                            </span>
                          ) : (
                            <span className="text-[#8C7A6B]">Locked</span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Team Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
              Network Analytics
            </h3>
            <span className="text-[10px] text-[#8C7A6B]">Real-time synchronization</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {/* Total Team */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex flex-col justify-between shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center mb-2">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-[#8C7A6B] font-bold">Total Team</span>
              <span className="text-base font-bold text-[#3C3024] mt-0.5">
                {currentUser?.teamCount || 0}
              </span>
            </div>

            {/* Team Investment */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex flex-col justify-between shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center mb-2">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-[#8C7A6B] font-bold">Network Volume</span>
              <span className="text-base font-bold text-[#3C3024] mt-0.5">
                Rs{currentUser?.teamInvestment?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
              </span>
            </div>

            {/* Team Commission */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex flex-col justify-between shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#15803D] flex items-center justify-center mb-2">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-[#8C7A6B] font-bold">Total Commission</span>
              <span className="text-base font-bold text-[#15803D] mt-0.5">
                Rs{currentUser?.teamCommission?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
              </span>
            </div>

            {/* Active Members */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex flex-col justify-between shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#15803D] flex items-center justify-center mb-2">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-[#8C7A6B] font-bold">Active Partners</span>
              <span className="text-base font-bold text-[#3C3024] mt-0.5">
                {currentUser?.teamCount ? Math.floor(currentUser.teamCount * 0.8) : 0}
              </span>
            </div>

            {/* Inactive Members */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex flex-col justify-between shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#8C7A6B] flex items-center justify-center mb-2">
                <UserMinus className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-[#8C7A6B] font-bold">Inactive Partners</span>
              <span className="text-base font-bold text-[#8C7A6B] mt-0.5">
                {currentUser?.teamCount ? Math.ceil(currentUser.teamCount * 0.2) : 0}
              </span>
            </div>

            {/* Direct Referrals */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EADCC9] flex flex-col justify-between shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center mb-2">
                <UserPlus className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] text-[#8C7A6B] font-bold">Direct Referrals</span>
              <span className="text-base font-bold text-[#D09009] mt-0.5">
                {currentUser?.teamCount || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Your Referral Link Card */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
              Invitation Link
            </h3>
            <span className="text-[10px] text-[#D09009] font-bold">Invite & receive instant yield</span>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-[#8C7A6B] uppercase tracking-wider block mb-1.5">
              PERSONAL REFERRAL URL
            </label>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="w-full bg-transparent px-3 py-1 text-xs text-[#3C3024] font-mono focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] text-white text-xs font-bold transition shrink-0 flex items-center gap-1 shadow-xs"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="w-full py-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] hover:border-[#D09009] text-[#3C3024] font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
          >
            <Share2 className="w-4 h-4 text-[#D09009]" />
            <span>Share Invitation Link</span>
          </button>
        </div>

        {/* Commission Levels */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
              Multi-Tier Commission Structure
            </h3>
            <span className="text-[10px] text-[#8C7A6B]">Automated Distribution</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-white border border-[#EADCC9] text-[#D09009] font-bold flex items-center justify-center text-[10px]">
                  1
                </span>
                <span className="font-bold text-[#3C3024]">Tier 1 (Direct Referrals)</span>
              </div>
              <span className="font-bold text-[#15803D]">15% Reward</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-white border border-[#EADCC9] text-[#D09009] font-bold flex items-center justify-center text-[10px]">
                  2
                </span>
                <span className="font-bold text-[#3C3024]">Tier 2 (Secondary Referrals)</span>
              </div>
              <span className="font-bold text-[#15803D]">5% Reward</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-white border border-[#EADCC9] text-[#D09009] font-bold flex items-center justify-center text-[10px]">
                  3
                </span>
                <span className="font-bold text-[#3C3024]">Tier 3 (Extended Network)</span>
              </div>
              <span className="font-bold text-[#15803D]">2% Reward</span>
            </div>
          </div>
        </div>

        {/* Direct Referral Partners List */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
                  Direct Referral Partners ({myReferrals.length})
                </h3>
                <p className="text-[10px] text-[#8C7A6B]">
                  Users registered with your unique invitation link
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] font-mono text-[10px] font-bold">
              15% Comm.
            </span>
          </div>

          {myReferrals.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-center space-y-2">
              <UserPlus className="w-8 h-8 text-[#8C7A6B] mx-auto opacity-70" />
              <p className="text-xs font-bold text-[#3C3024]">No Referral Partners Yet</p>
              <p className="text-[11px] text-[#8C7A6B] max-w-xs mx-auto">
                Share your personal invitation link above with friends and investors. When they create an account, they will automatically appear here!
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Invite Link</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {myReferrals.map((partner) => {
                const joinedDate = partner.createdAt
                  ? new Date(partner.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Recent';

                return (
                  <div
                    key={partner.id}
                    className="p-3 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#EADCC9] text-[#D09009] font-bold font-mono text-xs flex items-center justify-center shrink-0">
                        {partner.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#3C3024] font-mono truncate">
                          @{partner.username}
                        </p>
                        <p className="text-[10px] text-[#8C7A6B]">
                          Joined {joinedDate}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-[#15803D] block">
                        Rs {(partner.totalDeposit || 0).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-[#8C7A6B]">Total Deposit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Link Sponsor Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#3C3024] uppercase tracking-wider">
                    Link Sponsor / Upliner
                  </h3>
                  <p className="text-[10px] text-[#8C7A6B]">
                    Connect your account to your inviter
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-[#8C7A6B] hover:text-[#3C3024] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLinkSponsorSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                  SPONSOR USERNAME OR EMAIL
                </label>
                <input
                  type="text"
                  placeholder="e.g. adnansanghri41"
                  value={sponsorInput}
                  onChange={(e) => setSponsorInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#3C3024] text-xs font-mono focus:outline-none focus:border-[#D09009]"
                  required
                />
                <p className="text-[10px] text-[#8C7A6B]">
                  Enter the username of the member whose invitation link you intended to use.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-xs text-[#8C7A6B] font-bold hover:bg-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={linking}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white text-xs font-bold shadow-xs hover:from-[#F7C63D] hover:to-[#B87D05] transition disabled:opacity-50 cursor-pointer"
                >
                  {linking ? 'Linking...' : 'Confirm Sponsor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
