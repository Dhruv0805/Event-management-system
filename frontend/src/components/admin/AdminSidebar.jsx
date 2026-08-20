import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/admin/events', label: 'Events', icon: '🗓️' },
  { to: '/admin/registrations', label: 'Registrations', icon: '📝' },
  { to: '/admin/volunteers', label: 'Volunteers', icon: '🙋' },
  { to: '/admin/users', label: 'Users', icon: '👥' },
];

// Collapsible on mobile (docs section 45): renders as a top scroll-row
// on small screens and a fixed left column from the md breakpoint up.
const AdminSidebar = () => (
  <aside className="md:w-60 md:shrink-0 border-b md:border-b-0 md:border-r border-border">
    <nav className="flex gap-2 overflow-x-auto p-sm md:flex-col md:gap-1 md:p-md">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-2 rounded px-3 py-2.5 text-label-md transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-surface-raised'
            }`
          }
        >
          <span>{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
