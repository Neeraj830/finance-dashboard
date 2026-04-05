import { Moon, Sun } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

export function ThemeToggle() {
  const darkMode = useFinanceStore((s) => s.darkMode);
  const setDarkMode = useFinanceStore((s) => s.setDarkMode);

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
