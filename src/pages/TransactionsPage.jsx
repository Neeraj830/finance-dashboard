import { useMemo, useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';
import { EmptyState } from '../components/shared/EmptyState';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionFormModal } from '../components/transactions/TransactionFormModal';
import { useFinanceStore } from '../store/useFinanceStore';
import { filterTransactions, sortTransactions } from '../utils/financeCalculations';
import { downloadJson, downloadTextFile, transactionsToCsv } from '../utils/csvExport';

export function TransactionsPage() {
  const transactions = useFinanceStore((s) => s.transactions);
  const loading = useFinanceStore((s) => s.loading);
  const role = useFinanceStore((s) => s.role);
  const search = useFinanceStore((s) => s.search);
  const setSearch = useFinanceStore((s) => s.setSearch);
  const typeFilter = useFinanceStore((s) => s.typeFilter);
  const setTypeFilter = useFinanceStore((s) => s.setTypeFilter);
  const categoryFilter = useFinanceStore((s) => s.categoryFilter);
  const setCategoryFilter = useFinanceStore((s) => s.setCategoryFilter);
  const sortBy = useFinanceStore((s) => s.sortBy);
  const sortDir = useFinanceStore((s) => s.sortDir);
  const setSort = useFinanceStore((s) => s.setSort);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const updateTransaction = useFinanceStore((s) => s.updateTransaction);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const isAdmin = role === 'admin';

  const filtered = useMemo(
    () =>
      sortTransactions(
        filterTransactions(transactions, { search, typeFilter, categoryFilter }),
        sortBy,
        sortDir
      ),
    [transactions, search, typeFilter, categoryFilter, sortBy, sortDir]
  );

  const handleExportCsv = () => {
    const csv = transactionsToCsv(filtered);
    downloadTextFile(`transactions-${new Date().toISOString().slice(0, 10)}.csv`, csv);
    useFinanceStore.getState().addToast('Exported CSV.', 'success');
  };

  const handleExportJson = () => {
    downloadJson(`transactions-${new Date().toISOString().slice(0, 10)}.json`, filtered);
    useFinanceStore.getState().addToast('Exported JSON.', 'success');
  };

  const handleSubmit = (payload) => {
    if (editing) {
      updateTransaction(editing.id, payload);
    } else {
      addTransaction(payload);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Transactions</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Search, filter, and sort. {isAdmin ? 'You can add or edit entries.' : 'Viewer mode — read only.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleExportCsv} disabled={!filtered.length}>
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="secondary" onClick={handleExportJson} disabled={!filtered.length}>
            <Download className="h-4 w-4" />
            JSON
          </Button>
          {isAdmin && (
            <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
              <Plus className="h-4 w-4" />
              Add transaction
            </Button>
          )}
        </div>
      </div>

      <Card>
        <TransactionFilters
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          sortBy={sortBy}
          sortDir={sortDir}
          onSortChange={setSort}
        />
      </Card>

      <div>
        {loading && transactions.length === 0 ? (
          <Card className="py-16 text-center text-slate-500">Loading transactions…</Card>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No transactions match"
            description="Try adjusting filters or add a new transaction (Admin)."
            action={
              isAdmin ? (
                <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
                  <Plus className="h-4 w-4" />
                  Add transaction
                </Button>
              ) : null
            }
          />
        ) : (
          <TransactionTable
            rows={filtered}
            isAdmin={isAdmin}
            onEdit={(t) => {
              setEditing(t);
              setModalOpen(true);
            }}
          />
        )}
      </div>

      <TransactionFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </div>
  );
}
