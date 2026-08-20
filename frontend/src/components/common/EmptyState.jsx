const EmptyState = ({ title = 'Nothing here yet', description, action }) => (
  <div className="card-surface flex flex-col items-center gap-2 p-xl text-center">
    <h3 className="text-headline-sm text-text-primary">{title}</h3>
    {description && <p className="text-body-md text-text-muted max-w-sm">{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
