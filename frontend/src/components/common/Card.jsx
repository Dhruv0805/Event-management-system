import { motion } from 'motion/react';

// Generic surface card. Feature-specific cards (EventCard, DashboardCard...)
// compose this instead of redefining surface/border/radius rules.
const Card = ({ children, className = '', hoverGlow = false, ...rest }) => (
  <motion.div
    whileHover={hoverGlow ? { y: -4 } : {}}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className={`card-surface p-md ${
      hoverGlow ? 'transition-shadow hover:shadow-glow' : ''
    } ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);

export default Card;
