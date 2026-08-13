import { useState } from 'react';
import { ArrowLeft, Share2, Clock, CheckCircle2 } from 'lucide-react';
import { questions } from '../data';
import CategoryPill from '../components/CategoryPill';
import YesNoBar from '../components/YesNoBar';

const TABS = ['About', 'How It Resolves', 'Rules'];

export default function QuestionDetail({ questionId, onBack }) {
  const [tab, setTab] = useState('About');
  const q = questions.find((item) => item.id === questionId) ?? questions[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft size={16} /> Back to Questions
        </button>
        <div className="flex items-center gap-2">
          <CategoryPill category={q.category} />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-panel text-muted ring-1 ring-line hover:text-ink">
            <Share2 size={14} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-panel p-6 shadow-sm ring-1 ring-line sm:p-8">
        <h1 className="font-display text-xl font-extrabold leading-snug sm:text-2xl">{q.question}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <Clock size={14} /> Closes in {q.closes} · Total Pool: ${q.totalPool.toLocaleString()}
        </p>

        <div className="mt-6">
          <YesNoBar yes={q.yes} no={q.no} yesPool={q.yesPool} noPool={q.noPool} size="lg" />
        </div>

        {q.yourPosition && (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-bg p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-muted">Your Position</p>
                <span className="mt-1 inline-block rounded-md bg-yes px-2.5 py-1 text-xs font-bold text-white">
                  {q.yourPosition}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted">Staked</p>
                <p className="mt-1 font-display text-sm font-bold">{q.yourStake.toFixed(2)} Quai</p>
              </div>
            </div>
            <button className="rounded-xl bg-violet-light px-4 py-2 text-sm font-semibold text-violet-dark hover:bg-violet/20">
              Switch Position
            </button>
          </div>
        )}

        <div className="mt-6 space-y-2 rounded-2xl border border-line p-4 text-sm text-ink/70">
          <p className="mb-2 flex items-center gap-2 font-semibold text-ink">
            <CheckCircle2 size={15} className="text-violet" /> Switch Policy
          </p>
          <p>You can switch your position only once per game.</p>
          <p>Switch allowed only when at least 5 minutes remain before the market closes.</p>
          <p>When you switch, your original stake moves to the new position.</p>
          <p>Once you switch, you cannot switch again for that game.</p>
        </div>

        <div className="mt-6 flex gap-1 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 pb-3 text-sm font-semibold transition-colors ${
                tab === t ? 'border-b-2 border-violet text-violet' : 'text-muted hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-bg p-4 text-sm leading-relaxed text-ink/70">
          {tab === 'About' && (
            <p>
              {q.resolves || 'This market resolves based on the real-world outcome of the stated question.'}
            </p>
          )}
          {tab === 'How It Resolves' && (
            <p>{q.resolution || 'Resolution will be based on official announcements from verified sources.'}</p>
          )}
          {tab === 'Rules' && (
            <p>Standard Q4 market rules apply. Stakes are final once the market closes and cannot be withdrawn.</p>
          )}
        </div>

        <p className="mt-4 rounded-xl bg-violet-light p-3 text-xs text-violet-dark">
          Your stake will be included in the total pool on the selected side.
        </p>
      </div>
    </div>
  );
}
