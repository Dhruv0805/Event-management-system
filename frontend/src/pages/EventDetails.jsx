import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById } from '../services/eventService';
import { registerForEvent } from '../services/registrationService';
import { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import RegistrationForm from '../components/registration/RegistrationForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);
  const [feedback, setFeedback] = useState('');

  const loadEvent = () => {
    setLoading(true);
    setError('');
    fetchEventById(id)
      .then((res) => setEvent(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(loadEvent, [id]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    setRegistering(true);
    setFeedback('');
    try {
      await registerForEvent(id);
      setFeedback('success:You are registered for this event! Check My Events for details.');
      loadEvent();
    } catch (err) {
      setFeedback(`error:${getErrorMessage(err)}`);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <Loader fullPage label="Loading event..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadEvent} />;
  if (!event) return null;

  const deadlinePassed = new Date() > new Date(event.registrationDeadline);
  const isFull = event.availableSeats <= 0;
  const closed = event.status === 'cancelled' || event.status === 'completed';

  let disabledReason = '';
  if (closed) disabledReason = 'Registration is closed for this event.';
  else if (deadlinePassed) disabledReason = 'The registration deadline has passed.';
  else if (isFull) disabledReason = 'This event has reached full capacity.';

  return (
    <div className="flex flex-col gap-6">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-surface-raised">
        {event.image ? (
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">🎉</div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="violet">{event.category?.name}</Badge>
            <Badge tone="blue">{event.status}</Badge>
          </div>
          <h1 className="text-headline-md text-text-primary">{event.title}</h1>
          <p className="whitespace-pre-line text-body-md text-text-secondary">{event.description}</p>

          {event.rules && (
            <div className="card-surface p-md">
              <h3 className="mb-2 text-headline-sm text-text-primary">Rules & Instructions</h3>
              <p className="whitespace-pre-line text-body-md text-text-secondary">{event.rules}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {feedback && (
            <div
              className={`rounded p-3 text-label-md ${
                feedback.startsWith('success')
                  ? 'bg-success/10 text-success'
                  : 'bg-danger/10 text-danger'
              }`}
            >
              {feedback.split(':').slice(1).join(':')}
            </div>
          )}

          {!isAdmin && (
            <RegistrationForm
              event={event}
              onSubmit={handleRegister}
              loading={registering}
              disabled={!!disabledReason}
              disabledReason={disabledReason}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
