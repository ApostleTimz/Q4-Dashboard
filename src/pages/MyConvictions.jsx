import { useState } from 'react';
import { Info } from 'lucide-react';
import { convictions, convictionStats } from '../data';
import CategoryPill from '../components/CategoryPill';

const TABS = ['Open', 'Resolved', 'Cancelled'];

export default function MyConvictions() {
  const [tab, setTab] = useState('Open');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">My Convictions</h1>
        <p className="mt-1 text-sm text-muted">Track your answers, switches, and performance.</p>
      </div>

      <div className="flex gap-1 rounded-xl bg-panel p-1 shadow-sm ring-1 ring-line w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === t ? 'bg-violet text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl bg-panel shadow-sm ring-1 ring-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="px-5 py-3.5">Question</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Your Answer</th>
              <th className="px-5 py-3.5">Staked</th>
              <th className="px-5 py-3.5">Current Side %</th>
              <th className="px-5 py-3.5">Total Pool</th>
              <th className="px-5 py-3.5">Switched</th>
              <th className="px-5 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {tab === 'Open' ? (
              convictions.map((c, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  <td className="max-w-[220px] px-5 py-4 font-medium leading-snug">{c.question}</td>
                  <td className="px-5 py-4">
                    <CategoryPill category={c.category} />
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-bold ${
                        c.answer === 'YES' ? 'bg-yes-bg text-yes' : 'bg-violet-light text-violet-dark'
                      }`}
                    >
                      {c.answer}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold">{c.staked.toFixed(2)} Quai</td>
                  <td className="px-5 py-4 font-semibold text-yes">{c.side}%</td>
                  <td className="px-5 py-4 text-muted">${c.totalPool.toLocaleString()}</td>
                  <td className="px-5 py-4 text-muted">{c.switched}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-violet-light px-2.5 py-1 text-xs font-semibold text-violet-dark">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm text-muted">
                  No {tab.toLowerCase()} convictions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Questions" value={convictionStats.totalQuestions} />
        <StatCard label="Correct Predictions" value={convictionStats.correctPredictions} accent="text-yes" />
        <StatCard label="Accuracy" value={`${convictionStats.accuracy}%`} accent="text-violet" />
        <StatCard label="Total Staked" value={`${convictionStats.totalStaked.toFixed(2)} Quai`} />
        <StatCard label="Potential Rewards" value={`${convictionStats.potentialRewards.toFixed(2)} Quai`} />
      </div>

      <p className="flex items-center gap-2 rounded-xl bg-violet-light px-4 py-3 text-xs text-violet-dark">
        <Info size={14} className="shrink-0" />
        You can switch your position only once per game, and only if at least 5 minutes remain before it closes.
      </p>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl bg-panel p-5 text-center shadow-sm ring-1 ring-line">
      <p className={`font-display text-xl font-extrabold ${accent || 'text-ink'}`}>{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
