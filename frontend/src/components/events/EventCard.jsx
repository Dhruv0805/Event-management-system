import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Button from '../common/Button';

const statusTone = {
  upcoming: 'blue',
  published: 'green',
  completed: 'gray',
  cancelled: 'red',
  draft: 'amber',
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

// The centerpiece card of the User section (docs section 39): 16:9 image,
// category badge, date/venue, and a primary action. Stays self-contained
// so other modules never need to know about its internals.
const EventCard = ({ event }) => (
  <div className="card-surface group overflow-hidden transition-shadow hover:shadow-[0_0_32px_-8px_var(--color-primary)]">
    <div className="aspect-video w-full overflow-hidden bg-surface-raised">
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-4xl">🎉</div>
      )}
    </div>
    <div className="flex flex-col gap-3 p-md">
      <div className="flex items-center justify-between gap-2">
        <Badge tone="violet">{event.category?.name || 'General'}</Badge>
        <Badge tone={statusTone[event.status] || 'blue'}>{event.status}</Badge>
      </div>
      <h3 className="text-headline-sm text-text-primary line-clamp-1">{event.title}</h3>
      <div className="flex flex-col gap-1 text-body-md text-text-secondary">
        <span>📅 {formatDate(event.date)}</span>
        <span>📍 {event.venue}</span>
      </div>
      <Link to={`/events/${event._id}`} className="mt-2">
        <Button className="w-full" size="sm">
          View Details
        </Button>
      </Link>
    </div>
  </div>
);

export default EventCard;
