import { AlertTriangle } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

export function ApiStatusBanner() {
  const loadError = useFinanceStore((s) => s.loadError);
  const usedFallback = useFinanceStore((s) => s.usedFallback);

  if (!usedFallback && !loadError) return null;

  return (
    <div
      className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-100"
      role="status"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">Offline / sample data</p>
        <p className="mt-0.5 text-amber-900/90 dark:text-amber-100/90">
          {loadError || 'The simulated API could not be reached. Showing bundled mock transactions.'}
        </p>
      </div>
    </div>
  );
}
