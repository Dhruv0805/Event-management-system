import { useEffect, useState } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';
import { fetchCategories } from '../services/categoryService';
import { getErrorMessage } from '../services/api';
import EventManagement from '../components/admin/EventManagement';
import EventForm from '../components/admin/EventForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError('');
    Promise.all([fetchEvents({ limit: 100 }), fetchCategories()])
      .then(([eventsRes, catRes]) => {
        setEvents(eventsRes.data);
        setCategories(catRes.data);
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (event) => {
    setEditing(event);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    try {
      if (editing) {
        await updateEvent(editing._id, form);
      } else {
        await createEvent(form);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event? This also removes its registrations and volunteers.')) return;
    try {
      await deleteEvent(id);
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  if (loading) return <Loader fullPage label="Loading events..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-headline-md text-text-primary">Event Management</h1>
        <Button onClick={openCreate}>+ Create Event</Button>
      </div>

      <div className="card-surface p-md">
        <EventManagement events={events} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Event' : 'Create Event'}
      >
        <EventForm
          initialData={editing}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={saving}
        />
      </Modal>
    </div>
  );
};

export default AdminEvents;
