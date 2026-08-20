import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

// Shared shell for every /admin/* page: sidebar + content area.
// Keeps Office Section layout independent of the User section layout.
const AdminLayout = () => (
  <div className="flex flex-col gap-0 md:flex-row md:gap-6">
    <AdminSidebar />
    <div className="flex-1 py-md md:py-0">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
