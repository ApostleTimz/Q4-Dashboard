import {
  LayoutGrid,
  HelpCircle,
  BookMarked,
  BarChart3,
  Trophy,
  Gift,
  Info,
  Sparkles,
} from 'lucide-react';
import { user } from '../data';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { key: 'questions', label: 'Questions', icon: HelpCircle },
  { key: 'convictions', label: 'My Convictions', icon: BookMarked },
  { key: 'results', label: 'Results', icon: BarChart3 },
  { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { key: 'rewards', label: 'Rewards', icon: Gift },
  { key: 'how', label: 'How Q4 Works', icon: Info },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col bg-navy text-white">
      <div className="flex items-center gap-2 px-6 pt-7 pb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet">
          <Sparkles size={16} strokeWidth={2.5} className="text-white" />
        </div>
        <span className="font-display text-xl font-extrabold tracking-tight text-white">Q4</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-violet text-white shadow-lg shadow-violet/30'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/15 px-4 py-5">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-white/60">My Balance</p>
        <p className="mb-3 font-display text-lg font-bold text-white">{user.balance.toFixed(2)} Quai</p>
        <button className="mb-4 w-full rounded-xl bg-violet py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-dark">
          + Add Funds
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet to-fuchsia-500 text-xs font-bold text-white">
            AJ
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-white">{user.fullName}</p>
            <p className="text-xs text-white/60">Level {user.level}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
