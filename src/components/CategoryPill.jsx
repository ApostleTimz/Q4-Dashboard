import { categoryStyles } from '../data';

export default function CategoryPill({ category }) {
  const style = categoryStyles[category] || { text: 'text-violet-dark', bg: 'bg-violet-light' };
  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold ${style.text} ${style.bg}`}
    >
      {category}
    </span>
  );
}
