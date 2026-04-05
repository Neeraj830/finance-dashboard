import { useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';

/** After zustand rehydrates from localStorage, load data if the store is empty. */
export function useBootstrap() {
  useEffect(() => {
    const unsub = useFinanceStore.persist.onFinishHydration(() => {
      useFinanceStore.getState().loadTransactions();
    });
    return () => unsub?.();
  }, []);
}
