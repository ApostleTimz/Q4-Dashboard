import React, { useState } from 'react';
import { Eye, EyeOff, RefreshCw, ArrowUpRight, ArrowDownToLine, ChevronDown } from 'lucide-react';
import { TRANSACTIONS } from '../data/walletData';
import TxRow from './TxRow';

export default function WalletView({ onNavigate }) {
  const [showBalance, setShowBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1400);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-black">Wallet</h1>
        <button className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-black">
          <span className="h-2 w-2 rounded-full bg-black" />
          Quai Network
          <ChevronDown size={14} className="text-neutral-400" />
        </button>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl bg-black p-7 text-white">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setShowBalance((s) => !s)}
              className="flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-white"
            >
              Your balance
              {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            {refreshing ? (
              <div className="mt-3 flex items-center gap-2 text-2xl font-semibold">
                <RefreshCw size={20} className="animate-spin text-neutral-400" />
              </div>
            ) : (
              <>
                <p className="mt-2 text-4xl font-semibold tracking-tight">
                  {showBalance ? '1,250.75' : '••••••'} <span className="text-xl font-medium text-neutral-400">QUAI</span>
                </p>
                <p className="mt-1 text-sm text-neutral-400">≈ {showBalance ? '$2,187.45' : '••••••'} USD</p>
              </>
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-2xl font-bold text-white/80">Q</div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-3">
        <button onClick={() => onNavigate('send')} className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800">
          <ArrowUpRight size={16} />
          Send
        </button>
        <button onClick={() => onNavigate('receive')} className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-50">
          <ArrowDownToLine size={16} />
          Receive
        </button>
        <button onClick={handleRefresh} className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-50">
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-black">Recent transactions</h3>
        <button className="text-xs font-medium text-neutral-500 hover:text-black">View all</button>
      </div>
      <div className="mt-1">
        {TRANSACTIONS.map((tx) => (
          <TxRow key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
