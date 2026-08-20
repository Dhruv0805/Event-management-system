import { useEffect, useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const emptyForm = {
  title: '',
  description: '',
  category: '',
  date: '',
  startTime: '',
  endTime: '',
  venue: '',
  capacity: 50,
  registrationDeadline: '',
  image: '',
  rules: '',
  status: 'upcoming',
};

const toDateInputValue = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '');

// Create/Edit form for Admin → Event Management (docs section 13).
// Works for both flows: pass `initialData` to edit an existing event.
const EventForm = ({ initialData, categories = [], onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        category: initialData.category?._id || initialData.category || '',
        date: toDateInputValue(initialData.date),
        registrationDeadline: toDateInputValue(initialData.registrationDeadline),
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, capacity: Number(form.capacity) });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Event Title" name="title" value={form.title} onChange={handleChange} required />

      <div className="flex flex-col gap-1.5">
        <label className="text-label-md text-text-secondary">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
          className="w-full rounded bg-surface border border-border px-3.5 py-2.5 text-body-md text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
        />
      </div>

      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Select a category"
        options={categories.map((c) => ({ value: c._id, label: c.name }))}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
        <Input label="Start Time" name="startTime" type="time" value={form.startTime} onChange={handleChange} required />
        <Input label="End Time" name="endTime" type="time" value={form.endTime} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Input label="Venue" name="venue" value={form.venue} onChange={handleChange} required />
        <Input label="Capacity" name="capacity" type="number" min={1} value={form.capacity} onChange={handleChange} required />
      </div>

      <Input
        label="Registration Deadline"
        name="registrationDeadline"
        type="date"
        value={form.registrationDeadline}
        onChange={handleChange}
        required
      />

      <Input label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />

      <div className="flex flex-col gap-1.5">
        <label className="text-label-md text-text-secondary">Rules / Instructions</label>
        <textarea
          name="rules"
          value={form.rules}
          onChange={handleChange}
          rows={3}
          className="w-full rounded bg-surface border border-border px-3.5 py-2.5 text-body-md text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
        />
      </div>

      <Select
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'published', label: 'Published' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? 'Save Changes' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
