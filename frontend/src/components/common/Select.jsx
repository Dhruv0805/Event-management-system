const Select = ({ label, name, options = [], error, placeholder, className = '', ...rest }) => (
  <div className="flex min-w-0 flex-col gap-1.5">
    {label && (
      <label htmlFor={name} className="text-label-md text-text-secondary">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      className={`w-full rounded bg-surface border border-border px-3.5 py-2.5 text-body-md text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-colors ${className}`}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-label-sm text-danger">{error}</span>}
  </div>
);

export default Select;
