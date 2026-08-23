import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { modalOverlay, modalPanel } from '../../lib/motion';

// Glassmorphism overlay, now with an enter/exit motion sequence
// (backdrop fades, panel scales + settles) instead of a hard cut.
const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-sm">
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-panel relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-lg shadow-2xl"
          >
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
