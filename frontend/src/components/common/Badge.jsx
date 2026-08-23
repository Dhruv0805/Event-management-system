// Low-opacity background + high-contrast text. `tone` maps semantic
// meaning to a color from the ticket-identity palette.
const toneClasses = {
  blue: 'bg-teal/10 text-teal',
  violet: 'bg-coral/10 text-coral',
  green: 'bg-success/10 text-success',
  red: 'bg-danger/10 text-danger',
  amber: 'bg-warning/10 text-warning',
  gray: 'bg-text-muted/10 text-text-secondary',
};

const Badge = ({ children, tone = 'blue', className = '' }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-label-sm font-semibold uppercase tracking-wide ${toneClasses[tone]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
