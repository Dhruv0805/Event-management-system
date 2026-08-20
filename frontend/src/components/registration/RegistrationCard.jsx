import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';

const statusTone = { confirmed: 'green', cancelled: 'red', waitlisted: 'amber' };

// Shown on "My Events" — a lightweight card for a user's own registration,
// independent from the browse-side EventCard.
const RegistrationCard = ({ registration, onCancel }) => {
  const event = registration.eventId;
  if (!event) return null;

  return (
    <div className="card-surface flex flex-col gap-3 p-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-headline-sm text-text-primary">{event.title}</h3>
          <Badge tone={statusTone[registration.status] || 'blue'}>{registration.status}</Badge>
        </div>
        <p className="text-body-md text-text-muted">
          📅 {new Date(event.date).toLocaleDateString()} · 📍 {event.venue}
        </p>
      </div>
      <div className="flex gap-2">
        <Link to={`/events/${event._id}`}>
          <Button variant="secondary" size="sm">
            View
          </Button>
        </Link>
        {registration.status === 'confirmed' && (
          <Button variant="danger" size="sm" onClick={() => onCancel(registration._id)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegistrationCard;
