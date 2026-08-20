const Pagination = ({ page, pages, onPageChange }) => {
  if (!pages || pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-sm">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded px-3 py-1.5 text-label-md text-text-secondary hover:bg-surface-raised disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-label-md text-text-muted">
        Page {page} of {pages}
      </span>
      <button
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
        className="rounded px-3 py-1.5 text-label-md text-text-secondary hover:bg-surface-raised disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
