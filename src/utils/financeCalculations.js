import { monthKey } from './format';

export function sumIncome(transactions) {
  return transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
}

export function sumExpenses(transactions) {
  return transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
}

export function totalBalance(transactions) {
  return sumIncome(transactions) - sumExpenses(transactions);
}

/** Expense totals per category */
export function expenseByCategory(transactions) {
  const map = {};
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/** Highest spending category (expenses only) */
export function highestSpendingCategory(transactions) {
  const list = expenseByCategory(transactions);
  if (!list.length) return null;
  return list[0];
}

/** Monthly totals for income and expenses */
export function monthlyTotals(transactions) {
  const months = {};
  for (const t of transactions) {
    const m = monthKey(t.date);
    if (!months[m]) months[m] = { income: 0, expense: 0 };
    if (t.type === 'income') months[m].income += t.amount;
    else months[m].expense += t.amount;
  }
  return months;
}

/** Sorted month keys (YYYY-MM) */
export function sortedMonthKeys(monthlyTotals) {
  return Object.keys(monthlyTotals).sort();
}

/** Running balance over time (by date order) */
export function balanceTrendSeries(transactions) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  let balance = 0;
  return sorted.map((t) => {
    balance += t.type === 'income' ? t.amount : -t.amount;
    return { date: t.date, balance, label: t.date };
  });
}

/** Compare the two most recent calendar months that appear in the data */
export function compareLatestTwoMonths(transactions) {
  const mt = monthlyTotals(transactions);
  const keys = sortedMonthKeys(mt);
  if (keys.length === 0) {
    return {
      thisMonthKey: null,
      lastMonthKey: null,
      thisMonth: { income: 0, expense: 0 },
      lastMonth: { income: 0, expense: 0 },
      expenseDelta: 0,
      incomeDelta: 0,
    };
  }
  if (keys.length === 1) {
    const k = keys[0];
    const cur = mt[k] || { income: 0, expense: 0 };
    return {
      thisMonthKey: k,
      lastMonthKey: null,
      thisMonth: cur,
      lastMonth: { income: 0, expense: 0 },
      expenseDelta: cur.expense,
      incomeDelta: cur.income,
    };
  }
  const thisM = keys[keys.length - 1];
  const lastM = keys[keys.length - 2];
  const cur = mt[thisM] || { income: 0, expense: 0 };
  const prev = mt[lastM] || { income: 0, expense: 0 };
  return {
    thisMonthKey: thisM,
    lastMonthKey: lastM,
    thisMonth: cur,
    lastMonth: prev,
    expenseDelta: cur.expense - prev.expense,
    incomeDelta: cur.income - prev.income,
  };
}

export function filterTransactions(transactions, { search, typeFilter, categoryFilter }) {
  let list = [...transactions];
  const q = (search || '').trim().toLowerCase();
  if (q) {
    list = list.filter(
      (t) =>
        t.category.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        t.date.includes(q) ||
        String(t.amount).includes(q)
    );
  }
  if (typeFilter && typeFilter !== 'all') {
    list = list.filter((t) => t.type === typeFilter);
  }
  if (categoryFilter && categoryFilter !== 'all') {
    list = list.filter((t) => t.category === categoryFilter);
  }
  return list;
}

export function sortTransactions(list, sortBy, sortDir) {
  const dir = sortDir === 'asc' ? 1 : -1;
  return [...list].sort((a, b) => {
    if (sortBy === 'date') {
      const cmp = a.date.localeCompare(b.date);
      return cmp * dir;
    }
    if (sortBy === 'amount') {
      return (a.amount - b.amount) * dir;
    }
    return 0;
  });
}
