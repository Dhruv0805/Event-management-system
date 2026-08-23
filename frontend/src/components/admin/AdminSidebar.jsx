import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/events', label: 'Events', icon: '🗓️' },
  { to: '/admin/registrations', label: 'Registrations', icon: '📝' },
  { to: '/admin/volunteers', label: 'Volunteers', icon: '🙋' },
  { to: '/admin/users', label: 'Users', icon: '👥' },
];

// Collapsible on mobile: a top scroll-row on small screens, a fixed
// left column from md up. Active link gets a sliding pill highlight.
const AdminSidebar = () => (
  <motion.aside
    initial={{ x: -12, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="md:w-60 md:shrink-0 border-b md:border-b-0 md:border-r border-border md:sticky md:top-[73px] md:h-[calc(100vh-73px)]"
  >
    <nav className="flex gap-2 overflow-x-auto p-sm md:flex-col md:gap-1 md:p-md">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `relative flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-label-md transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary'
            }`
          }
        >
          <span>{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  </motion.aside>
);

export default AdminSidebar;
