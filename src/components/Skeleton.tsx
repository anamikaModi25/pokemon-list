export default function Skeleton() {
  return (
    <div
      role="status"
      aria-label="loading"
      className="mx-auto mt-16 w-full max-w-4xl rounded-3xl border border-ink-200 bg-white/70 p-8 shadow-xl"
    >
      <div className="mb-6 h-6 w-48 animate-pulse rounded-full bg-ink-200/70" />
      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded-full bg-ink-200/70" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-ink-200/70" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-ink-200/70" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="h-24 animate-pulse rounded-2xl bg-ink-200/60" />
        <div className="h-24 animate-pulse rounded-2xl bg-ink-200/60" />
      </div>
    </div>
  );
}

