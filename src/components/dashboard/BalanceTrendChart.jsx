import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '../shared/Card';
import { balanceTrendSeries } from '../../utils/financeCalculations';
import { formatCurrency, formatDate } from '../../utils/format';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-600 dark:bg-slate-800">
      <p className="font-medium text-slate-600 dark:text-slate-300">{formatDate(label)}</p>
      <p className="text-teal-700 dark:text-teal-300">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export function BalanceTrendChart({ transactions, loading }) {
  const data = balanceTrendSeries(transactions).map((d) => ({
    ...d,
    short: d.date.slice(5),
  }));

  return (
    <Card className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            Balance over time
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Running balance after each transaction</p>
        </div>
      </div>
      <div className="h-72 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading chart…</div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">No data to chart.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="short" tick={{ fontSize: 11 }} className="text-slate-500" />
              <YAxis
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
                tick={{ fontSize: 11 }}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#0d9488"
                strokeWidth={2}
                fill="url(#balanceFill)"
                isAnimationActive
                animationDuration={900}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
