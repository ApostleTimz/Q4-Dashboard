import React from 'react';
import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function TxRow({ tx }) {
  const isReceived = tx.type === 'received';
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
            isReceived ? 'border-black bg-black' : 'border-neutral-300 bg-white'
          }`}
        >
          {isReceived ? (
            <ArrowDownToLine size={15} className="text-white" strokeWidth={2} />
          ) : (
            <ArrowUpRight size={15} className="text-black" strokeWidth={2} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-black">
            {isReceived ? 'Received from ' : 'Sent to '}
            <span className="font-mono text-neutral-500">{tx.address}</span>
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">{tx.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${isReceived ? 'text-black' : 'text-neutral-500'}`}>
          {tx.amount} QUAI
        </p>
        <div className="mt-1 flex justify-end">
          <StatusBadge status={tx.status} />
        </div>
      </div>
    </div>
  );
}
