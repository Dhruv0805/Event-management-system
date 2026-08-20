import EventCard from './EventCard';
import EmptyState from '../common/EmptyState';

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <EmptyState
        title="No events available"
        description="Check back soon, or adjust your search and filters."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
