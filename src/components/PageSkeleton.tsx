export default function PageSkeleton() {
  return (
    <div className="page-skeleton" role="status" aria-live="polite" aria-label="Loading HARIKOS page">
      <div className="page-skeleton__grid" aria-hidden="true">
        <span className="skeleton-line skeleton-line--eyebrow" />
        <span className="skeleton-line skeleton-line--title" />
        <span className="skeleton-line skeleton-line--title-short" />
        <span className="skeleton-line skeleton-line--copy" />
        <span className="skeleton-button" />
      </div>
      <div className="page-skeleton__core" aria-hidden="true">
        <i /><i /><i />
      </div>
      <span className="sr-only">Loading HARIKOS page</span>
    </div>
  );
}
