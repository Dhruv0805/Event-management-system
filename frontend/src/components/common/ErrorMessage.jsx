import { motion } from 'motion/react';
import { fadeUp } from '../../lib/motion';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    className="card-surface flex flex-col items-center gap-3 border-danger/20 p-lg text-center"
  >
    <p className="text-body-md text-danger">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="text-label-md text-primary hover:underline">
        Try again
      </button>
    )}
  </motion.div>
);

export default ErrorMessage;
