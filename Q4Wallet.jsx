import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  LineChart,
  Clock,
  User,
  Settings,
  Moon,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react';
import WalletView from './src/components/WalletView';
import SendPanel from './src/components/SendPanel';
import ReceivePanel from './src/components/ReceivePanel';

const NAV_ITEMS = [
  { key: 'wallet', label: 'Wallet', icon: WalletIcon },
  { key: 'markets', label: 'Markets', icon: LineChart },
  { key: 'activity', label: 'Activity', icon: Clock },
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'settings', label: 'Settings', icon: Settings },
];

// ---- App shell ----------------------------------------------------------------

export default function Q4Wallet() {
  const [active, setActive] = useState("wallet");
  const [panel, setPanel] = useState(null); // null | 'send' | 'receive'

  return (
    <div className="flex min-h-[720px] w-full bg-neutral-50 font-sans text-black">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-200 bg-white p-5 sm:flex">
        <div className="mb-8 flex items-center gap-2 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
            Q4
          </div>
          <span className="text-sm font-semibold tracking-tight text-black">Q4 Wallet</span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setPanel(null);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button className="mt-4 flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50">
          <Moon size={15} />
          Dark mode
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
          {active !== "wallet" ? (
            <div className="flex h-96 flex-col items-center justify-center text-center text-neutral-400">
              <p className="text-sm">
                {NAV_ITEMS.find((n) => n.key === active)?.label} isn't part of this preview.
              </p>
              <button
                onClick={() => setActive("wallet")}
                className="mt-3 text-sm font-medium text-black underline underline-offset-2"
              >
                Back to wallet
              </button>
            </div>
          ) : panel === 'send' ? (
            <SendPanel onClose={() => setPanel(null)} />
          ) : panel === 'receive' ? (
            <ReceivePanel onClose={() => setPanel(null)} />
          ) : (
            <WalletView onNavigate={setPanel} />
          )}
        </div>
      </main>
    </div>
  );
}
