import { motion } from 'motion/react';
import EventCard from './EventCard';
import EmptyState from '../common/EmptyState';
import { fadeUp, staggerContainer } from '../../lib/motion';

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.06)}
      className="grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3"
    >
      {events.map((event) => (
        <motion.div key={event._id} variants={fadeUp}>
          <EventCard event={event} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EventList;
