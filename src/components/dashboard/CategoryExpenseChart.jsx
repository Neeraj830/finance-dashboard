import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../shared/Card';
import { expenseByCategory } from '../../utils/financeCalculations';
import { formatCurrency } from '../../utils/format';

const COLORS = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#f43f5e', '#f97316', '#eab308', '#8b5cf6', '#6366f1', '#64748b'];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-600 dark:bg-slate-800">
      <p className="font-medium text-slate-800 dark:text-slate-100">{p.name}</p>
      <p className="text-slate-600 dark:text-slate-300">{formatCurrency(p.value)}</p>
    </div>
  );
}

export function CategoryExpenseChart({ transactions, loading }) {
  const data = expenseByCategory(transactions).map((d) => ({ name: d.name, value: d.value }));

  return (
    <Card className="animate-fade-in">
      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
          Expenses by category
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Share of total spending</p>
      </div>
      <div className="h-72 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading chart…</div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">No expense data.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={88}
                paddingAngle={2}
                isAnimationActive
                animationDuration={800}
              >
                {data.map((_, index) => (
                  <Cell key={data[index].name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-xs text-slate-600 dark:text-slate-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
