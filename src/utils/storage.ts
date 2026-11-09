import type { Transaction } from '../types';
// Only this file touches localStorage. Replace its functions with API calls later.
const KEY = 'freshtrack-pos:v1';

const valid = (t: any): t is Transaction =>
  t && typeof t.transactionId === 'string' && typeof t.date === 'string' && Array.isArray(t.items) && typeof t.totalAmount === 'number';

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data?.transactions) ? data.transactions.filter(valid) : [];
  } catch { return []; }
}

export function saveTransactions(transactions: Transaction[]): boolean {
  try { localStorage.setItem(KEY, JSON.stringify({ version: 1, transactions })); return true; }
  catch { return false; }
}
