import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../shared/Card';
import { formatCurrency } from '../../utils/format';
import { totalBalance, sumIncome, sumExpenses } from '../../utils/financeCalculations';

export function SummaryCards({ transactions }) {
  const balance = totalBalance(transactions);
  const income = sumIncome(transactions);
  const expenses = sumExpenses(transactions);

  const items = [
    {
      label: 'Total balance',
      value: formatCurrency(balance),
      icon: Wallet,
      accent: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/50',
    },
    {
      label: 'Total income',
      value: formatCurrency(income),
      icon: TrendingUp,
      accent: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      label: 'Total expenses',
      value: formatCurrency(expenses),
      icon: TrendingDown,
      accent: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/50',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, value, icon: Icon, accent, bg }) => (
        <Card key={label} hover className="animate-fade-in">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {value}
              </p>
            </div>
            <div className={`rounded-xl p-3 ${bg}`}>
              <Icon className={`h-6 w-6 ${accent}`} aria-hidden />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
