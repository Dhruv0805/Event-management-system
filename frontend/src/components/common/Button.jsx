// Shared Button. `variant` controls visual style only — every screen
// should reuse this instead of writing one-off button classes.
const variantClasses = {
  primary:
    'bg-gradient-primary text-white font-semibold hover:opacity-90 shadow-sm shadow-primary/20',
  secondary:
    'bg-transparent border border-primary text-primary hover:bg-primary/10',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-raised',
  danger: 'bg-danger text-white hover:opacity-90',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-label-md',
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
  <button
    type={type}
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center gap-2 rounded-default transition-all focus-visible:focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    {...rest}
  >
    {loading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
    )}
    {children}
  </button>
);

export default Button;
