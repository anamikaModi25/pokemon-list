interface PaginationProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-ink-200 bg-white/80 px-6 py-4 shadow-xl">
      <div className="text-sm font-semibold text-ink-600">Navigate pages</div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous page"
          onClick={onPrev}
          disabled={page === 0}
          className="cursor-pointer rounded-full border border-ink-200 px-5 py-2 text-sm font-semibold text-ink-700 transition hover:border-ink-400 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          aria-label="Next page"
          onClick={onNext}
          className="cursor-pointer rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-ink-50 shadow-sm transition hover:-translate-y-0.5 hover:bg-ink-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
