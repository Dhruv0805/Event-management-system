import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

// Admin section previously had no top bar at all — just a sidebar.
// This gives the Office Section its own identity/orientation, distinct
// from the User Navbar, with quick access to theme + logout.
const AdminHeader = () => {
  const { account, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface-base/85 backdrop-blur-glass px-sm sm:px-lg py-3.5"
    >
      <Link to="/admin/dashboard" className="flex items-center gap-2 font-display text-headline-sm font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-primary text-sm">🎟️</span>
        <span className="bg-gradient-primary bg-clip-text text-transparent">EventHub</span>
        <span className="ml-1 rounded-full bg-surface-raised px-2 py-0.5 text-label-sm text-text-muted">
          Office
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 sm:px-3 py-1.5 text-label-md text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
        >
          <span aria-hidden="true">🌐</span>
          <span className="hidden sm:inline">Home</span>
        </Link>
        <motion.button
          whileTap={{ scale: 0.9, rotate: 15 }}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-full border border-border p-2 text-text-secondary hover:bg-surface-raised"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </motion.button>
        <span className="hidden sm:inline text-label-md text-text-secondary">{account?.name}</span>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </motion.header>
  );
};

export default AdminHeader;
