import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { CategoryExpenseChart } from '../components/dashboard/CategoryExpenseChart';
import { useFinanceStore } from '../store/useFinanceStore';

export function DashboardPage() {
  const transactions = useFinanceStore((s) => s.transactions);
  const loading = useFinanceStore((s) => s.loading);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Key metrics and trends for your finances.</p>
      </div>
      <SummaryCards transactions={transactions} />
      <div className="grid gap-6 lg:grid-cols-2">
        <BalanceTrendChart transactions={transactions} loading={loading} />
        <CategoryExpenseChart transactions={transactions} loading={loading} />
      </div>
    </div>
  );
}
