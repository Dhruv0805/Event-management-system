// Low-opacity background + high-contrast text, per the design spec
// (docs section 41). `tone` maps semantic meaning to a color.
const toneClasses = {
  blue: 'bg-electric-blue/10 text-electric-blue',
  violet: 'bg-neon-violet/10 text-neon-violet',
  green: 'bg-success/10 text-success',
  red: 'bg-danger/10 text-danger',
  amber: 'bg-warning/10 text-warning',
  gray: 'bg-text-muted/10 text-text-secondary',
};

const Badge = ({ children, tone = 'blue', className = '' }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-label-sm font-semibold ${toneClasses[tone]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
