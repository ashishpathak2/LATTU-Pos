import { memo } from 'react';
import type { Product } from '../types';
import { formatINR } from '../utils/calculations';

function ProductCard({ product: p, qty, onAdd, onRemove }: { product: Product; qty: number; onAdd: (id: string) => void; onRemove: (id: string) => void }) {
  const on = qty > 0;
  return (
    <div className="relative min-h-0">
      <button
        onClick={() => onAdd(p.id)}
        aria-label={`Add ${p.name}, ${formatINR(p.price)}${on ? `, ${qty} selected` : ''}`}
        className="relative flex h-full min-h-[56px] w-full flex-col justify-center rounded-2xl border-2 px-3 text-left shadow-sm transition-transform active:scale-[0.97]"
        style={{ background: on ? p.bg : '#fff', borderColor: on ? p.accent : '#e7e2da', color: p.ink }}
      >
        <span className="absolute bottom-3 left-0 top-3 w-1.5 rounded-r" style={{ background: p.accent }} />
        <span className="truncate pl-1.5 pr-10 text-[15px] font-semibold leading-tight">{p.shortName}</span>
        <span className="pl-1.5 text-sm opacity-80">{formatINR(p.price)}</span>
      </button>
      {on && (
        <>
          <span className="pointer-events-none absolute bottom-2 right-3 text-2xl font-bold tabular-nums" style={{ color: p.ink }}>×{qty}</span>
          <button onClick={() => onRemove(p.id)} aria-label={`Remove one ${p.name}`}
            className="absolute -right-1.5 -top-1.5 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-lg font-bold leading-none shadow"
            style={{ borderColor: p.accent, color: p.ink }}>−</button>
        </>
      )}
    </div>
  );
}
export default memo(ProductCard);
