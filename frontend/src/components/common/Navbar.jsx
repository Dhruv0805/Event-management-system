import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

const navLinkClass = ({ isActive }) =>
  `relative text-label-md transition-colors hover:text-primary ${
    isActive ? 'text-primary' : 'text-text-secondary'
  }`;

const Navbar = () => {
  const { isAuthenticated, isAdmin, account, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const userLinks = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/events" className={navLinkClass} onClick={() => setOpen(false)}>
        Events
      </NavLink>
      {isAuthenticated && !isAdmin && (
        <>
          <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/my-events" className={navLinkClass} onClick={() => setOpen(false)}>
            My Events
          </NavLink>
        </>
      )}
      {isAdmin && (
        <NavLink to="/admin/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
          Admin Panel
        </NavLink>
      )}
    </>
  );

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 border-b border-border bg-surface-base/75 backdrop-blur-glass"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-sm sm:px-lg py-3.5">
        <Link to="/" className="flex items-center gap-2 font-display text-headline-sm font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-primary text-sm">🎟️</span>
          <span className="bg-gradient-primary bg-clip-text text-transparent">EventHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">{userLinks}</nav>

        <div className="hidden md:flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9, rotate: 15 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-border p-2 text-text-secondary hover:bg-surface-raised"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>

          {isAuthenticated ? (
            <>
              <Link
                to={isAdmin ? '/admin/dashboard' : '/profile'}
                className="text-label-md text-text-secondary hover:text-text-primary"
              >
                Hi, {account?.name?.split(' ')[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden rounded p-2 text-text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-border bg-surface-base"
          >
            <div className="flex flex-col gap-4 px-sm py-sm">
              {userLinks}
              <button onClick={toggleTheme} className="text-left text-label-md text-text-secondary">
                {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              </button>
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-fit">
                  Logout
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="secondary" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
