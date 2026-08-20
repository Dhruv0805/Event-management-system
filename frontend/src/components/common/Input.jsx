// Shared text input with a consistent label, focus, and error treatment.
const Input = ({ label, name, error, className = '', ...rest }) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    {label && (
      <label htmlFor={name} className="text-label-md text-text-secondary">
        {label}
      </label>
    )}
    <input
      id={name}
      name={name}
      className={`w-full rounded bg-surface border border-border px-3.5 py-2.5 text-body-md text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-colors ${
        error ? 'border-danger focus:ring-danger/30' : ''
      } ${className}`}
      {...rest}
    />
    {error && <span className="text-label-sm text-danger">{error}</span>}
  </div>
);

export default Input;
