import { useCallback, useRef, useState } from 'react';
import { usePOS } from './hooks/usePOS';
import POSPage from './pages/POSPage';
import SalesSummaryPage from './pages/SalesSummaryPage';
import Toast from './components/Toast';
import { prettyDate } from './utils/date';

export default function App() {
  const pos = usePOS();
  const [view, setView] = useState<'pos' | 'summary'>('pos');
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number>();

  const notify = useCallback((m: string) => { setToast(m); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setToast(null), 1600); }, []);
  const onPay = () => {
    const r = pos.pay();
    notify(r === 'saved' ? 'Payment recorded' : r === 'error' ? 'Recorded, but storage failed' : 'Select a product first');
  };

  return (
    <div className="flex h-dvh flex-col">
      <header className="shrink-0 bg-[#b92b22] px-3 py-2 text-white" style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}>
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-base font-bold leading-tight"><span className="h-2 w-2 rounded-full bg-emerald-300" aria-label="Ready" />Lattu POS</div>
            <div className="text-xs text-white/80">{prettyDate()}</div>
          </div>
          <nav className="flex rounded-xl bg-white/20 p-1 text-sm font-semibold" aria-label="Screens">
            {(['pos', 'summary'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} aria-current={view === v}
                className={`h-9 rounded-lg px-3 ${view === v ? 'bg-white text-[#b92b22] shadow-sm' : 'text-white'}`}>{v === 'pos' ? 'POS' : 'Summary'}</button>
            ))}
          </nav>
        </div>
      </header>
      <Toast message={toast} />
      {view === 'pos'
        ? <POSPage selection={pos.selection} add={pos.add} remove={pos.remove} totals={pos.totals} onPay={onPay} />
        : <SalesSummaryPage summary={pos.summary} />}
    </div>
  );
}
