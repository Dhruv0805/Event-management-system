import { motion } from 'motion/react';
import { pageTransition } from '../../lib/motion';

// Wraps route content so every page fades/slides in consistently
// instead of hard-cutting between screens.
const PageTransition = ({ children }) => (
  <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
    {children}
  </motion.div>
);

export default PageTransition;
