import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { cardHover } from '../../lib/motion';

const statusTone = {
  upcoming: 'blue',
  published: 'green',
  completed: 'gray',
  cancelled: 'red',
  draft: 'amber',
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

// Signature element of the app: the card reads as a real event ticket —
// image "stub," dashed perforation with punched notches, and a large
// date treatment — rather than a generic bordered card.
const EventCard = ({ event }) => (
  <motion.div
    initial="rest"
    whileHover="hover"
    animate="rest"
    variants={cardHover}
    className="card-surface group overflow-hidden hover:shadow-glow transition-shadow"
  >
    <div className="relative aspect-video w-full overflow-hidden bg-surface-raised">
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-radial-glow text-4xl">
          🎟️
        </div>
      )}
      <div className="absolute left-3 top-3 flex gap-2">
        <Badge tone={statusTone[event.status] || 'blue'}>{event.status}</Badge>
      </div>
    </div>

    <div className="ticket-perforation flex flex-col gap-3 p-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-2xl font-bold leading-none text-primary">
            {new Date(event.date).getDate()}
          </p>
          <p className="text-label-sm text-text-muted">
            {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
          </p>
        </div>
        <Badge tone="violet">{event.category?.name || 'General'}</Badge>
      </div>

      <h3 className="font-display text-headline-sm text-text-primary line-clamp-1">{event.title}</h3>
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
  </motion.div>
);

export default EventCard;
