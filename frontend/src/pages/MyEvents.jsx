import { useEffect, useState } from 'react';
import { fetchMyRegistrations, cancelRegistration } from '../services/registrationService';
import { getErrorMessage } from '../services/api';
import RegistrationCard from '../components/registration/RegistrationCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

const MyEvents = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetchMyRegistrations()
      .then((res) => setRegistrations(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this registration?')) return;
    try {
      await cancelRegistration(id);
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullPage label="Loading your events..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-headline-md text-text-primary">My Events</h1>
      {registrations.length === 0 ? (
        <EmptyState
          title="You haven't registered for any events yet"
          description="Browse events and register to see them here."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {registrations.map((r) => (
            <RegistrationCard key={r._id} registration={r} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
