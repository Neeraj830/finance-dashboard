import { Inbox } from 'lucide-react';

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-800/30">
      <Inbox className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" aria-hidden />
      <h3 className="font-display text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
