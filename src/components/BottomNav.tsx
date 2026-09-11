import { useState } from 'react';
import { CheckSquare, Home, Layers, PlayCircle, Plus, User, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeInvestLogo } from './PrimeInvestLogo';
import { QuickActionSheet } from './QuickActionSheet';
import { ProfitCalculatorModal } from './ProfitCalculatorModal';
import { CommissionTransferModal } from './CommissionTransferModal';

export function BottomNav() {
  const { currentView, setCurrentView, settings } = useApp();
  const [showQuickSheet, setShowQuickSheet] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  // Hide on admin or login/register/landing
  if (currentView === 'admin' || currentView === 'login' || currentView === 'register' || currentView === 'landing') {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-40 max-w-md mx-auto pointer-events-none pb-2 sm:pb-3 px-3 sm:px-4">
        <div className="pointer-events-auto relative w-full h-16 rounded-2xl backdrop-blur-2xl bg-white/95 border border-[#EADCC9] shadow-xl shadow-[#3C3024]/10 text-[#3C3024] flex items-center justify-around px-2 transition-all duration-300">
          {/* Home */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl transition duration-200 relative ${
              currentView === 'dashboard'
                ? 'text-[#D09009] font-bold bg-[#FCF8F2] shadow-xs'
                : 'text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] tracking-tight mt-0.5">Home</span>
            {currentView === 'dashboard' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#D09009]" />
            )}
          </button>

          {/* Plans */}
          <button
            onClick={() => setCurrentView('plans')}
            className={`flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl transition duration-200 relative ${
              currentView === 'plans'
                ? 'text-[#D09009] font-bold bg-[#FCF8F2] shadow-xs'
                : 'text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px] tracking-tight mt-0.5">Plans</span>
            {currentView === 'plans' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#D09009]" />
            )}
          </button>

          {/* Center Action Button - Opens Mobile Quick Sheet */}
          <div className="-mt-6">
            <button
              onClick={() => setShowQuickSheet(true)}
              className="group relative p-1 rounded-2xl bg-gradient-to-b from-[#F5BE27] to-[#D09009] shadow-lg shadow-[#D09009]/30 transition transform hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Open Quick Utilities"
            >
              <div className="relative">
                <PrimeInvestLogo size="md" customLogoUrl={settings?.logoUrl} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FDFBF7] border border-[#D09009] flex items-center justify-center text-[8px] font-bold text-[#D09009]">
                  <Plus className="w-2.5 h-2.5" />
                </span>
              </div>
            </button>
          </div>

          {/* Tasks */}
          <button
            onClick={() => setCurrentView('tasks')}
            className={`flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl transition duration-200 relative ${
              currentView === 'tasks'
                ? 'text-[#D09009] font-bold bg-[#FCF8F2] shadow-xs'
                : 'text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2]'
            }`}
            title="Daily Tasks & Earnings"
          >
            <PlayCircle className="w-4 h-4" />
            <span className="text-[10px] tracking-tight mt-0.5">Tasks</span>
            {currentView === 'tasks' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#D09009]" />
            )}
          </button>

          {/* Profile */}
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center justify-center min-w-[52px] h-12 rounded-xl transition duration-200 relative ${
              currentView === 'profile'
                ? 'text-[#D09009] font-bold bg-[#FCF8F2] shadow-xs'
                : 'text-[#8C7A6B] hover:text-[#3C3024] hover:bg-[#FCF8F2]'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] tracking-tight mt-0.5">Profile</span>
            {currentView === 'profile' && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#D09009]" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Action Sheet & Modals */}
      <QuickActionSheet
        isOpen={showQuickSheet}
        onClose={() => setShowQuickSheet(false)}
        onOpenCalculator={() => setShowCalculator(true)}
        onOpenTransfer={() => setShowTransfer(true)}
      />

      <ProfitCalculatorModal
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      <CommissionTransferModal
        isOpen={showTransfer}
        onClose={() => setShowTransfer(false)}
      />
    </>
  );
}
