import { Shield, Eye } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

export function RoleSwitcher() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  return (
    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
      <span className="hidden sm:inline">Role</span>
      <div className="relative">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={[
            'appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm font-medium text-slate-800',
            'shadow-sm transition hover:border-slate-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30',
            'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500',
          ].join(' ')}
          aria-label="Switch role"
        >
          <option value="viewer">Viewer (read-only)</option>
          <option value="admin">Admin (edit)</option>
        </select>
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500">
          {role === 'admin' ? <Shield className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </span>
      </div>
    </label>
  );
}
