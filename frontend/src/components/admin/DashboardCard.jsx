import { motion } from 'motion/react';

// Small metric tile used across the Admin Dashboard stat grid, with a
// subtle gradient accent bar and lift-on-hover to feel less flat.
const DashboardCard = ({ label, value, icon }) => (
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="card-surface relative overflow-hidden p-md"
  >
    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
    <div className="flex items-center gap-4">
      {icon && <span className="text-3xl">{icon}</span>}
      <div>
        <p className="text-label-md text-text-muted">{label}</p>
        <p className="font-display text-headline-md text-text-primary">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default DashboardCard;
