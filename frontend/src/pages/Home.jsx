import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchEvents } from '../services/eventService';
import { getErrorMessage } from '../services/api';
import EventList from '../components/events/EventList';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import { fadeUp, staggerContainer } from '../lib/motion';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEvents = () => {
    setLoading(true);
    setError('');
    fetchEvents({ limit: 6 })
      .then((res) => setEvents(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(loadEvents, []);

  return (
    <div className="flex flex-col gap-xl">
      <section className="relative flex flex-col items-center gap-6 overflow-hidden rounded-xl bg-gradient-radial-glow py-xl text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12)}
          className="flex flex-col items-center gap-6 px-sm"
        >
          <motion.span
            variants={fadeUp}
            className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-label-sm uppercase tracking-wider text-primary"
          >
            🎟️ Your next event is one tap away
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="max-w-2xl font-display text-display-lg-mobile sm:text-display-lg text-text-primary"
          >
            Discover, register, and manage{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">events</span> in one
            place
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-xl text-body-lg text-text-secondary">
            Browse upcoming events, grab your spot in a few clicks, and keep track of everything from
            your dashboard.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link to="/events">
              <Button size="lg">Browse Events</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Create Account
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-headline-md text-text-primary">Upcoming Events</h2>
          <Link to="/events" className="text-label-md text-primary hover:underline">
            View all →
          </Link>
        </div>
        {loading && <Loader label="Loading events..." />}
        {!loading && error && <ErrorMessage message={error} onRetry={loadEvents} />}
        {!loading && !error && <EventList events={events} />}
      </section>
    </div>
  );
};

export default Home;
