import { MOCK_TRANSACTIONS } from '../data/mockTransactions';

const API_FAILURE_RATE = 0.12;
const MIN_DELAY_MS = 600;
const MAX_DELAY_MS = 1400;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates fetching transactions from a remote API.
 * Randomly fails so the UI can demonstrate fallback to mock data.
 */
export async function fetchTransactionsFromApi() {
  const ms = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
  await delay(ms);
  if (Math.random() < API_FAILURE_RATE) {
    throw new Error('Unable to reach the server. Using offline sample data.');
  }
  return MOCK_TRANSACTIONS.map((t) => ({ ...t }));
}
