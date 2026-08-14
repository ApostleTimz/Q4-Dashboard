import React from 'react';

export default function StatusBadge({ status }) {
  const map = {
    pending: { label: 'Pending', dot: 'bg-neutral-400' },
    successful: { label: 'Successful', dot: 'bg-black' },
    failed: { label: 'Failed', dot: 'bg-neutral-300' },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium tracking-wide text-neutral-700`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
