import { useEffect, useState } from 'react';
import { fetchAllRegistrations } from '../services/registrationService';
import { getErrorMessage } from '../services/api';
import RegistrationManagement from '../components/admin/RegistrationManagement';
import SearchBar from '../components/common/SearchBar';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

// Admin → Registration Management (docs section 15). Lists every
// registration across all events; Admin can search by participant name.
const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetchAllRegistrations()
      .then((res) => setRegistrations(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = registrations.filter((r) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      r.userId?.name?.toLowerCase().includes(term) ||
      r.userId?.email?.toLowerCase().includes(term) ||
      r.eventId?.title?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-headline-md text-text-primary">Registration Management</h1>
      <div className="sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by participant or event..." />
      </div>

      {loading && <Loader label="Loading registrations..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={load} />}
      {!loading && !error && (
        <div className="card-surface p-md">
          <RegistrationManagement registrations={filtered} />
        </div>
      )}
    </div>
  );
};

export default AdminRegistrations;
