import { Trophy, ArrowRight } from 'lucide-react';
import { howItWorks } from '../data';

export default function HowItWorks({ onNavigate }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">How Q4 Works</h1>
        <p className="mt-1 text-sm text-muted">A simple process built on economic conviction.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {howItWorks.map((s) => (
          <div key={s.step} className="rounded-2xl bg-panel p-5 shadow-sm ring-1 ring-line">
            <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-light text-xs font-bold text-violet-dark">
              {s.step}
            </span>
            <h3 className="font-display text-sm font-bold">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
            <Trophy size={22} />
          </span>
          <div>
            <p className="font-display text-sm font-bold">Q4 measures economic conviction, not popularity.</p>
            <p className="text-xs text-white/50">Your belief has power. Make it count.</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('questions')}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-violet px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-violet-dark"
        >
          Start Predicting Now <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
