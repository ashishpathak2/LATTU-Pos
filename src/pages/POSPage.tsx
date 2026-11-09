import { CAKES, SHAKES } from '../config/products';
import type { Product, Selection } from '../types';
import ProductCard from '../components/ProductCard';
import BillingBar from '../components/BillingBar';

function Section({ title, products, sel, add, remove }: { title: string; products: Product[]; sel: Selection; add: (id: string) => void; remove: (id: string) => void }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <h2 className="mb-1 text-sm font-semibold text-stone-600">{title}</h2>
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 md:grid-rows-2">
        {products.map(p => <ProductCard key={p.id} product={p} qty={sel[p.id] ?? 0} onAdd={add} onRemove={remove} />)}
      </div>
    </section>
  );
}

export default function POSPage({ selection, add, remove, totals, onPay }: { selection: Selection; add: (id: string) => void; remove: (id: string) => void; totals: { items: number; amount: number }; onPay: () => void }) {
  return (
    <>
      <main className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col gap-2 px-3 py-2">
        <Section title="Shakes" products={SHAKES} sel={selection} add={add} remove={remove} />
        <Section title="Cakes" products={CAKES} sel={selection} add={add} remove={remove} />
      </main>
      <BillingBar items={totals.items} amount={totals.amount} onPay={onPay} />
    </>
  );
}
