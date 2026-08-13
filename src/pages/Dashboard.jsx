import { CheckCircle2, RefreshCcw, ChevronRight, Clock } from 'lucide-react';
import { user, stats, questions, todaysQuestions, recentActivity, categories } from '../data';
import CategoryPill from '../components/CategoryPill';
import YesNoBar from '../components/YesNoBar';

const categoryIconBg = [
  'bg-violet-light text-violet-dark',
  'bg-sky-50 text-sky-600',
  'bg-fuchsia-50 text-fuchsia-600',
  'bg-rose-50 text-rose-500',
  'bg-teal-50 text-teal-600',
  'bg-amber-50 text-amber-600',
];

export default function Dashboard({ onOpenQuestion, onNavigate }) {
  const featured = questions[0];
  const progress = stats.todayAnswered / stats.todayTotal;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink">Good evening, {user.name} 👋</h1>
        <p className="mt-1 text-sm text-muted">Your daily conviction shapes tomorrow.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl bg-panel p-5 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted">Today's Progress</p>
              <p className="mt-2 font-display text-2xl font-extrabold">
                {stats.todayAnswered} / {stats.todayTotal}
              </p>
              <p className="mt-1 text-xs text-muted">Questions answered</p>
            </div>
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--color-violet) ${progress * 360}deg, var(--color-line) 0deg)`,
              }}
            >
              <div className="h-8 w-8 rounded-full bg-panel" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-panel p-5 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
          <p className="text-xs font-medium text-muted">Total Staked</p>
          <p className="mt-2 font-display text-2xl font-extrabold">{stats.totalStaked.toFixed(2)} Quai</p>
          <p className="mt-1 text-xs text-muted">Across all questions</p>
        </div>

        <div className="rounded-2xl bg-panel p-5 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
          <p className="text-xs font-medium text-muted">Potential Rewards</p>
          <p className="mt-2 font-display text-2xl font-extrabold">{stats.potentialRewards.toFixed(2)} Quai</p>
          <p className="mt-1 text-xs text-muted">Estimated earnings</p>
        </div>

        <div className="rounded-2xl bg-panel p-5 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
          <p className="text-xs font-medium text-muted">Accuracy</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-yes">{stats.accuracy}%</p>
          <p className="mt-1 text-xs text-muted">Correct predictions</p>
        </div>
      </div>

      {/* Today's Questions */}
      <div className="rounded-2xl bg-panel p-6 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-bold">Today's Questions</h2>
          <span className="text-xs font-medium text-muted">{stats.todayTotal - stats.todayAnswered} remaining</span>
        </div>

        <button
          onClick={() => onOpenQuestion(featured.id)}
          className="mb-4 block w-full rounded-2xl border border-line p-5 text-left transition-shadow hover:shadow-md"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <CategoryPill category={featured.category} />
              <p className="mt-2 font-display text-base font-bold leading-snug">{featured.question}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                <Clock size={12} /> Closes in {featured.closes}
              </p>
            </div>
            <div className="w-full sm:w-72">
              <YesNoBar yes={featured.yes} no={featured.no} yesPool={featured.yesPool} noPool={featured.noPool} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <p className="text-xs text-muted">Total Pool: ${featured.totalPool.toLocaleString()}</p>
            <span className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white">Answer Now</span>
          </div>
        </button>

        <div className="grid gap-4 sm:grid-cols-3">
          {todaysQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => onOpenQuestion(q.id)}
              className="rounded-2xl border border-line p-4 text-left transition-shadow hover:shadow-md"
            >
              <CategoryPill category={q.category} />
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{q.question}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-muted">
                <Clock size={11} /> Closes in {q.closes}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold">
                <span className="text-yes">YES {q.yes}%</span>
                <span className="text-no">NO {q.no}%</span>
              </div>
              <p className="mt-1 text-[11px] text-muted">Total Pool: ${q.totalPool.toLocaleString()}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity + categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-panel p-6 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
          <h2 className="mb-4 font-display text-base font-bold">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                {a.type === 'yes' ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-yes" />
                ) : (
                  <RefreshCcw size={18} className="mt-0.5 shrink-0 text-violet" />
                )}
                <div className="flex-1">
                  <p className="text-sm leading-snug text-ink/80">{a.text}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-panel p-6 shadow-sm shadow-ink/[0.02] ring-1 ring-line">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Explore Categories</h2>
            <button
              onClick={() => onNavigate('questions')}
              className="flex items-center gap-0.5 text-xs font-semibold text-violet hover:text-violet-dark"
            >
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories
              .filter((c) => c.key !== 'all')
              .map((c, i) => (
                <button
                  key={c.key}
                  onClick={() => onNavigate('questions')}
                  className="flex flex-col items-center gap-2 rounded-xl border border-line py-4 text-center transition-shadow hover:shadow-md"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${categoryIconBg[i % categoryIconBg.length]}`}
                  >
                    {c.label[0]}
                  </span>
                  <span className="px-1 text-[11px] font-medium leading-tight text-ink/70">{c.label}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
