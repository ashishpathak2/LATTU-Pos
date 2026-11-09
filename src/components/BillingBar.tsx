import { formatINR } from '../utils/calculations';
export default function BillingBar({ items, amount, onPay }: { items: number; amount: number; onPay: () => void }) {
  return (
    <div className="shrink-0 border-t border-stone-200 bg-white px-3 pt-2 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <div className="flex-1">
          <div className="text-xs text-stone-500">Selected Items: <b className="text-stone-800">{items}</b></div>
          <div className="text-xs text-stone-500">Total Amount</div>
          <div className="text-3xl font-extrabold leading-none tabular-nums">{formatINR(amount)}</div>
        </div>
        <button onClick={onPay}
          className={`h-14 min-w-[132px] rounded-2xl px-6 text-lg font-bold tracking-wide shadow ${items ? 'bg-[#b92b22] text-white active:bg-[#971f18]' : 'bg-[#d9c4bf] text-white'}`}>PAID</button>
      </div>
    </div>
  );
}
