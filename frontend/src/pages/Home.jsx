import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/eventService';
import { getErrorMessage } from '../services/api';
import EventList from '../components/events/EventList';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

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
      <section className="flex flex-col items-center gap-6 py-xl text-center">
        <h1 className="max-w-2xl text-display-lg-mobile sm:text-display-lg text-text-primary">
          Discover and manage{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">events</span> in one
          place
        </h1>
        <p className="max-w-xl text-body-lg text-text-secondary">
          Browse upcoming events, register in a few clicks, and keep track of everything from your
          dashboard.
        </p>
        <div className="flex gap-4">
          <Link to="/events">
            <Button size="lg">Browse Events</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-headline-md text-text-primary">Upcoming Events</h2>
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
