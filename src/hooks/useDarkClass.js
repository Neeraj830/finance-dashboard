import { useEffect } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';

export function useDarkClass() {
  const darkMode = useFinanceStore((s) => s.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);
}
