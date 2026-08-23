import { motion } from 'motion/react';
import { fadeUp } from '../../lib/motion';

const EmptyState = ({ title = 'Nothing here yet', description, action }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    className="card-surface flex flex-col items-center gap-2 p-xl text-center"
  >
    <span className="mb-1 text-3xl opacity-70">🎫</span>
    <h3 className="font-display text-headline-sm text-text-primary">{title}</h3>
    {description && <p className="max-w-sm text-body-md text-text-muted">{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </motion.div>
);

export default EmptyState;
