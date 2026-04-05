import { Pencil } from 'lucide-react';
import { Table, Th, Td } from '../shared/Table';
import { formatCurrency, formatDate } from '../../utils/format';
import { Button } from '../shared/Button';

export function TransactionTable({ rows, isAdmin, onEdit }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Date</Th>
          <Th>Description</Th>
          <Th>Category</Th>
          <Th>Type</Th>
          <Th className="text-right">Amount</Th>
          {isAdmin && <Th className="w-24 text-right">Actions</Th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
            <Td className="whitespace-nowrap">{formatDate(t.date)}</Td>
            <Td className="max-w-[200px] truncate text-slate-600 dark:text-slate-400">
              {t.description || '—'}
            </Td>
            <Td>{t.category}</Td>
            <Td>
              <span
                className={[
                  'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
                  t.type === 'income'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300',
                ].join(' ')}
              >
                {t.type === 'income' ? 'Income' : 'Expense'}
              </span>
            </Td>
            <Td
              className={[
                'text-right font-medium tabular-nums',
                t.type === 'income' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400',
              ].join(' ')}
            >
              {t.type === 'income' ? '+' : '−'}
              {formatCurrency(t.amount)}
            </Td>
            {isAdmin && (
              <Td className="text-right">
                <Button variant="ghost" className="!p-2" onClick={() => onEdit(t)} aria-label="Edit transaction">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
