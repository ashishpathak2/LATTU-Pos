import { CAKES, SHAKES } from '../config/products';
import type { DailySummary, Product } from '../types';
import { formatINR } from '../utils/calculations';
import { prettyDate } from '../utils/date';

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
    <div className="text-xs text-stone-500">{label}</div><div className="text-xl font-bold tabular-nums">{value}</div>
  </div>
);

function Group({ title, products, s, count }: { title: string; products: Product[]; s: DailySummary; count: number }) {
  return (
    <section>
      <h2 className="mb-1 flex justify-between text-sm font-semibold text-stone-600"><span>{title}</span><span>{count} sold</span></h2>
      <ul className="divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        {products.map(p => {
          const r = s.byProduct[p.id];
          return (
            <li key={p.id} className="flex items-center gap-3 px-3 py-2.5" style={{ borderLeft: `6px solid ${p.accent}` }}>
              <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{p.shortName}</div><div className="text-xs text-stone-500">{formatINR(p.price)} each</div></div>
              <div className="w-12 text-center text-lg font-bold tabular-nums">{r.quantity}</div>
              <div className="w-20 text-right text-sm font-semibold tabular-nums">{formatINR(r.revenue)}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function SalesSummaryPage({ summary: s }: { summary: DailySummary }) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 overflow-y-auto px-3 py-3">
      <p className="text-sm text-stone-500">Sales for {prettyDate(new Date(s.date + 'T00:00:00'))}</p>
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Items sold" value={s.totalItemsSold} />
        <Stat label="Revenue" value={formatINR(s.totalRevenue)} />
        <Stat label="Transactions" value={s.totalTransactions} />
      </div>
      <Group title="Shakes" products={SHAKES} s={s} count={s.totalShakes} />
      <Group title="Cakes" products={CAKES} s={s} count={s.totalCakes} />
      <section className="rounded-2xl bg-[#b92b22] p-5 text-center text-white shadow">
        <div className="text-sm font-semibold tracking-wide">TOTAL AMOUNT TO COLLECT</div>
        <div className="mt-1 text-4xl font-extrabold tabular-nums">{formatINR(s.totalRevenue)}</div>
        <div className="mt-1 text-xs opacity-80">Estimated from recorded sales, not verified cash.</div>
      </section>
    </main>
  );
}
