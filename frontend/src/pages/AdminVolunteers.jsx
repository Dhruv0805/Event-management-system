import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVolunteers } from '../services/volunteerService';
import { getErrorMessage } from '../services/api';
import Table from '../components/common/Table';
import Badge from '../components/common/Badge';
import SearchBar from '../components/common/SearchBar';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const statusTone = { assigned: 'blue', 'in-progress': 'amber', completed: 'green' };

// Cross-event overview of volunteers. Editing a volunteer's task still
// happens from the parent event's Manage page (AdminEventDetail), since
// volunteers are always event-scoped (docs section 14).
const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetchVolunteers()
      .then((res) => setVolunteers(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = volunteers.filter((v) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      v.name.toLowerCase().includes(term) ||
      v.task.toLowerCase().includes(term) ||
      v.eventId?.title?.toLowerCase().includes(term)
    );
  });

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'event', header: 'Event', render: (r) => r.eventId?.title || '—' },
    { key: 'task', header: 'Task' },
    { key: 'contact', header: 'Contact' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge tone={statusTone[r.status] || 'blue'}>{r.status}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) =>
        r.eventId?._id ? (
          <Link to={`/admin/events/${r.eventId._id}`} className="text-label-md text-primary hover:underline">
            Manage
          </Link>
        ) : (
          '—'
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-md text-text-primary">Volunteer Overview</h1>
      <div className="sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, task, or event..." />
      </div>

      {loading && <Loader label="Loading volunteers..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={load} />}
      {!loading && !error && (
        <div className="card-surface p-md">
          <Table columns={columns} data={filtered} emptyMessage="No volunteers assigned yet." />
        </div>
      )}
    </div>
  );
};

export default AdminVolunteers;
