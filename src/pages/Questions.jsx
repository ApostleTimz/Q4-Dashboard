import { useState } from 'react';
import { Clock } from 'lucide-react';
import { categories, questions, stats } from '../data';
import CategoryPill from '../components/CategoryPill';

export default function Questions({ onOpenQuestion }) {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? questions : questions.filter((q) => q.category.toLowerCase().includes(active));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Questions</h1>
          <p className="mt-1 text-sm text-muted">Answer daily questions and stake your conviction.</p>
        </div>
        <div className="rounded-xl bg-panel px-4 py-2 text-right shadow-sm ring-1 ring-line">
          <p className="font-display text-lg font-extrabold text-violet">
            {stats.todayAnswered} / {stats.todayTotal}
          </p>
          <p className="text-[11px] text-muted">Remaining Today</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === c.key
                ? 'bg-violet text-white shadow-md shadow-violet/25'
                : 'bg-panel text-ink/60 ring-1 ring-line hover:text-ink'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((q) => (
          <button
            key={q.id}
            onClick={() => onOpenQuestion(q.id)}
            className="block w-full rounded-2xl bg-panel p-5 text-left shadow-sm ring-1 ring-line transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <CategoryPill category={q.category} />
                <p className="mt-2 font-display text-base font-bold leading-snug">{q.question}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                  <Clock size={12} /> Closes in {q.closes}
                </p>
                <p className="mt-1 text-xs text-muted">Total Pool: ${q.totalPool.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-6 sm:gap-8">
                <div className="text-center">
                  <p className="font-display text-xl font-extrabold text-yes">{q.yes}%</p>
                  <p className="text-[11px] font-semibold text-yes/70">YES · ${q.yesPool.toLocaleString()}</p>
                </div>
                <span className="text-xs font-semibold text-muted">VS</span>
                <div className="text-center">
                  <p className="font-display text-xl font-extrabold text-no">{q.no}%</p>
                  <p className="text-[11px] font-semibold text-no/70">NO · ${q.noPool.toLocaleString()}</p>
                </div>
                <span className="hidden shrink-0 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white sm:inline-block">
                  Answer Now
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
