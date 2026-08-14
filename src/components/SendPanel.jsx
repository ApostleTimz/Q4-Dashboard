import React, { useState } from 'react';
import { Check, ArrowLeft, X } from 'lucide-react';

export default function SendPanel({ onClose }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
          <Check size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-lg font-semibold text-black">Transaction submitted</p>
          <p className="mt-1 text-sm text-neutral-500">Sending {amount || '0.00'} QUAI to {recipient || 'recipient'}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Back to wallet
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
          >
            <ArrowLeft size={17} />
          </button>
          <h2 className="text-lg font-semibold text-black">Send QUAI</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-black"
        >
          <X size={17} />
        </button>
      </div>

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">Recipient address</label>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="0x..."
        className="mb-5 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-sm text-black placeholder-neutral-400 outline-none transition focus:border-black"
      />

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">Amount</label>
      <div className="mb-5 flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-3 transition focus-within:border-black">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-transparent text-sm text-black placeholder-neutral-400 outline-none"
        />
        <span className="mx-2 text-sm text-neutral-400">QUAI</span>
        <button onClick={() => setAmount('1250.75')} className="text-xs font-semibold text-black underline underline-offset-2">Max</button>
      </div>

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">Network / Asset</label>
      <button className="mb-6 flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black" />
          Quai Network (QUAI)
        </span>
        <span className="text-neutral-400">▼</span>
      </button>

      <div className="mb-6 space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Network fee (est.)</span>
          <span className="font-medium text-black">0.10 QUAI</span>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
          <span className="text-neutral-500">Total</span>
          <span className="font-semibold text-black">{amount ? (parseFloat(amount) + 0.1).toFixed(2) : '0.00'} QUAI</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-50">Cancel</button>
        <button
          onClick={() => setConfirmed(true)}
          disabled={!recipient || !amount}
          className="flex-1 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
