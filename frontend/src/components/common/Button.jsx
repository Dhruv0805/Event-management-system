import { motion } from 'motion/react';

// Shared Button. `variant` controls visual style only — every screen
// should reuse this instead of writing one-off button classes.
const variantClasses = {
  primary:
    'bg-gradient-primary text-white font-semibold shadow-glow hover:brightness-[1.06]',
  secondary:
    'bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-raised hover:text-text-primary',
  danger: 'bg-danger text-white hover:brightness-110',
};

const sizeClasses = {
  sm: 'px-3.5 py-1.5 text-label-md',
  md: 'px-5 py-2.5 text-body-md',
  lg: 'px-6 py-3 text-body-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  ...rest
}) => (
  <motion.button
    type={type}
    disabled={disabled || loading}
    whileHover={disabled || loading ? {} : { scale: 1.02 }}
    whileTap={disabled || loading ? {} : { scale: 0.97 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
    className={`inline-flex items-center justify-center gap-2 rounded transition-colors focus-visible:focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    {...rest}
  >
    {loading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
    )}
    {children}
  </motion.button>
);

export default Button;
