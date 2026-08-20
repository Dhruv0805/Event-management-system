import { useEffect, useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const emptyForm = { name: '', contact: '', email: '', task: '', status: 'assigned', notes: '' };

// Add/Edit form for an event-specific volunteer. `initialData` presence
// determines create vs edit mode; the parent owns the actual API call.
const VolunteerForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  }, [initialData]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
      <Input label="Contact Number" name="contact" value={form.contact} onChange={handleChange} required />
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Assigned Task" name="task" value={form.task} onChange={handleChange} required />
      <Select
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={[
          { value: 'assigned', label: 'Assigned' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ]}
      />
      <Input label="Notes" name="notes" value={form.notes} onChange={handleChange} />
      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initialData ? 'Save Changes' : 'Add Volunteer'}
        </Button>
      </div>
    </form>
  );
};

export default VolunteerForm;
