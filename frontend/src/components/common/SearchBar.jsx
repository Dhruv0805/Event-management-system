const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <div className="relative w-full">
    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
      🔍
    </span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded bg-surface border border-border py-2.5 pl-10 pr-3.5 text-body-md text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
    />
  </div>
);

export default SearchBar;
