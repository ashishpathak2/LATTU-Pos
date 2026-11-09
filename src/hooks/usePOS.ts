import { useCallback, useMemo, useState } from 'react';
import type { Selection, Transaction } from '../types';
import { billTotals, buildTransaction, summarize } from '../utils/calculations';
import { loadTransactions, saveTransactions } from '../utils/storage';
import { localDate } from '../utils/date';

export type PayResult = 'empty' | 'saved' | 'error';

export function usePOS() {
  const [selection, setSelection] = useState<Selection>({});
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);

  const add = useCallback((id: string) => setSelection(s => ({ ...s, [id]: (s[id] ?? 0) + 1 })), []);
  const remove = useCallback((id: string) => setSelection(s => {
    const q = (s[id] ?? 0) - 1; const n = { ...s };
    if (q <= 0) delete n[id]; else n[id] = q; return n;
  }), []);

  const totals = useMemo(() => billTotals(selection), [selection]);

  const pay = useCallback((): PayResult => {
    const today = localDate();
    const txn = buildTransaction(selection, transactions.filter(t => t.date === today).length);
    if (!txn) return 'empty';
    const next = [...transactions, txn];
    const ok = saveTransactions(next);
    setTransactions(next);
    setSelection({});
    return ok ? 'saved' : 'error';
  }, [selection, transactions]);

  const summary = useMemo(() => summarize(transactions, localDate()), [transactions]);
  return { selection, add, remove, totals, pay, summary };
}
