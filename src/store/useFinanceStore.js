import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_TRANSACTIONS } from '../data/mockTransactions';
import { fetchTransactionsFromApi } from '../utils/api';

const emptyToasts = [];

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      role: 'viewer',
      darkMode: false,
      loading: false,
      loadError: null,
      usedFallback: false,
      search: '',
      typeFilter: 'all',
      categoryFilter: 'all',
      sortBy: 'date',
      sortDir: 'desc',
      toasts: emptyToasts,

      setRole: (role) => set({ role }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setSearch: (search) => set({ search }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setSort: (sortBy, sortDir) => set({ sortBy, sortDir }),

      addToast: (message, variant = 'info') => {
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        set((s) => ({
          toasts: [...s.toasts, { id, message, variant }],
        }));
        setTimeout(() => {
          get().dismissToast(id);
        }, 4000);
      },

      dismissToast: (id) =>
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== id),
        })),

      /**
       * Fetches from simulated API. Use { force: true } to refresh even when local data exists.
       * On first visit (empty store), always loads.
       */
      loadTransactions: async (options = {}) => {
        const { force = false } = options;
        if (!force && get().transactions.length > 0) {
          return;
        }
        set({ loading: true, loadError: null, usedFallback: false });
        try {
          const data = await fetchTransactionsFromApi();
          set({
            transactions: data,
            loading: false,
            loadError: null,
            usedFallback: false,
          });
          if (force) {
            get().addToast('Data refreshed from API.', 'success');
          }
        } catch (e) {
          const fallback = MOCK_TRANSACTIONS.map((t) => ({ ...t }));
          set({
            transactions: fallback,
            loading: false,
            loadError: e.message || 'Failed to load',
            usedFallback: true,
          });
          get().addToast('Using sample data — API unavailable.', 'warning');
        }
      },

      addTransaction: (payload) => {
        const id =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `tx-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        set((s) => ({
          transactions: [
            {
              id,
              date: payload.date,
              amount: Number(payload.amount),
              category: payload.category,
              type: payload.type,
              description: payload.description || '',
            },
            ...s.transactions,
          ],
        }));
        get().addToast('Transaction added.', 'success');
      },

      updateTransaction: (id, payload) => {
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...payload,
                  amount: payload.amount != null ? Number(payload.amount) : t.amount,
                }
              : t
          ),
        }));
        get().addToast('Transaction updated.', 'success');
      },

      replaceTransactionsFromImport: (list) => {
        set({ transactions: list });
        get().addToast('Transactions imported.', 'success');
      },
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
      }),
    }
  )
);
