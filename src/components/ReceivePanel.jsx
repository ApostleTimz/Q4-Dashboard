import React, { useState } from 'react';
import { Check, Copy, ArrowLeft, X } from 'lucide-react';
import { WALLET_ADDRESS } from '../data/walletData';

function QRPlaceholder() {
  const size = 21;
  const cells = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inFinder =
        (x < 7 && y < 7) ||
        (x > size - 8 && y < 7) ||
        (x < 7 && y > size - 8);
      const on = inFinder ? (x < 7 && y < 7 && (x === 0 || x === 6 || y === 0 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5))) : rand() > 0.58;
      cells.push(on);
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <rect width={size} height={size} fill="white" />
      {cells.map((on, i) =>
        on ? (
          <rect key={i} x={i % size} y={Math.floor(i / size)} width={1} height={1} fill="black" />
        ) : null
      )}
    </svg>
  );
}

export default function ReceivePanel({ onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
    } catch (e) {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
          >
            <ArrowLeft size={17} />
          </button>
          <h2 className="text-lg font-semibold text-black">Receive QUAI</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-black"
        >
          <X size={17} />
        </button>
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-black w-fit">
        <span className="h-2 w-2 rounded-full bg-black" />
        Quai Network
      </div>

      <div className="mb-5 flex items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="h-48 w-48">
          <QRPlaceholder />
        </div>
      </div>

      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">Your wallet address</p>
      <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
        <span className="truncate font-mono text-xs text-neutral-700">{WALLET_ADDRESS}</span>
      </div>

      <button
        onClick={copy}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? 'Copied' : 'Copy address'}
      </button>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-center text-xs text-neutral-500">Only send QUAI to this address via Quai Network.</div>
    </div>
  );
}
