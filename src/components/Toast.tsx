export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return <div role="status" className="fixed left-1/2 top-14 z-20 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-lg">{message}</div>;
}
