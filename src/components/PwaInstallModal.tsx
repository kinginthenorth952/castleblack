import { useState } from 'react';
import { Download, Smartphone, Apple, Check, Share, PlusSquare, MoreVertical, X } from 'lucide-react';
import { PrimeInvestLogo } from './PrimeInvestLogo';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteName?: string;
  logoUrl?: string;
}

export function PwaInstallModal({ isOpen, onClose, siteName = 'SarmayaXProfit', logoUrl }: PwaInstallModalProps) {
  const [platformTab, setPlatformTab] = useState<'android' | 'ios'>('android');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm rounded-2xl bg-[#11151A] border border-[#252B33] p-5 shadow-2xl shadow-black/90 text-[#F4F1EA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252B33]">
          <div className="flex items-center gap-2.5">
            <PrimeInvestLogo size="sm" customLogoUrl={logoUrl} />
            <div>
              <h3 className="text-xs font-bold text-[#F4F1EA] uppercase tracking-wider">
                Install Mobile App
              </h3>
              <p className="text-[10px] text-[#7F8792]">Direct Fast PWA Web App</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#7F8792] hover:text-[#F4F1EA] transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Platform Switcher */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-[#171C22] border border-[#252B33]">
          <button
            onClick={() => setPlatformTab('android')}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              platformTab === 'android'
                ? 'bg-[#D6B36A] text-[#0B0D10] shadow-sm'
                : 'text-[#8F96A1] hover:text-[#F4F1EA]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>

          <button
            onClick={() => setPlatformTab('ios')}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              platformTab === 'ios'
                ? 'bg-[#D6B36A] text-[#0B0D10] shadow-sm'
                : 'text-[#8F96A1] hover:text-[#F4F1EA]'
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            <span>iOS / iPhone</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-4 space-y-3 text-xs">
          {platformTab === 'android' ? (
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#171C22] border border-[#252B33]">
                <div className="w-6 h-6 rounded-md bg-[#252B33] text-[#D6B36A] font-bold flex items-center justify-center text-[11px] shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-[#F4F1EA]">Open in Chrome Browser</p>
                  <p className="text-[11px] text-[#7F8792]">Ensure you are viewing this page on Google Chrome for Android.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#171C22] border border-[#252B33]">
                <div className="w-6 h-6 rounded-md bg-[#252B33] text-[#D6B36A] font-bold flex items-center justify-center text-[11px] shrink-0">
                  <MoreVertical className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#F4F1EA]">Tap Menu (Three Dots)</p>
                  <p className="text-[11px] text-[#7F8792]">Tap the ⋮ menu icon at the top right of the browser.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#171C22] border border-[#252B33]">
                <div className="w-6 h-6 rounded-md bg-[#252B33] text-[#63B889] font-bold flex items-center justify-center text-[11px] shrink-0">
                  <Download className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#63B889]">Tap "Install App" / "Add to Home"</p>
                  <p className="text-[11px] text-[#7F8792]">Enjoy full-screen high performance access with zero storage space.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#171C22] border border-[#252B33]">
                <div className="w-6 h-6 rounded-md bg-[#252B33] text-[#D6B36A] font-bold flex items-center justify-center text-[11px] shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-[#F4F1EA]">Open in Safari Browser</p>
                  <p className="text-[11px] text-[#7F8792]">Make sure you are browsing in Safari on your iPhone.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#171C22] border border-[#252B33]">
                <div className="w-6 h-6 rounded-md bg-[#252B33] text-[#D6B36A] font-bold flex items-center justify-center text-[11px] shrink-0">
                  <Share className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#F4F1EA]">Tap the Share Button</p>
                  <p className="text-[11px] text-[#7F8792]">Located in the middle bottom bar of Safari.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#171C22] border border-[#252B33]">
                <div className="w-6 h-6 rounded-md bg-[#252B33] text-[#63B889] font-bold flex items-center justify-center text-[11px] shrink-0">
                  <PlusSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#63B889]">Select "Add to Home Screen"</p>
                  <p className="text-[11px] text-[#7F8792]">Tap "Add" in the top right to create the app icon.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#D6B36A] hover:bg-[#E5C783] text-[#0B0D10] font-bold text-xs shadow-md transition"
        >
          Got It, Thanks!
        </button>
      </div>
    </div>
  );
}
