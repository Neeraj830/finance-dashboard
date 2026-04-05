import { TrendingDown, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import { Card } from '../components/shared/Card';
import { useFinanceStore } from '../store/useFinanceStore';
import {
  highestSpendingCategory,
  compareLatestTwoMonths,
  sumIncome,
  sumExpenses,
} from '../utils/financeCalculations';
import { formatCurrency } from '../utils/format';

export function InsightsPage() {
  const transactions = useFinanceStore((s) => s.transactions);
  const loading = useFinanceStore((s) => s.loading);

  const top = highestSpendingCategory(transactions);
  const cmp = compareLatestTwoMonths(transactions);
  const totalIncome = sumIncome(transactions);
  const totalExpenses = sumExpenses(transactions);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const insights = [];
  if (top) {
    insights.push(`Highest spending is in ${top.name} (${formatCurrency(top.value)}).`);
  }
  if (cmp.expenseDelta > 0) {
    insights.push(`Spending this month is ${formatCurrency(cmp.expenseDelta)} higher than last month.`);
  } else if (cmp.expenseDelta < 0) {
    insights.push(`You spent ${formatCurrency(Math.abs(cmp.expenseDelta))} less than last month.`);
  }
  if (savingsRate > 15) {
    insights.push(`Healthy savings rate around ${savingsRate.toFixed(0)}% of income.`);
  } else if (savingsRate < 0) {
    insights.push('Expenses exceed income in the dataset — consider reviewing large categories.');
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Insights</h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">Derived from your current transaction list.</p>
      </div>

      {loading && transactions.length === 0 ? (
        <Card className="py-16 text-center text-slate-500">Loading insights…</Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card hover className="animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/50">
                <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white">Highest spending category</h3>
                {top ? (
                  <p className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">{top.name}</p>
                ) : (
                  <p className="mt-2 text-slate-500">No expense data yet.</p>
                )}
                {top && <p className="mt-1 text-sm text-slate-500">{formatCurrency(top.value)} total</p>}
              </div>
            </div>
          </Card>

          <Card hover className="animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-teal-50 p-3 dark:bg-teal-950/50">
                <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-slate-900 dark:text-white">Month vs month</h3>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                  {cmp.lastMonthKey ? `${cmp.lastMonthKey} → ${cmp.thisMonthKey}` : cmp.thisMonthKey}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-slate-500">This month income</dt>
                    <dd className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {formatCurrency(cmp.thisMonth.income)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Last month income</dt>
                    <dd className="font-semibold text-slate-700 dark:text-slate-200">
                      {formatCurrency(cmp.lastMonth.income)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">This month expenses</dt>
                    <dd className="font-semibold text-rose-700 dark:text-rose-400">
                      {formatCurrency(cmp.thisMonth.expense)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Last month expenses</dt>
                    <dd className="font-semibold text-slate-700 dark:text-slate-200">
                      {formatCurrency(cmp.lastMonth.expense)}
                    </dd>
                  </div>
                </dl>
                {cmp.lastMonthKey && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    {cmp.expenseDelta <= 0 ? (
                      <>
                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-700 dark:text-emerald-400">Lower or same expenses vs prior month</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-4 w-4 text-rose-600" />
                        <span className="text-rose-700 dark:text-rose-400">Higher expenses vs prior month</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="animate-fade-in lg:col-span-2">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white">Quick takeaways</h3>
                {insights.length === 0 ? (
                  <p className="mt-2 text-slate-500">Add more transactions to unlock richer insights.</p>
                ) : (
                  <ul className="mt-3 list-inside list-disc space-y-2 text-slate-600 dark:text-slate-300">
                    {insights.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
