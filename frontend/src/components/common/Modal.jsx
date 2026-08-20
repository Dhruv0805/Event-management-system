import { useEffect } from 'react';

// Glassmorphism overlay per docs section 43: backdrop blur + translucent
// surface + subtle border, used for modals, drawers, and dropdowns.
const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-sm">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="glass-panel relative w-full max-w-lg rounded-xl p-lg shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-headline-sm text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-text-muted hover:bg-surface-raised hover:text-text-primary"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
