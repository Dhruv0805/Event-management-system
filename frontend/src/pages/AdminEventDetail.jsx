import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventFullDetail } from '../services/eventService';
import { createVolunteer, updateVolunteer, deleteVolunteer } from '../services/volunteerService';
import { getErrorMessage } from '../services/api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Badge from '../components/common/Badge';
import RegistrationManagement from '../components/admin/RegistrationManagement';
import VolunteerManagement from '../components/admin/VolunteerManagement';

// Admin → Event Management → View Event (docs section 13):
// full detail with the event's registrations and its event-scoped
// volunteers, all on one screen.
const AdminEventDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [volunteerLoading, setVolunteerLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setError('');
    fetchEventFullDetail(id)
      .then((res) => setData(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleCreateVolunteer = async (form) => {
    setVolunteerLoading(true);
    try {
      await createVolunteer({ ...form, eventId: id });
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setVolunteerLoading(false);
    }
  };

  const handleUpdateVolunteer = async (volunteerId, form) => {
    setVolunteerLoading(true);
    try {
      await updateVolunteer(volunteerId, form);
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setVolunteerLoading(false);
    }
  };

  const handleRemoveVolunteer = async (volunteerId) => {
    if (!window.confirm('Remove this volunteer?')) return;
    try {
      await deleteVolunteer(volunteerId);
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullPage label="Loading event..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!data) return null;

  const { event, registrations, volunteers } = data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link to="/admin/events" className="text-label-md text-primary hover:underline">
          ← Back to Events
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-headline-md text-text-primary">{event.title}</h1>
          <Badge tone="blue">{event.status}</Badge>
        </div>
        <p className="text-body-md text-text-muted">
          📅 {new Date(event.date).toLocaleDateString()} · 📍 {event.venue} · Capacity {event.capacity}
        </p>
      </div>

      <div className="card-surface p-md">
        <h2 className="mb-3 text-headline-sm text-text-primary">Registrations ({registrations.length})</h2>
        <RegistrationManagement registrations={registrations} />
      </div>

      <div className="card-surface p-md">
        <VolunteerManagement
          volunteers={volunteers}
          onCreate={handleCreateVolunteer}
          onUpdate={handleUpdateVolunteer}
          onRemove={handleRemoveVolunteer}
          loading={volunteerLoading}
        />
      </div>
    </div>
  );
};

export default AdminEventDetail;
