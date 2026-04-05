import { X } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-100',
  warning: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-100',
  info: 'border-slate-200 bg-white text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
};

export function ToastStack() {
  const toasts = useFinanceStore((s) => s.toasts);
  const dismissToast = useFinanceStore((s) => s.dismissToast);

  if (!toasts.length) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      role="region"
      aria-live="polite"
    >
      {toasts.map((t, i) => (
        <div
          key={t.id}
          style={{ animationDelay: `${i * 50}ms` }}
          className={[
            'pointer-events-auto flex animate-slide-up items-start gap-3 rounded-xl border px-4 py-3 shadow-lg',
            styles[t.variant] || styles.info,
          ].join(' ')}
        >
          <p className="flex-1 text-sm font-medium">{t.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="rounded-lg p-1 text-slate-500 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
