import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Play, 
  PlayCircle, 
  ShieldCheck, 
  Sparkles, 
  Tv, 
  Wallet 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { UserActivePlan } from '../types';

export function DailyTasksView() {
  const { userPlans, currentUser, settings, claimDailyTask, setCurrentView } = useApp();
  const [activeTaskPlan, setActiveTaskPlan] = useState<UserActivePlan | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(5);
  const [canClaim, setCanClaim] = useState(false);

  // Strictly filter by logged-in user so new sign ups start with 0 tasks
  const activePlans = userPlans.filter((p) => p.userId === currentUser?.id && p.status === 'active');
  const todayStr = new Date().toDateString();

  useEffect(() => {
    let interval: any;
    if (activeTaskPlan && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setCanClaim(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTaskPlan, timerSeconds]);

  const handleStartTask = (plan: UserActivePlan) => {
    setActiveTaskPlan(plan);
    setTimerSeconds(5);
    setCanClaim(false);
  };

  const handleClaim = () => {
    if (activeTaskPlan) {
      claimDailyTask(activeTaskPlan.id);
      setActiveTaskPlan(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F8F5] pb-24 text-[#0F2D1F] flex flex-col items-center">
      <Header title={settings?.siteName || 'Sikka Poultry Farm'} subtitle="Daily Tasks" showBack rightAction="history" />

      <main className="w-full max-w-2xl px-4 space-y-4 mt-2">
        {/* Banner */}
        <div className="rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#D09009] tracking-wider">
                DAILY YIELD VALIDATION
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#3C3024]">Daily Verification Tasks</h2>
              <p className="text-xs text-[#8C7A6B]">
                Complete brief partner verifications to credit your portfolio's daily yield.
              </p>
            </div>
          </div>
        </div>

        {/* Task Cards List */}
        {activePlans.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#EADCC9] p-10 flex flex-col items-center justify-center text-center shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#D09009] flex items-center justify-center">
              <Wallet className="w-6 h-6 opacity-75" />
            </div>
            <h3 className="text-sm font-bold text-[#3C3024]">No Active Tasks Available</h3>
            <p className="text-xs text-[#8C7A6B] max-w-xs leading-relaxed">
              Activate an investment plan first to unlock daily sponsored yield tasks.
            </p>
            <button
              onClick={() => setCurrentView('plans')}
              className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-95 text-white font-bold text-xs shadow-md shadow-[#D09009]/20 transition"
            >
              Explore Plans
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {activePlans.map((plan) => {
              const claimedToday = plan.lastClaimDate === todayStr;

              return (
                <div
                  key={plan.id}
                  className="rounded-2xl bg-white border border-[#EADCC9] p-4 shadow-sm flex flex-col space-y-3 hover:border-[#D09009]/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#3C3024]">{plan.planName} Daily Task</h4>
                      <p className="text-[10px] text-[#8C7A6B] mt-0.5">
                        Duration: 5 Seconds • Daily Yield: <span className="text-[#15803D] font-bold">Rs{plan.dailyEarning.toLocaleString()}</span>
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[#D09009] px-2.5 py-1 rounded-lg bg-[#FCF8F2] border border-[#EADCC9]">
                      Day {plan.daysPassed + 1}/{plan.durationDays}
                    </span>
                  </div>

                  {claimedToday ? (
                    <div className="py-2.5 px-4 rounded-xl bg-[#FCF8F2] border border-[#EADCC9] text-[#15803D] text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                      <span>Task Completed for Today</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartTask(plan)}
                      className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F5BE27] to-[#D09009] hover:from-[#F7C63D] hover:to-[#B87D05] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#D09009]/20 transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Verification & Claim Rs{plan.dailyEarning.toLocaleString()}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Ad Viewer Modal */}
        {activeTaskPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-white border border-[#EADCC9] p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EADCC9]">
                <span className="text-xs font-bold text-[#D09009] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Sponsored Verification
                </span>
                <div className="px-3 py-1 rounded-lg bg-[#FCF8F2] border border-[#EADCC9] text-xs font-mono font-bold text-[#3C3024]">
                  {timerSeconds > 0 ? `00:0${timerSeconds}` : 'READY'}
                </div>
              </div>

              {/* Simulated Ad Container */}
              <div className="relative rounded-xl overflow-hidden bg-[#FCF8F2] border border-[#EADCC9] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EADCC9] flex items-center justify-center text-[#D09009] mb-3 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#3C3024]">Apex Wealth Global Partner</h4>
                <p className="text-xs text-[#8C7A6B] mt-1 max-w-xs leading-relaxed">
                  Automated high-frequency liquidity provider and validator staking protocol.
                </p>

                {/* Progress bar */}
                <div className="w-full bg-white h-2 rounded-full overflow-hidden mt-6 border border-[#EADCC9]">
                  <div 
                    className="bg-gradient-to-r from-[#F5BE27] to-[#D09009] h-full transition-all duration-1000"
                    style={{ width: `${((5 - timerSeconds) / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Claim Action */}
              <button
                disabled={!canClaim}
                onClick={handleClaim}
                className="w-full py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs shadow-md hover:opacity-95 active:scale-[0.98] transition disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {canClaim ? `Claim Rs${activeTaskPlan.dailyEarning.toLocaleString()} Yield` : `Wait ${timerSeconds}s to claim`}
                </span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
