// Generic surface card. Feature-specific cards (EventCard, DashboardCard...)
// compose this instead of redefining surface/border/radius rules.
const Card = ({ children, className = '', hoverGlow = false, ...rest }) => (
  <div
    className={`card-surface p-md ${
      hoverGlow ? 'transition-shadow hover:shadow-[0_0_32px_-8px_var(--color-primary)]' : ''
    } ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
