import { BY_ID, PRODUCTS } from '../config/products';
import type { DailySummary, Selection, Transaction } from '../types';
import { localDate, localTimestamp } from './date';

export const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

export function billTotals(sel: Selection) {
  let items = 0, amount = 0;
  for (const [id, q] of Object.entries(sel)) { const p = BY_ID[id]; if (p && q > 0) { items += q; amount += q * p.price; } }
  return { items, amount };
}

export function buildTransaction(sel: Selection, existingToday: number, now = new Date()): Transaction | null {
  const items = Object.entries(sel).filter(([id, q]) => q > 0 && BY_ID[id]).map(([id, q]) => {
    const p = BY_ID[id]; return { productId: id, name: p.name, quantity: q, unitPrice: p.price, subtotal: q * p.price };
  });
  if (!items.length) return null;
  const date = localDate(now);
  return {
    transactionId: `TXN_${date.replace(/-/g, '')}_${String(existingToday + 1).padStart(3, '0')}`,
    date, timestamp: localTimestamp(now), items,
    totalItems: items.reduce((s, i) => s + i.quantity, 0),
    totalAmount: items.reduce((s, i) => s + i.subtotal, 0),
  };
}

// Summary is derived from confirmed transactions, using the unit price recorded at sale time.
export function summarize(txns: Transaction[], date: string): DailySummary {
  const byProduct = Object.fromEntries(PRODUCTS.map(p => [p.id, { productId: p.id, quantity: 0, revenue: 0 }]));
  let totalTransactions = 0;
  for (const t of txns) {
    if (t.date !== date) continue;
    totalTransactions++;
    for (const i of t.items) { const r = byProduct[i.productId]; if (r) { r.quantity += i.quantity; r.revenue += i.subtotal; } }
  }
  const sum = (cat: string) => PRODUCTS.filter(p => p.category === cat).reduce((s, p) => s + byProduct[p.id].quantity, 0);
  const totalShakes = sum('shake'), totalCakes = sum('cake');
  return {
    date, byProduct, totalShakes, totalCakes, totalTransactions,
    sales: Object.fromEntries(PRODUCTS.map(p => [p.id, byProduct[p.id].quantity])),
    totalItemsSold: totalShakes + totalCakes,
    totalRevenue: PRODUCTS.reduce((s, p) => s + byProduct[p.id].revenue, 0),
  };
}
