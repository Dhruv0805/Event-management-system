import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventService';
import { fetchCategories } from '../services/categoryService';
import { getErrorMessage } from '../services/api';
import EventList from '../components/events/EventList';
import EventFilter from '../components/events/EventFilter';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import Pagination from '../components/common/Pagination';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const timeout = setTimeout(() => {
      fetchEvents({ search, category, page, limit: 9 })
        .then((res) => {
          setEvents(res.data);
          setPages(res.pagination?.pages || 1);
        })
        .catch((err) => setError(getErrorMessage(err)))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, category, page]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-headline-md text-text-primary">Browse Events</h1>
        <p className="text-body-md text-text-muted">Find and register for events that interest you.</p>
      </div>

      <EventFilter
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        category={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setPage(1);
        }}
        categories={categories}
      />

      {loading && <Loader label="Loading events..." />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <EventList events={events} />
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Events;
