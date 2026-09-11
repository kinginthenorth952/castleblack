import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  LineChart, 
  Play, 
  Plus, 
  ShoppingBag, 
  ShoppingCart, 
  Wallet 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

export function InvestLogsView() {
  const { userPlans, currentUser, settings, setCurrentView, claimDailyTask } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  // Filter strictly by logged-in user to guarantee fresh state for new users
  const myPlans = userPlans.filter((p) => p.userId === currentUser?.id);

  const filteredPlans = myPlans.filter((p) => {
    if (activeTab === 'ACTIVE') return p.status === 'active';
    if (activeTab === 'COMPLETED') return p.status === 'completed';
    return true;
  });

  const activePlansCount = myPlans.filter((p) => p.status === 'active').length;
  const totalInvested = myPlans.reduce((sum, p) => sum + p.price, 0);
  const totalEarned = myPlans.reduce((sum, p) => sum + p.earnedSoFar, 0);

  return (
    <div className="w-full min-h-screen bg-[#F4F8F5] pb-24 text-[#0F2D1F] flex flex-col items-center">
      <Header title={settings?.siteName || 'Sikka Poultry Farm'} subtitle="My Plans & Tasks" showBack rightAction="add" />

      <main className="w-full max-w-2xl px-4 space-y-4 mt-2">
        {/* Top Overview Card */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] flex items-center justify-center text-[#D09009] shadow-xs">
              <LineChart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3C3024]">My Plans & Tasks</h2>
              <p className="text-xs text-[#8C7A6B]">
                Track earnings, timers, and daily performance tasks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EADCC9] text-center">
            <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
              <span className="text-[10px] text-[#8C7A6B] uppercase font-semibold block">
                ACTIVE PLANS
              </span>
              <span className="text-base font-bold text-[#D09009]">
                {activePlansCount}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
              <span className="text-[10px] text-[#8C7A6B] uppercase font-semibold block">
                TOTAL INVESTED
              </span>
              <span className="text-base font-bold text-[#3C3024]">
                Rs{totalInvested.toLocaleString()}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
              <span className="text-[10px] text-[#8C7A6B] uppercase font-semibold block">
                TOTAL EARNED
              </span>
              <span className="text-base font-bold text-[#15803D]">
                Rs{totalEarned.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="grid grid-cols-3 gap-2">
          {(['ALL', 'ACTIVE', 'COMPLETED'] as const).map((tab) => {
            const count = tab === 'ALL' 
              ? myPlans.length 
              : tab === 'ACTIVE' 
                ? activePlansCount 
                : myPlans.filter(p => p.status === 'completed').length;
            
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5BE27] to-[#D09009] text-white shadow-xs'
                    : 'bg-white border border-[#EADCC9] text-[#8C7A6B] hover:border-[#D09009]/50 hover:text-[#3C3024]'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Heading with records count */}
        <div className="flex items-center justify-between px-2 pt-1">
          <h3 className="text-sm font-bold text-[#3C3024]">Investment Plans</h3>
          <span className="text-[11px] text-[#D09009] font-bold">
            {filteredPlans.length} records
          </span>
        </div>

        {/* Plans List or Empty State */}
        {filteredPlans.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#EADCC9] p-10 flex flex-col items-center justify-center text-center shadow-sm space-y-2">
            <div className="w-14 h-14 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center mb-1">
              <Wallet className="w-6 h-6 opacity-75" />
            </div>
            <h4 className="text-sm font-bold text-[#3C3024]">No Plan Found</h4>
            <p className="text-xs text-[#8C7A6B]">No investment portfolios matching this category.</p>

            <button
              onClick={() => setCurrentView('plans')}
              className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-[#D09009]/20 transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>EXPLORE PLANS</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPlans.map((plan) => {
              const todayStr = new Date().toDateString();
              const alreadyClaimedToday = plan.lastClaimDate === todayStr;

              return (
                <div
                  key={plan.id}
                  className="rounded-2xl bg-white border border-[#EADCC9] p-4 shadow-sm flex flex-col space-y-3 hover:border-[#D09009]/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center font-bold text-sm">
                        {plan.planName.slice(-1)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#3C3024]">{plan.planName}</h4>
                        <span className="text-[10px] text-[#8C7A6B]">
                          Price: Rs{plan.price.toLocaleString()} • Day {plan.daysPassed}/{plan.durationDays}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        plan.status === 'active'
                          ? 'bg-[#FCF8F2] text-[#15803D] border-[#EADCC9]'
                          : 'bg-[#FCF8F2] text-[#8C7A6B] border-[#EADCC9]'
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                      <span className="text-[10px] text-[#8C7A6B] block font-semibold">Daily Yield</span>
                      <span className="font-bold text-[#15803D]">
                        Rs{plan.dailyEarning.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9]">
                      <span className="text-[10px] text-[#8C7A6B] block font-semibold">Total Earned</span>
                      <span className="font-bold text-[#D09009]">
                        Rs{plan.earnedSoFar.toLocaleString()} / Rs{plan.totalEarningTarget.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  {plan.status === 'active' && (
                    <div className="pt-1">
                      {alreadyClaimedToday ? (
                        <div className="w-full py-2.5 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#15803D] text-xs font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                          <span>Today's Earning Claimed</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => claimDailyTask(plan.id)}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-[#D09009]/20 transition flex items-center justify-center gap-2"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Verify & Claim Rs{plan.dailyEarning.toLocaleString()}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
