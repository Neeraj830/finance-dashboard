import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Lightbulb, RefreshCw } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import { ToastStack } from './ToastStack';
import { useFinanceStore } from '../../store/useFinanceStore';

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ListOrdered },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
];

export function Layout() {
  const loadTransactions = useFinanceStore((s) => s.loadTransactions);
  const loading = useFinanceStore((s) => s.loading);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white shadow-md dark:bg-teal-500">
              F
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Finance Dashboard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Income, expenses & insights</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <RoleSwitcher />
            <Button
              variant="secondary"
              className="!py-2 !text-xs sm:!text-sm"
              disabled={loading}
              onClick={() => loadTransactions({ force: true })}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh data
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <nav className="border-t border-slate-100 px-4 dark:border-slate-800 sm:px-6 lg:px-8">
          <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-2">
            {nav.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-200'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                    ].join(' ')
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <ToastStack />
    </div>
  );
}
