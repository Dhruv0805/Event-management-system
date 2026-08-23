import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import PageTransition from '../components/common/PageTransition';

// Shared shell for every /admin/* page: its own header + sidebar +
// animated content area, kept independent of the User section layout.
const AdminLayout = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 overflow-hidden px-sm sm:px-lg py-md">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
