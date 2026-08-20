import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboardStats } from '../services/adminService';
import { getErrorMessage } from '../services/api';
import DashboardCard from '../components/admin/DashboardCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Table from '../components/common/Table';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetchDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <Loader fullPage label="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  const columns = [
    { key: 'participant', header: 'Participant', render: (r) => r.userId?.name || '—' },
    { key: 'event', header: 'Event', render: (r) => r.eventId?.title || '—' },
    { key: 'date', header: 'Date', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-md text-text-primary">Admin Dashboard</h1>
        <Link to="/admin/events" className="text-label-md text-primary hover:underline">
          Manage Events →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <DashboardCard label="Total Events" value={stats.totalEvents} icon="🗓️" />
        <DashboardCard label="Upcoming Events" value={stats.upcomingEvents} icon="🚀" />
        <DashboardCard label="Total Users" value={stats.totalUsers} icon="👥" />
        <DashboardCard label="Registrations" value={stats.totalRegistrations} icon="📝" />
        <DashboardCard label="Volunteers" value={stats.totalVolunteers} icon="🙋" />
      </div>

      <div className="card-surface p-md">
        <h2 className="mb-3 text-headline-sm text-text-primary">Recent Registrations</h2>
        <Table columns={columns} data={stats.recentRegistrations} emptyMessage="No registrations yet." />
      </div>
    </div>
  );
};

export default AdminDashboard;
