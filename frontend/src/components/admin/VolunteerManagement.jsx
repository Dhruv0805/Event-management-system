import { useState } from 'react';
import VolunteerCard from '../volunteer/VolunteerCard';
import VolunteerForm from '../volunteer/VolunteerForm';
import Button from '../common/Button';
import Modal from '../common/Modal';
import EmptyState from '../common/EmptyState';

// Admin → Event Management → Volunteer Management (docs section 14).
// Volunteers are always scoped to a single event, so this always takes
// an `eventId` and never a global volunteer list.
const VolunteerManagement = ({ volunteers, onCreate, onUpdate, onRemove, loading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (volunteer) => {
    setEditing(volunteer);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (editing) {
      await onUpdate(editing._id, form);
    } else {
      await onCreate(form);
    }
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-headline-sm text-text-primary">Volunteers</h3>
        <Button size="sm" onClick={openCreate}>
          + Add Volunteer
        </Button>
      </div>

      {volunteers.length === 0 ? (
        <EmptyState title="No volunteers assigned" description="Add a volunteer for this event." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {volunteers.map((v) => (
            <VolunteerCard key={v._id} volunteer={v} onEdit={openEdit} onRemove={onRemove} />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Volunteer' : 'Add Volunteer'}
      >
        <VolunteerForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default VolunteerManagement;
